module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        "3xl": '2000px',
        "xsm": { 'max': '639px' }
      },
      colors: {
        loginImg: 'rgba(3,3,3,.4)',
        loginContainer: 'rgba(13,3,3,0.25)',
        inputBG: 'rgba(3,3,3,.1)',
        inputBG_Focus: 'rgba(3,3,3,.18)'
      },
      boxShadow: {
        loginImg: '10px 10px 30px #000',
        loginContainer: '1px 1px 50px #000',
        h1_Shadow: '3px 3px 10px #000',
        inputFocus: '3px 3px 10px #333',
      },
      fontFamily: {
        oswald: ['Oswald'],
        openSans: ['Oswald', '"Open Sans"']
      },
      spacing: {
        mid: '50%'
      }
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
