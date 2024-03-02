import { Helmet } from 'react-helmet-async';
import PageHeader from '~/pages/TeamPages/components/PageHeader';
import PageTitleWrapper from '~/pages/TeamPages/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectAuth } from '~/features/auth/authSlice';
import RecentOrders from './RecentOrders';

export default function NonTechnicalFreelancers() {
  const auth = useSelector(selectAuth);
  const user = {
    name: auth?.teamData?.name,
    avatar: '/static/images/avatars/1.jpg',
  };
  return (
    <>
      <Helmet>
        <title>Non Technical Freelancers</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader
          title="Non Tech Freelancers"
          subtitle={`${user.name}, these are all non-technical freelancers.`}
        />
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
