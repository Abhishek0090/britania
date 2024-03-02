import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from '~/pages/TeamPages/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';

import RecentOrders from './RecentOrders';

export default function FreelancerRanking() {
  return (
    <>
      <Helmet>
        <title>Freelancer Ranking</title>
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
    </>
  );
}
