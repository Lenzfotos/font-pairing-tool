import { useState } from "react";
import { readableOn } from "../lib/colors.js";

const HARMONY_LABELS = {
  complementary: "Complementary",
  analogous: "Analogous",
  triadic: "Triadic",
  monochromatic: "Monochromatic",
};

// Shows the generated palette: the harmony name, the key role swatches (click to
// copy the hex), and the accent ramp. Colors come from the engine, not the data.
export default function PalettePanel({ palette }) {
  const [copied, setCopied] = useState(null);

  const copy = async (hex) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(hex);
      setTimeout(() => setCopied((c) => (c === hex ? null : c)), 1100);
    } catch {
      /* clipboard unavailable — clicking just no-ops */
    }
  };

  return (
    <section className="palette" aria-label="Generated color palette">
      <header className="palette__head">
        <h2 className="palette__title">Matched palette</h2>
        <span className="palette__harmony">
          {HARMONY_LABELS[palette.harmony] || palette.harmony}
        </span>
      </header>

      <div className="palette__swatches">
        {palette.swatches.map((s) => (
          <button
            key={s.role}
            type="button"
            className="swatch"
            style={{ background: s.hex, color: readableOn(s.hex) }}
            onClick={() => copy(s.hex)}
            title={`Copy ${s.hex}`}
          >
            <span className="swatch__role">{s.role}</span>
            <span className="swatch__hex">
              {copied === s.hex ? "Copied!" : s.hex.toUpperCase()}
            </span>
          </button>
        ))}
      </div>

      <div className="palette__ramp" aria-hidden="true">
        {palette.ramp.map((hex, i) => (
          <span key={i} className="ramp-step" style={{ background: hex }} />
        ))}
      </div>
    </section>
  );
}
