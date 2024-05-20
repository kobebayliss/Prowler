import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      brightness: {
        60: '.65',
      },
      spacing: {
        'restscreen': '95.2vh',
        'carouselsize': '1200px',
      },
      colors: {
        'midnight': '#090a0b',
        'offwhite': '#EFEFEF',
        'greyish': '#c9c9c9',
        'grey': '#8c8c8c',
        'lightmidnight': '#27272a',
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      margin: {
        '18': '72px',
        '4.5': '18px',
        '4.5px': '4.5px',
        'overlay': '1044px',
      },
      height: {
        '4.5': '18px',
        'carousel': '1200px',
      },
      width: {
        '4.5': '18px',
        '30': '120px',
        '100': '550px',
        '70%': '70%',
        'carousel': '1200px',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        '4xl': '3rem',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    fontFamily: {
      azosans: ["azosans", "sans-serif"],
      galvji: ["galvji", "sans-serif"],
      inter: ["inter", "sans-serif"],
      roboto: ["roboto", "sans-serif"],
      interbold: ["interbold", "sans-serif"],
      interlight: ["interlight", "sans-serif"],
    },
    fontSize: {
      sm: '0.8rem',
      base: '1rem',
      xl: '1.75rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
      'header': '1.8rem',
      'title': '6.4rem',
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config