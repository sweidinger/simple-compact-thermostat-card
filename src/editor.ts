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

@customElement(EDITOR_NAME)
export class SimpleCompactThermostatEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: SimpleCompactThermostatConfig;

  public setConfig(config: SimpleCompactThermostatConfig): void {
    this._config = config;
  }

  protected render(): TemplateResult {
    if (!this.hass || !this._config) return html``;

    // Show effective values: user's config wins, defaults fill the gaps.
    // This way the form prepopulates with the runtime state (e.g. show_preset
    // toggle reads ON when the YAML doesn't set it, matching how the card
    // actually behaves) instead of showing toggles as unchecked / numbers blank.
    const displayData = { ...DEFAULTS, ...this._config };

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${displayData}
        .schema=${SCHEMA}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>

      <div class="hint">
        <strong>Advanced options</strong> — <code>room_sensors</code>,
        <code>sensor_aliases</code>, <code>sensor_occupancy</code>,
        <code>sensor_excludes</code>, <code>hvac_modes</code>, <code>fan_modes</code>
        — switch to <em>Show Code Editor</em> to edit them.
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
    .hint {
      margin-top: 16px;
      padding: 10px 12px;
      font-size: 12px;
      line-height: 1.5;
      color: var(--secondary-text-color);
      background: var(--secondary-background-color);
      border-radius: 8px;
      border: 1px solid var(--divider-color);
    }
    .hint code {
      font-family: var(--code-font-family, ui-monospace, "Roboto Mono", monospace);
      font-size: 11px;
      padding: 1px 5px;
      background: var(--card-background-color);
      color: var(--primary-text-color);
      border-radius: 4px;
    }
    .hint strong {
      color: var(--primary-text-color);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "simple-compact-thermostat-editor": SimpleCompactThermostatEditor;
  }
}
