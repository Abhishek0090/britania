import PropTypes from 'prop-types';

import { Card } from '@mui/material';

import VuiBox from '~/components/VuiBox';
import VuiTypography from '~/components/VuiTypography';

// Timeline context
import { TimelineProvider } from '~/components/Timeline/context';

function TimelineList({ title, dark, children }) {
  return (
    <TimelineProvider value={dark}>
      <Card>
        <VuiBox bgColor={dark ? 'dark' : 'white'} variant="gradient">
          <VuiBox pt={3} px={3}>
            <VuiTypography
              variant="h6"
              fontWeight="medium"
              color={dark ? 'white' : 'dark'}
            >
              {title}
            </VuiTypography>
          </VuiBox>
          <VuiBox p={2}>{children}</VuiBox>
        </VuiBox>
      </Card>
    </TimelineProvider>
  );
}

// Setting default values for the props of TimelineList
TimelineList.defaultProps = {
  dark: false,
};

// Typechecking props for the TimelineList
TimelineList.propTypes = {
  title: PropTypes.string.isRequired,
  dark: PropTypes.bool,
};

export default TimelineList;
