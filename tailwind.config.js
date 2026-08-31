/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        transap: {
          bg: '#0b0f14',
          panel: '#121821',
          panel2: '#182230',
          border: '#243040',
          accent: '#22d3ee',
          warn: '#f59e0b',
          danger: '#ef4444',
          ok: '#22c55e',
        },
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 12px rgba(34,211,238,0.35)',
      },
    },
  },
  plugins: [],
};
