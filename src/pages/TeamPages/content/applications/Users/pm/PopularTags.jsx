import {
  Box,
  Typography,
  Card,
  CardHeader,
  Divider,
  Avatar,
  useTheme,
  styled,
} from '@mui/material';

import ShoppingBagTwoToneIcon from '@mui/icons-material/ShoppingBagTwoTone';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';

const AvatarPrimary = styled(Avatar)(
  ({ theme }) => `
      background: ${theme.colors.primary.lighter};
      color: ${theme.colors.primary.main};
      width: ${theme.spacing(7)};
      height: ${theme.spacing(7)};
`
);

function PopularTags({ user }) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        height: '100%',
      }}
    >
      <CardHeader title="Recent Activity" />
      <Divider />
      <Box px={2} py={2} display="flex" alignItems="flex-start">
        <AvatarPrimary>
          <ShoppingBagTwoToneIcon />
        </AvatarPrimary>
        <Box pl={2} flex={1}>
          <Typography variant="h3">Total Inquiry Count</Typography>

          <Box display="flex">
            <Box pr={8}>
              <Typography variant="h2">{user?.totalinquirycount}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Divider />
      <Box px={2} py={4} display="flex" alignItems="flex-start">
        <AvatarPrimary>
          <ShoppingBagTwoToneIcon />
        </AvatarPrimary>
        <Box pl={2} flex={1}>
          <Typography variant="h3">Completed</Typography>

          <Box display="flex">
            <Box pr={8}>
              <Typography variant="h2">{user?.completed}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Divider />
    </Card>
  );
}

export default PopularTags;
