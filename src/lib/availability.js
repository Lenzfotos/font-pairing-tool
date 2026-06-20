// Platform availability resolver.
//
// A pairing is usable on a platform only when BOTH its fonts are available
// there, so pairing availability is the per-font AND. Each platform also carries
// a basis:
//   • "verified"  — Google (live-checked) and Figma (serves the Google library)
//   • "estimated" — Adobe and Canva (curated best-effort, see fontAvailability)
// If either font's signal for a platform is estimated, the pairing's is too.

import { FONT_PLATFORMS } from "../data/fontAvailability.js";

export const PLATFORMS = [
  { key: "google", label: "Google Fonts", basis: "verified" },
  { key: "figma", label: "Figma", basis: "verified" },
  { key: "canva", label: "Canva", basis: "estimated" },
  { key: "adobe", label: "Adobe", basis: "estimated" },
];

// Is a single font available on a platform? Google + Figma are universally true
// for this dataset; Adobe + Canva come from the estimated per-font map.
function fontHas(spec, key) {
  if (key === "google" || key === "figma") return true;
  return Boolean(FONT_PLATFORMS[spec.family]?.[key]);
}

// Per-platform availability for a pairing: [{ key, label, present, basis }].
export function pairingAvailability(pairing) {
  return PLATFORMS.map((p) => ({
    key: p.key,
    label: p.label,
    basis: p.basis,
    present: fontHas(pairing.heading, p.key) && fontHas(pairing.body, p.key),
  }));
}

// Just the platform keys a pairing is available on (drives the filter).
export function availablePlatformKeys(pairing) {
  return pairingAvailability(pairing)
    .filter((p) => p.present)
    .map((p) => p.key);
}
