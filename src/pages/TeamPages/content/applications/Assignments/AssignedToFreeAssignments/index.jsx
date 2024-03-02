import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import PageHeader from '~/pages/TeamPages/components/PageHeader';
import PageTitleWrapper from '~/pages/TeamPages/components/PageTitleWrapper';
import { Grid, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectAuth } from '~/features/auth/authSlice';
import RecentOrders from './RecentOrders';

export default function AssignedFreeAssignments() {
  const { id } = useParams();
  const auth = useSelector(selectAuth);
  const user = {
    name: auth?.teamData?.name,
    avatar: '/static/images/avatars/1.jpg',
  };
  return (
    <>
      <Helmet>
        <title>Assigned Freelancer Assignments</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader
          title="Assigned Freelancers Assignments"
          subtitle={`${user.name}, these are all assigned freelancer assignments.`}
        />
      </PageTitleWrapper>
      <Box
        fullwidth="true"
        sx={{
          mx: 2,
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <RecentOrders id={id} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
