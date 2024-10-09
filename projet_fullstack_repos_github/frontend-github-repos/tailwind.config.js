/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			colors: {
				primary: '#1E3A8A',
				secondary: '#FBBF24',
				background: '#F3F4F6',
				card: '#FFFFFF',
				accent: '#10B981',
				textSecondary: '#4B5563',
			},
			fontFamily: {
				headline: ['Inter', 'sans-serif'],
				body: ['Poppins', 'sans-serif'],
			},
			backgroundImage: {
				'hero-gradient': 'linear-gradient(90deg, #0F2027 0%, #2C5364 100%)',
			},
			boxShadow: {
				'custom-light': '0 4px 6px rgba(0, 0, 0, 0.1)',
				'custom-dark': '0 4px 6px rgba(0, 0, 0, 0.5)',
			},
		},
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#1E3A8A',
					secondary: '#FBBF24',
					accent: '#10B981',
					neutral: '#3D4451',
					'base-100': '#FFFFFF',
				},
			},
			'dark',
			'cupcake',
		],
	},
};
