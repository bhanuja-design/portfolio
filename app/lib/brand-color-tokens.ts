/** Maps brand-colors.json keys to @theme CSS custom properties in app/styles/tokens.css */
export const BRAND_COLOR_CSS_VARS = {
  background: "--color-background",
  border: "--color-border",
  textPrimary: "--color-text-primary",
  textSecondary: "--color-text-secondary",
  textBody: "--color-text-body",
  accent: "--color-accent",
  accentSecondary: "--color-accent-secondary",
  onAccent: "--color-on-accent",
} as const;

export type BrandColorKey = keyof typeof BRAND_COLOR_CSS_VARS;

/** Normalize #RGB / #RRGGBB to lowercase #rrggbb for comparison. */
export function normalizeHexColor(value: string): string {
  const trimmed = value.trim().toLowerCase();

  if (!trimmed.startsWith("#")) {
    return trimmed;
  }

  const hex = trimmed.slice(1);

  if (hex.length === 3) {
    return `#${hex
      .split("")
      .map((char) => char + char)
      .join("")}`;
  }

  return `#${hex}`;
}

/** Parse hex primitive values from a CSS @theme block. */
export function parseThemeHexColors(css: string): Map<string, string> {
  const colors = new Map<string, string>();
  const pattern = /(--color-[a-z-]+)\s*:\s*(#[0-9a-fA-F]{3,8})\s*;/g;

  for (const match of css.matchAll(pattern)) {
    colors.set(match[1], normalizeHexColor(match[2]));
  }

  return colors;
}
