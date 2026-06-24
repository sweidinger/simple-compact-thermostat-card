import { LitElement, html, css, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HomeAssistant } from "custom-card-helpers";
import { CARD_NAME } from "./const";
import { SimpleCompactThermostatConfig } from "./types";

export const EDITOR_NAME = `${CARD_NAME}-editor`;

// Field labels shown next to the form inputs. Anything not in this map uses
// the raw config key as a fallback.
const LABELS: Record<string, string> = {
  entity:                       "Thermostat entity",
  name:                         "Card title",
  outside_temp_entity:          "Outside temperature entity",
  step:                         "Setpoint step",
  room_sensor_columns:          "Room sensor columns",
  show_preset:                  "Show preset dropdown",
  show_fan:                     "Show fan buttons",
  show_sensor_data:             "Show room sensors",
  show_co2:                     "Show CO₂",
  show_humidity:                "Show humidity",
  co2_entity:                   "CO₂ sensor",
  humidity_entity:              "Humidity sensor",
  co2_warning_threshold:        "CO₂ warning threshold (ppm)",
  humidity_warning_threshold:   "Humidity warning threshold (%)",
};

const SCHEMA = [
  {
    name: "entity",
    required: true,
    selector: { entity: { domain: "climate" } },
  },
  {
    name: "name",
    selector: { text: {} },
  },
  {
    name: "outside_temp_entity",
    selector: { entity: { domain: ["sensor", "weather"] } },
  },
  {
    type: "grid",
    name: "",
    schema: [
      { name: "step",                selector: { number: { min: 0.1, max: 5, step: 0.1, mode: "box" } } },
      { name: "room_sensor_columns", selector: { number: { min: 1,   max: 6, step: 1,   mode: "box" } } },
    ],
  },
  {
    type: "grid",
    name: "",
    schema: [
      { name: "show_preset",      selector: { boolean: {} } },
      { name: "show_fan",         selector: { boolean: {} } },
      { name: "show_sensor_data", selector: { boolean: {} } },
    ],
  },
  {
    type: "expandable",
    name: "",
    title: "Air quality (CO₂ and humidity)",
    icon: "mdi:air-filter",
    schema: [
      { name: "co2_entity",      selector: { entity: { domain: "sensor" } } },
      { name: "humidity_entity", selector: { entity: { domain: "sensor" } } },
      {
        type: "grid",
        name: "",
        schema: [
          { name: "show_co2",       selector: { boolean: {} } },
          { name: "show_humidity",  selector: { boolean: {} } },
        ],
      },
      {
        type: "grid",
        name: "",
        schema: [
          { name: "co2_warning_threshold",      selector: { number: { min: 400, max: 5000, step: 100, mode: "box" } } },
          { name: "humidity_warning_threshold", selector: { number: { min: 30,  max: 90,   step: 5,   mode: "box" } } },
        ],
      },
    ],
  },
];

// Runtime defaults — must match the values used in the card's setConfig and
// renderers. The editor fills these in when displaying an existing config so
// every toggle/number reflects what the card is actually using, then strips
// them back out before saving so the YAML stays minimal.
const DEFAULTS: Record<string, unknown> = {
  show_preset:                  true,
  show_fan:                     true,
  show_sensor_data:             true,
  show_co2:                     true,
  show_humidity:                true,
  step:                         1,
  room_sensor_columns:          4,
  co2_warning_threshold:        1000,
  humidity_warning_threshold:   60,
};

// Config keys we don't expose in the simple form — they're objects/arrays.
// Surfaced via an embedded ha-yaml-editor so the user doesn't have to switch
// to the full "Show Code Editor" view just for these.
const ADVANCED_KEYS = [
  "room_sensors",
  "additional_room_sensors",
  "sensor_aliases",
  "sensor_occupancy",
  "sensor_excludes",
  "hvac_modes",
  "fan_modes",
] as const;

@customElement(EDITOR_NAME)
export class SimpleCompactThermostatEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: SimpleCompactThermostatConfig;

  public setConfig(config: SimpleCompactThermostatConfig): void {
    this._config = config;
  }

  // Replicate the card's runtime auto-discovery for outside temp, CO₂ and
  // humidity so the editor can prepopulate those entity pickers with whatever
  // the card is actually using right now. Same matching rules: weather.* and
  // device-class sensors on the climate entity's device.
  private _autoDiscovered(): Record<string, string> {
    const out: Record<string, string> = {};
    if (!this.hass || !this._config?.entity) return out;
    const climateId = this._config.entity;

    const reg = (this.hass as any).entities as
      | Record<string, { device_id?: string }>
      | undefined;

    if (reg) {
      const deviceId = reg[climateId]?.device_id;
      if (deviceId) {
        for (const eid of Object.keys(reg)) {
          if (reg[eid].device_id !== deviceId) continue;
          const st = this.hass.states[eid];
          if (!st) continue;

          if (!out.outside_temp_entity && eid.startsWith("weather.")) {
            out.outside_temp_entity = eid;
          }
          if (!out.co2_entity
              && eid.startsWith("sensor.")
              && st.attributes.device_class === "carbon_dioxide") {
            out.co2_entity = eid;
          }
          if (!out.humidity_entity
              && eid.startsWith("sensor.")
              && st.attributes.device_class === "humidity") {
            out.humidity_entity = eid;
          }
        }
      }
    }

    // Fallback for outside temp: weather.<climate-slug>
    if (!out.outside_temp_entity) {
      const slug = climateId.split(".")[1];
      const fallback = `weather.${slug}`;
      if (this.hass.states[fallback]) {
        out.outside_temp_entity = fallback;
      }
    }

    return out;
  }

  // Subset of config containing only the advanced fields, used as the initial
  // value of the embedded ha-yaml-editor.
  private _advancedConfig(): Record<string, unknown> {
    const adv: Record<string, unknown> = {};
    if (!this._config) return adv;
    for (const k of ADVANCED_KEYS) {
      if ((this._config as any)[k] !== undefined) {
        adv[k] = (this._config as any)[k];
      }
    }
    return adv;
  }

  protected render(): TemplateResult {
    if (!this.hass || !this._config) return html``;

    // Display data: user config wins over auto-discovery wins over defaults.
    const auto = this._autoDiscovered();
    const displayData = { ...DEFAULTS, ...auto, ...this._config };

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${displayData}
        .schema=${SCHEMA}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>

      <div class="advanced">
        <div class="advanced-title">Advanced YAML</div>
        <div class="advanced-desc">
          <code>room_sensors</code>, <code>additional_room_sensors</code>,
          <code>sensor_aliases</code>, <code>sensor_occupancy</code>,
          <code>sensor_excludes</code>, <code>hvac_modes</code>, <code>fan_modes</code>
        </div>
        <ha-yaml-editor
          .defaultValue=${this._advancedConfig()}
          @value-changed=${this._advancedChanged}
        ></ha-yaml-editor>
      </div>
    `;
  }

  private _computeLabel = (schema: { name: string }): string => {
    return LABELS[schema.name] ?? schema.name;
  };

  private _valueChanged = (e: CustomEvent): void => {
    const merged: any = { ...this._config, ...e.detail.value };

    // Strip empty optional strings so the resulting YAML stays clean.
    for (const key of Object.keys(merged)) {
      if (merged[key] === "" || merged[key] === undefined) {
        delete merged[key];
      }
    }

    // Strip values that match runtime defaults so a card whose options match
    // the defaults doesn't accumulate redundant YAML keys after editing.
    for (const [k, defaultVal] of Object.entries(DEFAULTS)) {
      if (merged[k] === defaultVal) {
        delete merged[k];
      }
    }

    // Strip values that match what auto-discovery would have found anyway,
    // so user can replace the thermostat later without YAML breaking.
    for (const [k, autoVal] of Object.entries(this._autoDiscovered())) {
      if (merged[k] === autoVal) {
        delete merged[k];
      }
    }

    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail:   { config: merged },
        bubbles:  true,
        composed: true,
      }),
    );
  };

  private _advancedChanged = (e: CustomEvent): void => {
    if (e.detail.isValid === false) return;   // wait until the YAML parses
    const adv = (e.detail.value ?? {}) as Record<string, unknown>;

    const merged: any = { ...this._config };
    // Remove existing advanced keys, then add whatever's in the YAML now.
    for (const k of ADVANCED_KEYS) {
      delete merged[k];
    }
    Object.assign(merged, adv);

    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail:   { config: merged },
        bubbles:  true,
        composed: true,
      }),
    );
  };

  static styles = css`
    :host {
      display: block;
    }
    .advanced {
      margin-top: 18px;
      padding: 12px;
      background: var(--secondary-background-color);
      border: 1px solid var(--divider-color);
      border-radius: 8px;
    }
    .advanced-title {
      font-size: 14px;
      font-weight: 500;
      color: var(--primary-text-color);
      margin-bottom: 4px;
    }
    .advanced-desc {
      font-size: 11px;
      color: var(--secondary-text-color);
      line-height: 1.6;
      margin-bottom: 10px;
    }
    .advanced-desc code {
      font-family: var(--code-font-family, ui-monospace, "Roboto Mono", monospace);
      font-size: 11px;
      padding: 1px 5px;
      background: var(--card-background-color);
      color: var(--primary-text-color);
      border-radius: 4px;
    }
    ha-yaml-editor {
      display: block;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "simple-compact-thermostat-editor": SimpleCompactThermostatEditor;
  }
}
