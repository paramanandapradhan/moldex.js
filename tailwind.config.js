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
        '7/10': '70%',
        '9/10': '90%',
      },
      height: {
        '1/2vh': '50vh',
        '7/10': '70%',
        '9/10': '90%',
      },
      minWidth: {
        '1/2vw': '50vw',
        '7/10': '70%',
        '9/10': '90%',
      },
      minHeight: {
        '1/2vh': '50vh',
        '7/10': '70%',
        '9/10': '90%',
      },
      maxWidth: {
        '1/2vw': '50vw',
        '7/10': '70%',
        '9/10': '90%',
      },
      maxHeight: {
        '1/2vh': '50vh',
        '7/10': '70%',
        '9/10': '90%',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}

