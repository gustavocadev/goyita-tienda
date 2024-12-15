import { fontFamily } from 'tailwindcss/defaultTheme';
import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{html,js,svelte,ts}'],
  safelist: ['dark'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(288.2, 33.2%, 89.5%)',
        input: 'hsl(288.2, 33.2%, 89.5%)',
        ring: 'hsl(305.2, 76.7%, 66.7%)',
        background: 'hsl(294.2, 79.6%, 97%)',
        foreground: 'hsl(287.2, 93.7%, 5.1%)',
        primary: {
          DEFAULT: 'hsl(290.2, 62.4%, 75.8%)',
          foreground: 'hsl(305.2, 96.4%, 17.6%)',
        },
        secondary: {
          DEFAULT: 'hsl(293.2, 55.9%, 89.3%)',
          foreground: 'hsl(288.2, 25.4%, 3.1%)',
        },
        destructive: {
          DEFAULT: 'hsl(287.2, 45.7%, 28.9%)',
          foreground: 'hsl(306.2, 77.1%, 88.1%)',
        },
        muted: {
          DEFAULT: 'hsl(293.2, 55.9%, 89.3%)',
          foreground: 'hsl(296.2, 36.5%, 17%)',
        },
        accent: {
          DEFAULT: 'hsl(293.2, 55.9%, 89.3%)',
          foreground: 'hsl(288.2, 25.4%, 3.1%)',
        },
        popover: {
          DEFAULT: 'hsl(294.2, 79.6%, 97%)',
          foreground: 'hsl(287.2, 93.7%, 5.1%)',
        },
        card: {
          DEFAULT: 'hsl(294.2, 79.6%, 97%)',
          foreground: 'hsl(287.2, 93.7%, 5.1%)',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: '0.5rem',
        md: 'calc(0.5rem - 2px)',
        sm: 'calc(0.5rem - 4px)',
      },
      fontFamily: {
        sans: [...fontFamily.sans],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'caret-blink': {
          '0%,70%,100%': { opacity: '1' },
          '20%,50%': { opacity: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'caret-blink': 'caret-blink 1.25s ease-out infinite',
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
