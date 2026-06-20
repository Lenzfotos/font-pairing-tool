// Export helpers: turn a pairing + its generated palette into copy-pasteable
// CSS, and build a shareable deep-link URL.

import { buildFontHref, cssFamily } from "./fonts.js";

// A drop-in CSS block: the Google Fonts @import, font-family + palette custom
// properties, and a couple of starter rules. Mirrors exactly what the live
// preview loads, so what you copy is what you saw.
export function pairingCss(pairing, palette) {
  const href = buildFontHref([pairing.heading, pairing.body]);
  const r = palette.roles;

  return `/* ${pairing.heading.family} + ${pairing.body.family} */
@import url('${href}');

:root {
  --font-heading: ${cssFamily(pairing.heading)};
  --font-body: ${cssFamily(pairing.body)};

  --color-bg: ${r.bg};
  --color-ink: ${r.ink};
  --color-accent: ${r.accent};
  --color-accent-soft: ${r.accentSoft};
}

body {
  font-family: var(--font-body);
  color: var(--color-ink);
  background: var(--color-bg);
}

h1, h2, h3, h4 {
  font-family: var(--font-heading);
}
`;
}

// Stable deep link to a specific pairing (read back on load by App).
export function shareUrl(pairing) {
  const { origin, pathname } = window.location;
  return `${origin}${pathname}#p=${pairing.id}`;
}

// Parse the active pairing id out of a URL hash like "#p=playfair-source-sans".
export function pairingIdFromHash(hash) {
  const m = (hash || "").match(/p=([\w-]+)/);
  return m ? m[1] : null;
}
