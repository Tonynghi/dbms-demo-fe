/** @type {import('tailwindcss').Config} */

const { fontSize, width, textAlign, maxWidth } = require('@mui/system');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        '2xs': '360px',
        xs: '480px',
        sm: '640px',
        md: '760px',
        lg: '960px',
        xl: '1240px',
        '2xl': '1536px',
        '3xl': '1728px',
        '4xl': '1920px',
      },
      colors: {
        // NEUTRAL THEME
        white: '#FFFFFF',
        black: '#000000',

        // PROJECT THEME
        // Primary
        primary: '#0329E9',
        'primary-300': '#617AF9',
        'primary-700': '#011FB2',

        // Secondary
        secondary: '#F9BA08',
        'secondary-300': '#FFDE80',
        'secondary-700': '#CE9801',

        // tertiary
        tertiary: '#3D4863',
        'tertiary-300': '#A3ACC2',
        'tertiary-700': '#1C2A4C',

        // GDSC THEME
        // GDSC Fessior Color
        fessior: '#0B2878',

        // GDSC Blue / Information Color
        blue: '#4285F4',
        'blue-300': '#8AB4F8',
        'blue-700': '#1860D8',

        // GDSC Green / Success Color
        green: '#34A853',
        'green-300': '#81C995',
        'green-700': '#108B31',

        // GDSC Yellow / Warning Color
        yellow: '#F9AB00',
        'yellow-300': '#FDE293',
        'yellow-700': '#C58700',

        // GDSC Red / Danger Color
        red: '#EA4335',
        'red-300': '#F28B82',
        'red-700': '#C51708',

        // GDSC Orange Color
        orange: '#F28500',

        // GDSC Magenta Color
        magenta: '#FF2D55',

        // HCMUT THEME
        'hcmut-light': '#1488D8',
        'hcmut-dark': '#030391',

        // Other brands:
        facebook: '#0866FF',
        zalo: '#006AF5',
        'zalo-700': '#001A33',
      },
      dropShadow: {
        'secondary-1': '4px 4px 0px rgba(249, 186, 8, 1)',
        'secondary-2': '8px 8px 0px rgba(249, 186, 8, 1)',
        'secondary-4': '16px 16px 0px rgba(249, 186, 8, 1)',
      },
      keyframes: {
        'fade-in-out': {
          '0%, 2.5%, 97.5%, 100% ': { opacity: 0 },
          '10%, 90%': { opacity: 1 },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 100 },
        },
        float: {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
          '100%': { transform: 'translateY(0px)' },
        },
        float1: {
          '0%': { transform: 'translateY(0px) rotate(-12deg)' },
          '50%': { transform: 'translateY(-20px) rotate(-12deg)' },
          '100%': { transform: 'translateY(0px) rotate(-12deg)' },
        },
        fadeOut: {
          '0%': { opacity: 100 },
          '50%': { opacity: 0, translate: 0 },
          '100%': { opacity: 0, translate: -999999 },
        },
        slideInFromLeft: {
          '0%': { transform: 'translateX(-150%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        slideInFromRight: {
          '0%': { transform: 'translateX(150%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
      animation: {
        floating: 'float 1000ms ease-in-out infinite',
      },
      gridTemplateRows: {
        16: 'repeat(16, minmax(0, 1fr))',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
