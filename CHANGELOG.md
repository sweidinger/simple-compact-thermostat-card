# Changelog

All notable changes to **Simple Compact Thermostat** are documented here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses [Semantic Versioning](https://semver.org/).

## [0.3.2] — 2026-06-17

### Fixed
- "SET" corner label was colliding with the HEAT/COOL tags in dual setpoint mode at narrow widths, making the SET text look squashed or missing. Hidden in dual mode — the HEAT/COOL tags already make it clear the values are the setpoint. Resolves [#4](https://github.com/priyam13coding/simple-compact-thermostat-card/issues/4).

## [0.3.1] — 2026-06-16

### Added
- `room_sensors` YAML option for manual sensor specification. When set, it takes priority over auto-discovery and lets you pull in any temperature sensor — Ecobee, Aqara/Zigbee, ESPHome, generic — with an optional `occupancy_entity` to pair each room with its motion/presence sensor for the bold-when-occupied highlighting.
  ```yaml
  room_sensors:
    - name: Living Room
      entity: sensor.living_room_temperature
      occupancy_entity: binary_sensor.living_room_motion
    - name: Bedroom
      entity: sensor.aqara_bedroom_temperature
      short: Bedroom
  ```
  Resolves the case where a climate integration doesn't expose `available_sensors` (e.g. Ecobee 3 Lite, most non-Ecobee thermostats).

## [0.3.0] — 2026-06-15

### Added
- **Occupancy detection.** Auto-discovers the `binary_sensor` with `device_class: occupancy` matched to each room sensor; bolds the room name when occupied. New `sensor_occupancy` YAML option for manual mapping.
- **CO₂ and humidity sub-stats.** Auto-discovered from sensors with `device_class: carbon_dioxide` and `device_class: humidity` on the same device as the climate entity. Rendered below the current temperature; values turn red when above configurable thresholds (`co2_warning_threshold` default 1000 ppm, `humidity_warning_threshold` default 60%).

### Fixed
- Fan buttons could overflow the FAN cell when the label + two buttons didn't fit. Grid items now have `min-width: 0` and the buttons wrap to a second row if needed.

## [0.2.0] — 2026-06-12

### Added
- Three-row compact layout: status header, main display panel with `+`/`−` setpoint chips, HVAC mode strip, and a control row with preset dropdown + fan buttons.
- Auto-discovery of outside temperature from a `weather.*` entity on the same device as the climate entity (falls back to `weather.<climate_slug>`).
- Auto-discovery of room temperature sensors from the climate entity's `available_sensors` attribute. Sensors that appear in `active_sensors` are tinted to show they're contributing to the thermostat's reading.
- Dual-setpoint display for Auto / `heat_cool` mode — heat and cool values shown side-by-side with color-coded labels.
- Optimistic UI — every interaction (HVAC mode, fan, preset, setpoint) updates the card instantly without waiting for the next integration poll. Reverts if the change isn't confirmed within 5 minutes.
- "Custom" preset label when the active state doesn't match a named preset (e.g. after a manual setpoint adjustment).
- Click-outside-to-close behavior for the preset dropdown.

### Configuration
- `entity` (required) — the `climate.*` entity.
- `name`, `outside_temp_entity`, `hvac_modes`, `fan_modes`, `show_preset`, `show_fan`, `step`.
- `show_sensor_data`, `room_sensor_columns`, `sensor_excludes`, `sensor_aliases` for the room-sensor row.

### Theming
- All colors flow through CSS variables (`--sct-mode-cool`, `--sct-mode-heat`, etc.) so themes and `card-mod` can override anything without touching source.
- Uses Home Assistant's theme tokens (`--primary-text-color`, `--card-background-color`, …) so light/dark mode adapt automatically.

### Known limitations
- Heat and cool setpoints in dual mode move together with `+`/`−`. Independent control is planned for a future release.
- The card relies on the climate entity's `available_sensors` attribute for the room-sensor row. Integrations that don't expose this won't show the row.

[0.3.2]: https://github.com/priyam13coding/simple-compact-thermostat-card/releases/tag/v0.3.2
[0.3.1]: https://github.com/priyam13coding/simple-compact-thermostat-card/releases/tag/v0.3.1
[0.3.0]: https://github.com/priyam13coding/simple-compact-thermostat-card/releases/tag/v0.3.0
[0.2.0]: https://github.com/priyam13coding/simple-compact-thermostat-card/releases/tag/v0.2.0
