# Changelog

All notable changes to **Simple Compact Thermostat** are documented here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses [Semantic Versioning](https://semver.org/).

## [0.2.0] — Unreleased

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
