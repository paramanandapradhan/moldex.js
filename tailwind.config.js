/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--color-primary-500)",
          50: "var(--color-primary-50)",
          100: "var(--color-primary-100)",
          200: "var(--color-primary-200)",
          300: "var(--color-primary-300)",
          400: "var(--color-primary-400)",
          500: "var(--color-primary-500)",
          600: "var(--color-primary-600)",
          700: "var(--color-primary-700)",
          800: "var(--color-primary-800)",
          900: "var(--color-primary-900)",
          950: "var(--color-primary-950)",
        },
        base: {
          DEFAULT: "var(--color-base-500)",
          50: "var(--color-base-50)",
          100: "var(--color-base-100)",
          200: "var(--color-base-200)",
          300: "var(--color-base-300)",
          400: "var(--color-base-400)",
          500: "var(--color-base-500)",
          600: "var(--color-base-600)",
          700: "var(--color-base-700)",
          800: "var(--color-base-800)",
          900: "var(--color-base-900)",
          950: "var(--color-base-950)",
        },
      },

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

