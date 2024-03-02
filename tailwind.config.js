/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        league: ["League Spartan"],
      },
      fontWeight: {
        ExtraBold: 800,
        Bold: 700,
        SemiBold: 600,
        Medium: 500,
        Regular: 400,
        Light: 300,
        ExtraLight: 200,
      },
      colors: {
        blue141: "#2956A8",
        blue306: "#306BAC",
        blue6f9: "#6F9CEB",
        blue98b: "#98B9F2",
        blue918: "#918EF4",
        blue111: "#6EC9F1",
        black999: "#231F20",
        purple911 : "#8C7CF0",
        red1: "#940b20",
      },
      keyframes: {
        wave: {
          "0%": { transform: "rotate(0.0deg)" },
          "10%": { transform: "rotate(14deg)" },
          "20%": { transform: "rotate(-8deg)" },
          "30%": { transform: "rotate(14deg)" },
          "40%": { transform: "rotate(-4deg)" },
          "50%": { transform: "rotate(10.0deg)" },
          "60%": { transform: "rotate(0.0deg)" },
          "100%": { transform: "rotate(0.0deg)" },
        },
      },
      animation: {
        shake: "wave 2s linear infinite",
      },
    },
  },
  plugins: [],
};
