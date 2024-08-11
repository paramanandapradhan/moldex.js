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
    require('@tailwindcss/aspect-ratio'),
  ],
}

