/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
	  ],
  theme: {
    extend: {
		screens: {
			'3xl': '1600px',
			'4xl': '1920px',
			'xs': '140px',
		  },
	},
	fontFamily: {
		display: ["Inter", "sans-serif"],
		assistant: ["Assistant", "sans-serif"],
		rubik : ["Rubik", "sans-serif"],
	  },
  },
  plugins: [],
}