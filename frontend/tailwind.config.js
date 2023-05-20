/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#014F59",
        secondary: "#00A8B5",
        text_primary: "#272E35",
        text_secondary: "#555F6D",
        text_blue: "#0167B2",
        text_white: "#FFFFFF",
        text_black: "#000",
        text_4A4A4A: "#4A4A4A",
        bg_F4FBF7: "#F4FBF7",
        br_E9ECEF: "#E9ECEF",
        bg_F08181: "#F08181",
        bg_F5B377: "#F5B377",
        bg_F59638: "#F59638",
        bg_1D7C4D: "#1D7C4D",
        bg_3062D4: "#3062D4",
        bg_E93A76: "#E93A76",
        bg_7E8B99: "#7E8B99",
        bg_63A0F2: "#63A0F2",
        text_link: "#0066FF",
        bg_A7E8ED: "#A7E8ED",
        bg_FAFAFA: "#FAFAFA",
        text_225_225_225_032: "rgba(255, 255, 255, 0.32)",
        text_225_225_225_088: "rgba(255, 255, 255, 0.88)",
        text_225_225_225_064: "rgba(255, 255, 255, 0.64)",
        bg_225_225_225_07: "rgba(255, 255, 255, 0.7)",
        text_7E8B99: "#7E8B99",
        bg_0_0_0_003: "rgba(0, 0, 0, 0.3)",
        bg_0_0_0_007: "rgba(0, 0, 0, 0.7)",
        bg_F8F8F8: "#F8F8F8",
        bg_9EA8B3: "#9EA8B3",
        bg_272E35: "#272E35",
        text_C53434: "#C53434"
      },
      backgroundImage: {
        gr_text:
          "linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0))",
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
      },
    },
  },
  plugins: [],
};

