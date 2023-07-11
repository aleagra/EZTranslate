export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        custom:[ 'Nunito', 'sans-serif'],
      },
      colors:{
        first: '#111116',
        second: '#1b1b1f',
      }
    },
  },
  plugins: [],
}