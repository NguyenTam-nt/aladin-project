/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#99BC20",
        secondary: "#074A20",
        text_primary: "#272E35",
        text_secondary: "#5F5F61",
        text_blue: "#0167B2",
        text_white: "#FFFFFF",
        text_black: "#000",
        br_E6E6E6: "#E6E6E6",
        text_red: "#FF0000",
        header_bg: "rgba(0, 0, 0, 0.3)"
      },
      fontFamily: {
        "iCielBC_Cubano": ["iCielBC Cubano"],
        "IBM_Plex_Sans": ["IBM Plex Sans"],
      },
      screens: {
        _320: "320px",
        _370: "370px",
        sm: "640px",
        // => @media (min-width: 640px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }
        m992: "992px",
        // => @media (min-width: 768px) { ... }

        lg: "1024px",
        // => @media (min-width: 1024px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }

        "2xl": "1536px",

        "3xl": "1690px",
        // => @media (min-width: 1536px) { ... }
        "w-1920": "1920px",
        "mw-1920": { max: "1919px" },
        // => @media (min-width: 1920px) { ... }
      },
      fontSize: {
        _8: "8px",
        _9: "9px",
        _10: "10px",
        _11: "11px",
        _12: "12px",
        _14: "14px",
        _16: "16px",
        _18: "18px",
        _20: "20px",
        _22: "22px",
        _24: "24px",
        _26: "26px",
        _30: "30px",
        _32: "32px",
        _34: "34px",
        _40: "40px",
        _48: "48px",
        _64: "64px",
      },
    },
  },
  plugins: [],
}

