import { useState } from "react";
import { pairingCss, shareUrl } from "../lib/export.js";

// Expandable export drawer: the CSS snippet (font @import + family + palette
// vars) and a shareable deep link, each with copy-to-clipboard.
export default function ExportPanel({ pairing, palette }) {
  const [copied, setCopied] = useState(null); // "css" | "link" | null

  const css = pairingCss(pairing, palette);
  const link = shareUrl(pairing);

  const copy = async (text, which) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(which);
      setTimeout(() => setCopied((c) => (c === which ? null : c)), 1300);
    } catch {
      /* clipboard unavailable — selection still works manually */
    }
  };

  return (
    <section className="export" aria-label="Export pairing">
      <div className="export__row">
        <span className="export__label">Share link</span>
        <button className="export__copy" onClick={() => copy(link, "link")}>
          {copied === "link" ? "Copied!" : "Copy link"}
        </button>
      </div>
      <code className="export__link">{link}</code>

      <div className="export__row export__row--css">
        <span className="export__label">CSS</span>
        <button className="export__copy" onClick={() => copy(css, "css")}>
          {copied === "css" ? "Copied!" : "Copy CSS"}
        </button>
      </div>
      <pre className="export__code"><code>{css}</code></pre>
    </section>
  );
}
