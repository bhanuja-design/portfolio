import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      spacing: {
        "2xs": "4px",
        xs: "8px",
        sm: "12px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        "2xl": "48px",
        "3xl": "64px",
        "4xl": "96px",
      },
      maxWidth: {
        container: "1200px",
        prose: "800px",
      },
    },
  },
};

export default config;
