/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: "#014F59",
        secondary: "#00A8B5",
        text_primary: "#272E35",
        text_blue: "#0167B2",
        text_white: "#FFFFFF",
        text_black: "#0000",
        text_4A4A4A: "#4A4A4A",
        bg_F4FBF7: "#F4FBF7",
        br_E9ECEF: "#E9ECEF",
        bg_F08181: "#F08181",
        bg_F5B377: "#F5B377",
        bg_63A0F2: "#63A0F2",
        text_link: "#0066FF"
      },
      screens: {
        sm: '640px',
        // => @media (min-width: 640px) { ... }

        md: '768px',
        // => @media (min-width: 768px) { ... }
        m992: '992px',
        // => @media (min-width: 768px) { ... }

        lg: '1024px',
        // => @media (min-width: 1024px) { ... }

        xl: '1280px',
        // => @media (min-width: 1280px) { ... }

        '2xl': '1536px',

        '3xl': '1690px',
        // => @media (min-width: 1536px) { ... }
        'w-1920': '1920px',
        // => @media (min-width: 1920px) { ... }

      }
    },
  },
  plugins: [],
}

