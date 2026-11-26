/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          DEFAULT: '#1E40AF',
          hover: '#172554',
          light: '#3B82F6',
          vivid: '#2563EB',
        },
        navy: {
          DEFAULT: '#0F172A',
          deep: '#020617',
          card: '#1E293B',
        },
        paper: '#F8FAFC',
        panel: '#F1F5F9',
        line: {
          DEFAULT: '#CBD5E1',
          soft: '#E2E8F0',
          crisp: '#94A3B8',
        },
        muted: {
          DEFAULT: '#475569',
          dark: '#94A3B8',
        },
        amber: {
          DEFAULT: '#D97706',
          dark: '#B45309',
          light: '#FEF3C7',
        },
        whatsapp: {
          DEFAULT: '#15803D',
          hover: '#166534',
        },
      },
      fontFamily: {
        condensed: ['"Barlow Condensed"', 'sans-serif'],
        sans: ['"Barlow"', 'sans-serif'],
      },
      borderRadius: {
        none: '0',
      },
      maxWidth: {
        container: '1240px',
      },
    },
  },
  plugins: [],
}
