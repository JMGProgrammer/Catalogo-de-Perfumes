import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#FAFAF8",
        ink: "#0A0A0A",
        stone: "#6B6B6B",
        mist: "#E8E6E1",
        sand: "#D4C9B8",
        gold: "#B8A082",
        "gold-light": "#E8D5BC",
      },
      fontFamily: {
        display: ["Cormorant Garamond", "serif"],
        body: ["DM Sans", "sans-serif"],
      },
      fontSize: {
        "2xs": ["0.65rem", { letterSpacing: "0.2em" }],
      },
      maxWidth: {
        site: "1440px",
      },
      transitionTimingFunction: {
        silk: "cubic-bezier(0.25, 0.1, 0.25, 1)",
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      transitionDuration: {
        400: "400ms",
        600: "600ms",
        800: "800ms",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) forwards",
        "fade-up-2": "fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.15s forwards",
        "fade-up-3": "fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.3s forwards",
        "fade-up-4": "fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.45s forwards",
        "fade-up-5": "fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.6s forwards",
      },
    },
  },
  plugins: [],
};

export default config;
