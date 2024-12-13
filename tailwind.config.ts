/** @type {import('tailwindcss').Config} */

import { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        default: "#ffffff", // Custom color
        primary: "#1755F4", // Custom color
        secondary: "#9333EA", // Another custom color
      },
      screens: {
        xs: "480px", // Extra small screens
        xl: "1280px", // Extra large screens
        "2xl": "1500px", // Extra large screens
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"], // Custom Roboto font
      },
      fontWeight: {
        thin: "100",
        light: "300",
        normal: "400",
        medium: "500",
        bold: "700",
        black: "900",
      },
    },
  },
  plugins: [],
} satisfies Config;
