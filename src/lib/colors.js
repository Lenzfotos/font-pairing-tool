// Color engine (Phase 2).
//
// Each pairing seeds ONE accent color + a declared harmony. From that single
// seed we generate a full, coherent palette: a tinted near-white background, a
// near-black ink, the accent, a soft accent wash, and a harmony partner color
// (rotated in OKLCH so the hue step is perceptually even, not naive HSL).
//
// We also emit a light->dark ramp of the accent for swatch display.
//
// Forward-compatible with the data: pairing.palettes[0] = { harmony, colors }.
// We use colors[1] (the curated accent) as the seed and let the rest be derived,
// so designers can still hand-tune the anchor while the engine does the spread.

import chroma from "chroma-js";
import { converter, formatHex } from "culori";

const toOklch = converter("oklch");

// Hue offsets (degrees) that define each harmony's partner color.
const HARMONY_ROTATION = {
  complementary: 180,
  analogous: 30,
  triadic: 120,
  monochromatic: 0, // partner differs by lightness/chroma only
};

function rotateHue(hex, degrees) {
  const c = toOklch(hex);
  if (!c) return hex;
  // Monochromatic: keep hue, drop lightness for a darker sibling instead.
  if (degrees === 0) {
    return formatHex({ ...c, l: Math.max(0, c.l - 0.18) });
  }
  const h = ((c.h ?? 0) + degrees) % 360;
  return formatHex({ ...c, h });
}

// Build a near-neutral by pulling the accent's hue but crushing chroma and
// pinning lightness — gives backgrounds/ink a subtle temperature match.
function neutral(hex, lightness, chromaScale) {
  const c = toOklch(hex);
  if (!c) return hex;
  return formatHex({
    mode: "oklch",
    l: lightness,
    c: (c.c ?? 0) * chromaScale,
    h: c.h ?? 0,
  });
}

export function generatePalette(seedPalette) {
  const harmony = seedPalette?.harmony || "complementary";
  // Seed = curated accent (index 1) when present, else first color, else a default.
  const seed =
    seedPalette?.colors?.[1] || seedPalette?.colors?.[0] || "#3b5bdb";

  const accent = chroma(seed).hex();
  const partner = rotateHue(accent, HARMONY_ROTATION[harmony] ?? 180);

  const bg = neutral(accent, 0.985, 0.25); // tinted near-white
  const surface = neutral(accent, 0.96, 0.3); // slightly deeper card
  const ink = neutral(accent, 0.22, 0.35); // tinted near-black text
  const inkSoft = neutral(accent, 0.45, 0.3); // muted body text

  // Soft accent wash for chips/badges: mix the accent way back toward bg.
  const accentSoft = chroma.mix(accent, bg, 0.82, "oklch").hex();

  // A perceptual light->dark ramp of the accent (for swatch strips).
  const ramp = chroma
    .scale([neutral(accent, 0.93, 0.6), accent, neutral(accent, 0.28, 1)])
    .mode("oklch")
    .colors(5);

  return {
    harmony,
    roles: { bg, surface, ink, inkSoft, accent, accentSoft, partner },
    // Ordered for display: the meaningful colors a user would actually copy.
    swatches: [
      { role: "Background", hex: bg },
      { role: "Ink", hex: ink },
      { role: "Accent", hex: accent },
      { role: harmony === "monochromatic" ? "Accent dark" : "Harmony", hex: partner },
    ],
    ramp,
  };
}

// Relative-luminance contrast ratio (WCAG formula) — used only to pick a
// readable foreground for swatch labels, NOT for accessibility auditing
// (that's still out of scope). Returns "#fff" or "#111".
export function readableOn(hex) {
  return chroma(hex).luminance() > 0.45 ? "#111111" : "#ffffff";
}
