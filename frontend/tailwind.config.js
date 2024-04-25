import defaultConfig from "tailwindcss/defaultConfig";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-green": "#BBE9C2",
        "custom-blue": "#77DCF1",
        "custom-pink": "#F3B6A8",
        "custom-hoverpink": "#F6917A",
        "custom-hoverblue": "#30D3F4",
      },
    },
  },
  presets: [defaultConfig],
  plugins: [],
};
