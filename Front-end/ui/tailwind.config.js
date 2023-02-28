/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
		'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
		"./node_modules/tw-elements/dist/js/**/*.js"

	  ],
  theme: {
    extend: {
		screens: {
			'3xl': '1600px',
			'4xl': '1920px',
			'xs': '140px',
		  },
		  colors: {
			custom: {
				DEFAULT: '#10B981',
				light: '#D1FAE5'
			}
		},
	},
	fontFamily: {
		display: ["Inter", "sans-serif"],
		assistant: ["Assistant", "sans-serif"],
		rubik : ["Rubik", "sans-serif"],
	  },
  },
  plugins: [
	require('flowbite/plugin'),
	require('tailwind-scrollbar'),
	require("tw-elements/dist/plugin")
  ],
}