module.exports = {
	content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	theme: {
		extend: {
			colors: {
				CDCBlue: 'rgb(0, 80, 145)',
			},
			screens: {
				tablet: '640px',
				// => @media (min-width: 640px)

				laptop: '1024px',
				// => @media (min-width: 1024px)

				desktop: '1280px',
				// => @media (min-width: 1280px)
			},
		},
	},
	plugins: [require('@tailwindcss/forms')],
};
