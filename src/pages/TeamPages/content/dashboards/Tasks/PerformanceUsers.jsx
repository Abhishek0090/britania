import {
  Card,
  Box,
  CardContent,
  Typography,
  Avatar,
  useTheme,
  LinearProgress,
  styled,
  Grid,
} from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { useNavigate } from 'react-router-dom';
const RootWrapper = styled(Card)(
  ({ theme }) => `
    background: ${theme.colors.gradients.blue2};
    color: ${theme.colors.alpha.white[100]};
`
);

const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.alpha.white[100]};
      color: ${theme.palette.success.contrastText};
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
      box-shadow: ${theme.colors.shadows.primary};
`
);

const LinearProgressWrapper = styled(LinearProgress)(
  ({ theme }) => `
        flex-grow: 1;
        margin-right: ${theme.spacing(1)};
        height: 10px;
        background-color: ${theme.colors.error.main};

        .MuiLinearProgress-barColorPrimary {
          background-color: ${theme.colors.alpha.white[100]};
          border-top-right-radius: ${theme.general.borderRadius};
          border-bottom-right-radius: ${theme.general.borderRadius};
        }
`
);

export default function PerformanceUsers({ users, title }) {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <RootWrapper
      sx={{
        p: 2,
      }}
    >
      <Typography
        variant="h3"
        sx={{
          px: 2,
          pb: 1,
          pt: 2,
          fontSize: `${theme.typography.pxToRem(23)}`,
          color: `${theme.colors.alpha.white[100]}`,
        }}
      >
        {title}
      </Typography>
      <CardContent>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box
              onClick={() => navigate('/team/management/student/allstudent')}
              display="flex"
              sx={{
                cursor: 'pointer',
                px: 2,
                pb: 3,

                '&:hover': {
                  transform: 'scale(1.05)',
                  transition: 'all 0.5s ease-in-out',
                },
              }}
              alignItems="center"
            >
              <AvatarSuccess
                sx={{
                  mr: 2,
                }}
                variant="rounded"
              >
                <PeopleAltIcon fontSize="large" />
              </AvatarSuccess>
              <Box>
                <Typography variant="h1">{users?.total_users}</Typography>
                <span>Total Students</span>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </RootWrapper>
  );
}
