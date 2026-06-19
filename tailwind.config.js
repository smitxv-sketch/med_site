/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        app: 'var(--app-radius, 1rem)',
      },
      boxShadow: {
        app: 'var(--app-shadow, 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1))',
      },
      spacing: {
        app: 'var(--spacing-base, 1rem)',
        section: 'var(--spacing-section, 2.5rem)',
        gap: 'var(--spacing-gap, 1rem)',
        safe: 'env(safe-area-inset-bottom, 20px)',
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
        surface: {
          muted: 'hsl(var(--brand-h) 20% 97%)',
        },
        brand: {
          DEFAULT: 'hsl(var(--brand-h) var(--brand-s) var(--brand-l) / <alpha-value>)',
          fg: 'var(--brand-fg)',
          green: 'hsl(var(--brand-h) var(--brand-s) var(--brand-l) / <alpha-value>)',
          lightGreen: 'hsl(var(--brand-h) var(--brand-s) calc(var(--brand-l) + 15%) / <alpha-value>)',
          violet: 'hsl(var(--accent-h) var(--accent-s) var(--accent-l) / <alpha-value>)',
          lightViolet: 'hsl(var(--accent-h) var(--accent-s) calc(var(--accent-l) + 15%) / <alpha-value>)',
          orange: 'var(--color-brand-orange)',
          blue: 'var(--color-brand-blue)',
          turquoise: 'var(--color-brand-turquoise)',
        },
        platform: {
          vk: 'var(--color-platform-vk)',
          ok: 'var(--color-platform-ok)',
          prodoctorov: 'var(--color-platform-prodoctorov)',
          'prodoctorov-text': 'var(--color-platform-prodoctorov-text)',
          gis2: 'var(--color-platform-gis2)',
          yandex: 'var(--color-platform-yandex)',
          whatsapp: 'var(--color-platform-whatsapp)',
          prodoctors: 'var(--color-platform-prodoctors)',
        },
        green: {
          50: 'hsl(var(--brand-h) var(--brand-s) 95% / <alpha-value>)',
          100: 'hsl(var(--brand-h) var(--brand-s) 90% / <alpha-value>)',
          200: 'hsl(var(--brand-h) var(--brand-s) 80% / <alpha-value>)',
          300: 'hsl(var(--brand-h) var(--brand-s) 70% / <alpha-value>)',
          400: 'hsl(var(--brand-h) var(--brand-s) 60% / <alpha-value>)',
          500: 'hsl(var(--brand-h) var(--brand-s) var(--brand-l) / <alpha-value>)',
          600: 'hsl(var(--brand-h) var(--brand-s) calc(var(--brand-l) - 10%) / <alpha-value>)',
          700: 'hsl(var(--brand-h) var(--brand-s) calc(var(--brand-l) - 20%) / <alpha-value>)',
          800: 'hsl(var(--brand-h) var(--brand-s) calc(var(--brand-l) - 30%) / <alpha-value>)',
          900: 'hsl(var(--brand-h) var(--brand-s) calc(var(--brand-l) - 40%) / <alpha-value>)',
          950: 'hsl(var(--brand-h) var(--brand-s) 10% / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['var(--font-primary)'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

