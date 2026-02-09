import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"]
      },
      colors: {
        "garden-leaf": "#89F1C3",
        "garden-sky": "#6B9AFE",
        "garden-night": "#0B1220",
        "garden-sun": "#F2C94C"
      },
      boxShadow: {
        glow: "0 0 45px rgba(105, 156, 254, 0.35)"
      }
    }
  },
  plugins: []
};

export default config;
