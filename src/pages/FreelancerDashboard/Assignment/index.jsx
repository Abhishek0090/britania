// @mui icons
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useEffect, useRef, useState } from 'react';
import { Grid } from '@mui/material';
import colors from '~/layout/SidebarLayout/theme/base/colors';

import VuiBox from '~/components/VuiBox';
// Vision UI Dashboard React example components
import DashboardLayout from '~/layout/LayoutContainers/DashboardLayout';
// Overview page components
import Header from '~/pages/FreelancerDashboard/Assignment/components/Header';
import Projects from '~/pages/FreelancerDashboard/Assignment/components/Projects';

function Assignment() {
  const { gradients } = colors;
  const { state } = useLocation();
  const [tabValue, setTabValue] = useState(state?.tabIndex ?? 0);
  return (
    <DashboardLayout>
      <Helmet>
        <title>Assignments | Bluepen</title>
      </Helmet>
      <div className="min-h-screen">
        <Header tabValue={tabValue} setTabValue={setTabValue} />
        {tabValue === 0 && (
          <>
            <VuiBox mt={5} mb={3}>
              <Grid
                container
                spacing={3}
                direction="row"
                justifyContent="center"
                alignItems="stretch"
              >
                <Grid item xs={12} md={12} lg={12}>
                  <Projects title="My Inquiries" />
                </Grid>
              </Grid>
            </VuiBox>
          </>
        )}
        {tabValue === 1 && (
          <>
            <VuiBox mt={5} mb={3}>
              <Grid
                container
                spacing={3}
                direction="row"
                justifyContent="center"
                alignItems="stretch"
              >
                <Grid item xs={12} md={12} lg={12}>
                  <Projects title="My Assignments" />
                </Grid>
              </Grid>
            </VuiBox>
          </>
        )}
        {tabValue === 2 && (
          <>
            <VuiBox mt={5} mb={3}>
              <Grid
                container
                spacing={3}
                direction="row"
                justifyContent="center"
                alignItems="stretch"
              >
                <Grid item xs={12} md={12} lg={12}>
                  <Projects title="Completed Assignments" />
                </Grid>
              </Grid>
            </VuiBox>
          </>
        )}
        {tabValue === 3 && (
          <>
            <VuiBox mt={5} mb={3}>
              <Grid
                container
                spacing={3}
                direction="row"
                justifyContent="center"
                alignItems="stretch"
              >
                <Grid item xs={12} md={12} lg={12}>
                  <Projects title="Incomplete Assignments" />
                </Grid>
              </Grid>
            </VuiBox>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Assignment;
