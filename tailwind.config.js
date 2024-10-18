/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        /**
         * Primary color will be used fro highlight colors for both the theme light or dark
         */
        // Green Color : https://tailwindcss.com/docs/customizing-colors
        primary: {
          'DEFAULT': "#0ea5e9", // 500
          "50": "#f0f9ff",
          "100": "#e0f2fe",
          "200": "#bae6fd",
          "300": "#7dd3fc",
          "400": "#38bdf8",
          "500": "#0ea5e9",
          "600": "#0284c7",
          "700": "#0369a1",
          "800": "#075985",
          "900": "#0c4a6e",
          "950": "#082f49"
        },

        /**
         * Base color used for normal text, bg, border color for both the theme light or dark
         */
        // Slate Color : https://tailwindcss.com/docs/customizing-colors
        base: {
          'DEFAULT': "#64748b", // 500
          "50": "#f8fafc",
          "100": "#f1f5f9",
          "200": "#e2e8f0",
          "300": "#cbd5e1",
          "400": "#94a3b8",
          "500": "#64748b",
          "600": "#475569",
          "700": "#334155",
          "800": "#1e293b",
          "900": "#0f172a",
          "950": "#020617"
        }
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

