/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "status-green": "#22c55e",
        "status-red": "#ef4444",
        "status-yellow": "#eab308",
      },
    },
  },
  plugins: [],
};
