import postcssNesting from 'postcss-nesting';

export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-nesting': {
      // Nesting is not yet supported in Tailwind
    },
  },
};
