import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import toIco from "to-ico";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const brandColors = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../app/lib/brand-colors.json"), "utf8")
);
const ACCENT = brandColors.accent;
const SIZES = [16, 32, 48];
const outPath = path.join(__dirname, "../app/favicon.ico");

async function circlePng(size) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="${ACCENT}"/>
</svg>`;

  return sharp(Buffer.from(svg)).png().toBuffer();
}

const buffers = await Promise.all(SIZES.map(circlePng));
const ico = await toIco(buffers);

fs.writeFileSync(outPath, ico);
console.log(`Wrote ${outPath} (${SIZES.join(", ")}px)`);
