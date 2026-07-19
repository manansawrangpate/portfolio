import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        border: 'var(--border)',
        green: 'var(--green)',
        blue: 'var(--blue)',
        text: 'var(--text)',
        muted: 'var(--muted)',
        purple: 'var(--purple)',
        yellow: 'var(--yellow)',
        pink: 'var(--pink)',
      },
      fontFamily: {
        display: ['var(--font-poppins)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
        sans: ['var(--font-poppins)', 'sans-serif'],
      },
      borderRadius: {
        badge: '8px',
        card: '12px',
      },
    },
  },
  plugins: [],
};

export default config;
