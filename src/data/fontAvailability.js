// Per-font platform availability.
//
// Google + Figma are NOT listed here because they're universally true and
// VERIFIED for every family in this dataset:
//   • Google — all 37 families live-checked against the Google Fonts CSS API.
//   • Figma  — Figma's font picker serves the entire Google Fonts library.
//
// Adobe + Canva CANNOT be verified from this environment (Adobe Fonts is a
// JS-rendered SPA with ambiguous statuses; Canva blocks automated requests).
// The booleans below are curated best-effort ESTIMATES and are surfaced in the
// UI as "estimated", never as verified fact. Default when a family is missing
// is false (don't claim availability we're unsure of).

export const FONT_PLATFORMS = {
  "Playfair Display": { adobe: true, canva: true },
  "Source Sans 3": { adobe: true, canva: true },
  Lora: { adobe: true, canva: true },
  Roboto: { adobe: true, canva: true },
  Montserrat: { adobe: true, canva: true },
  Merriweather: { adobe: true, canva: true },
  "IBM Plex Sans": { adobe: true, canva: true },
  "IBM Plex Serif": { adobe: true, canva: true },
  "Space Grotesk": { adobe: false, canva: false },
  Inter: { adobe: false, canva: false },
  "DM Serif Display": { adobe: false, canva: true },
  "DM Sans": { adobe: false, canva: true },
  "Roboto Slab": { adobe: true, canva: true },
  Alegreya: { adobe: true, canva: true },
  "Alegreya Sans": { adobe: true, canva: false },
  Archivo: { adobe: true, canva: true },
  "Archivo Narrow": { adobe: true, canva: true },
  Fraunces: { adobe: false, canva: true },
  Poppins: { adobe: true, canva: true },
  Oswald: { adobe: true, canva: true },
  Cardo: { adobe: false, canva: false },
  "Bebas Neue": { adobe: true, canva: true },
  "Libre Baskerville": { adobe: true, canva: true },
  "Work Sans": { adobe: true, canva: true },
  Bitter: { adobe: true, canva: true },
  "Cormorant Garamond": { adobe: true, canva: true },
  "EB Garamond": { adobe: true, canva: true },
  Spectral: { adobe: true, canva: true },
  Karla: { adobe: true, canva: true },
  Newsreader: { adobe: false, canva: false },
  "Public Sans": { adobe: false, canva: false },
  "Plus Jakarta Sans": { adobe: false, canva: true },
  Sora: { adobe: false, canva: true },
  "Crimson Pro": { adobe: false, canva: true },
  "Josefin Sans": { adobe: true, canva: true },
  "Bricolage Grotesque": { adobe: false, canva: false },
  Raleway: { adobe: true, canva: true },
};
