import { useGoogleFont } from "../hooks/useGoogleFont.js";
import { cssFamily } from "../lib/fonts.js";

const SAMPLE_HEADLINE = "The quick brown fox jumps over the lazy dog";
const SAMPLE_PARAGRAPH =
  "Good typography is invisible. It carries the reader through the text without ever calling attention to itself, balancing rhythm, contrast, and color so that the words — not the letterforms — do the talking. When a heading and body work together, the page simply feels right before you can say why.";

// The hero. Renders the heading family and body family live so the user is
// always looking at the real fonts, never a specimen image. When `palette` is
// supplied (apply-color mode), the preview themes itself with the generated
// colors so users see the type and palette working together.
export default function PreviewPanel({ pairing, palette }) {
  // Load both families for the active pairing.
  useGoogleFont([pairing.heading, pairing.body]);

  const headingWeight = heaviest(pairing.heading.weights, 700);
  const bodyWeight = lightest(pairing.body.weights, 400);

  const themed = Boolean(palette);
  const r = palette?.roles;
  const sectionStyle = themed
    ? { background: r.bg, "--p-ink": r.ink, "--p-soft": r.inkSoft, "--p-accent": r.accent }
    : undefined;

  return (
    <section
      className={`preview ${themed ? "preview--themed" : ""}`}
      style={sectionStyle}
      aria-label="Live font preview"
    >
      <p className="preview__eyebrow">Heading · {pairing.heading.family}</p>
      <h1
        className="preview__headline"
        style={{ fontFamily: cssFamily(pairing.heading), fontWeight: headingWeight }}
      >
        {SAMPLE_HEADLINE}
      </h1>

      <p className="preview__eyebrow preview__eyebrow--body">
        Body · {pairing.body.family}
      </p>
      <p
        className="preview__paragraph"
        style={{ fontFamily: cssFamily(pairing.body), fontWeight: bodyWeight }}
      >
        {SAMPLE_PARAGRAPH}
      </p>

      <p
        className="preview__paragraph preview__paragraph--small"
        style={{ fontFamily: cssFamily(pairing.body), fontWeight: bodyWeight }}
      >
        1234567890 — ABCDEFGHIJKLM nopqrstuvwxyz &amp; (typographic test row)
      </p>
    </section>
  );
}

function heaviest(weights, fallback) {
  if (!weights || !weights.length) return fallback;
  return Math.max(...weights);
}

function lightest(weights, fallback) {
  if (!weights || !weights.length) return fallback;
  return Math.min(...weights);
}
