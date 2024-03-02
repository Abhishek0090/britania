import { Typography, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectAuth } from '~/features/auth/authSlice';
export default function PageHeader() {
  const auth = useSelector(selectAuth);
  const user = {
    name: auth?.teamData?.name,
    avatar: '/static/images/avatars/1.jpg',
  };
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
         Marks Overview
        </Typography>
        <Typography variant="subtitle2">
          {user.name}, these are the overview of marks.
        </Typography>
      </Grid>
    </Grid>
  );
}
