import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: 'var(--primary-font)',
        secondary: 'var(--secondary-font)'
      },
      colors: {
        primary: '#1E2428',
        secondary: '#42474C',
        accent: '#616262'
      }
    }
  },
  plugins: []
}
export default config
