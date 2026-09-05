// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--on-surface))",
        card: {
          DEFAULT: "hsl(var(--surface))",
          foreground: "hsl(var(--on-surface))",
        },
        popover: {
          DEFAULT: "hsl(var(--surface))",
          foreground: "hsl(var(--on-surface))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--on-primary))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--on-secondary))",
        },
        tertiary: {
          DEFAULT: "hsl(var(--tertiary))",
          foreground: "hsl(var(--on-tertiary))",
        },
        muted: {
          DEFAULT: "hsl(var(--surface-container-high))",
          foreground: "hsl(var(--on-surface-variant))",
        },
        accent: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--on-secondary))",
        },
        destructive: {
          DEFAULT: "hsl(var(--error))",
          foreground: "hsl(var(--on-error))",
        },
        border: "hsl(var(--outline-variant))",
        input: "hsl(var(--surface-container-high))",
        ring: "hsl(var(--primary))",
        surface: {
          DEFAULT: "hsl(var(--surface))",
          dim: "hsl(var(--surface-dim))",
          bright: "hsl(var(--surface-bright))",
          variant: "hsl(var(--surface-variant))",
          container: {
            lowest: "hsl(var(--surface-container-lowest))",
            low: "hsl(var(--surface-container-low))",
            DEFAULT: "hsl(var(--surface-container))",
            high: "hsl(var(--surface-container-high))",
            highest: "hsl(var(--surface-container-highest))",
          },
        },
        on: {
          surface: "hsl(var(--on-surface))",
          "surface-variant": "hsl(var(--on-surface-variant))",
          primary: "hsl(var(--on-primary))",
          secondary: "hsl(var(--on-secondary))",
          tertiary: "hsl(var(--on-tertiary))",
          error: "hsl(var(--on-error))",
        },
        inverse: {
          surface: "hsl(var(--inverse-surface))",
          "on-surface": "hsl(var(--inverse-on-surface))",
          primary: "hsl(var(--inverse-primary))",
        },
        outline: {
          DEFAULT: "hsl(var(--outline))",
          variant: "hsl(var(--outline-variant))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        "title-md": ["Inter", "sans-serif"],
        "body-md": ["Inter", "sans-serif"],
        "headline-lg": ["Inter", "sans-serif"],
        "headline-lg-mobile": ["Inter", "sans-serif"],
        "display-lg": ["Inter", "sans-serif"],
        "label-sm": ["Inter", "sans-serif"],
        "body-lg": ["Inter", "sans-serif"],
      },
      fontSize: {
        "title-md": ["20px", { lineHeight: "28px", fontWeight: "600" }],
        "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "headline-lg": [
          "32px",
          { lineHeight: "40px", letterSpacing: "-0.01em", fontWeight: "700" },
        ],
        "headline-lg-mobile": [
          "28px",
          { lineHeight: "34px", fontWeight: "700" },
        ],
        "display-lg": [
          "48px",
          { lineHeight: "56px", letterSpacing: "-0.02em", fontWeight: "800" },
        ],
        "label-sm": [
          "13px",
          { lineHeight: "16px", letterSpacing: "0.05em", fontWeight: "600" },
        ],
        "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
      },
    },
  },
  plugins: [],
};

export default config;
