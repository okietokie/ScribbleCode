/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#FAF6E9',
          page: '#FFFDF8',
        },
        ink: '#2B2B2B',
        notebook: {
          yellow: '#F4D35E',
          blue: '#6FB1FC',
          green: '#7BD389',
          purple: '#B58CF6',
          red: '#F26D6D',
        }
      },
      fontFamily: {
        primary: ['"Patrick Hand"', 'cursive'],
        secondary: ['"Comic Neue"', 'cursive'],
        fallback: ['"Nunito Sans"', 'sans-serif'],
      },
      fontSize: {
        display: ['2.5rem', { lineHeight: '1.2', fontWeight: '700' }],
        heading: ['1.875rem', { lineHeight: '1.3', fontWeight: '600' }],
        subheading: ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }],
        body: ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        caption: ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        button: ['1rem', { lineHeight: '1.2', fontWeight: '600' }],
        code: ['0.875rem', { lineHeight: '1.6', fontWeight: '400' }],
      },
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '24px',
        '6': '32px',
        '7': '40px',
        '8': '48px',
        '9': '64px',
        '10': '80px',
      },
      borderRadius: {
        'hand': '12px',
        'hand-lg': '16px',
        'hand-xl': '20px',
      },
      borderWidth: {
        'hand': '3px',
      },
      boxShadow: {
        'paper': '2px 2px 0px rgba(43, 43, 43, 0.15)',
        'paper-hover': '4px 4px 0px rgba(43, 43, 43, 0.15)',
        'sticker': '3px 3px 0px rgba(43, 43, 43, 0.2)',
        'sticker-hover': '5px 5px 0px rgba(43, 43, 43, 0.2)',
      },
      animation: {
        'wiggle': 'wiggle 0.3s ease-in-out',
        'bounce-slow': 'bounce 1.5s infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      },
      transitionDuration: {
        'fast': '150ms',
        'normal': '250ms',
        'slow': '400ms',
      },
      zIndex: {
        'dropdown': '100',
        'sticky': '200',
        'modal': '300',
        'tooltip': '400',
      },
      maxWidth: {
        'content': '1200px',
      }
    },
  },
  plugins: [],
}
