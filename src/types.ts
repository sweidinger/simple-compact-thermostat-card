import { LovelaceCardConfig } from "custom-card-helpers";

export interface SimpleCompactThermostatConfig extends LovelaceCardConfig {
  type: string;
  entity: string;                                  // Required: climate.* entity
  name?: string;                                   // Optional: card title
  outside_temp_entity?: string;                    // Optional: sensor.* for outside temp
  hvac_modes?: string[];                           // Optional: subset of HVAC modes
  fan_modes?: string[];                            // Optional: subset of fan modes
  show_preset?: boolean;                           // Optional: show preset dropdown
  show_fan?: boolean;                              // Optional: show fan controls
  step?: number;                                   // Optional: setpoint step (default 1)

  // Room-sensor row (auto-discovered from climate entity's available_sensors)
  show_sensor_data?: boolean;                      // Section visible (default true)
  room_sensor_columns?: number;                    // Grid columns (default 4)
  sensor_excludes?: string[];                      // Names to skip (default ["Thermostat"])
  sensor_aliases?: Record<string, string>;         // Rename a sensor in the card label
  sensor_occupancy?: Record<string, string>;       // Manual map: { "Sensor Name": "binary_sensor.x_occupancy" }
  sensor_humidity?: Record<string, string>;        // Manual map: { "Sensor Name": "sensor.x_humidity" } (auto-discovered if omitted)
  room_sensors?: ManualRoomSensor[];               // Manual sensor list — when set, replaces auto-discovery entirely
  additional_room_sensors?: ManualRoomSensor[];    // Sensors appended to whichever list (auto or room_sensors) is in effect

  // CO2 + humidity sub-stats under the current temperature
  co2_entity?: string;                             // Override auto-discovery (sensor.* with device_class=carbon_dioxide)
  humidity_entity?: string;                        // Override auto-discovery (sensor.* with device_class=humidity)
  show_co2?: boolean;                              // Default true if a CO2 sensor is found
  show_humidity?: boolean;                         // Default true if a humidity sensor is found
  co2_warning_threshold?: number;                  // ppm above which CO2 is shown in red (default 1000)
  humidity_warning_threshold?: number;             // % above which humidity is shown in red (default 60)

  // Extra status badges rendered in the header next to "HVAC ✦ MODE"
  header_badges?: HeaderBadge[];
  // Default true. Set false to hide the built-in "HVAC ✦ MODE" status so the
  // header shows only header_badges (e.g. when the card drives a flow-
  // temperature controller and the HVAC mode duplicates a badge).
  show_hvac_status?: boolean;
  // Show a sensor's value as the big "current" temperature instead of the
  // climate entity's current_temperature (e.g. a min_max mean of all rooms).
  current_temp_entity?: string;
  // Default true. false hides the +/- setpoint buttons (read-only setpoint).
  show_setpoint_controls?: boolean;
  // Default true. false hides the SET cell in the right panel.
  show_setpoint?: boolean;
  // Humidity sensor shown as an extra cell under the outside temperature.
  outside_humidity_entity?: string;
  // Override the label of any HVAC mode in the header and the mode strip,
  // e.g. { heat: "Winterbetrieb", off: "Sommerbetrieb" }.
  mode_labels?: Record<string, string>;
}

// Appearance overrides for one state of a header badge.
export interface HeaderBadgeState {
  icon?: string;                 // mdi:… icon shown while the entity has this state
  color?: string;                // CSS color or HA color name (e.g. "yellow", "light-blue")
  label?: string;                // Text shown instead of the (formatted) state
}

// A status badge in the header row, e.g. a summer/winter mode sensor.
export interface HeaderBadge {
  entity: string;                // Any entity; its state is shown
  name?: string;                 // Optional prefix label (e.g. "Modus")
  icon?: string;                 // Default icon (falls back to the entity's icon)
  color?: string;                // Default color
  states?: Record<string, HeaderBadgeState>; // Per-state overrides, keyed by raw state
  tap_action?: "more-info" | "none"; // Default "more-info"
}

// A single extra per-room measurement (PM2.5, CO2, VOC, mold %, …).
// Rendered as a small stat under the room temperature, or — via
// tooltip_sensors — only in the cell's hover tooltip.
export interface RoomStat {
  entity: string;                // sensor.* providing the value
  label?: string;                // Short label shown before the value (e.g. "PM2,5")
  unit?: string;                 // Override the sensor's unit ("" hides it)
  warn_above?: number;           // Render red when numeric value exceeds this
  warn_below?: number;           // Render red when numeric value falls below this
}

// Manual room-sensor entry in YAML — lets users use any temperature sensor,
// not just ones the climate integration exposes in available_sensors.
// A small status icon in a room cell (window open, light on, …). Shown while
// the entity is in one of `states` (default: on/open/playing/home), hidden
// otherwise — unless `always` is set, which keeps a dimmed icon when inactive.
export interface RoomIndicator {
  entity: string;                // binary_sensor.*, light.*, switch.*, cover.*, …
  icon?: string;                 // mdi:… shown while active (default: entity icon)
  icon_off?: string;             // mdi:… shown while inactive (only with always: true)
  color?: string;                // CSS color or HA color name while active (default: amber)
  states?: string[];             // States counted as active (default on/open/playing/home)
  always?: boolean;              // Keep the icon visible (dimmed) while inactive
  label?: string;                // Tooltip text (default: entity friendly name)
}

export interface ManualRoomSensor {
  name: string;                  // Display label + matched against active_sensors for highlighting
  entity: string;                // sensor.* providing temperature
  occupancy_entity?: string;     // binary_sensor.* for occupancy (optional)
  humidity_entity?: string;      // sensor.* for relative humidity, shown next to the temp (optional)
  stats?: RoomStat[];            // Extra measurements rendered in the cell (optional)
  tooltip_sensors?: RoomStat[];  // Measurements shown only in the hover tooltip (optional)
  indicators?: RoomIndicator[];  // Status icons (window, light, …) in the cell corner (optional)
  short?: string;                // Shorter label for the cell (optional)
}

// Internal type used by the renderer after discovery.
export interface DiscoveredSensor {
  name: string;
  entity: string;
  occupancyEntity?: string;
  humidityEntity?: string;
  stats?: RoomStat[];
  tooltipSensors?: RoomStat[];
  indicators?: RoomIndicator[];
  short?: string;
}
