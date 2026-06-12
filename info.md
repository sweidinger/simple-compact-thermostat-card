# Simple Compact Thermostat

A compact, three-row thermostat card with everything you need at a glance:

- Inside / outside / setpoint with inline `−` / `+` controls
- Color-coded HVAC mode strip (blue cool, orange heat, green auto, grey off)
- Preset dropdown + dedicated fan buttons
- Auto-discovers your outside-temp weather entity and Ecobee-style room sensors
- Dual-setpoint display in Auto / heat_cool mode (heat and cool inline)
- Optimistic UI — taps flip the card instantly, no waiting on the next poll
- Theme-aware (`--primary-text-color`, `--card-background-color`, …) and fully `card-mod` compatible

## Minimal example

```yaml
type: custom:simple-compact-thermostat
entity: climate.thermostat
```

See the [README](https://github.com/priyam13coding/simple-compact-thermostat-card) for the full configuration, theming, and FAQ.
