module.exports = {
  darkMode: false, // or 'media' or 'class'
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        twitter: '#1DA1F2',
        reddit: '#F54400',
        facebook: '#2E77F3',
        opensea: '#1F81E2'
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
    }
  },
  plugins: [],
};
