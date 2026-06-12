export const CARD_VERSION = "0.2.0";
export const CARD_NAME    = "simple-compact-thermostat";

// Default mode colors — all routed through CSS variables so themes and
// card-mod can override anything. Defaults pick the GitHub-style palette
// used in the v0.2 mockup (warmer heat orange, cool azure, vivid auto green).
export const MODE_COLOR_VARS: Record<string, string> = {
  cool:      "var(--sct-mode-cool, #58a6ff)",      // azure
  heat:      "var(--sct-mode-heat, #f0883e)",      // orange
  auto:      "var(--sct-mode-auto, #3fb950)",      // green
  heat_cool: "var(--sct-mode-heat-cool, #d2a8ff)", // lavender
  fan_only:  "var(--sct-mode-fan, #79c0ff)",       // light blue
  dry:       "var(--sct-mode-dry, #d29922)",       // amber
  off:       "var(--sct-mode-off, #8b949e)",       // grey
};

// User-friendly labels for HVAC modes (rendered uppercase in the strip).
export const MODE_LABELS: Record<string, string> = {
  cool:      "Cooling",
  heat:      "Heat",
  auto:      "Auto",
  heat_cool: "Auto",
  fan_only:  "Fan",
  dry:       "Dry",
  off:       "Off",
};

// MDI icon for each fan mode (renders inside the fan button next to the label).
export const FAN_ICONS: Record<string, string> = {
  auto:    "fan-auto",
  on:      "fan",
  low:     "fan-speed-1",
  medium:  "fan-speed-2",
  high:    "fan-speed-3",
  diffuse: "weather-windy",
  focus:   "target",
};

// Display label for each fan mode.
export const FAN_LABELS: Record<string, string> = {
  auto:    "Auto",
  on:      "On",
  low:     "Low",
  medium:  "Med",
  high:    "High",
  diffuse: "Diffuse",
  focus:   "Focus",
};
