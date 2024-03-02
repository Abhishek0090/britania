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
import EngineeringIcon from '@mui/icons-material/Engineering';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import CancelPresentationTwoToneIcon from '@mui/icons-material/CancelPresentationTwoTone';
import { useNavigate } from 'react-router-dom';
const RootWrapper = styled(Card)(
  ({ theme }) => `
    background: ${theme.colors.gradients.blue2};
    color: ${theme.colors.alpha.white[100]};
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

const AvatarContainer = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.alpha.white[100]};
      color: ${theme.palette.success.contrastText};
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

const AvatarWarning = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.warning.main};
      color: ${theme.palette.warning.contrastText};
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
      box-shadow: ${theme.colors.shadows.warning};
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

export default function PerformanceFreelancers({
  title,
  auth,
  freelancers,
  freelancerDataDomainSpecific,
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
                navigate('/team/management/freelancers/allfreelancers')
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
                    {freelancers?.total_freelancers}
                  </Typography>
                )}
                {empArray.includes(auth?.teamDomain) && (
                  <Typography variant="h1">
                    {freelancerDataDomainSpecific?.length}
                  </Typography>
                )}

                <span>Total Freelancers</span>
              </Box>
            </Box>
          </Grid>
          {empArray.includes(auth?.teamDomain) && (
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
                <AvatarSuccess
                  sx={{
                    mr: 2,
                  }}
                  variant="rounded"
                >
                  <AddReactionIcon fontSize="large" />
                </AvatarSuccess>
                <Box>
                  {auth?.teamDomain === 'Admin' && (
                    <Typography variant="h1">
                      {freelancers?.form_filled}
                    </Typography>
                  )}
                  {empArray.includes(auth?.teamDomain) && (
                    <Typography variant="h1">
                      {
                        freelancerDataDomainSpecific?.filter(
                          (item) => item?.status === 'Form Filled'
                        )?.length
                      }
                    </Typography>
                  )}
                  <span>Form Filled Freelancers</span>
                </Box>
              </Box>
            </Grid>
          )}

          <Grid item xs={12} md={4}>
            <Box
              onClick={() =>
                navigate('/team/management/freelancers/approvedfreelancers')
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
                  <Typography variant="h1">{freelancers?.approved}</Typography>
                )}
                {empArray.includes(auth?.teamDomain) && (
                  <Typography variant="h1">
                    {auth?.teamDomain === 'Technical pm' ||
                    auth?.teamDomain === 'Technical hr' ? (
                      <>
                        {
                          freelancerDataDomainSpecific?.filter(
                            (item) => item?.status === 'Technical Approved'
                          )?.length
                        }
                      </>
                    ) : (
                      <>
                        {
                          freelancerDataDomainSpecific?.filter(
                            (item) => item?.status === 'Non Technical Approved'
                          )?.length
                        }
                      </>
                    )}
                  </Typography>
                )}
                <span>Approved Freelancers</span>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
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
                    {freelancers?.agreement_received_freelancers}
                  </Typography>
                )}
                {empArray.includes(auth?.teamDomain) && (
                  <Typography variant="h1">
                    {
                      freelancerDataDomainSpecific?.filter(
                        (item) => item?.status === 'Agreement Sent'
                      )?.length
                    }
                  </Typography>
                )}
                <span>Agreement Received Freelancers</span>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
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
                    {freelancers?.agreement_sent_freelancers}
                  </Typography>
                )}
                {empArray.includes(auth?.teamDomain) && (
                  <Typography variant="h1">
                    {
                      freelancerDataDomainSpecific?.filter(
                        (item) => item?.status === 'Agreement Sent'
                      )?.length
                    }
                  </Typography>
                )}
                <span>Agreement Sent Freelancers</span>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box
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
                    {freelancers?.interview_conducted_freelancers}
                  </Typography>
                )}
                {empArray.includes(auth?.teamDomain) && (
                  <Typography variant="h1">
                    {
                      freelancerDataDomainSpecific?.filter(
                        (item) => item?.status === 'Interview Conducted'
                      )?.length
                    }
                  </Typography>
                )}
                <span>Interview Conducted Freelancers</span>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
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
                    {freelancers?.interview_pending_freelancers}
                  </Typography>
                )}
                {empArray.includes(auth?.teamDomain) && (
                  <Typography variant="h1">
                    {freelancerDataDomainSpecific?.filter(
                      (item) => item?.status === 'Form Filled'
                    )?.length -
                      freelancerDataDomainSpecific?.filter(
                        (item) => item?.status === 'Interview Conducted'
                      )?.length}
                  </Typography>
                )}
                <span>Interview Pending Freelancers</span>
              </Box>
            </Box>
          </Grid>
          {empArray.includes(auth?.teamDomain) && (
            <>
              <Grid item xs={12} md={4}>
                <Box
                  onClick={() =>
                    navigate('/team/management/freelancers/approvedfreelancers')
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
                    <DoNotDisturbOnIcon fontSize="large" />
                  </AvatarWarning>
                  <Box>
                    {auth?.teamDomain === 'Admin' && (
                      <Typography variant="h1">
                        {freelancers?.not_approved}
                      </Typography>
                    )}
                    {empArray.includes(auth?.teamDomain) && (
                      <Typography variant="h1">
                        {
                          freelancerDataDomainSpecific?.filter(
                            (item) => item?.status === 'Not Approved'
                          )?.length
                        }
                      </Typography>
                    )}
                    <span>Not Approved Freelancers</span>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box
                  onClick={() =>
                    navigate('/team/management/freelancers/approvedfreelancers')
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
                      <Typography variant="h1">
                        {freelancers?.rejected}
                      </Typography>
                    )}
                    {empArray.includes(auth?.teamDomain) && (
                      <Typography variant="h1">
                        {
                          freelancerDataDomainSpecific?.filter(
                            (item) => item?.status === 'Rejected'
                          )?.length
                        }
                      </Typography>
                    )}
                    <span>Rejected Freelancers</span>
                  </Box>
                </Box>
              </Grid>
            </>
          )}
        </Grid>
        {/* <Box pt={3}>
          <LinearProgressWrapper
            value={73}
            color="primary"
            variant="determinate"
          />
        </Box> */}
      </CardContent>
    </RootWrapper>
  );
}
