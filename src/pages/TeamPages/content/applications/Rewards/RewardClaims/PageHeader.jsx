// import { Typography, Button, Grid } from '@mui/material';
import { Typography, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectAuth } from '~/features/auth/authSlice';
// import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

function PageHeader() {
  const auth = useSelector(selectAuth);
  const user = {
    name: auth?.teamData?.name,
    avatar: '/static/images/avatars/1.jpg',
  };
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Reward Claims
        </Typography>
        <Typography variant="subtitle2">
          {user.name}, these are all the rewards claims.
        </Typography>
      </Grid>
      {/* <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
        >
          Create transaction
        </Button>
      </Grid> */}
    </Grid>
  );
}

export default PageHeader;
