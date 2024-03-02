import { Helmet } from 'react-helmet-async';
import PageHeader from '~/pages/TeamPages/components/PageHeader';
import PageTitleWrapper from '~/pages/TeamPages/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectAuth } from '~/features/auth/authSlice';
import RecentOrders from './RecentOrders';

export default function DeletedFreelancers() {
  const auth = useSelector(selectAuth);
  const user = {
    name: auth?.teamData?.name,
    avatar: '/static/images/avatars/1.jpg',
  };
  return (
    <>
      <Helmet>
        <title>Deleted Freelancers</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader
          title="Deleted Freelancers"
          subtitle={`${user.name}, these are all deleted freelancers.`}
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
