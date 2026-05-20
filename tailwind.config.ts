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
        "juva-bg-deep": "#0D0F0E",
        "juva-bg-base": "#151716",
        "juva-bg-elevated": "#1D201E",
        "juva-wood": "#8A6240",
        "juva-wood-light": "#A8794C",
        "juva-bronze": "#B58A5A",
        "juva-cream": "#EFE7D8",
        "juva-muted": "#9A9A92",
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      keyframes: {
        "grain-shift": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(-1px, 1px)" },
        },
        "light-sweep": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.7" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "grain-shift": "grain-shift 0.5s steps(2) infinite",
        "light-sweep": "light-sweep 12s ease infinite",
        "glow-pulse": "glow-pulse 4s ease-in-out infinite",
        "fade-up": "fade-up 0.8s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
