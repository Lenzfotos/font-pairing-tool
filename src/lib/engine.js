// Algorithmic pairing engine.
//
// Generates novel font pairings by classifying each font (via substitutes.js)
// and scoring every heading/body combination against typographic rules, then
// templating an HONEST, derived rationale. Generated pairings are ALWAYS
// source.type === "rule-based" with no citation — we never fabricate an expert
// attribution for an algorithm's output.

import { formatHex } from "culori";
import { fontClass } from "./substitutes.js";

// Per visual-class metadata that drives scoring and prose.
//   cat   — serif | sans
//   role  — display (wants to be big) | text (built for reading) | neutral
//   body  — is it suitable as running body text?
const CLASS_META = {
  didone: { cat: "serif", role: "display", body: false, label: "high-contrast display serif", moods: ["elegant", "editorial"] },
  "old-style": { cat: "serif", role: "text", body: true, label: "old-style text serif", moods: ["classic", "editorial"] },
  transitional: { cat: "serif", role: "text", body: true, label: "transitional serif", moods: ["classic", "trustworthy"] },
  slab: { cat: "serif", role: "display", body: true, label: "slab serif", moods: ["bold", "modern"] },
  "geometric-sans": { cat: "sans", role: "display", body: true, label: "geometric sans", moods: ["modern", "friendly"] },
  "humanist-sans": { cat: "sans", role: "text", body: true, label: "humanist sans", moods: ["trustworthy", "modern"] },
  "grotesque-sans": { cat: "sans", role: "neutral", body: true, label: "grotesque sans", moods: ["modern", "technical"] },
  "condensed-sans": { cat: "sans", role: "display", body: false, label: "condensed display sans", moods: ["bold"] },
};

// Families designed as one system — the strongest harmony signal.
const SUPERFAMILIES = [
  ["Roboto", "Roboto Slab"],
  ["IBM Plex Sans", "IBM Plex Serif"],
  ["DM Sans", "DM Serif Display"],
  ["Alegreya", "Alegreya Sans"],
  ["Archivo", "Archivo Narrow"],
];

function superfamilyOf(family) {
  const grp = SUPERFAMILIES.find((g) => g.includes(family));
  return grp ? grp.join("+") : null;
}

// Build the working font catalog from the dataset: one entry per unique family,
// enriched with its visual class.
export function buildCatalog(pairings) {
  const map = new Map();
  for (const p of pairings) {
    for (const spec of [p.heading, p.body]) {
      if (!map.has(spec.family)) {
        map.set(spec.family, {
          family: spec.family,
          category: spec.category,
          weights: spec.weights,
          cls: fontClass(spec),
        });
      }
    }
  }
  return [...map.values()];
}

// Score a heading/body combination. Returns null for invalid (same font), else
// { score 0-100, strategy, reasons[] }.
export function scorePair(h, b) {
  if (h.family === b.family) return null;

  const sf = superfamilyOf(h.family);
  if (sf && sf === superfamilyOf(b.family)) {
    return { score: 95, strategy: "superfamily", reasons: ["sameSystem"] };
  }

  const hm = CLASS_META[h.cls];
  const bm = CLASS_META[b.cls];
  let score = 50;
  const reasons = [];

  // Body text must actually be readable.
  if (!bm.body) {
    score -= 35;
    reasons.push("bodyDisplay");
  }

  if (hm.cat !== bm.cat) {
    // Serif/sans contrast — the classic, reliable recommendation.
    score += 22;
    reasons.push("crossCategory");
  } else if (h.cls === b.cls) {
    // Same visual class on both = too similar, they compete.
    score -= 25;
    reasons.push("sameClass");
  } else if (hm.cat === "sans") {
    // Two sans: works as mono-accent when the heading has display character.
    if (hm.role === "display" && bm.role !== "display") {
      score += 10;
      reasons.push("monoAccent");
    } else {
      score -= 8;
      reasons.push("lowContrastSans");
    }
  } else {
    // Two serifs: acceptable when a display serif leads a text serif.
    if (hm.role === "display" && bm.role === "text") {
      score += 6;
      reasons.push("serifDisplayText");
    } else {
      score -= 12;
      reasons.push("serifSerif");
    }
  }

  // A heading benefits from display personality.
  if (hm.role === "display") {
    score += 8;
    reasons.push("displayHeading");
  }

  score = Math.max(0, Math.min(100, score));

  let strategy;
  if (hm.cat !== bm.cat) strategy = "contrast";
  else if (hm.cat === "sans") strategy = "mono-accent";
  else strategy = "harmony";

  return { score, strategy, reasons };
}

// Rank every valid combination, best first.
export function rankPairings(catalog, { strategy = null, excludePairs = new Set(), minScore = 55 } = {}) {
  const out = [];
  for (const h of catalog) {
    for (const b of catalog) {
      const s = scorePair(h, b);
      if (!s || s.score < minScore) continue;
      if (strategy && s.strategy !== strategy) continue;
      if (excludePairs.has(`${h.family}|${b.family}`)) continue;
      out.push({ h, b, ...s });
    }
  }
  out.sort((a, b) => b.score - a.score);
  return out;
}

function slug(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

// Deterministic seed color from a string, so a given pairing always gets the
// same palette across renders.
function seedColor(str) {
  let n = 0;
  for (const c of str) n = (n * 31 + c.charCodeAt(0)) % 360;
  return formatHex({ mode: "oklch", l: 0.62, c: 0.15, h: n });
}

const HARMONY_BY_STRATEGY = {
  contrast: "complementary",
  "mono-accent": "analogous",
  harmony: "analogous",
  superfamily: "monochromatic",
};

function rationaleFor(h, b, hm, bm, strategy) {
  switch (strategy) {
    case "superfamily":
      return `${h.family} and ${b.family} come from a single type system, so they share proportions, x-height, and tone. Using two members of one designed family is the lowest-risk path to harmony — the structural difference reads as intentional, never as a clash.`;
    case "mono-accent": {
      return `A mono-accent split between two sans-serifs: ${h.family}'s ${hm.label} character carries the headline while ${b.family} stays neutral and quiet for body text. Just enough personality up top, total legibility below.`;
    }
    case "harmony":
      return `Two serifs in close harmony — ${h.family} leads with ${hm.label} presence and ${b.family}, a ${bm.label}, keeps paragraphs comfortable to read. The shared serif voice holds the page together while the difference in role supplies hierarchy.`;
    default: {
      const lead = hm.cat === "serif"
        ? "a modulated serif over an even-weight sans"
        : "an even-weight sans over a modulated serif";
      return `A ${hm.label} heading set against a ${bm.label} body. The structural contrast — ${lead} — gives clear hierarchy while keeping body copy easy to read. Serif/sans contrast is the most dependable pairing recipe.`;
    }
  }
}

// Turn a ranked entry into a full schema-compatible pairing object that the rest
// of the app (preview, palette, explanation, export) consumes unchanged.
export function generatePairing(entry) {
  const { h, b, strategy, score } = entry;
  const hm = CLASS_META[h.cls];
  const bm = CLASS_META[b.cls];
  const id = `gen-${slug(h.family)}-${slug(b.family)}`;

  const moods = [...new Set([...hm.moods, ...bm.moods])].slice(0, 3);
  const useCases = [...new Set(["web", "branding", bm.cat === "serif" && bm.role === "text" ? "editorial" : "landing"])];
  const harmony = HARMONY_BY_STRATEGY[strategy];

  return {
    id,
    generated: true,
    score,
    heading: { family: h.family, category: h.category, weights: h.weights },
    body: { family: b.family, category: b.category, weights: b.weights },
    strategy,
    moods,
    useCases,
    rationale: rationaleFor(h, b, hm, bm, strategy),
    source: { type: "rule-based", citation: null, url: null },
    // Both are Google fonts; Figma serves Google fonts. Honest, minimal claim.
    availability: ["google", "figma"],
    palettes: [{ harmony, colors: ["", seedColor(id)] }],
  };
}

// Pick one generated pairing from the top of the ranking, avoiding an exact
// repeat of the last one shown.
export function pickGenerated(ranked, lastId = null) {
  if (!ranked.length) return null;
  const top = ranked.slice(0, Math.min(15, ranked.length));
  let entry = top[Math.floor(Math.random() * top.length)];
  for (let i = 0; i < 4; i++) {
    const candidate = top[Math.floor(Math.random() * top.length)];
    if (`gen-${slug(candidate.h.family)}-${slug(candidate.b.family)}` !== lastId) {
      entry = candidate;
      break;
    }
  }
  return generatePairing(entry);
}
