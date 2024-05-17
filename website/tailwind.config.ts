import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      margin: {
        '18': '72px',
        '4.5': '18px',
      },
      height: {
        '4.5': '18px',
      },
      width: {
        '4.5': '18px',
        '30': '120px',
      }
    },
    colors: {
      'midnight': '#0d1426',
      'offwhite': '#EFEFEF',
      'greyish': '#D1D1D1',
      'lightmidnight': '#24386a',
      'button': '#4f73d1',
      'lightbutton': '#46e7f0',
      'buttonhover': '#3157bb',
      'lightbuttonhover': '#11cdd7',
    },
    fontFamily: {
      azosans: ["azosans", "sans-serif"],
      galvji: ["galvji", "sans-serif"],
    },
    fontSize: {
      sm: '0.8rem',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
      'header': '1.8rem',
    }
  },
  plugins: [],
};
export default config;