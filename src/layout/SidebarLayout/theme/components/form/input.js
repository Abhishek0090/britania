import colors from '../../base/colors';
import borders from '../../base/borders';

// Vision UI Dashboard  helper functions
import pxToRem from '../../functions/pxToRem';

const { inputColors } = colors;
const { borderWidth, borderRadius } = borders;

export default {
  styleOverrides: {
    root: {
      backgroundColor: 'transparent !important',
      color: 'white !important',
      display: 'flex !important',
      padding: `${pxToRem(8)} ${pxToRem(28)} ${pxToRem(8)} ${pxToRem(
        12
      )} !important`,
      border: `${borderWidth[2]} solid ${inputColors.borderColor.main}`,
      borderRadius: `${borderRadius.md} !important`,

      '& fieldset': {
        border: 'none',
      },
    },

    input: {
      height: pxToRem(22),
      width: 'max-content !important',
    },

    inputSizeSmall: {
      height: pxToRem(14),
    },
  },
};
