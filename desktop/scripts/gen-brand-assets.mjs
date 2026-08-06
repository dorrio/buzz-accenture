// Brand asset generator for the Accenture Connect rebrand.
//
// Rasterizes the master brand images from the official Accenture chevron and
// wordmark. Run it, then reshape the masters into the per-platform icon sizes
// (see docs/accenture-rebrand.md § "Regenerar iconos").
//
// Usage (from repo root, with Hermit active):
//   node desktop/scripts/gen-brand-assets.mjs <out-dir> [logo-svg]
//     <out-dir>   directory to write the masters into (e.g. a temp dir)
//     [logo-svg]  path to the official logo (default: desktop/public/accenture-logo.svg)
//
// Produces in <out-dir>:
//   ac-icon-1024.png        chevron on dark, 1024²   (tauri/iOS/legacy launcher)
//   ac-foreground-1024.png  chevron transparent, 1024² (Android adaptive fg)
//   ac-wordmark-777x326.png  "accenture>" dark text   (desktop onboarding)
//   ac-mobile-294x197.png    chevron, transparent     (mobile logo)
//
// Requires @playwright/test with a chromium browser installed
// (pnpm --filter buzz exec playwright install chromium).

import { readFileSync } from "node:fs";
import { chromium } from "@playwright/test";

const OUT = process.argv[2] ?? ".";
const LOGO = process.argv[3] ?? "desktop/public/accenture-logo.svg";
const PURPLE = "#a100ff";
const DARK = "#0b0b0b";

// Official Accenture ">" chevron, normalized to a 12.08 x 12.77 box.
// If the source logo changes, re-extract this polygon from accenture-logo.svg.
const CHEVRON = (fill) =>
  `<polygon points="0,9.02 7.05,6.4 0,3.65 0,0 12.07,4.85 12.08,7.88 0.01,12.77" fill="${fill}"/>`;

const browser = await chromium.launch();

async function shot(html, w, h, out, omitBackground = false) {
  const page = await browser.newPage({
    viewport: { width: w, height: h },
    deviceScaleFactor: 1,
  });
  await page.setContent(
    `<!doctype html><html><body style="margin:0;padding:0">${html}</body></html>`,
  );
  await page.screenshot({
    path: out,
    omitBackground,
    clip: { x: 0, y: 0, width: w, height: h },
  });
  await page.close();
  console.log("wrote", out);
}

// 1. icon master — chevron on dark, ~55% of a 1024 square
await shot(
  `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024"><rect width="1024" height="1024" fill="${DARK}"/><g transform="translate(245.6,230.5) scale(44.1)">${CHEVRON(PURPLE)}</g></svg>`,
  1024,
  1024,
  `${OUT}/ac-icon-1024.png`,
);

// 2. Android adaptive foreground — chevron on transparent, ~48% (safe zone)
await shot(
  `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024"><g transform="translate(280,267) scale(38.4)">${CHEVRON(PURPLE)}</g></svg>`,
  1024,
  1024,
  `${OUT}/ac-foreground-1024.png`,
  true,
);

// 3. desktop wordmark — official logo, dark text for light backgrounds, 777x326
const logo = readFileSync(LOGO, "utf8").replace(/#FFF/gi, "#16121a");
await shot(
  `<div style="display:flex;align-items:center;justify-content:center;width:777px;height:326px;">${logo.replace("<svg ", '<svg width="720" height="190" ')}</div>`,
  777,
  326,
  `${OUT}/ac-wordmark-777x326.png`,
  true,
);

// 4. mobile compact logo — chevron centered, 294x197
await shot(
  `<svg xmlns="http://www.w3.org/2000/svg" width="294" height="197" viewBox="0 0 294 197"><g transform="translate(90.2,38.5) scale(9.4)">${CHEVRON(PURPLE)}</g></svg>`,
  294,
  197,
  `${OUT}/ac-mobile-294x197.png`,
  true,
);

// 5. Agent avatars — brand placeholders for the starter team (Aria/Sage/Nova).
// Targets are aria/sage/nova.png (renamed from the old fizz/honey/bumble bee art).
// Initial + chevron on a purple radial, one tone per agent so the three read
// as a coherent-but-distinct team. Copy each to its starter-team/*.png target.
const AGENTS = [
  { initial: "A", from: "#B23BFF", to: "#7500c0", out: "ac-agent-aria.png" }, // → aria.png
  { initial: "S", from: "#C27DFF", to: "#9b4dff", out: "ac-agent-sage.png" }, // → sage.png
  { initial: "N", from: "#8E24E8", to: "#4a148c", out: "ac-agent-nova.png" }, // → nova.png
];
for (const a of AGENTS) {
  await shot(
    `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><defs><radialGradient id="g" cx="38%" cy="30%" r="85%"><stop offset="0%" stop-color="${a.from}"/><stop offset="100%" stop-color="${a.to}"/></radialGradient></defs><circle cx="256" cy="256" r="252" fill="url(#g)"/><text x="256" y="244" font-family="-apple-system,Arial,sans-serif" font-size="250" font-weight="700" fill="#ffffff" text-anchor="middle" dominant-baseline="central">${a.initial}</text><g transform="translate(228,392) scale(4.6)" opacity="0.92">${CHEVRON("#ffffff")}</g></svg>`,
    512,
    512,
    `${OUT}/${a.out}`,
    true,
  );
}

// 6. Mobile splash mark — chevron on transparent. The splash background is
// black (Android layer-list + iOS storyboard), so only the mark is needed.
// One 1152² master; sips down to each Android density and iOS @1x/2x/3x.
await shot(
  `<svg xmlns="http://www.w3.org/2000/svg" width="1152" height="1152" viewBox="0 0 1152 1152"><g transform="translate(317,302) scale(42.9)">${CHEVRON(PURPLE)}</g></svg>`,
  1152,
  1152,
  `${OUT}/ac-launch-1152.png`,
  true,
);

// 7. macOS .dmg installer background — brand gradient + wordmark. Keep the
// existing 1320x1000 canvas so the tauri.conf window/icon positions still hold.
const dmgLogo = readFileSync(LOGO, "utf8").replace(/#FFF/gi, "#2a0a4d");
await shot(
  `<div style="width:1320px;height:1000px;background:linear-gradient(160deg,#f4eefb,#ece2fb);display:flex;flex-direction:column;align-items:center;font-family:-apple-system,Arial,sans-serif;">
     <div style="margin-top:150px;">${dmgLogo.replace("<svg ", '<svg width="560" height="148" ')}</div>
     <div style="margin-top:36px;color:#6b3fa0;font-size:32px;font-weight:500;letter-spacing:0.5px;">Drag the app onto the Applications folder</div>
   </div>`,
  1320,
  1000,
  `${OUT}/ac-dmg-background.png`,
);

await browser.close();
console.log("done");
