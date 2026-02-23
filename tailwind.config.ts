import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#414042",
          dark: "#1e1d1f",
          light: "#5f5d61",
        },
        sand: {
          DEFAULT: "#f2ede0",
          dark: "#e5dcc8",
        },
        ocean: "#6AA095",
        amber: "#D85423",
      },
      fontFamily: {
        sans: ["var(--font-barlow)", "system-ui", "sans-serif"],
        display: ["var(--font-bebas)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
