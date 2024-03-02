import Card from '@mui/material/Card';
import Icon from '@mui/material/Icon';

import VuiBox from '~/components/VuiBox';
import VuiTypography from '~/components/VuiTypography';

// Billing page components
import Transaction from '~/pages/FreelancerDashboard/Settings/components/Transaction';

function Transactions() {
  return (
    <Card sx={{ height: '100%' }}>
      <VuiBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb="18px"
        sx={({ breakpoints }) => ({
          [breakpoints.down('lg')]: {
            flexDirection: 'column',
          },
        })}
      >
        <VuiTypography
          variant="lg"
          fontWeight="bold"
          textTransform="capitalize"
          color="white"
          sx={({ breakpoints }) => ({
            [breakpoints.only('sm')]: {
              mb: '6px',
            },
          })}
        >
          Your Work Details
        </VuiTypography>
      </VuiBox>
      <VuiBox>
        <VuiBox mb={2}>
          <VuiTypography
            variant="caption"
            color="text"
            fontWeight="medium"
            textTransform="uppercase"
          >
            Experience
          </VuiTypography>
        </VuiBox>
        <VuiBox
          component="ul"
          display="flex"
          flexDirection="column"
          p={0}
          m={0}
          sx={{ listStyle: 'none' }}
        >
          {/* <Transaction
            color="error"
            icon="arrow_downward"
            name="Netflix"
            description="27 March 2020, at 12:30 PM"
            value="- $ 2,500"
          />
          <Transaction
            color="success"
            icon="arrow_upward"
            name="Apple"
            description="27 March 2020, at 04:30 AM"
            value="+ $ 2,000"
          /> */}
        </VuiBox>
        <VuiBox mt={1} mb={2}>
          <VuiTypography
            variant="caption"
            color="text"
            fontWeight="medium"
            textTransform="uppercase"
          >
            Past Experience
          </VuiTypography>
        </VuiBox>
        <VuiBox
          component="ul"
          display="flex"
          flexDirection="column"
          p={0}
          m={0}
          sx={{ listStyle: 'none' }}
        >
          {/* <Transaction
            color="success"
            icon="arrow_upward"
            name="Stripe"
            description="26 March 2020, at 13:45 PM"
            value="+ $ 750"
          />
          <Transaction
            color="success"
            icon="arrow_upward"
            name="HubSpot"
            description="26 March 2020, at 12:30 PM"
            value="+ $ 1,000"
          />
          <Transaction
            color="success"
            icon="arrow_upward"
            name="HubSpot"
            description="26 March 2020, at 08:30 AM"
            value="+ $ 2,500"
          />
          <Transaction
            color="text"
            icon="priority_high"
            name="Webflow"
            description="26 March 2020, at 05:00 AM"
            value="Pending"
          /> */}
        </VuiBox>
      </VuiBox>
    </Card>
  );
}

export default Transactions;
