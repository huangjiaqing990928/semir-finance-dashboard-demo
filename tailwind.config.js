/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Microsoft YaHei"', '"Noto Sans SC"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Microsoft YaHei"', '"Noto Sans SC"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: '#111318',
        panel: '#191d24',
        panel2: '#222733',
        mint: '#4fd1a5',
        amber: '#f7b955',
        coral: '#ff7f6e',
        peacock: '#5aa7ff',
      },
      boxShadow: {
        cockpit: '0 18px 45px rgba(0,0,0,.28)',
      },
    },
  },
  plugins: [],
}
