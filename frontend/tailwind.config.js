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
        text_EA222A: "#EA222A",
        bg_E73F3F: "#E73F3F",
        header_bg: "rgba(0, 0, 0, 0.3)",
        text_A1A0A3: "#A1A0A3",
        GreyPrimary: "#222124",
        br_CBCBCB: "#CBCBCB",
        bg_255_255_255_08: "rgba(255, 255, 255, 0.8)",
        bg_255_255_255_03: "rgba(255, 255, 255, 0.3)",
        bg_01A63E: "#01A63E",
        bg_2196F3: "#2196F3",
        bg_0068FF: "#0068FF",
        bg_F1F1F1: "#F1F1F1"
      },
      backgroundImage: {
        banner_home: "linear-gradient(90deg, rgba(0, 0, 0, 0.5) -0.81%, rgba(0, 0, 0, 0) 100%)",
        home_topic_sale_item: "linear-gradient(0deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 100%)",
        home_topic_sale: "linear-gradient(0deg, rgba(153, 188, 32, 0.88), rgba(153, 188, 32, 0.88))"
      }
      ,
      fontFamily: {
        "iCielBC_Cubano": ["iCielBC Cubano"],
        "IBM_Plex_Sans": ["IBM Plex Sans"],
      },
      screens: {
        _320: "320px",
        _370: "370px",
        _420: "420px",
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
        _13: "13px",
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
      spacing: {
        spc26: "26px",
        spc32: "32px",
        spc60: "60px",
        spc120: "120px",
        spc167: "167px",
        spc176: "176px"
      },
      lineHeight: {
        22: "22px"
      },
      borderRadius: {
        r32: "32px"
      }
    },
  },
  plugins: [],
}

