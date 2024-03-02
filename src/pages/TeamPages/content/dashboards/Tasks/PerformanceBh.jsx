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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CancelPresentationTwoToneIcon from "@mui/icons-material/CancelPresentationTwoTone";
import AddTaskIcon from "@mui/icons-material/AddTask";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import EngineeringIcon from "@mui/icons-material/Engineering";
import BlurOnIcon from "@mui/icons-material/BlurOn";
import { useEffect, useState } from "react";
import { TaskSharp } from "@mui/icons-material";

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

const AvatarConverted = styled(Avatar)(
  ({ theme }) => `
        background-color: ${theme.colors.secondary.main};
        color: ${theme.palette.secondary.contrastText};
        width: ${theme.spacing(8)};
        height: ${theme.spacing(8)};
        box-shadow: ${theme.colors.shadows.secondary};
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
  console.log(assignmentsData);

  const theme = useTheme();
  const navigate = useNavigate();
  const empArray = [
    "Technical pm",
    "Non-Technical pm",
    "Technical hr",
    "Non-Technical hr",
  ];

  const lostCount = assignmentsData?.filter(
    (item) => item.status === "Lost"
  )?.length;
  const postedCount = assignmentsData?.filter(
    (item) => item.status === "Posted"
  )?.length;
  const likelyCount = assignmentsData?.filter(
    (item) => item.status === "Likely"
  )?.length;
  const ConvertedCount = assignmentsData?.filter(
    (item) => item.status === "Converted"
  )?.length;

  const CompletedCount = assignmentsData?.filter(
    (item) => item.status === "Completed"
  )?.length;

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
              onClick={() => navigate("/team/dashboards/brainheaters")}
              display="flex"
              sx={{
                cursor: "pointer",
                px: 2,
                pb: 3,

                "&:hover": {
                  transform: "scale(1.05)",
                  transition: "all 0.5s ease-in-out",
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
                <>
                  <Typography variant="h1">
                    {assignmentsData?.length}
                  </Typography>
                  <span>Total Assignments</span>
                </>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              onClick={() => {
                navigate("/team/dashboards/brainheaters");
                localStorage.setItem("ActiveStatus", "Posted");
              }}
              display="flex"
              sx={{
                cursor: "pointer",
                px: 2,
                pb: 3,
                "&:hover": {
                  transform: "scale(1.05)",
                  transition: "all 0.5s ease-in-out",
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
                <Typography variant="h1">{postedCount}</Typography>

                <span>Posted Assignments</span>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              onClick={() => {
                navigate("/team/dashboards/brainheaters");
                localStorage.setItem("ActiveStatus", "Likely");
              }}
              display="flex"
              sx={{
                cursor: "pointer",
                px: 2,
                pb: 3,
                "&:hover": {
                  transform: "scale(1.05)",
                  transition: "all 0.5s ease-in-out",
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
                <Typography variant="h1">{likelyCount}</Typography>

                <span>Likely Assignments</span>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              onClick={() => {
                navigate("/team/dashboards/brainheaters");
                localStorage.setItem("ActiveStatus", "Converted");
              }}
              display="flex"
              sx={{
                cursor: "pointer",
                px: 2,
                pb: 3,
                "&:hover": {
                  transform: "scale(1.05)",
                  transition: "all 0.5s ease-in-out",
                },
              }}
              alignItems="center"
            >
              <AvatarConverted
                sx={{
                  mr: 2,
                }}
                variant="rounded"
              >
                <TaskSharp fontSize="large" />
              </AvatarConverted>
              <Box>
                <Typography variant="h1">{ConvertedCount}</Typography>

                <span>Converted Assignments</span>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              onClick={() => {
                navigate("/team/dashboards/brainheaters");
                localStorage.setItem("ActiveStatus", "Completed");
              }}
              display="flex"
              sx={{
                cursor: "pointer",
                px: 2,
                pb: 3,
                "&:hover": {
                  transform: "scale(1.05)",
                  transition: "all 0.5s ease-in-out",
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
                <Typography variant="h1">{CompletedCount}</Typography>

                <span>Completed Assignments</span>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box
              onClick={() => {
                navigate("/team/dashboards/brainheaters");
                localStorage.setItem("ActiveStatus", "Lost");
              }}
              display="flex"
              sx={{
                cursor: "pointer",
                px: 2,
                pb: 3,
                "&:hover": {
                  transform: "scale(1.05)",
                  transition: "all 0.5s ease-in-out",
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
                <Typography variant="h1">{lostCount}</Typography>

                <span>Lost Assignments</span>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </RootWrapper>
  );
}
