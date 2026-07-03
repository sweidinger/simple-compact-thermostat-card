import { LitElement, html, css, nothing, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HomeAssistant } from "custom-card-helpers";

import {
  CARD_NAME,
  CARD_VERSION,
  MODE_COLOR_VARS,
  MODE_LABELS,
  FAN_ICONS,
  FAN_LABELS,
} from "./const";
import { DiscoveredSensor, RoomStat, SimpleCompactThermostatConfig } from "./types";

// Side-effect import: registers <simple-compact-thermostat-editor> so the
// dashboard editor can find it via getConfigElement() below. We do this here
// (instead of dynamic import) because terser strips dead code aggressively
// from @customElement-decorated classes that aren't otherwise referenced.
import "./editor";

// Register the card so it shows up in the Lovelace card picker.
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: CARD_NAME,
  name: "Simple Compact Thermostat",
  description: "A compact thermostat card with HVAC, preset, and fan controls.",
  preview: false,
  documentationURL: "https://github.com/priyam13coding/simple-compact-thermostat-card",
});

/* eslint-disable no-console */
console.info(
  `%c ${CARD_NAME} %c v${CARD_VERSION} `,
  "color: white; background: #58a6ff; font-weight: 700;",
  "color: #58a6ff; background: white; font-weight: 700;",
);
/* eslint-enable no-console */

// Entity-id suffixes tried when guessing a sensor from a room name slug.
const TEMPERATURE_SUFFIXES = ["_temperature", "_temperature_2", "_temperature_3", "_temperature_4"];
const HUMIDITY_SUFFIXES    = ["_humidity", "_humidity_2", "_humidity_3", "_humidity_4"];

@customElement(CARD_NAME)
export class SimpleCompactThermostatCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: SimpleCompactThermostatConfig;
  @state() private _presetOpen = false;

  // Optimistic UI: when the user changes a value, we display it immediately
  // and reconcile against the real entity state in updated(). An entry is
  // cleared when the real state matches it, or after STALE_MS (the change
  // probably failed — let the next poll win).
  @state() private _optimistic: {
    hvac_mode?:        { value: string; setAt: number };
    fan_mode?:         { value: string; setAt: number };
    preset_mode?:      { value: string; setAt: number };
    temperature?:      { value: number; setAt: number };
    target_temp_low?:  { value: number; setAt: number };
    target_temp_high?: { value: number; setAt: number };
  } = {};

  private static readonly STALE_MS = 5 * 60 * 1000;

  // Tells Lovelace to use our custom editor element when the user clicks the
  // card's pencil icon in the dashboard editor.
  public static getConfigElement(): HTMLElement {
    return document.createElement(`${CARD_NAME}-editor`);
  }

  // Initial config when the card is added via the dashboard picker — picks the
  // first climate.* entity if one exists.
  public static getStubConfig(
    _hass: HomeAssistant,
    entities: string[],
  ): Partial<SimpleCompactThermostatConfig> {
    const climate = entities.find(e => e.startsWith("climate."));
    return { entity: climate ?? "climate.your_thermostat" };
  }

  public setConfig(config: SimpleCompactThermostatConfig): void {
    if (!config) throw new Error("Invalid configuration");
    if (!config.entity || !config.entity.startsWith("climate."))
      throw new Error("You must specify a climate entity (climate.*)");
    if (config.outside_temp_entity && !config.outside_temp_entity.includes("."))
      throw new Error("outside_temp_entity must be a valid entity id");

    this._config = {
      show_preset: true,
      show_fan: true,
      step: 1,
      show_sensor_data: true,
      room_sensor_columns: 4,
      sensor_excludes: ["Thermostat"],
      ...config,
    };
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener("click", this._outsideClickHandler, true);
  }

  // Drop any optimistic value that the entity has caught up to (or that's gone stale).
  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    if (!this._config || !this.hass) return;
    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) return;

    const now = Date.now();
    const checks: Array<[keyof typeof this._optimistic, any]> = [
      ["hvac_mode",        stateObj.state],
      ["fan_mode",         stateObj.attributes.fan_mode],
      ["preset_mode",      stateObj.attributes.preset_mode],
      ["temperature",      stateObj.attributes.temperature],
      ["target_temp_low",  stateObj.attributes.target_temp_low],
      ["target_temp_high", stateObj.attributes.target_temp_high],
    ];

    let dirty = false;
    const next = { ...this._optimistic };
    for (const [key, entityVal] of checks) {
      const opt = next[key];
      if (!opt) continue;
      if (opt.value === entityVal || now - opt.setAt > SimpleCompactThermostatCard.STALE_MS) {
        delete next[key];
        dirty = true;
      }
    }
    if (dirty) this._optimistic = next;
  }

  // Close the preset popup when the user clicks anywhere outside it.
  // Use capture phase + shadow-DOM-aware composedPath so we catch clicks
  // even when they happen inside other Lovelace cards' shadow roots.
  private _outsideClickHandler = (e: MouseEvent): void => {
    if (!this._presetOpen) return;
    const wrapper = this.shadowRoot?.querySelector(".preset-wrapper");
    if (!wrapper) return;
    const path = e.composedPath();
    if (!path.includes(wrapper)) {
      this._presetOpen = false;
      document.removeEventListener("click", this._outsideClickHandler, true);
    }
  };

  public getCardSize(): number {
    return 4;
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (!this._config) return false;
    if (changedProps.has("_config") || changedProps.has("_presetOpen")) return true;
    const oldHass = changedProps.get("hass") as HomeAssistant | undefined;
    if (!oldHass) return true;
    if (oldHass.states[this._config.entity]
        !== this.hass.states[this._config.entity]) return true;
    const outsideEntity = this._getOutsideTempEntity();
    if (outsideEntity
        && oldHass.states[outsideEntity]
           !== this.hass.states[outsideEntity]) return true;

    for (const eid of [this._getCo2Entity(), this._getHumidityEntity()]) {
      if (eid && oldHass.states[eid] !== this.hass.states[eid]) return true;
    }
    if (this._config.show_sensor_data !== false) {
      const climate = this.hass.states[this._config.entity];
      for (const s of this._discoverSensors(climate)) {
        if (oldHass.states[s.entity] !== this.hass.states[s.entity]) return true;
        if (s.occupancyEntity
            && oldHass.states[s.occupancyEntity]
               !== this.hass.states[s.occupancyEntity]) return true;
        if (s.humidityEntity
            && oldHass.states[s.humidityEntity]
               !== this.hass.states[s.humidityEntity]) return true;
        for (const st of [...(s.stats ?? []), ...(s.tooltipSensors ?? [])]) {
          if (oldHass.states[st.entity] !== this.hass.states[st.entity]) return true;
        }
      }
    }
    return false;
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;

    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) {
      return html`
        <ha-card>
          <div class="warning">Entity not found: ${this._config.entity}</div>
        </ha-card>
      `;
    }

    const activeHvac = this._optimistic.hvac_mode?.value ?? stateObj.state;
    const modeColor = MODE_COLOR_VARS[activeHvac] ?? MODE_COLOR_VARS.off;

    return html`
      <ha-card style="--sct-mode-color: ${modeColor};">
        ${this._renderHeader(stateObj)}
        ${this._renderMainRow(stateObj)}
        ${this._renderModeStrip(stateObj)}
        ${this._renderControlRow(stateObj)}
        ${this._renderRoomSensors(stateObj)}
      </ha-card>
    `;
  }

  // ── Room sensors row (auto-discovered) ───────────────────────────────
  private _renderRoomSensors(stateObj: any): TemplateResult | typeof nothing {
    if (this._config.show_sensor_data === false) return nothing;

    const sensors = this._discoverSensors(stateObj);
    if (sensors.length === 0) return nothing;

    const activeList: string[] = stateObj.attributes.active_sensors ?? [];
    const unit = this._unit();
    const cols = Math.max(1, this._config.room_sensor_columns ?? 4);

    return html`
      <div
        class="room-sensors"
        style="grid-template-columns: repeat(${cols}, 1fr);"
      >
        ${sensors.map((s, i) => {
          const sensorState = this.hass.states[s.entity];
          const raw = sensorState ? parseFloat(sensorState.state) : NaN;
          const isActive = this._isActiveSensor(s.name, activeList);
          const occState = s.occupancyEntity ? this.hass.states[s.occupancyEntity] : null;
          const isOccupied = occState?.state === "on";
          const label = s.short ?? s.name;
          const isLastCol = (i + 1) % cols === 0;
          return html`
            <div
              class="sensor-cell ${isActive ? "active" : ""} ${isOccupied ? "occupied" : ""}"
              style=${isLastCol ? "border-right: none;" : ""}
              title=${this._cellTooltip(s, isOccupied)}
            >
              <div class="sensor-temp">
                ${isNaN(raw) ? "—" : this._round(raw)}<span class="sensor-unit">°${unit}</span>${this._renderCellHumidity(s)}
              </div>
              ${this._renderCellStats(s)}
              <div class="sensor-name">${label}</div>
            </div>
          `;
        })}
      </div>
    `;
  }

  // Small "47%" chip rendered right after the room temperature.
  private _renderCellHumidity(s: DiscoveredSensor): TemplateResult | typeof nothing {
    if (!s.humidityEntity) return nothing;
    const st = this.hass.states[s.humidityEntity];
    const v = st ? parseFloat(st.state) : NaN;
    if (isNaN(v)) return nothing;
    const warn = v > (this._config.humidity_warning_threshold ?? 60);
    return html`<span class="sensor-hum ${warn ? "warn" : ""}">${Math.round(v)}%</span>`;
  }

  // Extra per-room stats line (PM2.5, CO2, mold %, …) under the temperature.
  private _renderCellStats(s: DiscoveredSensor): TemplateResult | typeof nothing {
    const stats = (s.stats ?? [])
      .map(st => this._readStat(st))
      .filter((x): x is { text: string; warn: boolean } => x !== null);
    if (stats.length === 0) return nothing;
    return html`
      <div class="sensor-stats">
        ${stats.map(st => html`<span class="sensor-stat ${st.warn ? "warn" : ""}">${st.text}</span>`)}
      </div>
    `;
  }

  // Resolve one RoomStat to display text + warn flag. Non-numeric states
  // (e.g. "excellent") render as-is without a unit. Returns null when the
  // entity is missing/unavailable so the cell doesn't fill up with dashes.
  private _readStat(st: RoomStat): { text: string; warn: boolean } | null {
    const so = this.hass.states[st.entity];
    if (!so || so.state === "unavailable" || so.state === "unknown") return null;
    const num = parseFloat(so.state);
    const isNum = !isNaN(num);
    const unit = st.unit !== undefined
      ? st.unit
      : (isNum ? so.attributes?.unit_of_measurement ?? "" : "");
    const value = isNum ? String(Math.round(num * 10) / 10) : so.state;
    const warn = isNum
      && ((st.warn_above != null && num > st.warn_above)
       || (st.warn_below != null && num < st.warn_below));
    const label = st.label ? `${st.label} ` : "";
    return { text: `${label}${value}${unit ? ` ${unit}` : ""}`, warn };
  }

  // Native hover tooltip for a sensor cell: room name plus any
  // tooltip_sensors values, one per line.
  private _cellTooltip(s: DiscoveredSensor, isOccupied: boolean): string {
    const lines = [s.name + (isOccupied ? " (occupied)" : "")];
    for (const st of s.tooltipSensors ?? []) {
      const so = this.hass.states[st.entity];
      if (!so || so.state === "unavailable" || so.state === "unknown") continue;
      const num = parseFloat(so.state);
      const isNum = !isNaN(num);
      const label = st.label
        ?? so.attributes?.friendly_name
        ?? st.entity;
      const unit = st.unit !== undefined
        ? st.unit
        : (isNum ? so.attributes?.unit_of_measurement ?? "" : "");
      const value = isNum ? String(Math.round(num * 10) / 10) : so.state;
      lines.push(`${label}: ${value}${unit ? ` ${unit}` : ""}`);
    }
    return lines.join("\n");
  }

  // Convert a manual config entry into the internal DiscoveredSensor shape.
  private _manualToDiscovered(m: any): DiscoveredSensor | null {
    if (!m || !m.name || !m.entity) return null;
    const cleanStats = (arr: any): RoomStat[] | undefined =>
      Array.isArray(arr)
        ? arr.filter((x: any) => x && typeof x.entity === "string")
        : undefined;
    return {
      name: m.name,
      entity: m.entity,
      occupancyEntity: m.occupancy_entity,
      humidityEntity: m.humidity_entity,
      stats: cleanStats(m.stats),
      tooltipSensors: cleanStats(m.tooltip_sensors),
      short: m.short,
    };
  }

  // Append additional_room_sensors (if any) to whatever sensor list was
  // already resolved. Render then flows them all into the same grid.
  private _withAdditional(base: DiscoveredSensor[]): DiscoveredSensor[] {
    const extra = this._config.additional_room_sensors;
    if (!Array.isArray(extra) || extra.length === 0) return base;
    const extras = extra
      .map(m => this._manualToDiscovered(m))
      .filter((s): s is DiscoveredSensor => s !== null);
    return [...base, ...extras];
  }

  // Resolve the displayed sensors. Manual room_sensors in config takes priority
  // over auto-discovery; this is the escape hatch for integrations that don't
  // expose available_sensors (e.g. Ecobee 3 Lite, non-Ecobee climate entities)
  // and for users mixing in third-party Zigbee/ESPHome sensors.
  // additional_room_sensors is always appended on top.
  private _discoverSensors(stateObj: any): DiscoveredSensor[] {
    const manual = this._config.room_sensors;
    if (Array.isArray(manual) && manual.length > 0) {
      const base = manual
        .map(m => this._manualToDiscovered(m))
        .filter((s): s is DiscoveredSensor => s !== null);
      return this._withAdditional(base);
    }

    if (!stateObj) return this._withAdditional([]);
    const available = stateObj.attributes?.available_sensors;
    if (!Array.isArray(available)) return this._withAdditional([]);

    const excludes = new Set(
      (this._config.sensor_excludes ?? []).map(s => s.toLowerCase())
    );
    const aliases = this._config.sensor_aliases ?? {};
    const occupancyOverrides = this._config.sensor_occupancy ?? {};
    const humidityOverrides = this._config.sensor_humidity ?? {};
    const candidates = this._findRelatedTempSensors(this._config.entity);
    const occCandidates = this._findRelatedOccupancySensors(this._config.entity);
    const humCandidates = this._findRelatedHumiditySensors(this._config.entity);
    const used = new Set<string>();
    const usedOcc = new Set<string>();
    const usedHum = new Set<string>();
    const result: DiscoveredSensor[] = [];

    for (const item of available) {
      const { name } = this._parseSensorItem(item);
      if (!name) continue;
      if (excludes.has(name.toLowerCase())) continue;

      const entityId = this._matchSensorByName(name, candidates, used);
      if (!entityId) continue;
      used.add(entityId);

      let occupancyEntity: string | undefined;
      if (occupancyOverrides[name]) {
        occupancyEntity = occupancyOverrides[name];
      } else {
        const matched = this._matchOccupancySensor(name, occCandidates, usedOcc);
        if (matched) {
          usedOcc.add(matched);
          occupancyEntity = matched;
        }
      }

      let humidityEntity: string | undefined;
      if (humidityOverrides[name]) {
        humidityEntity = humidityOverrides[name];
      } else {
        const matched = this._matchSensorByName(
          name, humCandidates, usedHum, HUMIDITY_SUFFIXES);
        if (matched) {
          usedHum.add(matched);
          humidityEntity = matched;
        }
      }

      result.push({ name, entity: entityId, short: aliases[name], occupancyEntity, humidityEntity });
    }
    return this._withAdditional(result);
  }

  // Find humidity sensor entities on the same device as the climate entity
  // (or any if the registry is unavailable).
  private _findRelatedHumiditySensors(climateId: string): string[] {
    const reg = (this.hass as any).entities as
      | Record<string, { device_id?: string }>
      | undefined;

    const isHumSensor = (eid: string): boolean => {
      if (!eid.startsWith("sensor.")) return false;
      const st = this.hass.states[eid];
      if (!st) return false;
      return st.attributes.device_class === "humidity"
          || eid.endsWith("_humidity");
    };

    if (reg) {
      const climate = reg[climateId];
      const deviceId = climate?.device_id;
      if (deviceId) {
        return Object.keys(reg).filter(
          eid => reg[eid].device_id === deviceId && isHumSensor(eid)
        );
      }
    }
    return Object.keys(this.hass.states).filter(isHumSensor);
  }

  // Find binary_sensor entities with device_class=occupancy on the same device
  // as the climate entity (or any if the registry is unavailable).
  private _findRelatedOccupancySensors(climateId: string): string[] {
    const reg = (this.hass as any).entities as
      | Record<string, { device_id?: string }>
      | undefined;

    const isOccSensor = (eid: string): boolean => {
      if (!eid.startsWith("binary_sensor.")) return false;
      const st = this.hass.states[eid];
      if (!st) return false;
      return st.attributes.device_class === "occupancy"
          || eid.endsWith("_occupancy");
    };

    if (reg) {
      const climate = reg[climateId];
      const deviceId = climate?.device_id;
      if (deviceId) {
        return Object.keys(reg).filter(
          eid => reg[eid].device_id === deviceId && isOccSensor(eid)
        );
      }
    }
    return Object.keys(this.hass.states).filter(isOccSensor);
  }

  private _matchOccupancySensor(
    name: string,
    candidates: string[],
    used: Set<string>,
  ): string | null {
    const wanted = name.toLowerCase();

    // 1. friendly_name match — "Guest Bedroom Occupancy" → "Guest Bedroom"
    for (const eid of candidates) {
      if (used.has(eid)) continue;
      const fn = (this.hass.states[eid]?.attributes?.friendly_name ?? "").toLowerCase();
      if (fn === wanted
          || fn === `${wanted} occupancy`
          || fn.startsWith(`${wanted} `)) return eid;
    }
    // 2. Slug-based entity_id with _2/_3 disambiguation
    const slug = wanted.replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
    for (const suffix of ["_occupancy", "_occupancy_2", "_occupancy_3"]) {
      const eid = `binary_sensor.${slug}${suffix}`;
      if (this.hass.states[eid] && !used.has(eid)) return eid;
    }
    return null;
  }

  private _parseSensorItem(item: any): { name: string; id: string } {
    if (typeof item === "string") {
      const m = item.match(/^(.+?)\s+\(([^)]+)\)\s*$/);
      return m ? { name: m[1], id: m[2] } : { name: item, id: "" };
    }
    if (item && typeof item === "object") {
      return {
        name: String(item.name ?? item.Name ?? ""),
        id:   String(item.id   ?? item.Id   ?? ""),
      };
    }
    return { name: "", id: "" };
  }

  // All temperature sensor entities on the same device as the climate entity.
  // Falls back to a system-wide scan if the entity registry isn't accessible.
  private _findRelatedTempSensors(climateId: string): string[] {
    const reg = (this.hass as any).entities as
      | Record<string, { device_id?: string }>
      | undefined;

    const isTempSensor = (eid: string): boolean => {
      if (!eid.startsWith("sensor.")) return false;
      const st = this.hass.states[eid];
      if (!st) return false;
      return st.attributes.device_class === "temperature"
          || eid.endsWith("_temperature");
    };

    if (reg) {
      const climate = reg[climateId];
      const deviceId = climate?.device_id;
      if (deviceId) {
        return Object.keys(reg).filter(
          eid => reg[eid].device_id === deviceId && isTempSensor(eid)
        );
      }
    }
    // Fallback: every temperature sensor in the system
    return Object.keys(this.hass.states).filter(isTempSensor);
  }

  private _matchSensorByName(
    name: string,
    candidates: string[],
    used: Set<string>,
    suffixes: string[] = TEMPERATURE_SUFFIXES,
  ): string | null {
    const wanted = name.toLowerCase();

    // 1. Exact friendly_name match
    for (const eid of candidates) {
      if (used.has(eid)) continue;
      const fn = this.hass.states[eid]?.attributes?.friendly_name ?? "";
      if (fn.toLowerCase() === wanted) return eid;
    }
    // 2. friendly_name prefix match (e.g. "Bedroom Temperature" for "Bedroom")
    for (const eid of candidates) {
      if (used.has(eid)) continue;
      const fn = (this.hass.states[eid]?.attributes?.friendly_name ?? "").toLowerCase();
      if (fn.startsWith(wanted + " ") || fn.startsWith(wanted + "_")) return eid;
    }
    // 3. Slug-based entity_id guess with _2/_3 disambiguation for duplicates
    const slug = wanted.replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
    for (const suffix of suffixes) {
      const eid = `sensor.${slug}${suffix}`;
      if (this.hass.states[eid] && !used.has(eid)) return eid;
    }
    return null;
  }

  // Resolve the entity used for outside temperature. Priority:
  // (1) explicit config, (2) weather.* on same device as the climate entity,
  // (3) weather.<climate_slug> fallback.
  private _getOutsideTempEntity(): string | null {
    if (this._config.outside_temp_entity) return this._config.outside_temp_entity;

    const reg = (this.hass as any).entities as
      | Record<string, { device_id?: string }>
      | undefined;

    if (reg) {
      const climateEntry = reg[this._config.entity];
      const deviceId = climateEntry?.device_id;
      if (deviceId) {
        for (const eid of Object.keys(reg)) {
          if (eid.startsWith("weather.")
              && reg[eid].device_id === deviceId
              && this.hass.states[eid]) {
            return eid;
          }
        }
      }
    }

    const slug = this._config.entity.split(".")[1];
    const fallback = `weather.${slug}`;
    if (this.hass.states[fallback]) return fallback;

    return null;
  }

  private _getOutsideTemp(): number | null {
    const eid = this._getOutsideTempEntity();
    if (!eid) return null;
    return this._readTempFromEntity(eid);
  }

  // CO2 / humidity sub-stat helpers — same auto-discovery pattern: explicit
  // config wins, else find a sensor with the matching device_class on the
  // same device as the climate entity.
  private _getCo2Entity(): string | null {
    if (this._config.co2_entity) return this._config.co2_entity;
    return this._findSensorByDeviceClass("carbon_dioxide");
  }

  private _getHumidityEntity(): string | null {
    if (this._config.humidity_entity) return this._config.humidity_entity;
    return this._findSensorByDeviceClass("humidity");
  }

  private _findSensorByDeviceClass(deviceClass: string): string | null {
    const reg = (this.hass as any).entities as
      | Record<string, { device_id?: string }>
      | undefined;
    if (!reg) return null;
    const climate = reg[this._config.entity];
    const deviceId = climate?.device_id;
    if (!deviceId) return null;

    for (const eid of Object.keys(reg)) {
      if (!eid.startsWith("sensor.")) continue;
      if (reg[eid].device_id !== deviceId) continue;
      const st = this.hass.states[eid];
      if (st?.attributes?.device_class === deviceClass) return eid;
    }
    return null;
  }

  private _renderSubStats(): TemplateResult | typeof nothing {
    const co2Entity = this._config.show_co2 === false ? null : this._getCo2Entity();
    const humEntity = this._config.show_humidity === false ? null : this._getHumidityEntity();

    const co2State = co2Entity ? this.hass.states[co2Entity] : null;
    const humState = humEntity ? this.hass.states[humEntity] : null;

    const co2Value = co2State ? parseFloat(co2State.state) : NaN;
    const humValue = humState ? parseFloat(humState.state) : NaN;

    const hasCo2 = !isNaN(co2Value);
    const hasHum = !isNaN(humValue);
    if (!hasCo2 && !hasHum) return nothing;

    const co2Threshold = this._config.co2_warning_threshold ?? 1000;
    const humThreshold = this._config.humidity_warning_threshold ?? 60;

    const co2Warn = hasCo2 && co2Value > co2Threshold;
    const humWarn = hasHum && humValue > humThreshold;

    const co2Unit = co2State?.attributes?.unit_of_measurement ?? "ppm";
    const humUnit = humState?.attributes?.unit_of_measurement ?? "%";

    return html`
      <div class="sub-stats">
        ${hasCo2 ? html`
          <span class="stat ${co2Warn ? "warn" : ""}">
            CO₂ ${this._round(co2Value)}<span class="stat-unit"> ${co2Unit}</span>
          </span>
        ` : nothing}
        ${hasHum ? html`
          <span class="stat ${humWarn ? "warn" : ""}">
            ${this._round(humValue)}<span class="stat-unit">${humUnit}</span> RH
          </span>
        ` : nothing}
      </div>
    `;
  }

  // Reads a temperature value from either a weather entity (attributes.temperature)
  // or any other entity (state).
  private _readTempFromEntity(entityId: string): number | null {
    const e = this.hass.states[entityId];
    if (!e) return null;

    if (entityId.startsWith("weather.")) {
      const t = e.attributes?.temperature;
      if (typeof t === "number") return t;
      if (typeof t === "string") {
        const n = parseFloat(t);
        return isNaN(n) ? null : n;
      }
      return null;
    }
    const n = parseFloat(e.state);
    return isNaN(n) ? null : n;
  }

  private _isActiveSensor(name: string, active: string[]): boolean {
    const n = name.toLowerCase();
    return active.some(a => {
      const al = a.toLowerCase();
      return al === n
          || n.startsWith(al + " ")  // "Second Bedroom Temp" matches active "Second Bedroom"
          || al.startsWith(n + " ");
    });
  }

  // ── Header ───────────────────────────────────────────────────────────
  private _renderHeader(stateObj: any): TemplateResult {
    const active = this._optimistic.hvac_mode?.value ?? stateObj.state;
    const label = MODE_LABELS[active] ?? active;
    return html`
      <div class="header">
        <span class="dot"></span>
        <span class="header-text">HVAC</span>
        <span class="header-sep">✦</span>
        <span class="header-mode">${label.toUpperCase()}</span>
      </div>
    `;
  }

  // ── Main row: current | +/- | outside+set panel ──────────────────────
  private _renderMainRow(stateObj: any): TemplateResult {
    const unit = this._unit();
    const current = stateObj.attributes.current_temperature;
    const activeHvac = this._optimistic.hvac_mode?.value ?? stateObj.state;
    const isOff = activeHvac === "off";
    const outsideValue = this._getOutsideTemp();

    // Single vs dual setpoint detection. Optimistic values override the entity.
    const attr = stateObj.attributes;
    const optTemp = this._optimistic.temperature?.value;
    const optLow  = this._optimistic.target_temp_low?.value;
    const optHigh = this._optimistic.target_temp_high?.value;

    const tempVal  = optTemp ?? attr.temperature;
    const lowVal   = optLow  ?? attr.target_temp_low;
    const highVal  = optHigh ?? attr.target_temp_high;
    const isDual   = tempVal == null && lowVal != null && highVal != null;

    return html`
      <div class="main-row">
        <div class="current-cell">
          <div class="micro-label">current</div>
          <div class="big-temp">
            ${current != null ? this._round(current) : "—"}<span class="big-unit">°${unit}</span>
          </div>
          ${this._renderSubStats()}
        </div>

        <div class="adjust-cell">
          <button
            class="round-btn"
            ?disabled=${isOff}
            @click=${() => this._adjustSetpoint(1)}
            aria-label="Increase setpoint"
          >+</button>
          <button
            class="round-btn"
            ?disabled=${isOff}
            @click=${() => this._adjustSetpoint(-1)}
            aria-label="Decrease setpoint"
          >−</button>
        </div>

        <div class="right-panel">
          <div class="right-cell">
            <div class="med-temp">
              ${outsideValue != null ? this._round(outsideValue) : "—"}°<span class="med-unit">${unit}</span>
            </div>
            <span class="corner-label">outside</span>
          </div>
          ${isDual
            ? this._renderDualSetCell(lowVal, highVal, unit)
            : this._renderSingleSetCell(tempVal, unit)}
        </div>
      </div>
    `;
  }

  private _renderSingleSetCell(value: number | null | undefined, unit: string): TemplateResult {
    return html`
      <div class="right-cell">
        <div class="med-temp set">
          ${value != null ? this._round(value) : "—"}°<span class="med-unit">${unit}</span>
        </div>
        <span class="corner-label">set</span>
      </div>
    `;
  }

  private _renderDualSetCell(low: number, high: number, unit: string): TemplateResult {
    return html`
      <div class="right-cell dual">
        <div class="dual-inline">
          <div class="dual-pair heat">
            <span class="dual-temp">${this._round(low)}°<span class="dual-unit">${unit}</span></span>
            <span class="dual-tag">heat</span>
          </div>
          <span class="dual-sep">/</span>
          <div class="dual-pair cool">
            <span class="dual-temp">${this._round(high)}°<span class="dual-unit">${unit}</span></span>
            <span class="dual-tag">cool</span>
          </div>
        </div>
        <span class="corner-label">set</span>
      </div>
    `;
  }

  // ── HVAC mode strip ──────────────────────────────────────────────────
  private _renderModeStrip(stateObj: any): TemplateResult {
    const supported: string[] = stateObj.attributes.hvac_modes ?? [];
    const filter = this._config.hvac_modes;
    const modes = filter
      ? supported.filter(m => filter.includes(m))
      : supported;
    const active = this._optimistic.hvac_mode?.value ?? stateObj.state;

    return html`
      <div class="mode-strip">
        ${modes.map((mode, i) => {
          const isActive = mode === active;
          const color = MODE_COLOR_VARS[mode] ?? MODE_COLOR_VARS.off;
          return html`
            <button
              class="mode-cell ${isActive ? "active" : ""}"
              style="--cell-color: ${color}; ${i > 0 ? "border-left: 1px solid var(--sct-border);" : ""}"
              @click=${() => this._setHvacMode(mode)}
            >
              ${(MODE_LABELS[mode] ?? mode).toUpperCase()}
            </button>
          `;
        })}
      </div>
    `;
  }

  // ── Control row: preset | divider | fan ──────────────────────────────
  private _renderControlRow(stateObj: any): TemplateResult {
    const showPreset = this._config.show_preset !== false;
    const showFan = this._config.show_fan !== false;
    if (!showPreset && !showFan) return html``;

    return html`
      <div class="control-row ${showPreset && showFan ? "split" : ""}">
        ${showPreset ? this._renderPreset(stateObj) : html`<div></div>`}
        ${showPreset && showFan ? html`<div class="v-divider"></div>` : nothing}
        ${showFan ? this._renderFan(stateObj) : html`<div></div>`}
      </div>
    `;
  }

  private _renderPreset(stateObj: any): TemplateResult {
    const presets: string[] = stateObj.attributes.preset_modes ?? [];
    const current: string | undefined =
      this._optimistic.preset_mode?.value ?? stateObj.attributes.preset_mode;
    const currentNorm = (current ?? "").toLowerCase();

    // "Custom" when nothing useful is active: missing, "none", or not one
    // of the named presets the integration exposes.
    const isNamedPreset = !!current
      && currentNorm !== "none"
      && presets.some(p => p.toLowerCase() === currentNorm);

    const currentLabel = isNamedPreset
      ? this._presetLabel(current!)
      : "Custom";

    if (presets.length === 0) {
      return html`
        <div class="control-cell">
          <div class="micro-label">preset</div>
          <div class="preset-empty">None available</div>
        </div>
      `;
    }

    return html`
      <div class="control-cell">
        <div class="micro-label">preset</div>
        <div class="preset-wrapper">
          <button
            class="preset-trigger ${isNamedPreset ? "" : "is-custom"}"
            @click=${() => this._togglePreset()}
            aria-expanded=${this._presetOpen}
          >
            <span>${currentLabel}</span>
            <ha-icon
              icon="mdi:chevron-down"
              class="chevron ${this._presetOpen ? "open" : ""}"
            ></ha-icon>
          </button>
          ${this._presetOpen ? html`
            <div class="preset-popup" @click=${(e: Event) => e.stopPropagation()}>
              ${presets.map((p, i) => html`
                <button
                  class="preset-option ${p.toLowerCase() === currentNorm ? "selected" : ""}"
                  style=${i < presets.length - 1 ? "border-bottom: 1px solid var(--sct-border);" : ""}
                  @click=${() => this._selectPreset(p)}
                >
                  ${this._presetLabel(p)}
                </button>
              `)}
            </div>
          ` : nothing}
        </div>
      </div>
    `;
  }

  private _renderFan(stateObj: any): TemplateResult {
    const supported: string[] = stateObj.attributes.fan_modes ?? [];
    const current = this._optimistic.fan_mode?.value ?? stateObj.attributes.fan_mode;
    let toShow = this._config.fan_modes ?? ["auto", "on"];
    toShow = toShow.filter(m => supported.includes(m));

    if (toShow.length === 0) {
      return html`
        <div class="control-cell">
          <div class="micro-label">fan</div>
          <div class="preset-empty">No fan</div>
        </div>
      `;
    }

    return html`
      <div class="control-cell">
        <div class="micro-label">fan</div>
        <div class="fan-buttons">
          ${toShow.map(mode => {
            const isActive = current === mode;
            const icon = FAN_ICONS[mode] ?? "fan";
            const label = (FAN_LABELS[mode] ?? mode).toUpperCase();
            return html`
              <button
                class="fan-btn ${isActive ? "active" : ""}"
                @click=${() => this._setFanMode(mode)}
                title="Fan ${mode}"
              >
                <ha-icon icon="mdi:${icon}"></ha-icon>
                <span>${label}</span>
              </button>
            `;
          })}
        </div>
      </div>
    `;
  }

  // ── Interactions / service calls ─────────────────────────────────────
  private _togglePreset(): void {
    this._presetOpen = !this._presetOpen;
    if (this._presetOpen) {
      // defer installing the listener so the click that opened the popup
      // doesn't immediately close it
      setTimeout(
        () => document.addEventListener("click", this._outsideClickHandler, true),
        0,
      );
    } else {
      document.removeEventListener("click", this._outsideClickHandler, true);
    }
  }

  private _selectPreset(preset: string): void {
    this._presetOpen = false;
    document.removeEventListener("click", this._outsideClickHandler, true);
    this._setPreset(preset);
  }

  private _adjustSetpoint(delta: number): void {
    const stateObj = this.hass.states[this._config.entity];
    const step = this._config.step ?? 1;
    const current = this._getSetpoint(stateObj);
    if (current == null) return;
    const next = +(current + delta * step).toFixed(1);
    const now = Date.now();

    const attr = stateObj.attributes;
    if (attr.target_temp_low != null && attr.target_temp_high != null
        && attr.temperature == null) {
      const newLow  = +((this._optimistic.target_temp_low?.value  ?? attr.target_temp_low)  + delta * step).toFixed(1);
      const newHigh = +((this._optimistic.target_temp_high?.value ?? attr.target_temp_high) + delta * step).toFixed(1);
      this._optimistic = {
        ...this._optimistic,
        target_temp_low:  { value: newLow,  setAt: now },
        target_temp_high: { value: newHigh, setAt: now },
      };
      this.hass.callService("climate", "set_temperature", {
        entity_id: this._config.entity,
        target_temp_low: newLow,
        target_temp_high: newHigh,
      });
    } else {
      this._optimistic = {
        ...this._optimistic,
        temperature: { value: next, setAt: now },
      };
      this.hass.callService("climate", "set_temperature", {
        entity_id:   this._config.entity,
        temperature: next,
      });
    }
  }

  private _setHvacMode(mode: string): void {
    this._optimistic = {
      ...this._optimistic,
      hvac_mode: { value: mode, setAt: Date.now() },
    };
    this.hass.callService("climate", "set_hvac_mode", {
      entity_id: this._config.entity,
      hvac_mode: mode,
    });
  }

  private _setPreset(preset: string): void {
    this._optimistic = {
      ...this._optimistic,
      preset_mode: { value: preset, setAt: Date.now() },
    };
    this.hass.callService("climate", "set_preset_mode", {
      entity_id:   this._config.entity,
      preset_mode: preset,
    });
  }

  private _setFanMode(mode: string): void {
    this._optimistic = {
      ...this._optimistic,
      fan_mode: { value: mode, setAt: Date.now() },
    };
    this.hass.callService("climate", "set_fan_mode", {
      entity_id: this._config.entity,
      fan_mode:  mode,
    });
  }

  // ── Helpers ──────────────────────────────────────────────────────────
  private _getSetpoint(stateObj: any): number | null {
    if (this._optimistic.temperature !== undefined)
      return this._optimistic.temperature.value;

    const a = stateObj.attributes;
    if (a.temperature != null) return a.temperature;

    const tl = this._optimistic.target_temp_low?.value  ?? a.target_temp_low;
    const th = this._optimistic.target_temp_high?.value ?? a.target_temp_high;
    if (tl != null && th != null) return (tl + th) / 2;
    return null;
  }

  private _unit(): string {
    return (this.hass.config.unit_system.temperature || "°F").replace("°", "");
  }

  private _round(v: number): number {
    return Math.round(v);
  }

  private _presetLabel(p: string): string {
    if (!p || p.toLowerCase() === "none") return "No Preset";
    return p.split("_").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  }

  // ── Styles ───────────────────────────────────────────────────────────
  static styles = css`
    :host {
      display: block;
      --sct-border:           rgba(127, 127, 127, 0.18);
      --sct-border-strong:    rgba(127, 127, 127, 0.28);
      --sct-subtle-bg:        rgba(127, 127, 127, 0.05);
      --sct-hover-bg:         rgba(127, 127, 127, 0.10);
      --sct-active-tint:      0.15;       /* alpha multiplier for tinted bg */
      --sct-radius:           20px;
      --sct-radius-inner:     14px;
      --sct-radius-small:     8px;
      --sct-text-primary:     var(--primary-text-color);
      --sct-text-secondary:   var(--secondary-text-color);
      --sct-mono:             ui-monospace, "SF Mono", "Roboto Mono", "JetBrains Mono",
                              Menlo, Consolas, monospace;
    }

    ha-card {
      border-radius: var(--sct-radius);
      overflow: visible;
      padding: 0;
    }

    .warning {
      color: var(--error-color);
      padding: 12px 16px;
      font-size: 0.85rem;
    }

    /* ── Header ─────────────────────────────────────────────────────── */
    .header {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 12px 20px 10px;
      border-bottom: 1px solid var(--sct-border);
    }
    .dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--sct-mode-color);
      box-shadow: 0 0 8px var(--sct-mode-color);
    }
    .header-text {
      color: var(--sct-text-primary);
      font-size: 12px;
      font-weight: 500;
      letter-spacing: 0.08em;
    }
    .header-sep {
      color: var(--sct-text-secondary);
      opacity: 0.5;
      font-size: 12px;
    }
    .header-mode {
      color: var(--sct-mode-color);
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.1em;
    }

    /* ── Main row ───────────────────────────────────────────────────── */
    .main-row {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      align-items: stretch;
      padding: 12px 16px;
      gap: 0;
    }
    .micro-label {
      color: var(--sct-text-secondary);
      font-size: 9px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      margin-bottom: 4px;
      font-weight: 500;
    }

    .current-cell {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .big-temp {
      color: var(--sct-text-primary);
      font-size: clamp(54px, 12vw, 72px);
      line-height: 1;
      letter-spacing: -0.02em;
      font-family: var(--sct-mono);
      font-weight: 300;
    }
    .big-unit {
      font-size: 0.38em;
      color: var(--sct-text-secondary);
      vertical-align: super;
      margin-left: 2px;
      font-family: inherit;
    }

    /* CO2 + humidity row under the current temperature */
    .sub-stats {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 6px;
      align-items: baseline;
    }
    .stat {
      font-size: 11px;
      color: var(--sct-text-secondary);
      font-family: var(--sct-mono);
      white-space: nowrap;
      line-height: 1.2;
    }
    .stat-unit {
      font-size: 0.78em;
      opacity: 0.7;
    }
    .stat.warn {
      color: var(--error-color, #f44336);
      font-weight: 600;
    }

    .adjust-cell {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 10px;
      padding: 0 14px;
    }
    .round-btn {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      border: 1px solid var(--sct-border-strong);
      background: var(--sct-subtle-bg);
      color: var(--sct-text-primary);
      font-size: 22px;
      line-height: 1;
      font-weight: 300;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 120ms, border-color 120ms, transform 80ms;
      padding: 0;
    }
    .round-btn:hover:not(:disabled) {
      background: var(--sct-hover-bg);
      border-color: var(--sct-mode-color);
    }
    .round-btn:active:not(:disabled) {
      transform: scale(0.94);
    }
    .round-btn:disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }

    .right-panel {
      display: flex;
      flex-direction: column;
      border: 1px solid var(--sct-border);
      border-radius: var(--sct-radius-inner);
      overflow: hidden;
      min-width: 100px;
      background: var(--sct-subtle-bg);
    }
    .right-cell {
      flex: 1;
      position: relative;
      display: flex;
      align-items: center;
      padding: 6px 12px 16px;
    }
    .right-cell + .right-cell {
      border-top: 1px solid var(--sct-border);
    }
    .med-temp {
      color: var(--sct-text-primary);
      font-size: 40px;
      line-height: 1;
      font-family: var(--sct-mono);
      font-weight: 400;
      letter-spacing: -0.01em;
    }
    .med-temp.set {
      color: var(--sct-mode-color);
    }
    .med-unit {
      font-size: 0.6em;
      color: var(--sct-text-secondary);
    }
    .med-temp.set .med-unit {
      color: var(--sct-mode-color);
      opacity: 0.7;
    }
    .corner-label {
      position: absolute;
      bottom: 5px;
      right: 12px;
      color: var(--sct-text-secondary);
      font-size: 8px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      font-weight: 500;
      white-space: nowrap;
    }

    /* dual setpoint — single line of numbers, labels aligned at bottom with SET */
    .right-cell.dual {
      flex-direction: column;
      align-items: stretch;
      justify-content: center;
      padding: 6px 12px 5px;
    }
    /* HEAT and COOL tags already communicate this is the setpoint; the SET
       corner label collides with them at narrow widths. Drop it in dual mode. */
    .right-cell.dual .corner-label {
      display: none;
    }
    .dual-inline {
      display: flex;
      align-items: flex-end;
      gap: 6px;
    }
    .dual-pair {
      display: flex;
      flex-direction: column;
      align-items: center;
      line-height: 1;
    }
    .dual-temp {
      font-size: 22px;
      font-family: var(--sct-mono);
      font-weight: 400;
      letter-spacing: -0.01em;
    }
    .dual-pair.heat .dual-temp { color: var(--sct-mode-heat, #f0883e); }
    .dual-pair.cool .dual-temp { color: var(--sct-mode-cool, #58a6ff); }
    .dual-unit {
      font-size: 0.55em;
      opacity: 0.75;
      margin-left: 1px;
    }
    .dual-sep {
      color: var(--sct-text-secondary);
      opacity: 0.5;
      font-size: 18px;
      padding-bottom: 14px;     /* lines up the slash with the bottom of the numbers, above the labels */
    }
    .dual-tag {
      font-size: 8px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--sct-text-secondary);
      font-weight: 500;
      margin-top: 2px;
    }

    /* ── HVAC mode strip ────────────────────────────────────────────── */
    .mode-strip {
      display: grid;
      grid-auto-flow: column;
      grid-auto-columns: 1fr;
      border-top: 1px solid var(--sct-border);
      border-bottom: 1px solid var(--sct-border);
    }
    .mode-cell {
      padding: 11px 4px;
      border: none;
      background: transparent;
      color: var(--sct-text-secondary);
      font-size: 10px;
      letter-spacing: 0.12em;
      font-weight: 500;
      cursor: pointer;
      transition: background 180ms, color 180ms;
    }
    .mode-cell:hover {
      color: var(--sct-text-primary);
      background: var(--sct-hover-bg);
    }
    .mode-cell.active {
      color: var(--cell-color);
      background: color-mix(in srgb, var(--cell-color) 15%, transparent);
      font-weight: 600;
    }

    /* ── Control row ────────────────────────────────────────────────── */
    .control-row {
      display: grid;
      grid-template-columns: 1fr;
    }
    .control-row.split {
      grid-template-columns: 1fr 1px 1fr;
    }
    .v-divider {
      background: var(--sct-border);
    }
    .control-cell {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 10px;
      padding: 10px 14px;
      position: relative;
      min-width: 0;        /* override grid's default min-width:auto so the column can shrink */
      overflow: visible;   /* don't clip the preset popup */
    }
    .control-cell .micro-label {
      margin-bottom: 0;
      flex-shrink: 0;
    }
    .preset-empty {
      color: var(--sct-text-secondary);
      font-size: 11px;
      padding: 6px 0;
    }

    /* preset */
    .preset-wrapper {
      position: relative;
      flex: 1;
      min-width: 0;
    }
    .preset-trigger {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      background: var(--sct-subtle-bg);
      border: 1px solid var(--sct-border);
      border-radius: var(--sct-radius-small);
      padding: 7px 10px;
      color: var(--sct-text-primary);
      font-size: 11px;
      cursor: pointer;
      font-family: inherit;
      font-weight: 400;
      letter-spacing: 0.02em;
    }
    .preset-trigger:hover {
      background: var(--sct-hover-bg);
    }
    .preset-trigger.is-custom > span {
      font-style: italic;
      color: var(--sct-text-secondary);
    }
    .chevron {
      --mdc-icon-size: 14px;
      color: var(--sct-text-secondary);
      transition: transform 200ms;
    }
    .chevron.open {
      transform: rotate(180deg);
    }
    .preset-popup {
      position: absolute;
      top: calc(100% + 4px);
      left: 0;
      right: 0;
      max-height: 200px;
      overflow-y: auto;
      background: var(--card-background-color, var(--ha-card-background, #ffffff));
      border: 1px solid var(--sct-border-strong);
      border-radius: var(--sct-radius-small);
      z-index: 1000;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
      animation: pop 140ms ease-out;
    }
    @keyframes pop {
      from { opacity: 0; transform: translateY(-4px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .preset-option {
      display: block;
      width: 100%;
      padding: 9px 12px;
      background: transparent;
      border: none;
      color: var(--sct-text-secondary);
      font-size: 11px;
      text-align: left;
      cursor: pointer;
      font-family: inherit;
      font-weight: 400;
      letter-spacing: 0.02em;
    }
    .preset-option:hover {
      background: var(--sct-hover-bg);
      color: var(--sct-text-primary);
    }
    .preset-option.selected {
      color: var(--sct-text-primary);
      background: var(--sct-hover-bg);
      font-weight: 500;
    }

    /* fan */
    .fan-buttons {
      display: flex;
      gap: 6px;
      flex: 1;
      flex-wrap: wrap;
      min-width: 0;
    }
    .fan-btn {
      flex: 1 1 auto;
      min-width: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      padding: 7px 6px;
      border-radius: var(--sct-radius-small);
      border: 1px solid var(--sct-border);
      background: var(--sct-subtle-bg);
      color: var(--sct-text-secondary);
      cursor: pointer;
      font-family: inherit;
      font-size: 10px;
      font-weight: 500;
      letter-spacing: 0.08em;
      transition: background 180ms, color 180ms, border-color 180ms;
    }
    .fan-btn:hover {
      background: var(--sct-hover-bg);
      color: var(--sct-text-primary);
    }
    .fan-btn.active {
      color: var(--sct-mode-color);
      border-color: color-mix(in srgb, var(--sct-mode-color) 50%, transparent);
      background: color-mix(in srgb, var(--sct-mode-color) 15%, transparent);
    }
    .fan-btn ha-icon {
      --mdc-icon-size: 14px;
    }

    /* ── Room sensors row ───────────────────────────────────────────── */
    .room-sensors {
      display: grid;
      border-top: 1px solid var(--sct-border);
    }
    .sensor-cell {
      padding: 8px 10px;
      border-right: 1px solid var(--sct-border);
      display: flex;
      flex-direction: column;
      gap: 2px;
      min-width: 0;
      background: transparent;
      transition: background 180ms;
    }
    .sensor-cell.active {
      background: var(--sct-hover-bg);
    }
    .sensor-temp {
      color: var(--sct-text-primary);
      font-size: 18px;
      line-height: 1;
      font-family: var(--sct-mono);
      font-weight: 400;
      letter-spacing: -0.01em;
    }
    .sensor-cell.active .sensor-temp {
      color: var(--sct-mode-color);
    }
    .sensor-unit {
      font-size: 1em;
      color: inherit;
      margin-left: 1px;
    }
    .sensor-hum {
      font-size: 1em;
      color: inherit;
      margin-left: 6px;
      font-weight: 400;
      letter-spacing: 0;
    }
    .sensor-hum.warn {
      color: var(--error-color, #f44336);
      font-weight: 600;
    }
    .sensor-stats {
      display: flex;
      flex-wrap: wrap;
      gap: 1px 7px;
      font-size: 9px;
      line-height: 1.3;
      color: var(--sct-text-secondary);
      font-family: var(--sct-mono);
      min-width: 0;
    }
    .sensor-stat {
      white-space: nowrap;
    }
    .sensor-stat.warn {
      color: var(--error-color, #f44336);
      font-weight: 600;
    }
    .sensor-name {
      color: var(--sct-text-secondary);
      font-size: 8px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .sensor-cell.occupied .sensor-name {
      color: var(--sct-text-primary);
      font-weight: 700;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "simple-compact-thermostat": SimpleCompactThermostatCard;
  }
}
