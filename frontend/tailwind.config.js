/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        neonBlue: '#00d2ff',
        neonPurple: '#b500ff',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'Consolas', 'monospace'],
        futuristic: ['Orbitron', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'scan-fast': 'scan-line 2s linear infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4', filter: 'drop-shadow(0 0 5px rgba(0, 210, 255, 0.3))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 15px rgba(181, 0, 255, 0.6))' },
        },
      }
    },
  },
  plugins: [],
}

