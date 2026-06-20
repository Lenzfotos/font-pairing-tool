import { useEffect, useMemo, useState } from "react";
import { PAIRINGS } from "./data/pairings.js";
import { matchesFilters, deriveOptions } from "./lib/filters.js";
import { generatePalette, seedAccent } from "./lib/colors.js";
import { pairingIdFromHash } from "./lib/export.js";
import { sampleGenerated } from "./lib/engine.js";
import { FONT_CATALOG } from "./data/fontCatalog.js";
import Controls from "./components/Controls.jsx";
import PreviewPanel from "./components/PreviewPanel.jsx";
import PalettePanel from "./components/PalettePanel.jsx";
import ExportPanel from "./components/ExportPanel.jsx";
import ExplanationPanel from "./components/ExplanationPanel.jsx";

const SAVED_KEY = "fpt:saved";

const EMPTY_FILTERS = {
  useCase: null,
  mood: null,
  strategy: null,
  combos: [], // empty = any category combination (serif/sans pairing types)
  platforms: [], // empty = no platform constraint (all seed fonts are on Google)
  savedOnly: false,
};

const NO_COLOR_OVERRIDE = { id: null, accent: null, harmony: null };

function loadSaved() {
  try {
    return new Set(JSON.parse(localStorage.getItem(SAVED_KEY) || "[]"));
  } catch {
    return new Set();
  }
}

// App owns all state. Filters drive `matches` (memoized); the user cycles within
// the current match set. `activeId` survives re-filtering — when the active
// pairing falls out of the matches, we fall back to the first match.
export default function App() {
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [activeId, setActiveId] = useState(null);
  const [applyColor, setApplyColor] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [saved, setSaved] = useState(loadSaved);
  // A live algorithmically-generated pairing; when set it overrides browsing.
  const [generated, setGenerated] = useState(null);
  // Per-pairing color customization (accent / harmony). `id` ties the override
  // to a pairing so it never bleeds onto a different one.
  const [colorOverride, setColorOverride] = useState(NO_COLOR_OVERRIDE);

  const options = useMemo(() => deriveOptions(PAIRINGS), []);
  const matches = useMemo(() => {
    const list = PAIRINGS.filter((p) => matchesFilters(p, filters));
    return filters.savedOnly ? list.filter((p) => saved.has(p.id)) : list;
  }, [filters, saved]);

  // Engine generates from the full Google Fonts catalog; curated heading/body
  // combos are excluded so generated pairings are always novel.
  const excludePairs = useMemo(
    () => new Set(PAIRINGS.map((p) => `${p.heading.family}|${p.body.family}`)),
    []
  );

  // Resolve the active pairing within the current matches. -1 (not found) or a
  // null activeId both collapse to the first match. A live generated pairing,
  // when present, takes precedence over the curated browse.
  const foundIndex = matches.findIndex((p) => p.id === activeId);
  const activeIndex = foundIndex >= 0 ? foundIndex : 0;
  const current = generated ?? matches[activeIndex]; // undefined when nothing matches

  // Color customization that applies only to the current pairing.
  const activeOverride =
    current && colorOverride.id === current.id ? colorOverride : NO_COLOR_OVERRIDE;
  const customized = Boolean(activeOverride.accent || activeOverride.harmony);

  // Generate the palette for the active pairing, folding in any override.
  const palette = useMemo(() => {
    if (!current) return null;
    const base = current.palettes[0];
    return generatePalette({
      harmony: activeOverride.harmony ?? base.harmony,
      colors: ["", activeOverride.accent ?? seedAccent(base)],
    });
  }, [current, activeOverride.accent, activeOverride.harmony]);

  const setAccent = (hex) =>
    setColorOverride((o) => ({ id: current.id, accent: hex, harmony: o.id === current.id ? o.harmony : null }));
  const setHarmony = (h) =>
    setColorOverride((o) => ({ id: current.id, harmony: h, accent: o.id === current.id ? o.accent : null }));
  const resetColors = () => setColorOverride(NO_COLOR_OVERRIDE);

  const handleFilters = (next) => {
    setFilters(next);
    setActiveId(null); // reset to the top of the new match set
    setGenerated(null); // return to curated browsing
  };

  const go = (delta) => {
    if (generated) {
      setGenerated(null); // leaving a generated pairing resumes the curated browse
      return;
    }
    if (matches.length === 0) return;
    const nextIndex = (activeIndex + delta + matches.length) % matches.length;
    setActiveId(matches[nextIndex].id);
  };

  // Produce a fresh algorithmic pairing from the full catalog, honoring active
  // strategy + combo filters.
  const handleGenerate = () => {
    const next = sampleGenerated(FONT_CATALOG, {
      strategy: filters.strategy,
      combos: filters.combos,
      exclude: excludePairs,
      lastId: generated?.id,
    });
    if (next) setGenerated(next);
  };

  const toggleSave = (id) =>
    setSaved((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const isSaved = current ? saved.has(current.id) : false;

  // Persist favorites.
  useEffect(() => {
    localStorage.setItem(SAVED_KEY, JSON.stringify([...saved]));
  }, [saved]);

  // Open the pairing named in the URL hash on first load (deep link / share).
  useEffect(() => {
    const id = pairingIdFromHash(window.location.hash);
    if (id && PAIRINGS.some((p) => p.id === id)) setActiveId(id);
  }, []);

  // Keep the hash pointed at the current curated pairing so the URL is shareable
  // (replaceState — no history spam). Generated pairings are ephemeral, so we
  // clear the hash rather than minting an unshareable gen- link.
  useEffect(() => {
    if (!current) return;
    if (current.generated) {
      window.history.replaceState(null, "", window.location.pathname);
    } else {
      window.history.replaceState(null, "", `#p=${current.id}`);
    }
  }, [current?.id]);

  return (
    <div className="app">
      <nav className="rail" aria-label="Filters">
        <div className="rail__brand">
          <span className="rail__mark">Aa</span>
          <h1 className="rail__title">Font&nbsp;Pairing</h1>
          <p className="rail__sub">Pairings, explained.</p>
        </div>

        <Controls
          filters={filters}
          options={options}
          onChange={handleFilters}
          resultCount={matches.length}
          savedCount={saved.size}
        />
      </nav>

      <main className="stage">
        {current ? (
          <>
            <PreviewPanel pairing={current} palette={applyColor ? palette : null} />

            <PalettePanel
              palette={palette}
              customized={customized}
              onAccentChange={setAccent}
              onHarmonyChange={setHarmony}
              onReset={resetColors}
            />

            <footer className="stage__nav">
              {generated ? (
                <button className="btn" onClick={() => setGenerated(null)}>
                  ‹ Back to browsing
                </button>
              ) : (
                <>
                  <button className="btn" onClick={() => go(-1)} aria-label="Previous pairing">
                    ‹ Prev
                  </button>
                  <span className="stage__count">
                    {activeIndex + 1} / {matches.length}
                  </span>
                  <button
                    className="btn btn--primary"
                    onClick={() => go(1)}
                    aria-label="Next pairing"
                  >
                    Next ›
                  </button>
                </>
              )}

              <button
                className="btn btn--generate"
                onClick={handleGenerate}
                title={`Generate a new pairing from ${FONT_CATALOG.length} Google Fonts`}
              >
                ✨ {generated ? "Generate again" : "Generate"}
              </button>

              <button
                className={`btn btn--icon ${isSaved ? "btn--saved" : ""}`}
                onClick={() => toggleSave(current.id)}
                aria-pressed={isSaved}
                title={isSaved ? "Remove from saved" : "Save this pairing"}
              >
                {isSaved ? "★ Saved" : "☆ Save"}
              </button>
              <button
                className={`btn ${showExport ? "btn--primary" : ""}`}
                onClick={() => setShowExport((v) => !v)}
                aria-expanded={showExport}
              >
                Export
              </button>

              <label className="stage__toggle">
                <input
                  type="checkbox"
                  checked={applyColor}
                  onChange={(e) => setApplyColor(e.target.checked)}
                />
                Apply colors to preview
              </label>
            </footer>

            {showExport && <ExportPanel pairing={current} palette={palette} />}
          </>
        ) : (
          <div className="empty">
            <p className="empty__title">
              {filters.savedOnly && saved.size === 0
                ? "You haven't saved any pairings yet."
                : "No curated pairings match these filters."}
            </p>
            <div className="empty__actions">
              {!filters.savedOnly && (
                <button className="btn btn--generate" onClick={handleGenerate}>
                  ✨ Generate one
                </button>
              )}
              <button className="btn" onClick={() => handleFilters(EMPTY_FILTERS)}>
                Clear filters
              </button>
            </div>
          </div>
        )}
      </main>

      {current ? (
        <ExplanationPanel pairing={current} />
      ) : (
        <aside className="explanation explanation--empty" aria-label="Why this pairing works" />
      )}
    </div>
  );
}
