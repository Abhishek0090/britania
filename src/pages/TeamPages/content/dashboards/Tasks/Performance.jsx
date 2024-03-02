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
import { useNavigate } from 'react-router-dom';
import CancelPresentationTwoToneIcon from '@mui/icons-material/CancelPresentationTwoTone';
import AddTaskIcon from '@mui/icons-material/AddTask';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import EngineeringIcon from '@mui/icons-material/Engineering';
import BlurOnIcon from '@mui/icons-material/BlurOn';

const RootWrapper = styled(Card)(
  ({ theme }) => `
     background: ${theme.colors.gradients.blue2};
    color: ${theme.colors.alpha.white[100]};
`
);

const AvatarContainer = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.alpha.white[100]};
      color: ${theme.palette.success.contrastText};
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
      box-shadow: ${theme.colors.shadows.primary};
`
);

const AvatarPrimary = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.primary.main};
      color: ${theme.palette.primary.contrastText};
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
      box-shadow: ${theme.colors.shadows.primary};
`
);

const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.success.main};
      color: ${theme.palette.success.contrastText};
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
      box-shadow: ${theme.colors.shadows.primary};
`
);

const AvatarError = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.error.main};
      color: ${theme.palette.error.contrastText};
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
      box-shadow: ${theme.colors.shadows.error};
`
);

const AvatarWarning = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.warning.main};
      color: ${theme.palette.warning.contrastText};
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
      box-shadow: ${theme.colors.shadows.warning};
`
);

const AvatarInfo = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.info.main};
      color: ${theme.palette.info.contrastText};
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
      box-shadow: ${theme.colors.shadows.info};
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

export default function Performance({
  title,
  assignmentsData,
  auth,
  userWork,
}) {
  const theme = useTheme();
  const navigate = useNavigate();
  const empArray = [
    'Technical pm',
    'Non-Technical pm',
    'Technical hr',
    'Non-Technical hr',
  ];

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
              onClick={() =>
                navigate('/team/management/assignments/allassignments')
              }
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
              <AvatarPrimary
                sx={{
                  mr: 2,
                }}
                variant="rounded"
              >
                <BlurOnIcon fontSize="large" />
              </AvatarPrimary>
              <Box>
                {auth?.teamDomain === 'Admin' && (
                  <>
                    <Typography variant="h1">
                      {assignmentsData?.total_assignments}
                    </Typography>
                    <span>Total Assignments</span>
                  </>
                )}
                {empArray.includes(auth?.teamDomain) && (
                  <>
                    <Typography variant="h1">{userWork?.length}</Typography>
                    <span>Total Inquiries</span>
                  </>
                )}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              onClick={() =>
                navigate(
                  '/team/management/assignments/underprocess-assignments'
                )
              }
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
              <AvatarWarning
                sx={{
                  mr: 2,
                }}
                variant="rounded"
              >
                <AccessTimeFilledIcon fontSize="large" />
              </AvatarWarning>
              <Box>
                {auth?.teamDomain === 'Admin' && (
                  <Typography variant="h1">
                    {assignmentsData?.under_process}
                  </Typography>
                )}
                {empArray.includes(auth?.teamDomain) && (
                  <Typography variant="h1">
                    {
                      userWork?.filter(
                        (item) => item?.status === 'Under Process'
                      )?.length
                    }
                  </Typography>
                )}
                <span>Under Process Assignments</span>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              onClick={() =>
                navigate('/team/management/assignments/reviewed-assignments')
              }
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
              <AvatarInfo
                sx={{
                  mr: 2,
                }}
                variant="rounded"
              >
                <ManageSearchIcon fontSize="large" />
              </AvatarInfo>
              <Box>
                {auth?.teamDomain === 'Admin' && (
                  <Typography variant="h1">
                    {assignmentsData?.review_received}
                  </Typography>
                )}
                {empArray.includes(auth?.teamDomain) && (
                  <Typography variant="h1">
                    {
                      userWork?.filter(
                        (item) => item?.status === 'Review Received'
                      )?.length
                    }
                  </Typography>
                )}

                <span>Reviewed Assignments</span>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              onClick={() =>
                navigate('/team/management/assignments/completed-assignments')
              }
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
                <AddTaskIcon fontSize="large" />
              </AvatarSuccess>
              <Box>
                {auth?.teamDomain === 'Admin' && (
                  <Typography variant="h1">
                    {assignmentsData?.completed}
                  </Typography>
                )}
                {empArray.includes(auth?.teamDomain) && (
                  <Typography variant="h1">
                    {
                      userWork?.filter((item) => item.status === 'Completed')
                        ?.length
                    }
                  </Typography>
                )}
                <span>Completed Assignments</span>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              onClick={() =>
                navigate('/team/management/assignments/assignedassignmentspm')
              }
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
              <AvatarContainer
                sx={{
                  mr: 2,
                }}
                variant="rounded"
              >
                <ManageAccountsIcon fontSize="large" />
              </AvatarContainer>
              <Box>
                {auth?.teamDomain === 'Admin' && (
                  <>
                    <Typography variant="h1">
                      {assignmentsData?.assigned_to_pm}
                    </Typography>
                    <span>
                      Assigned to{' '}
                      <span className="text-green-200 px-1">PM</span>
                    </span>
                  </>
                )}
                {empArray.includes(auth?.teamDomain) && (
                  <>
                    <Typography variant="h1">
                      {
                        userWork?.filter(
                          (item) => item?.status === 'Assigned to PM'
                        )?.length
                      }
                    </Typography>
                    <span>
                      Assigned to{' '}
                      <span className="text-green-200 px-1">Me</span>
                    </span>
                  </>
                )}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              onClick={() =>
                navigate(
                  '/team/management/assignments/assignedassignmentsfreelancers'
                )
              }
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
              <AvatarContainer
                sx={{
                  mr: 2,
                }}
                variant="rounded"
              >
                <EngineeringIcon fontSize="large" />
              </AvatarContainer>
              <Box>
                {auth?.teamDomain === 'Admin' && (
                  <Typography variant="h1">
                    {assignmentsData?.assigned_to_freelancer}
                  </Typography>
                )}
                {empArray.includes(auth?.teamDomain) && (
                  <Typography variant="h1">
                    {
                      userWork?.filter(
                        (item) => item?.status === 'Assigned to Freelancer'
                      )?.length
                    }
                  </Typography>
                )}
                <span>
                  Assigned to{' '}
                  <span className="text-green-200 px-1">Freelancers</span>{' '}
                </span>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box
              onClick={() =>
                navigate('/team/management/assignments/lost-assignments')
              }
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
              <AvatarError
                sx={{
                  mr: 2,
                }}
                variant="rounded"
              >
                <CancelPresentationTwoToneIcon fontSize="large" />
              </AvatarError>
              <Box>
                {auth?.teamDomain === 'Admin' && (
                  <Typography variant="h1">{assignmentsData?.lost}</Typography>
                )}
                {empArray.includes(auth?.teamDomain) && (
                  <Typography variant="h1">
                    {
                      userWork?.filter((item) => item?.status === 'Lost')
                        ?.length
                    }
                  </Typography>
                )}
                <span>Lost Assignments</span>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Box pt={3}>
          {auth?.teamDomain === 'Admin' && (
            <LinearProgressWrapper
              value={
                ((assignmentsData?.total_assignments - assignmentsData?.lost) /
                  assignmentsData?.total_assignments) *
                100
              }
              color="primary"
              variant="determinate"
            />
          )}
          {empArray.includes(auth?.teamDomain) && (
            <LinearProgressWrapper
              value={
                ((userWork?.length -
                  userWork?.filter((item) => item.status === 'Lost').length) /
                  userWork?.length) *
                100
              }
              color="primary"
              variant="determinate"
            />
          )}
        </Box>
      </CardContent>
    </RootWrapper>
  );
}
