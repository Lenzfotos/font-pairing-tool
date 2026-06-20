import SourceBadges from "./SourceBadges.jsx";
import { nearMatches } from "../lib/substitutes.js";
import { pairingAvailability } from "../lib/availability.js";

const STRATEGY_LABELS = {
  contrast: "Contrast",
  superfamily: "Superfamily",
  harmony: "Harmony",
  "mono-accent": "Mono-accent",
};

// The explanation IS the product. This panel teaches why the pairing works and
// is scrupulously honest about where the reasoning comes from:
//   expert     -> show a real citation, linked
//   rule-based -> label it as derived reasoning, attach NO citation
export default function ExplanationPanel({ pairing }) {
  const isExpert = pairing.source?.type === "expert";

  return (
    <aside className="explanation" aria-label="Why this pairing works">
      <header className="explanation__head">
        <div className="explanation__tags">
          <span className="explanation__strategy">
            {STRATEGY_LABELS[pairing.strategy] || pairing.strategy}
          </span>
          {pairing.generated && (
            <span className="explanation__gen" title="Created by the pairing engine">
              ✨ Generated
            </span>
          )}
        </div>
        <ul className="explanation__moods">
          {pairing.moods.map((m) => (
            <li key={m} className="mood">{m}</li>
          ))}
        </ul>
      </header>

      <p className="explanation__rationale">{pairing.rationale}</p>

      <div className="explanation__source">
        {isExpert ? (
          <>
            <span className="source-tag source-tag--expert">Expert source</span>
            {pairing.source.url ? (
              <a
                className="source-citation"
                href={pairing.source.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {pairing.source.citation}
              </a>
            ) : (
              <span className="source-citation">{pairing.source.citation}</span>
            )}
          </>
        ) : (
          <>
            <span className="source-tag source-tag--rule">Derived reasoning</span>
            <span className="source-citation source-citation--muted">
              Algorithmically suggested — no expert attribution.
            </span>
          </>
        )}
      </div>

      <div className="explanation__platforms">
        <h3 className="explanation__subhead">Available on</h3>
        <SourceBadges entries={pairingAvailability(pairing)} />
        <p className="explanation__legend">
          <span className="legend-mark">✓</span> verified&nbsp;·&nbsp;
          <span className="legend-mark">~</span> estimated (Adobe / Canva not verifiable)
        </p>
      </div>

      <div className="explanation__subs">
        <h3 className="explanation__subhead">Near matches</h3>
        <p className="explanation__subhint">
          Closest substitutes where these fonts aren&apos;t available.
        </p>
        <SubRow label={pairing.heading.family} subs={nearMatches(pairing.heading)} />
        <SubRow label={pairing.body.family} subs={nearMatches(pairing.body)} />
      </div>
    </aside>
  );
}

function SubRow({ label, subs }) {
  return (
    <div className="sub-row">
      <span className="sub-row__from">{label}</span>
      <span className="sub-row__arrow">→</span>
      <span className="sub-row__to">{subs.join(", ")}</span>
    </div>
  );
}
