import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
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
      fontFamily: {
        Poppins: ["var(--font-Poppins)"],
        Josefin: ["var(--font-Josefin)"],
      },
      colors: {
        border: "hsl(var(--border))",
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
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        changeBackgroundColor: {
          "0%, 100%": {
            opacity: "1",
          },
          "16.67%": {
            opacity: "0.9",
          },
          "33.33%": {
            opacity: "0.8",
          },
          "50%": {
            opacity: "0.6",
          },
          "66.67%": {
            opacity: "0.5",
          },
          "83.33%": {
            opacity: "0.4",
          },
        },
        shake: {
          "0%": {
            transform: "translateX(0)",
          },
          "20%": {
            transform: "translateX(-2px)",
          },
          "40%": {
            transform: "translateX(2px)",
          },
          "60%": {
            transform: "translateX(-2px)",
          },
          "80%": {
            transform: "translateX(2px)",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },
        "vibrate-slow": {
          "0%, 100%": {
            transform: "translateX(0)",
          },
          "10%, 30%, 50%, 70%, 90%": {
            transform: "translateX(-5px)",
          },
          "20%, 40%, 60%, 80%": {
            transform: "translateX(5px)",
          },
        },
        loading: {
          "0%": {
            opacity: "0.3",
            transform: "translateY(0px)",
          },
          "20%": {
            opacity: "1",
            transform: "translateY(-3px)",
          },
          "40%": {
            opacity: "0.3",
            transform: "translateY(0px)",
          },
          "100%": {
            opacity: "0.3",
            transform: "translateY(0px)",
          },
        },
        spotlight: {
          "0%": {
            opacity: "0",
            transform: "translate(-72%, -62%) scale(0.5)",
          },
          "100%": {
            opacity: "1",
            transform: "translate(-50%,-40%) scale(1)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shake: "shake 0.5s ease-in-out",
        "vibrate-slow":
          "vibrate-slow 0.8s cubic-bezier(0.455, 0.03, 0.515, 0.955) 1",
        loading: "1.25s ease-in-out 0s infinite normal none running loading",
        spotlight: "spotlight 2s ease .75s 1 forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
