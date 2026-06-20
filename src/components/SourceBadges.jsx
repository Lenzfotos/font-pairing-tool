// Platform availability badges, computed per-font and AND-ed across the pairing.
// Each badge carries a basis: "verified" (Google/Figma) or "estimated"
// (Adobe/Canva, curated best-effort). Present-but-estimated badges are visibly
// distinct from present-and-verified ones, and missing platforms render dimmed.
export default function SourceBadges({ entries }) {
  return (
    <ul className="badges" aria-label="Platform availability">
      {entries.map((p) => {
        const cls = !p.present
          ? "badge--off"
          : p.basis === "verified"
          ? "badge--verified"
          : "badge--estimated";
        const title = !p.present
          ? `Not on ${p.label}`
          : p.basis === "verified"
          ? `Verified on ${p.label}`
          : `Likely on ${p.label} (estimated — not verified)`;
        return (
          <li key={p.key} className={`badge ${cls}`} title={title}>
            {p.present && (
              <span className="badge__mark" aria-hidden="true">
                {p.basis === "verified" ? "✓" : "~"}
              </span>
            )}
            {p.label}
          </li>
        );
      })}
    </ul>
  );
}
