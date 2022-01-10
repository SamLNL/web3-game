const colors = require('tailwindcss/colors')

module.exports = {
	content: ["./public_html/**/*.{html,js}"],
	theme: {
		extend: {
			colors: {
				'primary': colors.gray[900],
				'secondary': colors.white,
				'blood': colors.red[600],
				'banana': colors.amber[400],
				'violet': colors.purple[600],
				'green': colors.emerald[500],
			}
		},
    fontFamily: {
      'display': ['Oswald'],
      'body': ['Oswald']
    }
	},
	plugins: [
		require('@tailwindcss/typography')({
			className: 'wysiwyg'
		}),
		require('@tailwindcss/forms')
	]
}
