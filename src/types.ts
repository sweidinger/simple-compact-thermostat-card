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
}

// Internal type used by the renderer after discovery.
export interface DiscoveredSensor {
  name: string;
  entity: string;
  short?: string;
}
