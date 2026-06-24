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
  room_sensors?: ManualRoomSensor[];               // Manual sensor list — when set, replaces auto-discovery entirely
  additional_room_sensors?: ManualRoomSensor[];    // Sensors appended to whichever list (auto or room_sensors) is in effect

  // CO2 + humidity sub-stats under the current temperature
  co2_entity?: string;                             // Override auto-discovery (sensor.* with device_class=carbon_dioxide)
  humidity_entity?: string;                        // Override auto-discovery (sensor.* with device_class=humidity)
  show_co2?: boolean;                              // Default true if a CO2 sensor is found
  show_humidity?: boolean;                         // Default true if a humidity sensor is found
  co2_warning_threshold?: number;                  // ppm above which CO2 is shown in red (default 1000)
  humidity_warning_threshold?: number;             // % above which humidity is shown in red (default 60)
}

// Manual room-sensor entry in YAML — lets users use any temperature sensor,
// not just ones the climate integration exposes in available_sensors.
export interface ManualRoomSensor {
  name: string;                  // Display label + matched against active_sensors for highlighting
  entity: string;                // sensor.* providing temperature
  occupancy_entity?: string;     // binary_sensor.* for occupancy (optional)
  short?: string;                // Shorter label for the cell (optional)
}

// Internal type used by the renderer after discovery.
export interface DiscoveredSensor {
  name: string;
  entity: string;
  occupancyEntity?: string;
  short?: string;
}
