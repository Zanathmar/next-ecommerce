/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        teko: ["Teko", "serif"],
        poppins: ["Poppins", "serif"],
      },
      colors: {
        light: "#fbfaf0",
        dark: "#1e2b3a",
      },
    },
  },
  plugins: [],
};
