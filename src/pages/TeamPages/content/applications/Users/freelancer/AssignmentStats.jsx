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
import { Assignment } from '@mui/icons-material';

const AvatarPrimary = styled(Avatar)(
  ({ theme }) => `
      background: ${theme.colors.primary.lighter};
      color: ${theme.colors.primary.main};
      width: ${theme.spacing(7)};
      height: ${theme.spacing(7)};
`
);

function AssignmentStats({ user, assignmentStats }) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        height: '100%',
      }}
    >
      <CardHeader title="Assignment Stats" />
      <Divider />
      <Box
        sx={{
          '@media (min-width: 960px)': {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          },
          '@media (max-width: 959px)': {
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          },
        }}
      >
        <Box px={2} py={4} display="flex" alignItems="flex-start">
          <AvatarPrimary>
            <ShoppingBagTwoToneIcon />
          </AvatarPrimary>
          <Box pl={2} flex={1}>
            <Typography
              sx={{
                '@media (min-width: 960px)': {
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                },
                '@media (max-width: 959px)': {
                  fontSize: '1.3rem',
                },
              }}
            >
              Total Assigned Count
            </Typography>

            <Box display="flex">
              <Box pr={8}>
                <Typography
                  sx={{
                    '@media (min-width: 960px)': {
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                    },
                    '@media (max-width: 959px)': {
                      fontSize: '1.3rem',
                    },
                  }}
                >
                  {assignmentStats?.assigned}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        {/* <Divider /> */}
        <Box px={2} py={4} display="flex" alignItems="flex-start">
          <AvatarPrimary>
            <ShoppingBagTwoToneIcon />
          </AvatarPrimary>
          <Box pl={2} flex={1}>
            <Typography
              sx={{
                '@media (min-width: 960px)': {
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                },
                '@media (max-width: 959px)': {
                  fontSize: '1.3rem',
                },
              }}
            >
              Total Inquires Count
            </Typography>
            <Box display="flex">
              <Box pr={8}>
                <Typography
                  sx={{
                    '@media (min-width: 960px)': {
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                    },
                    '@media (max-width: 959px)': {
                      fontSize: '1.3rem',
                    },
                  }}
                >
                  {assignmentStats?.inquiries}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        {/* <Divider /> */}
        <Box px={2} py={4} display="flex" alignItems="flex-start">
          <AvatarPrimary>
            <ShoppingBagTwoToneIcon />
          </AvatarPrimary>
          <Box pl={2} flex={1}>
            <Typography
              sx={{
                '@media (min-width: 960px)': {
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                },
                '@media (max-width: 959px)': {
                  fontSize: '1.3rem',
                },
              }}
            >
              Total Completed Count
            </Typography>
            <Box display="flex">
              <Box pr={8}>
                <Typography
                  sx={{
                    '@media (min-width: 960px)': {
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                    },
                    '@media (max-width: 959px)': {
                      fontSize: '1.3rem',
                    },
                  }}
                >
                  {assignmentStats?.completed}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        {/* <Divider /> */}
      </Box>
    </Card>
  );
}

export default AssignmentStats;
