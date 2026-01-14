import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        mono: ["JetBrains Mono", ...defaultTheme.fontFamily.mono],
      },
      typography: {
        DEFAULT: {
          css: {
            "--tw-prose-body": "#1c1917",      // stone-800
            "--tw-prose-invert-body": "#F3F4F6",      // stone-50
            // "--tw-prose-headings": "#111827",  // stone-900
            // "--tw-prose-links": "#2563EB",
          },
        }
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
