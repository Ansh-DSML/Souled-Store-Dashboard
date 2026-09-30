/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'media',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Souled Store brand: red + white, charcoal as the third coherent color.
        brand: { DEFAULT: '#e5352b', dark: '#b8241c', soft: '#fbe4e2', softdark: 'rgba(255,68,56,0.16)' },
        ink: { DEFAULT: '#171412', 2: '#57504b', dark: '#fdfcfb', dark2: '#cfc8c2' },
        muted: { DEFAULT: '#8c847e', dark: '#948c86' },
        page: { DEFAULT: '#faf9f7', dark: '#121011' },
        surface: { DEFAULT: '#ffffff', 2: '#f0ece7', dark: '#1c1917', dark2: '#252120' },
        border: { DEFAULT: 'rgba(23,20,18,0.12)', dark: 'rgba(253,252,251,0.12)' },
        graphite: { DEFAULT: '#171412', soft: '#ece9e6', dark: '#f1edea', softdark: 'rgba(253,252,251,0.12)' },
        good: { DEFAULT: '#0ca30c', soft: '#e3f7e7', softdark: 'rgba(12,163,12,0.18)' },
        warning: { DEFAULT: '#f5a623', ink: '#7a4e00', inkdark: '#ffc65c', fillink: '#2b1b00' },
        critical: { DEFAULT: '#ff2a57', ink: '#c30040', inkdark: '#ff6b85', glow: 'rgba(255,42,87,0.45)', glowdark: 'rgba(255,42,87,0.6)' },
        // chart series: colorblind-safe categorical palette, kept independent of brand/status colors
        s1: { DEFAULT: '#2a78d6', dark: '#3987e5' },
        s2: { DEFAULT: '#eb6834', dark: '#d95926' },
        s3: { DEFAULT: '#1baf7a', dark: '#199e70' },
        s4: { DEFAULT: '#eda100', dark: '#c98500' },
        s5: { DEFAULT: '#e87ba4', dark: '#d55181' },
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(23,20,18,0.09), 0 10px 26px -10px rgba(23,20,18,0.24)',
        cardDark: '0 1px 2px rgba(0,0,0,0.35), 0 8px 24px -12px rgba(0,0,0,0.55)',
      },
    },
  },
  plugins: [],
}
