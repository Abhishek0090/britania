import { forwardRef } from 'react';

.
import PropTypes from 'prop-types';


import { Icon, MenuItem } from '@mui/material';


import VuiBox from '~/components/VuiBox';
import VuiTypography from '~/components/VuiTypography';

// custom styles for the NotificationItem
import { menuItem, menuImage } from '~/components/NotificationItem/styles';

const NotificationItem = forwardRef(
  ({ color, image, title, date, ...rest }, ref) => (
    <MenuItem {...rest} ref={ref} sx={(theme) => menuItem(theme)}>
      <VuiBox
        width="2.25rem"
        height="2.25rem"
        mt={0.25}
        mr={2}
        mb={0.25}
        borderRadius="lg"
        sx={(theme) => menuImage(theme, { color })}
      >
        {image}
      </VuiBox>
      <VuiBox>
        <VuiTypography
          variant="button"
          textTransform="capitalize"
          fontWeight="regular"
        >
          <strong>{title[0]}</strong> {title[1]}
        </VuiTypography>
        <VuiTypography
          variant="caption"
          color="text"
          sx={{
            display: 'flex',
            alignItems: 'center',
            mt: 0.5,
          }}
        >
          <VuiTypography variant="button" color="text">
            <Icon
              sx={{
                lineHeight: 1.2,
                mr: 0.5,
              }}
            >
              watch_later
            </Icon>
          </VuiTypography>
          {date}
        </VuiTypography>
      </VuiBox>
    </MenuItem>
  )
);

// Setting default values for the props of NotificationItem
NotificationItem.defaultProps = {
  color: 'dark',
};

// Typechecking props for the NotificationItem
NotificationItem.propTypes = {
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error',
    'light',
    'dark',
    'text',
  ]),
  image: PropTypes.node.isRequired,
  title: PropTypes.arrayOf(PropTypes.string).isRequired,
  date: PropTypes.string.isRequired,
};

export default NotificationItem;
