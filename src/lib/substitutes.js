// Near-match font substitution.
//
// Two distinct outputs per font, kept separate on purpose:
//   • a web-safe FALLBACK STACK — system fonts that actually ship on
//     macOS/Windows, used to build real CSS font-family chains so a pairing
//     degrades gracefully where the Google font isn't loaded.
//   • NEAR MATCHES — named alternatives (system + foundry faces) a designer
//     would reach for on a platform that lacks the exact font. Display only.
//
// Fonts are grouped by visual class; the class drives the web-safe stack, while
// `near` is curated per family.

// Visual class -> ordered web-safe fallback chain (ends in a generic family).
const STACKS = {
  didone: ["Didot", "Bodoni MT", "Georgia", "serif"],
  "old-style": ["Georgia", "Cambria", "Times New Roman", "serif"],
  transitional: ["Baskerville", "Georgia", "Times New Roman", "serif"],
  slab: ["Rockwell", "Courier New", "Georgia", "serif"],
  "geometric-sans": ["Futura", "Century Gothic", "Avenir", "Helvetica Neue", "Arial", "sans-serif"],
  "humanist-sans": ["Segoe UI", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
  "grotesque-sans": ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
  "condensed-sans": ["Impact", "Haettenschweiler", "Arial Narrow", "sans-serif"],
};

// Per-family classification + closest named alternatives.
const FONTS = {
  "Playfair Display": { cls: "didone", near: ["Didot", "Bodoni", "Georgia"] },
  "Source Sans 3": { cls: "humanist-sans", near: ["Source Sans Pro", "Segoe UI", "Helvetica Neue"] },
  Lora: { cls: "old-style", near: ["Georgia", "Cambria", "PT Serif"] },
  Roboto: { cls: "grotesque-sans", near: ["Helvetica Neue", "Arial", "Segoe UI"] },
  Montserrat: { cls: "geometric-sans", near: ["Futura", "Proxima Nova", "Century Gothic"] },
  Merriweather: { cls: "old-style", near: ["Georgia", "Cambria"] },
  "IBM Plex Sans": { cls: "grotesque-sans", near: ["Helvetica Neue", "Segoe UI", "Arial"] },
  "IBM Plex Serif": { cls: "transitional", near: ["Georgia", "Cambria"] },
  "Space Grotesk": { cls: "grotesque-sans", near: ["Helvetica Neue", "Arial"] },
  Inter: { cls: "grotesque-sans", near: ["Helvetica Neue", "Segoe UI", "Roboto"] },
  "DM Serif Display": { cls: "didone", near: ["Didot", "Bodoni", "Georgia"] },
  "DM Sans": { cls: "geometric-sans", near: ["Avenir", "Futura", "Helvetica Neue"] },
  "Roboto Slab": { cls: "slab", near: ["Rockwell", "Museo Slab", "Georgia"] },
  Alegreya: { cls: "old-style", near: ["Palatino", "Georgia"] },
  "Alegreya Sans": { cls: "humanist-sans", near: ["Gill Sans", "Segoe UI", "Helvetica Neue"] },
  Archivo: { cls: "grotesque-sans", near: ["Helvetica Neue", "Arial"] },
  "Archivo Narrow": { cls: "condensed-sans", near: ["Arial Narrow", "Helvetica Neue Condensed"] },
  Fraunces: { cls: "old-style", near: ["Georgia", "Cambria"] },
  Poppins: { cls: "geometric-sans", near: ["Futura", "Century Gothic", "Avenir"] },
  Oswald: { cls: "condensed-sans", near: ["Impact", "Haettenschweiler", "Arial Narrow"] },
  Cardo: { cls: "old-style", near: ["Palatino", "Georgia", "Times New Roman"] },
  "Bebas Neue": { cls: "condensed-sans", near: ["Impact", "Haettenschweiler", "Anton"] },
  "Libre Baskerville": { cls: "transitional", near: ["Baskerville", "Georgia"] },
  "Work Sans": { cls: "grotesque-sans", near: ["Helvetica Neue", "Segoe UI", "Arial"] },
  Bitter: { cls: "slab", near: ["Rockwell", "Georgia"] },
  "Cormorant Garamond": { cls: "didone", near: ["Garamond", "Didot", "Georgia"] },
  "EB Garamond": { cls: "old-style", near: ["Garamond", "Palatino", "Georgia"] },
  Spectral: { cls: "old-style", near: ["Georgia", "Cambria"] },
  Karla: { cls: "grotesque-sans", near: ["Helvetica Neue", "Arial"] },
  Newsreader: { cls: "old-style", near: ["Georgia", "Cambria", "Times New Roman"] },
  "Public Sans": { cls: "grotesque-sans", near: ["Helvetica Neue", "Arial"] },
  "Plus Jakarta Sans": { cls: "geometric-sans", near: ["Futura", "Avenir", "Helvetica Neue"] },
  Sora: { cls: "geometric-sans", near: ["Futura", "Helvetica Neue"] },
  "Crimson Pro": { cls: "old-style", near: ["Garamond", "Palatino", "Georgia"] },
  "Josefin Sans": { cls: "geometric-sans", near: ["Futura", "Century Gothic"] },
  "Bricolage Grotesque": { cls: "grotesque-sans", near: ["Helvetica Neue", "Arial"] },
  Raleway: { cls: "geometric-sans", near: ["Century Gothic", "Futura", "Avenir"] },
};

const CATEGORY_DEFAULT = {
  serif: ["Georgia", "Times New Roman", "serif"],
  "sans-serif": ["Helvetica Neue", "Arial", "sans-serif"],
  monospace: ["SFMono-Regular", "Menlo", "monospace"],
};

// Visual class of a font (e.g. "didone", "grotesque-sans"), or a sensible
// category-based default when the family isn't individually mapped. Used by the
// pairing engine to reason about compatibility.
export function fontClass(spec) {
  const entry = FONTS[spec.family];
  if (entry) return entry.cls;
  return spec.category === "serif" ? "old-style" : "grotesque-sans";
}

// Web-safe fallback chain (NOT including the font itself).
export function fallbackStack(spec) {
  const entry = FONTS[spec.family];
  if (entry) return STACKS[entry.cls];
  return CATEGORY_DEFAULT[spec.category] || CATEGORY_DEFAULT["sans-serif"];
}

// Named near-match suggestions for display. Falls back to the first couple of
// stack entries (always system fonts) when a family isn't individually mapped.
export function nearMatches(spec) {
  const entry = FONTS[spec.family];
  if (entry) return entry.near;
  return fallbackStack(spec)
    .filter((n) => !["serif", "sans-serif", "monospace"].includes(n))
    .slice(0, 3);
}
