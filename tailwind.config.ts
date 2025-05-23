import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        hero: 'url("/images/header_bg.jpg")',
        contacts: 'url("/images/contacts-img1.jpg")',
        welcome: 'url("/images/fullwidth-img-1.jpg")',
        'hero-bg-one': 'url("/images/main-slider-img-1.jpg")',
        'hero-bg-two': 'url("/images/main-slider-img-2.jpg")',
        'hero-bg-three': 'url("/images/main-slider-img-3.jpg")',
        'doctor-hero': 'url("/images/department-single-img5.jpg")'
      },
      fontFamily: {
        primary: 'var(--primary-font)',
        secondary: 'var(--secondary-font)'
      },
      colors: {
        primary: '#1E2428',
        secondary: '#42474C',
        accent: '#616262',
        'blue-100': '#2a93c9',
        'blue-200': '#56b0cf',
        'blue-300': '#0674d1',
        red: '#e74c3c',
        green: {
          100: '#11a762'
        }
      },
      boxShadow: {
        'doctor-card': '5px 5px 50px 0px rgba(6, 30, 52, 0.11)',
        'custom-right': '4px 0 8px -4px rgba(100, 114, 125, 0.18)'
      },
      screens: {
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px'
      }
    }
  },
  plugins: [require('@tailwindcss/line-clamp')]
}
export default config
