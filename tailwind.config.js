/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
    './src/**/**/*.{js,ts,jsx,tsx,html,mdx}',
    './src/**/*.{js,ts,jsx,tsx,html,mdx}',
  ],
  darkMode: 'class',
  theme: {
    screens: { md: { max: '1050px' }, sm: { max: '550px' } },
    extend: {
      colors: {
        deep_purple: {
          900: '#28248c',
          A400_dd: '#6933ffdd',
          A400_00: '#622aff00',
          A400: '#622aff',
          A200: '#9d5bfe',
          A200_dd: '#9747ffdd',
        },
        light_blue: { A200: '#696969' },
        gray: { 900: '#202020' },
        black: { 900: '#000000', '900_3f': '#0000003f', '900_33': '#00000033' },
        white: {
          A700_66: '#ffffff66',
          A700_33: '#ffffff33',
          A700_bc: '#ffffffbc',
          A700_19: '#ffffff19',
          A700: '#ffffff',
        },
      },
      boxShadow: {
        bs3: 'inset 8px 8px  1px 0px #ffffff33',
        bs: '0px 2px  1px 0px #0000003f',
        bs4: '0px 2px  2px 0px #0000003f',
        bs1: '0px 4px  24px -1px #00000033',
        bs2: 'inset -8px -8px  1px 0px #00000033',
      },
      // fontFamily: {
      //   mobilefont: 'Mobile Font',
      //   joystix: 'Joystix',
      //   kemcopixel: 'Kemco Pixel',
      //   mssansserif: 'MS Sans Serif',
      //   unkempt: 'Unkempt',
      //   backto: 'Back to 1982',
      // },
      backgroundImage: {
        gradient: 'linear-gradient(138deg ,#ffffff66,#ffffff19)',
        gradient1: 'linear-gradient(45deg ,#444444,#36363612)',
        gradient2: 'linear-gradient(348deg ,#1f1d1ddd,#000000dd)',
      },
      textShadow: {
        ts1: '0px 5px  1px #37dbff',
        ts2: '0px 8px  1px #28248c',
        ts3: '0px 8px  6px #28248c',
        ts: '0px 2px  1px #0000003f',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('tailwindcss-textshadow')],
};
