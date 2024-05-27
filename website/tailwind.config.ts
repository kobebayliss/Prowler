import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx,js}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    screens: {
      'lg': '1050px',
      'tablet': '710px',
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      scale: {
        '103': '1.03',
      },
      gridTemplateColumns: {
        'autofit': 'repeat(auto-fit, minmax(400px, 1fr))',
      },
      ringWidth: {
        '0.5': '0.5px',
      },
      padding: {
        '4.5': '18px',
        '19': '70px',
      },
      brightness: {
        90: '.85',
        80: '.75',
      },
      spacing: {
        'restscreen': '95.2vh',
        'carouselsize': '1200px',
      },
      colors: {
        'midnight': '#141618',
        'offwhite': '#EFEFEF',
        'greyish': '#c9c9c9',
        'grey': '#7f7f7f',
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
        'responsivemargin': '14%',
        '7.5': '30px',
        '2.3': '6px',
        '22': '84px',
        '19': '76px',
        '18': '72px',
        '13': '52px',
        '4.5': '18px',
        '9': '38px',
        '0.3': '1px',
        '4.5px': '4.5px',
        'overlay': '1044px',
        'searchmargin': '21vh',
        'top': '1vh',
      },
      height: {
        'cardimage': '66%',
        '4.5': '18px',
        'carousel': '1200px',
        'popup': '12vh',
        'line': '3.5vh',
        'search': '2.2rem',
        'logos': '3.2vh',
        'searchbox': '4vh',
        '70': '290px',
        '5.5': '22px',
        'card': '34vh',
      },
      width: {
        '0.4': '1.5px',
        '0.2': '0.5px',
        '4.5': '18px',
        '30': '120px',
        '100': '550px',
        'card': '100%',
        '34%': '50%',
        '100%': '100%',
        '26': '100px',
        '38': '164px',
        'carousel': '700px',
        'half': '50%',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        '4xl': '3rem',
        'searchbox': '0.6rem',
      },
      keyframes: {
        slideup: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        slidedown: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(100%)' },
        },
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
        slideup: 'slideup 0.2s ease-out forwards',
        slidedown: 'slidedown 0.2s ease-out forwards',
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
      'filter': '1.08rem',
      'search': '2.0vh',
      'prices': '2vh',
      xl: '2.2vh',
      '2xl': '2.9vh',
      '3xl': '2.05rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
      'header': '1.8rem',
      'title': '7.2vh',
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
