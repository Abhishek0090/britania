import typography from '../../base/typography';
import colors from '../../base/colors';

// Vision UI Dashboard React helper functions
// import pxToRem from "../../functions/pxToRem";

const { size } = typography;
const { text } = colors;

export default {
  styleOverrides: {
    root: {
      fontSize: size.md,
      color: text.main,
    },
  },
};
