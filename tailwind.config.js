/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontSize: {
        '2xs': '10px',
        '3xs': '8px',
        '4xs': '6px',
      },
      colors: {
        primary: {
          light: '#63b3ed',
          DEFAULT: '#4299e1',
          dark: '#3182ce',
        },
        secondary: {
          light: '#fbb6ce',
          DEFAULT: '#f687b3',
          dark: '#e53e3e',
        },
        neutral: {
          light: '#f7fafc',
          DEFAULT: '#edf2f7',
          dark: '#2d3748',
        },
        success: {
          light: '#9ae6b4',
          DEFAULT: '#48bb78',
          dark: '#38a169',
        },
        warning: {
          light: '#faf089',
          DEFAULT: '#ecc94b',
          dark: '#d69e2e',
        },
        danger: {
          light: '#feb2b2',
          DEFAULT: '#f56565',
          dark: '#e53e3e',
        },
        // Add more color themes as needed
      },
      width: {
        '1/2vw': '50vw',
      },
      height: {
        '1/2vh': '50vh',
      },
      minWidth: {
        '1/2vw': '50vw',
      },
      minHeight: {
        '1/2vh': '50vh',
      },
      maxWidth: {
        '1/2vw': '50vw',
      },
      maxHeight: {
        '1/2vh': '50vh',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

