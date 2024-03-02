// react-router-dom components
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import { Breadcrumbs as MuiBreadcrumbs } from '@mui/material';
import { Icon } from '@mui/material';

import VuiBox from '~/components/VuiBox';
import VuiTypography from '~/components/VuiTypography';

function Breadcrumbs({ icon, title, route, light }) {
  const routes = route.slice(0, -1);

  return (
    <VuiBox mr={{ xs: 0, xl: 8 }}>
      <MuiBreadcrumbs
        sx={{
          '& .MuiBreadcrumbs-separator': {
            color: ({ palette: { white, grey } }) =>
              light ? white.main : grey[600],
          },
        }}
      >
        <Link to="/dashboard/freelancer/dashboard">
          <VuiTypography
            component="span"
            variant="body2"
            color={light ? 'white' : 'dark'}
            opacity={light ? 0.8 : 0.5}
            sx={{ lineHeight: 0 }}
          >
            <Icon>{icon}</Icon>
          </VuiTypography>
        </Link>
        {routes.map((el) => (
          <VuiTypography
            key={el}
            component="span"
            variant="button"
            fontWeight="regular"
            textTransform="capitalize"
            color={light ? 'white' : 'dark'}
            opacity={light ? 0.8 : 0.5}
            sx={{ lineHeight: 0 }}
          >
            {el}
          </VuiTypography>
        ))}
        <VuiTypography
          variant="button"
          fontWeight="regular"
          textTransform="capitalize"
          color={light ? 'white' : 'dark'}
          sx={{ lineHeight: 0 }}
        >
          {title.replace('-', ' ')}
        </VuiTypography>
      </MuiBreadcrumbs>
    </VuiBox>
  );
}

// Setting default values for the props of Breadcrumbs
Breadcrumbs.defaultProps = {
  light: false,
};

// Typechecking props for the Breadcrumbs
Breadcrumbs.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  route: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  light: PropTypes.bool,
};

export default Breadcrumbs;
