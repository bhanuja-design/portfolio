import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import brandColors from "@/app/lib/brand-colors.json";
import {
  BRAND_COLOR_CSS_VARS,
  normalizeHexColor,
  parseThemeHexColors,
} from "@/app/lib/brand-color-tokens";

const TOKENS_CSS_PATH = path.join(process.cwd(), "app/styles/tokens.css");

describe("brand color token sync", () => {
  const themeCss = fs.readFileSync(TOKENS_CSS_PATH, "utf8");
  const themeColors = parseThemeHexColors(themeCss);

  it("maps every brand-colors.json entry to a @theme hex token", () => {
    for (const [jsonKey, cssVar] of Object.entries(BRAND_COLOR_CSS_VARS)) {
      const jsonValue = brandColors[jsonKey as keyof typeof brandColors];
      const themeValue = themeColors.get(cssVar);

      expect(themeValue, `${cssVar} missing from app/styles/tokens.css`).toBeDefined();
      expect(normalizeHexColor(jsonValue)).toBe(themeValue);
    }
  });

  it("does not leave mapped @theme tokens out of brand-colors.json", () => {
    for (const cssVar of Object.values(BRAND_COLOR_CSS_VARS)) {
      expect(themeColors.has(cssVar), `${cssVar} should be a hex @theme token`).toBe(
        true
      );
    }
  });
});

describe("normalizeHexColor", () => {
  it("expands three-digit hex values", () => {
    expect(normalizeHexColor("#ABC")).toBe("#aabbcc");
  });
});

describe("parseThemeHexColors", () => {
  it("ignores derived non-hex tokens", () => {
    const css = `
      @theme {
        --color-accent: #0f00ab;
        --color-surface: color-mix(in srgb, var(--color-border) 50%, var(--color-background));
      }
    `;

    expect(parseThemeHexColors(css).get("--color-accent")).toBe("#0f00ab");
    expect(parseThemeHexColors(css).has("--color-surface")).toBe(false);
  });
});
