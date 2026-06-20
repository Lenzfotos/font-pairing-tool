// Builds a Google Fonts CSS2 URL for a set of {family, weights} specs.
// Shared by the live-preview hook (injects it as a <link>) and the export panel
// (emits it as an @import), so the preview and the exported code never diverge.
//
// display=swap means text renders immediately in a fallback and swaps to the
// web font once loaded — no invisible-text flash.

export function buildFontHref(families) {
  const params = families
    .filter((f) => f && f.family)
    .map((f) => {
      const name = f.family.trim().replace(/\s+/g, "+");
      const weights = (f.weights && f.weights.length ? f.weights : [400])
        .slice()
        .sort((a, b) => a - b)
        .join(";");
      // ital,wght axis form keeps us forward-compatible if we add italics later.
      return `family=${name}:wght@${weights}`;
    });

  if (params.length === 0) return null;
  return `https://fonts.googleapis.com/css2?${params.join("&")}&display=swap`;
}

import { fallbackStack } from "./substitutes.js";

const GENERIC = new Set(["serif", "sans-serif", "monospace", "cursive", "system-ui"]);

// Quote a font name for use in a font-family value: generic families stay bare,
// multi-word names get quotes.
function quote(name) {
  if (GENERIC.has(name)) return name;
  return /\s/.test(name) ? `"${name}"` : name;
}

// Full CSS font-family value: the font itself followed by its web-safe
// near-match fallback chain, so text degrades gracefully if the font fails to
// load. Used by both the live preview and the exported CSS.
export function cssFamily(spec) {
  const chain = fallbackStack(spec).map(quote).join(", ");
  return `"${spec.family}", ${chain}`;
}
