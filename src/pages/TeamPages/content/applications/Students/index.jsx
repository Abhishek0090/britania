import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from '~/pages/TeamPages/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';

import RecentOrders from './RecentOrders';
import React from 'react';

export default function AllStudents() {
  return (
    <React.Fragment>
      <Helmet>
        <title>All Students</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="xl">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <RecentOrders />
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
