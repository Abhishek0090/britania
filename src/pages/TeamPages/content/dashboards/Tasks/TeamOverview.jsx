import {
  Box,
  Grid,
  Typography,
  Avatar,
  Badge,
  Tooltip,
  useTheme,
  LinearProgress,
  styled,
} from '@mui/material';
import { useNavigate } from 'react-router';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

const DotLegend = styled('span')(
  ({ theme }) => `
    border-radius: 22px;
    width: ${theme.spacing(1.5)};
    height: ${theme.spacing(1.5)};
    display: inline-block;
    margin-right: ${theme.spacing(0.5)};
    border: ${theme.colors.alpha.white[100]} solid 2px;
`
);

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
    width: ${theme.spacing(7)};
    height: ${theme.spacing(7)};
`
);

const LinearProgressWrapper = styled(LinearProgress)(
  ({ theme }) => `
        flex-grow: 1;
        height: 10px;
        
        &.MuiLinearProgress-root {
          background-color: ${theme.colors.alpha.black[10]};
        }
        
        .MuiLinearProgress-bar {
          border-radius: ${theme.general.borderRadiusXl};
        }
`
);

const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.alpha.white[100]};
      color: ${theme.palette.success.contrastText};
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
      box-shadow: ${theme.colors.shadows.success};
`
);

export default function TeamOverview({ users, title }) {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      alignItems="start"
      justifyContent="start"
      flexDirection="column"
      sx={{
        pb: 3,
        gap: 3,
      }}
    >
      <Typography variant="h3">{title}</Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Box
            display="flex"
            sx={{
              px: 2,
              pb: 3,
              cursor: 'pointer',
            }}
            alignItems="center"
            onClick={() => navigate('/team/management/student/allstudent')}
          >
            <AvatarSuccess
              sx={{
                mr: 2,
                background: '#71DE08',
              }}
              variant="rounded"
            >
              <PeopleAltIcon fontSize="large" />
            </AvatarSuccess>
            <Box>
              <Typography variant="h1">{users?.total_users}</Typography>
              <Typography variant="subtitle2" noWrap color="success">
                Total Users
              </Typography>
            </Box>
          </Box>
        </Grid>
        {/* <Grid item xs={12} md={4}>
          <Box>
            <Box display="flex" alignItems="center" pb={3}>
              <Badge
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                overlap="circular"
                badgeContent={
                  <Tooltip
                    arrow
                    placement="top"
                    title={
                      'Online since ' +
                      formatDistance(subMinutes(new Date(), 6), new Date(), {
                        addSuffix: true,
                      })
                    }
                  >
                    <DotLegend
                      style={{ background: `${theme.colors.success.main}` }}
                    />
                  </Tooltip>
                }
              >
                <AvatarWrapper
                  alt="Ann Saris"
                  src="/static/images/avatars/3.jpg"
                />
              </Badge>
              <Box
                sx={{
                  ml: 1.5,
                }}
              >
                <Typography variant="h4" noWrap gutterBottom>
                  Ann Saris
                </Typography>
                <Typography variant="subtitle2" noWrap>
                  Senior Book Keeper
                </Typography>
              </Box>
            </Box>

            <Typography variant="subtitle2" gutterBottom>
              <Text color="black">2</Text> out of <Text color="black">8</Text>{' '}
              assignments completed
            </Typography>
            <LinearProgressWrapper
              value={25}
              color="primary"
              variant="determinate"
            />
          </Box>
        </Grid> */}
        {/* <Grid item xs={12} md={4}>
          <Box>
            <Box display="flex" alignItems="center" pb={3}>
              <Badge
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                overlap="circular"
                badgeContent={
                  <Tooltip
                    arrow
                    placement="top"
                    title={
                      'Offline since ' +
                      formatDistance(subHours(new Date(), 7), new Date(), {
                        addSuffix: true,
                      })
                    }
                  >
                    <DotLegend
                      style={{ background: `${theme.colors.error.main}` }}
                    />
                  </Tooltip>
                }
              >
                <AvatarWrapper
                  alt="James Stanton"
                  src="/static/images/avatars/5.jpg"
                />
              </Badge>
              <Box
                sx={{
                  ml: 1.5,
                }}
              >
                <Typography variant="h4" noWrap gutterBottom>
                  James Stanton
                </Typography>
                <Typography variant="subtitle2" noWrap>
                  Phone Pre-Sales Assistant
                </Typography>
              </Box>
            </Box>

            <Typography variant="subtitle2" gutterBottom>
              <Text color="black">10</Text> out of <Text color="black">20</Text>{' '}
              assignments completed
            </Typography>
            <LinearProgressWrapper
              value={50}
              color="primary"
              variant="determinate"
            />
          </Box>
        </Grid> */}
      </Grid>
    </Box>
  );
}
