import { Typography, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectAuth } from '~/features/auth/authSlice';
import { AvatarPageTitle } from '~/utils/CustomStyles';
import WavingHandIcon from '@mui/icons-material/WavingHand';

export default function PageHeader() {
  const auth = useSelector(selectAuth);
  const user = {
    name: auth?.teamData?.name,
    avatar: '/static/images/avatars/1.jpg',
  };

  return (
    <Box
      display="flex"
      alignItems={{ xs: 'stretch', md: 'center' }}
      flexDirection={{ xs: 'column', md: 'row' }}
      justifyContent="space-between"
    >
      <Box display="flex" alignItems="center">
        <WavingHandIcon
          fontSize="large"
          sx={{
            color: (theme) => theme.colors.gradients.blue2,
            boxShadow: (theme) => theme.colors.shadows.primary,
          }}
        />
        <Box
          sx={{
            ml: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <Typography variant="h3" component="h3" gutterBottom>
            Welcome, {user.name}!
          </Typography>
          <Typography variant="subtitle2">
            Manage your day to day tasks with style! Enjoy a well built UI
            system.
          </Typography>
        </Box>
      </Box>
      {/* <Box mt={{ xs: 3, md: 0 }}>
        <Button variant="contained" startIcon={<DocumentScannerTwoToneIcon />}>
          Export
        </Button>
      </Box> */}
    </Box>
  );
}
