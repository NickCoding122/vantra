import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-vantra-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-vantra-serif)", "Georgia", "serif"]
      }
    }
  },
  plugins: []
};

export default config;
