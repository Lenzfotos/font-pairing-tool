// Filtering for the pairing dataset.
//
// Semantics:
//   useCase  — null = any; otherwise the pairing must list that use case
//   mood     — null = any; otherwise the pairing must list that mood
//   strategy — null = any; otherwise exact match
//   platforms — pairing must be available on EVERY selected platform (AND).
//               Availability is computed per-font (see lib/availability), not
//               read from the pairing — so the filter matches the badges.

import { PLATFORMS, availablePlatformKeys } from "./availability.js";

// Category combination of a heading/body pair, order-independent.
//   "mixed"       — one serif + one sans
//   "serif-serif" — both serif
//   "sans-sans"   — both sans-serif
export function comboOf(headingCategory, bodyCategory) {
  if (headingCategory !== bodyCategory) return "mixed";
  return headingCategory === "serif" ? "serif-serif" : "sans-sans";
}

export function pairCombo(p) {
  return comboOf(p.heading.category, p.body.category);
}

// Fixed combo options (with labels), in display order.
export const COMBO_OPTIONS = [
  { key: "mixed", label: "Serif + Sans" },
  { key: "serif-serif", label: "Serif + Serif" },
  { key: "sans-sans", label: "Sans + Sans" },
];

export function matchesFilters(p, filters) {
  if (filters.useCase && !p.useCases.includes(filters.useCase)) return false;
  if (filters.mood && !p.moods.includes(filters.mood)) return false;
  if (filters.strategy && p.strategy !== filters.strategy) return false;

  const combos = filters.combos || [];
  if (combos.length && !combos.includes(pairCombo(p))) return false;

  const platforms = filters.platforms || [];
  if (platforms.length) {
    const have = availablePlatformKeys(p);
    if (!platforms.every((plat) => have.includes(plat))) return false;
  }
  return true;
}

// Derive the set of filter options present in the dataset, so the Controls never
// offer a value that matches nothing. Platforms come from the canonical list.
export function deriveOptions(pairings) {
  const useCases = new Set();
  const moods = new Set();
  const strategies = new Set();

  for (const p of pairings) {
    p.useCases.forEach((u) => useCases.add(u));
    p.moods.forEach((m) => moods.add(m));
    strategies.add(p.strategy);
  }

  return {
    useCases: [...useCases].sort(),
    moods: [...moods].sort(),
    strategies: [...strategies].sort(),
    combos: COMBO_OPTIONS,
    platforms: PLATFORMS.map((p) => p.key),
  };
}
