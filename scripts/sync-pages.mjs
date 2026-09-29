import { copyFileSync, existsSync, mkdirSync } from "node:fs";

// Pages serves the repository root, not dist/. Copy the built entry files to
// the paths index.html already references.
const files = [
  ["dist/assets/index.js", "assets/index.js"],
  ["dist/assets/index.css", "assets/index.css"],
  ["dist/favicon.svg", "favicon.svg"],
];

for (const [from] of files) {
  if (!existsSync(from)) {
    console.error(`Missing build output: ${from}`);
    process.exit(1);
  }
}

mkdirSync("assets", { recursive: true });
for (const [from, to] of files) {
  copyFileSync(from, to);
  console.log(`${from} -> ${to}`);
}
