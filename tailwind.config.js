/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      card: "#404040",
      cardBorder: "#2b2b2b",
      input: "#404040",
      inputBorder: "#2b2b2b",
      inputRing: "#2b2b2b",
      inputText: "#ABABAB",
      button: "#404040",
      buttonBorder: "#2b2b2b",
      buttonText: "#ABABAB",
      cardText: "#ABABAB",
      cardSubText: "#8a8888",
      headerText: "#ABABAB",
    },
  },
  plugins: [],
};
