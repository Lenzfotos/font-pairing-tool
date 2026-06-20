import { useEffect } from "react";
import { buildFontHref } from "../lib/fonts.js";

// Injects a Google Fonts <link> for the families in the current pairing. We
// inject (rather than use webfontloader) so the font CSS is declarative,
// cacheable by the browser, and trivially removable. The URL itself is built by
// the shared buildFontHref so the live preview and the exported @import match.

export function useGoogleFont(families) {
  // Serialize the spec so the effect only re-runs when fonts actually change.
  const key = JSON.stringify(families);

  useEffect(() => {
    const href = buildFontHref(families);
    if (!href) return;

    // Reuse an existing link for the same href if one is already present.
    let link = document.head.querySelector(`link[data-google-font][href="${href}"]`);
    if (!link) {
      link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      link.setAttribute("data-google-font", "");
      document.head.appendChild(link);
    }
    // We intentionally leave injected links in <head>: fonts are cheap to keep,
    // and removing them would re-trigger a fetch/flash when cycling back.
  }, [key]); // eslint-disable-line react-hooks/exhaustive-deps
}
