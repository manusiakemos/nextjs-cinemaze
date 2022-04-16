const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Lato", defaultTheme.fontFamily.sans],
        bidy: ["Lato", defaultTheme.fontFamily.sans],
        serif: ["Merriweather", defaultTheme.fontFamily.serif],
        display: ["Righteous"],
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        black: colors.black,
        white: colors.white,
        gray: {
          '50': '#f5f5f5',
          '100': '#ebebeb',
          '200': '#cccccc',
          '300': '#adadad',
          '400': '#707070',
          '500': '#323232',
          '600': '#2d2d2d',
          '700': '#262626',
          '800': '#1e1e1e',
          '900': '#191919'
        },
        dark: colors.gray,
        primary: {
          50: "#fff7f7",
          100: "#ffeeef",
          200: "#fed5d6",
          300: "#febbbe",
          400: "#fd888d",
          500: "#f84a51",
          600: "#e34d53",
          700: "#bd4045",
          800: "#973337",
          900: "#7b2a2d",
        },
        blue: colors.blue,
        secondary: {
          50: "#f9f2f4",
          100: "#f2e6e9",
          200: "#dfbfc7",
          300: "#cc99a6",
          400: "#a64d63",
          500: "#800020",
          600: "#73001d",
          700: "#600018",
          800: "#4d0013",
          900: "#3f0010",
        },
        indigo: colors.indigo,
        danger: colors.red,
        red: colors.red,
        success: colors.emerald,
        green: colors.emerald,
        yellow: colors.amber,
        warning: colors.amber,
      },
    },
  },
  plugins: [
      require("@tailwindcss/aspect-ratio"),
      require("@tailwindcss/forms")({
        strategy: 'base', // only generate global styles
        // strategy: 'class', // only generate classes
      }),
    ],
};

