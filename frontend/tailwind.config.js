module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#C4B5FD', // light purple
          DEFAULT: '#8B5CF6', // main purple
          dark: '#7C3AED', // dark purple
        },
        accent: '#A78BFA', // accent purple
      },
      fontFamily: {
        display: ['Poppins', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
};
