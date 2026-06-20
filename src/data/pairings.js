// Seed pairing dataset (Phase 1).
// Every family here is on Google Fonts and previews live via the useGoogleFont hook.
//
// source.type === "expert"     -> a real, attributable citation
// source.type === "rule-based" -> derived reasoning only, NEVER a fake citation
//
// palettes are static for now but shaped to stay forward-compatible with a
// generated color engine (harmony + colors array) later.

export const PAIRINGS = [
  {
    id: "playfair-source-sans",
    heading: { family: "Playfair Display", category: "serif", weights: [400, 700, 900] },
    body: { family: "Source Sans 3", category: "sans-serif", weights: [400, 600] },
    strategy: "contrast",
    moods: ["elegant", "editorial"],
    useCases: ["web", "editorial", "branding"],
    rationale:
      "Playfair Display is a high-contrast Didone with dramatic thick-to-thin strokes — it reads as luxury and editorial authority at large sizes. Pairing it with Source Sans 3, a neutral humanist sans, keeps body copy quiet and legible so the display face carries all the personality. The contrast in structure (modulated serif vs. even-weight sans) is exactly what keeps the two from competing.",
    source: {
      type: "expert",
      citation: "Butterick, Practical Typography — \"Font pairing\"",
      url: "https://practicaltypography.com/font-pairing.html",
    },
    availability: ["google", "canva", "figma", "adobe"],
    palettes: [
      { harmony: "complementary", colors: ["#1A2B4A", "#C97B3C", "#F5F0E8"] },
    ],
  },
  {
    id: "lora-roboto",
    heading: { family: "Lora", category: "serif", weights: [500, 600, 700] },
    body: { family: "Roboto", category: "sans-serif", weights: [400, 500] },
    strategy: "contrast",
    moods: ["trustworthy", "editorial"],
    useCases: ["web", "blog", "editorial"],
    rationale:
      "Lora is a contemporary serif with moderate contrast and brushed-curve terminals — warm enough for long-form headings without feeling decorative. Roboto's mechanical-but-friendly skeleton sets dense UI and body text cleanly at small sizes. Because Lora supplies the warmth and Roboto supplies the neutrality, the pair feels considered rather than accidental — a common, safe contrast pairing for content sites.",
    source: {
      type: "rule-based",
      citation: null,
      url: null,
    },
    availability: ["google", "figma"],
    palettes: [
      { harmony: "analogous", colors: ["#2E3A59", "#5B7DB1", "#EEF2F7"] },
    ],
  },
  {
    id: "montserrat-merriweather",
    heading: { family: "Montserrat", category: "sans-serif", weights: [600, 700, 800] },
    body: { family: "Merriweather", category: "serif", weights: [400, 700] },
    strategy: "contrast",
    moods: ["modern", "trustworthy"],
    useCases: ["web", "landing", "editorial"],
    rationale:
      "An inverted pairing: a geometric sans sets the headline and a serif sets the body. Montserrat's wide, even geometry gives confident, modern headings, while Merriweather was drawn specifically for comfortable on-screen reading at text sizes — generous x-height, sturdy serifs. Flipping the usual serif-headline convention is a reliable way to feel current while keeping paragraphs easy on the eyes.",
    source: {
      type: "expert",
      citation: "Google Fonts Knowledge — \"Choosing type for a project\"",
      url: "https://fonts.google.com/knowledge",
    },
    availability: ["google", "canva", "figma", "adobe"],
    palettes: [
      { harmony: "complementary", colors: ["#16403C", "#E0A458", "#FBF7F0"] },
    ],
  },
  {
    id: "ibm-plex-superfamily",
    heading: { family: "IBM Plex Sans", category: "sans-serif", weights: [600, 700] },
    body: { family: "IBM Plex Serif", category: "serif", weights: [400, 500] },
    strategy: "superfamily",
    moods: ["technical", "modern"],
    useCases: ["web", "docs", "branding"],
    rationale:
      "IBM Plex Sans and IBM Plex Serif were designed together as one system, so they share proportions, x-height, and a common skeleton. Using a superfamily guarantees harmony — the sans and serif feel like two voices of the same speaker rather than two strangers. It's the lowest-risk way to get heading/body contrast: the type designer already did the matching for you.",
    source: {
      type: "expert",
      citation: "IBM Plex — type system documentation",
      url: "https://www.ibm.com/plex/",
    },
    availability: ["google", "figma", "adobe"],
    palettes: [
      { harmony: "monochromatic", colors: ["#161616", "#4589FF", "#F4F4F4"] },
    ],
  },
  {
    id: "space-grotesk-inter",
    heading: { family: "Space Grotesk", category: "sans-serif", weights: [500, 700] },
    body: { family: "Inter", category: "sans-serif", weights: [400, 500] },
    strategy: "mono-accent",
    moods: ["modern", "technical"],
    useCases: ["web", "landing", "product"],
    rationale:
      "Space Grotesk carries quirky, slightly condensed character in its headings — a proportional take on a mono-derived design — while Inter is the workhorse UI sans tuned for screen legibility. Keeping both in the sans-serif family but letting one bring personality and the other stay invisible is a 'mono-accent' move: just enough distinctiveness up top, total clarity in the body.",
    source: {
      type: "rule-based",
      citation: null,
      url: null,
    },
    availability: ["google", "figma"],
    palettes: [
      { harmony: "complementary", colors: ["#0E1116", "#7C5CFF", "#F2F3F5"] },
    ],
  },
  {
    id: "dm-serif-dm-sans",
    heading: { family: "DM Serif Display", category: "serif", weights: [400] },
    body: { family: "DM Sans", category: "sans-serif", weights: [400, 500, 700] },
    strategy: "superfamily",
    moods: ["elegant", "modern"],
    useCases: ["web", "branding", "landing"],
    rationale:
      "DM Serif Display and DM Sans come from the same DM type system, so they share metrics and a common design intent. The serif is a high-contrast display cut meant only for large sizes; the sans is a low-contrast geometric workhorse for everything else. Using two members of one designed family is the safest route to harmony — the foundry already tuned them to sit together.",
    source: {
      type: "expert",
      citation: "Google Fonts — DM Sans / DM Serif Display (designed as a system)",
      url: "https://fonts.google.com/specimen/DM+Serif+Display",
    },
    availability: ["google", "canva", "figma"],
    palettes: [
      { harmony: "complementary", colors: ["#231F20", "#D98E04", "#FBF6EE"] },
    ],
  },
  {
    id: "roboto-slab-roboto",
    heading: { family: "Roboto Slab", category: "serif", weights: [500, 700] },
    body: { family: "Roboto", category: "sans-serif", weights: [400, 500] },
    strategy: "superfamily",
    moods: ["modern", "trustworthy"],
    useCases: ["web", "docs", "product"],
    rationale:
      "Roboto Slab is the slab-serif companion to Roboto, built on the same skeleton and proportions. The slab serifs give headings a sturdy, grounded presence while the parent sans keeps UI and body text neutral. Because they descend from one design, the contrast reads as intentional — structural difference without any clash in voice.",
    source: {
      type: "expert",
      citation: "Google Fonts — Roboto family (Roboto + Roboto Slab)",
      url: "https://fonts.google.com/specimen/Roboto+Slab",
    },
    availability: ["google", "canva", "figma", "adobe"],
    palettes: [
      { harmony: "monochromatic", colors: ["#212121", "#1E88E5", "#F5F5F5"] },
    ],
  },
  {
    id: "alegreya-alegreya-sans",
    heading: { family: "Alegreya", category: "serif", weights: [700, 800] },
    body: { family: "Alegreya Sans", category: "sans-serif", weights: [400, 500] },
    strategy: "superfamily",
    moods: ["editorial", "elegant"],
    useCases: ["editorial", "longform", "blog"],
    rationale:
      "Alegreya and Alegreya Sans were designed together by Huerta Tipográfica as a calligraphic, literature-oriented superfamily. The serif has a dynamic, slightly humanist rhythm ideal for long reading; the sans echoes its proportions for captions, decks, and UI. Built as a matched pair, they hold a warm, bookish tone across the whole page.",
    source: {
      type: "expert",
      citation: "Huerta Tipográfica — Alegreya type system",
      url: "https://fonts.google.com/specimen/Alegreya",
    },
    availability: ["google", "figma", "adobe"],
    palettes: [
      { harmony: "analogous", colors: ["#3A2E2A", "#9C6B3F", "#F6F0E8"] },
    ],
  },
  {
    id: "archivo-archivo-narrow",
    heading: { family: "Archivo", category: "sans-serif", weights: [700, 800] },
    body: { family: "Archivo Narrow", category: "sans-serif", weights: [400, 500] },
    strategy: "mono-accent",
    moods: ["modern", "bold"],
    useCases: ["web", "product", "landing"],
    rationale:
      "Archivo and Archivo Narrow share one grotesque design at two widths. Setting headlines in the standard width and dense body or labels in the narrow cut creates economy and contrast while keeping a single consistent voice. It's a width-based version of the mono-accent idea — one personality, varied to do two jobs.",
    source: {
      type: "expert",
      citation: "Google Fonts — Archivo family (regular + narrow widths)",
      url: "https://fonts.google.com/specimen/Archivo",
    },
    availability: ["google", "figma"],
    palettes: [
      { harmony: "complementary", colors: ["#141414", "#FF4D2E", "#F3F3F1"] },
    ],
  },
  {
    id: "fraunces-inter",
    heading: { family: "Fraunces", category: "serif", weights: [500, 600, 900] },
    body: { family: "Inter", category: "sans-serif", weights: [400, 500] },
    strategy: "contrast",
    moods: ["editorial", "elegant", "warm"],
    useCases: ["editorial", "branding", "web"],
    rationale:
      "Fraunces is an old-style display serif with deliberate 'wonk' — soft, quirky terminals that feel handmade at large sizes. Against Inter's clinical, screen-optimized neutrality, the personality of the heading is amplified by the calm of the body. High structural contrast between an expressive serif and an invisible sans is the classic recipe for editorial pages.",
    source: {
      type: "expert",
      citation: "Google Fonts Knowledge — pairing display and text faces",
      url: "https://fonts.google.com/knowledge",
    },
    availability: ["google", "figma"],
    palettes: [
      { harmony: "complementary", colors: ["#2B2118", "#C2410C", "#FBF7F1"] },
    ],
  },
  {
    id: "poppins-lora",
    heading: { family: "Poppins", category: "sans-serif", weights: [600, 700] },
    body: { family: "Lora", category: "serif", weights: [400, 500] },
    strategy: "contrast",
    moods: ["modern", "friendly"],
    useCases: ["web", "landing", "blog"],
    rationale:
      "Poppins is a rounded geometric sans — circular, even, and friendly — which gives headings an approachable, contemporary feel. Lora answers with a warm, moderate-contrast serif tuned for comfortable reading. The inverted convention (sans heading over serif body) keeps things modern up top while the serif makes long paragraphs inviting.",
    source: {
      type: "rule-based",
      citation: null,
      url: null,
    },
    availability: ["google", "canva", "figma"],
    palettes: [
      { harmony: "analogous", colors: ["#243B53", "#3EBD93", "#F0F4F8"] },
    ],
  },
  {
    id: "oswald-cardo",
    heading: { family: "Oswald", category: "sans-serif", weights: [500, 600, 700] },
    body: { family: "Cardo", category: "serif", weights: [400] },
    strategy: "contrast",
    moods: ["bold", "editorial"],
    useCases: ["editorial", "poster", "web"],
    rationale:
      "Oswald is a tall, tightly-spaced condensed sans descended from classic gothic newspaper types — it packs loud, space-efficient headlines. Cardo is an old-style serif built for scholarly text, generous and calm at reading sizes. The pairing trades on a strong vertical-vs-horizontal contrast: compressed display energy over relaxed, literary body copy.",
    source: {
      type: "rule-based",
      citation: null,
      url: null,
    },
    availability: ["google", "figma"],
    palettes: [
      { harmony: "monochromatic", colors: ["#1C1C1C", "#8C2F2F", "#F4F1EC"] },
    ],
  },
  {
    id: "bebas-neue-montserrat",
    heading: { family: "Bebas Neue", category: "sans-serif", weights: [400] },
    body: { family: "Montserrat", category: "sans-serif", weights: [400, 500] },
    strategy: "mono-accent",
    moods: ["bold", "modern"],
    useCases: ["poster", "branding", "landing"],
    rationale:
      "Bebas Neue is an all-caps condensed display face — pure poster impact, no lowercase to soften it. Montserrat shares a geometric, even sensibility but in a fully readable proportional sans, so it carries the body without fighting the headline. Two sans faces, one all-caps statement and one quiet workhorse: distinctiveness up top, clarity below.",
    source: {
      type: "rule-based",
      citation: null,
      url: null,
    },
    availability: ["google", "canva", "figma"],
    palettes: [
      { harmony: "complementary", colors: ["#101820", "#FEE715", "#FAFAFA"] },
    ],
  },
  {
    id: "libre-baskerville-source-sans",
    heading: { family: "Libre Baskerville", category: "serif", weights: [700] },
    body: { family: "Source Sans 3", category: "sans-serif", weights: [400, 600] },
    strategy: "contrast",
    moods: ["classic", "trustworthy"],
    useCases: ["editorial", "blog", "web"],
    rationale:
      "Libre Baskerville is a web-optimized take on the transitional Baskerville — taller x-height and sturdier than the original so it survives at screen sizes. As a bold heading it brings traditional authority; Source Sans 3 keeps the body neutral and current. It's a measured, trustworthy contrast: a familiar book serif over a clean humanist sans.",
    source: {
      type: "rule-based",
      citation: null,
      url: null,
    },
    availability: ["google", "figma", "adobe"],
    palettes: [
      { harmony: "monochromatic", colors: ["#1F2933", "#3E4C59", "#F5F7FA"] },
    ],
  },
  {
    id: "work-sans-bitter",
    heading: { family: "Work Sans", category: "sans-serif", weights: [600, 700] },
    body: { family: "Bitter", category: "serif", weights: [400, 500] },
    strategy: "contrast",
    moods: ["modern", "warm"],
    useCases: ["web", "product", "blog"],
    rationale:
      "Work Sans is a grotesque sans whose middle weights are optimized for on-screen UI — clean, slightly quirky headings. Bitter is a contemporary slab serif designed specifically for comfortable screen reading, with sturdy slabs and an ample x-height. Sans heading over slab-serif body gives a modern surface with cozy, readable paragraphs.",
    source: {
      type: "rule-based",
      citation: null,
      url: null,
    },
    availability: ["google", "figma"],
    palettes: [
      { harmony: "analogous", colors: ["#28303D", "#C26B3D", "#F7F3EE"] },
    ],
  },
  {
    id: "cormorant-montserrat",
    heading: { family: "Cormorant Garamond", category: "serif", weights: [500, 600] },
    body: { family: "Montserrat", category: "sans-serif", weights: [400, 500] },
    strategy: "contrast",
    moods: ["luxury", "elegant"],
    useCases: ["branding", "editorial", "fashion"],
    rationale:
      "Cormorant Garamond is a high-contrast display Garamond — delicate, calligraphic, and unmistakably luxurious at large sizes. Montserrat grounds it with wide, even geometry that reads as modern and clean. The pairing is a staple of fashion and hospitality branding: refined serif glamour balanced by a confident, contemporary sans.",
    source: {
      type: "rule-based",
      citation: null,
      url: null,
    },
    availability: ["google", "canva", "figma"],
    palettes: [
      { harmony: "complementary", colors: ["#1A1A1A", "#B08D57", "#F8F5F0"] },
    ],
  },
  {
    id: "eb-garamond-montserrat",
    heading: { family: "Montserrat", category: "sans-serif", weights: [600, 700] },
    body: { family: "EB Garamond", category: "serif", weights: [400, 500] },
    strategy: "contrast",
    moods: ["classic", "editorial"],
    useCases: ["editorial", "longform", "branding"],
    rationale:
      "EB Garamond is a faithful revival of Claude Garamont's sixteenth-century types — a benchmark for graceful, low-fatigue body text. Pairing it under Montserrat headings sets a crisp modern frame around timeless reading copy. The old serif supplies literary warmth in paragraphs; the geometric sans keeps titles current.",
    source: {
      type: "expert",
      citation: "Butterick, Practical Typography — \"Font pairing\"",
      url: "https://practicaltypography.com/font-pairing.html",
    },
    availability: ["google", "figma", "adobe"],
    palettes: [
      { harmony: "monochromatic", colors: ["#22223B", "#4A4E69", "#F2E9E4"] },
    ],
  },
  {
    id: "spectral-karla",
    heading: { family: "Spectral", category: "serif", weights: [500, 600] },
    body: { family: "Karla", category: "sans-serif", weights: [400, 500] },
    strategy: "contrast",
    moods: ["editorial", "modern"],
    useCases: ["editorial", "blog", "web"],
    rationale:
      "Spectral is a serif designed by Production Type for screen-first reading and document interfaces — sharp, calm, and steady. Karla is a grotesque sans with a touch of warmth and unusual proportions. Serif heading over grotesque body inverts nothing dramatic; instead it's a quiet, well-mannered editorial contrast suited to long-form web.",
    source: {
      type: "rule-based",
      citation: null,
      url: null,
    },
    availability: ["google", "figma"],
    palettes: [
      { harmony: "analogous", colors: ["#2D3142", "#4F5D75", "#F4F4F8"] },
    ],
  },
  {
    id: "newsreader-public-sans",
    heading: { family: "Newsreader", category: "serif", weights: [500, 600] },
    body: { family: "Public Sans", category: "sans-serif", weights: [400, 500] },
    strategy: "contrast",
    moods: ["editorial", "trustworthy"],
    useCases: ["editorial", "docs", "web"],
    rationale:
      "Newsreader is drawn for the reading experience of long news articles — a sturdy, slightly old-style serif with clear texture at text sizes. Public Sans is a neutral, no-nonsense grotesque (built for U.S. government interfaces) that signals plainness and trust. The pair feels journalistic: an authoritative serif voice over a strictly utilitarian sans.",
    source: {
      type: "rule-based",
      citation: null,
      url: null,
    },
    availability: ["google", "figma"],
    palettes: [
      { harmony: "monochromatic", colors: ["#1B1B1B", "#205493", "#F0F0F0"] },
    ],
  },
  {
    id: "plus-jakarta-lora",
    heading: { family: "Plus Jakarta Sans", category: "sans-serif", weights: [600, 700] },
    body: { family: "Lora", category: "serif", weights: [400, 500] },
    strategy: "contrast",
    moods: ["modern", "friendly"],
    useCases: ["product", "web", "landing"],
    rationale:
      "Plus Jakarta Sans is a contemporary geometric sans with subtly playful details, popular for product and startup interfaces. Lora's warm, moderate-contrast serif softens the body and adds a human, editorial note. A clean modern heading over a readable serif keeps a product page feeling both current and approachable.",
    source: {
      type: "rule-based",
      citation: null,
      url: null,
    },
    availability: ["google", "figma"],
    palettes: [
      { harmony: "complementary", colors: ["#1E293B", "#6366F1", "#F1F5F9"] },
    ],
  },
  {
    id: "sora-inter",
    heading: { family: "Sora", category: "sans-serif", weights: [600, 700] },
    body: { family: "Inter", category: "sans-serif", weights: [400, 500] },
    strategy: "mono-accent",
    moods: ["technical", "modern"],
    useCases: ["product", "landing", "web"],
    rationale:
      "Sora is a geometric sans with a slightly technical, precise character that works well for crypto and developer-product headings. Inter remains the reliable UI body. Keeping both in the sans family but letting Sora carry a distinct heading texture is a classic mono-accent split — a little flavor at the top, total neutrality in the running text.",
    source: {
      type: "rule-based",
      citation: null,
      url: null,
    },
    availability: ["google", "figma"],
    palettes: [
      { harmony: "complementary", colors: ["#0B1220", "#22D3EE", "#F8FAFC"] },
    ],
  },
  {
    id: "crimson-pro-inter",
    heading: { family: "Crimson Pro", category: "serif", weights: [600, 700] },
    body: { family: "Inter", category: "sans-serif", weights: [400, 500] },
    strategy: "contrast",
    moods: ["classic", "editorial"],
    useCases: ["reading", "blog", "editorial"],
    rationale:
      "Crimson Pro is an old-style book serif inspired by classic Garamond-era text faces, with a literary, low-key elegance. Used as a heading it lends a bookish authority; Inter underneath keeps the body crisp and screen-friendly. A traditional text serif paired with a modern UI sans bridges print heritage and digital clarity.",
    source: {
      type: "rule-based",
      citation: null,
      url: null,
    },
    availability: ["google", "figma"],
    palettes: [
      { harmony: "monochromatic", colors: ["#2C2A28", "#6B5B4A", "#F6F4F1"] },
    ],
  },
  {
    id: "josefin-libre-baskerville",
    heading: { family: "Josefin Sans", category: "sans-serif", weights: [500, 600] },
    body: { family: "Libre Baskerville", category: "serif", weights: [400] },
    strategy: "contrast",
    moods: ["elegant", "classic"],
    useCases: ["fashion", "branding", "web"],
    rationale:
      "Josefin Sans is a geometric Art-Deco-flavored sans with tall, elegant proportions and a vintage poster feel. Libre Baskerville answers with a steady transitional serif for the body. The deco sans heading sets a refined, slightly retro tone, while the classic serif keeps reading comfortable — a stylish fit for boutique and editorial brands.",
    source: {
      type: "rule-based",
      citation: null,
      url: null,
    },
    availability: ["google", "figma"],
    palettes: [
      { harmony: "analogous", colors: ["#2E2A33", "#8E7C93", "#F5F1F6"] },
    ],
  },
  {
    id: "bricolage-inter",
    heading: { family: "Bricolage Grotesque", category: "sans-serif", weights: [600, 700] },
    body: { family: "Inter", category: "sans-serif", weights: [400, 500] },
    strategy: "mono-accent",
    moods: ["modern", "bold", "editorial"],
    useCases: ["editorial", "landing", "branding"],
    rationale:
      "Bricolage Grotesque is an expressive, intentionally idiosyncratic grotesque — irregular details that give display text real character. Inter keeps the body neutral so that character doesn't fatigue the reader. One sans with a strong voice up top and one invisible sans below is the mono-accent strategy at its most contemporary.",
    source: {
      type: "rule-based",
      citation: null,
      url: null,
    },
    availability: ["google", "figma"],
    palettes: [
      { harmony: "complementary", colors: ["#171717", "#E11D48", "#FAFAFA"] },
    ],
  },
  {
    id: "raleway-merriweather",
    heading: { family: "Raleway", category: "sans-serif", weights: [600, 700] },
    body: { family: "Merriweather", category: "serif", weights: [400] },
    strategy: "contrast",
    moods: ["elegant", "modern"],
    useCases: ["web", "landing", "blog"],
    rationale:
      "Raleway is an elegant, slightly stylized geometric sans (note its distinctive 'w') that gives headings a refined, modern poise. Merriweather is engineered for comfortable on-screen reading with sturdy serifs and a tall x-height. A graceful sans title over a robust reading serif is a dependable, widely-used web pairing.",
    source: {
      type: "rule-based",
      citation: null,
      url: null,
    },
    availability: ["google", "canva", "figma"],
    palettes: [
      { harmony: "analogous", colors: ["#22303C", "#4B6B7A", "#EEF3F5"] },
    ],
  },
];
