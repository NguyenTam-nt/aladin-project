const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}", "./public/index.html"],
  theme: {
    extend: {
      spacing: {
        '6px': '6px',
        '10px': '10px',
        '18px': '18px',
        '25': '25px',
        '195px': '12.2rem',
        '100': '6.25rem',

      },
      maxWidth: {
        'screen-100': 'calc(100% -100px)'
      },
      fontFamily: {
        'valky': ['NVNValky'],

        'NunitoSans': ['NunitoSans']
      },
      screens: {
        // by default (minwidth)
        ssm: '360px',
        // sm: 640px
        // md: 768px
        // lg: 1024px
        '2lg': '1100px',
        xl: "1280px",
        '1.5xl': '1320px',
        // 2xl: 1536px
        '2.5xl': '1648px',
        '3xl': '1920px'
      },
      zIndex: {
        '-1': -1, // -1    :background
        '1': 1,   // 1     :flag
        '2': 2,    // 2     :flag content
        // 40    :sidebar
        // 50    :layout header
        'max': '999'
      },
      colors: {
        'main': 'var(--main-color)',
        'main-2': 'var(--main-color-2)',
        text: {
          DEFAULT: 'var(--text-1)',
        },
        background: {
          DEFAULT: 'var(--main-background)',
          '100': 'var(--background1)',
          '200': 'var(--background2)',
          '300': 'var(--background3)',

        },

        gray: {
          '100': 'var(--gray-001)',
          '200': 'var(--gray-002)',
          '200-60': 'var(--gray-002-60)',
          '300': 'var(--gray-003)',
          '400': 'var(--gray-004)',
        },
        blue: {
          b01: 'var(--blue01)',
        },
        red: {
          r01: 'var(--red01)'
        },
        orange: {
          or01: 'var(--orange01)'
        },
        aqua: {
          aq01: 'var(--aqua01)',
          aq02: 'var(--aqua02)',
        },
        'borderGray': 'var(--border-color)',
        'button': 'var(--button-color)',
        'buttonSucces': 'var(--bgBtnSuccess)',
        'icon': 'var(--icon-color)',
        'cancel': 'var(--cancel-color)',
        'icon-active': '#F45538'
      },
      boxShadow: {
        DEFAULT: '0px 4px 4px rgba(0, 0, 0, 0.25)'
      },
      backgroundImage: {
        header: "linear-gradient(225deg, #FF6B00 0%, #E0000D 100%)",
        footer: "linear-gradient(180deg, #FE7D29 0%, #F9849E 100%)",
      },
      fontSize: {
        // follow figma
        'wap-regular1': ['12px', '15px'],
        'wap-regular2': ['14px', '17px'],
        normal: ['16px', '20px'],
        normal1: ['18px', '22px'],
        normal2: ['24px', '30px'],
        title: ['32px', '40px'],
        header2: ['48px', '56px'],
        header3: ['64px', '86px']
      },
      lineHeight: {
        '18': '18px',
        '21px': '21px',
      },
      letterSpacing: {
        '[.03]': '0.03rem'
      },
      keyframes: {
      },
      animation: {
      },
      borderRadius: {
        xs: '4px',
        sm: '8px',
        md: '10px',
        lg: '20px',
        xl: "24px",
        '1/2': "50%"
      }
    },
    container: {
      screens: { // theo deign figma
        sm: '560px',
        md: '660px',
        lg: '900px',
        xl: '1100px',
        '2xl': '1320px',
        '3xl': '1648px'
      },
      padding: '0rem',
      center: true,
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    plugin(function ({ addVariant, addBase, addUtilities, addComponents, theme }) {
      addVariant('child', '& > *')
      addVariant('child-hover', '& > *:hover')
      addVariant('first', '&:nth-child(1)')
      addVariant('second', '&:nth-child(2)')
      addVariant('third', '&:nth-child(3)')
      addComponents({

      })
      addBase({
        body: {
          padding: 0,
          margin: 0,
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: '20px',
          background: theme('colors.bg.100'),
          // width: '100vw',
          minHeight: '100vh',
          backgroundColor: theme('colors.background[DEFAULT]'),
        },
        p: {
          padding: 0,
          margin: 0,
          // fontWeight: 400,
          // fontSize: '14px',
          // lineHeight: '20px',
        },
        a: {
          textDecoration: 'none',
          backgroundColor: 'transparent',
        },
      })
      addComponents({
        '.btn': {
          display: 'flex',
          minWidth: '100px',
          height: '48px',
          padding: '0 20px',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '8px',
          backgroundColor: theme('colors.white')
        }
      })

      addUtilities({
        '.scrollbar-none-height': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',

          /* Firefox */
          'scrollbar-width': 'none',

          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        '.text-editor ': {
          '*': {
            color: 'white !important',
          },
        },
        '.h-screen-head': {
          height: 'calc(100vh - 96px)',
        },
      })
    })
  ],
};
