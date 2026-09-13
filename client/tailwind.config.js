/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#0f172a",
          navy: "#1e293b",
          slate: "#334155",
          teal: "#0d9488",
          mint: "#14b8a6",
          cyan: "#06b6d4",
          light: "#f8fafc",
          card: "#ffffff"
        },
        utility: {
          electrical: "#ef4444",
          water: "#3b82f6",
          gas: "#f59e0b",
          cable: "#10b981",
          appliance: "#8b5cf6"
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(15, 23, 42, 0.05), 0 2px 6px -1px rgba(15, 23, 42, 0.03)',
        'glow': '0 0 25px -5px rgba(13, 148, 136, 0.25)'
      }
    },
  },
  plugins: [],
}
