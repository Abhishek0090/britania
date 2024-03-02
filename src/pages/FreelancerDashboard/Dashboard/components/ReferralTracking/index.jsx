import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAuth } from "~/features/auth/authSlice";
import axios from "axios";
import { Card, Stack, CircularProgress, Icon } from "@mui/material";
import VuiBox from "~/components/VuiBox";
import VuiTypography from "~/components/VuiTypography";
import colors from "~/layout/SidebarLayout/theme/base/colors";
import linearGradient from "~/layout/SidebarLayout/theme/functions/linearGradient";
import { RewardsData } from "~/utils/RewardsData";
import { LucideArrowRight } from "lucide-react";
import { URL } from "~/utils/BaseURL";
import { Infinity } from "lucide-react";

export default function ReferralTracking() {
  const navigate = useNavigate();
  const auth = useSelector(selectAuth);
  const { gradients } = colors;
  const { cardContent } = gradients;
  const [stats, setStats] = useState({});

  useEffect(() => {
    axios
      .get(
        `${URL}/freelancer/freelancerrewarddetails.php?freelancer_id=${auth?.id}`
      )
      .then((res) => {
        setStats(res.data);
        // console.log('Stats', res?.data);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(stats);

  return (
    <Card
      sx={{
        height: "100%",
        background: linearGradient(
          gradients.cardDark.main,
          gradients.cardDark.state,
          gradients.cardDark.deg
        ),
      }}
    >
      <VuiBox sx={{ width: "100%" }}>
        <VuiBox
          display="flex"
          alignItems="center"
          justifyContent="space-beetween"
          sx={{ width: "100%" }}
          mb="40px"
        >
          <VuiTypography variant="lg" color="white" mr="auto" fontWeight="bold">
            Rewards Tracking
          </VuiTypography>
        </VuiBox>
        <VuiBox
          display="flex"
          sx={({ breakpoints }) => ({
            [breakpoints.up("xs")]: {
              flexDirection: "column",
              gap: "16px",
              justifyContent: "center",
              alignItems: "center",
            },
            [breakpoints.up("md")]: {
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            },
          })}
        >
          <Stack
            direction="column"
            spacing="20px"
            width="500px"
            maxWidth="50%"
            sx={({ breakpoints }) => ({
              mr: "auto",
              [breakpoints.only("md")]: {
                mr: "75px",
              },
              [breakpoints.only("xl")]: {
                width: "500px",
                maxWidth: "40%",
              },
            })}
          >
            <VuiBox
              display="flex"
              width="220px"
              p="20px 22px"
              flexDirection="column"
              sx={({ breakpoints }) => ({
                background: linearGradient(
                  cardContent.main,
                  cardContent.state,
                  cardContent.deg
                ),
                borderRadius: "20px",
                [breakpoints.up("xl")]: {
                  maxWidth: "200px !important",
                },
                [breakpoints.up("xxl")]: {
                  minWidth: "180px",
                  maxWidth: "100% !important",
                },
              })}
            >
              <VuiTypography
                color="text"
                variant="button"
                fontWeight="regular"
                mb="5px"
              >
                Incomming Level
              </VuiTypography>
              <VuiTypography
                onClick={() =>
                  navigate("/dashboard/freelancer/profile", {
                    state: { tab: 1 },
                  })
                }
                variant="lg"
                color="white"
                fontWeight="bold"
                sx={{
                  zIndex: 2,
                  mr: "5px",
                  display: "inline-flex",
                  alignItems: "center",
                  cursor: "pointer",

                  "& .material-icons-round": {
                    fontSize: "1.125rem",
                    transform: `translate(2px, -0.5px)`,
                    transition:
                      "transform 0.2s cubic-bezier(0.34,1.61,0.7,1.3)",
                  },

                  "&:hover .material-icons-round, &:focus  .material-icons-round":
                    {
                      transform: `translate(6px, -0.5px)`,
                    },
                }}
              >
                {stats?.level}
                <Icon sx={{ fontWeight: "bold", ml: "5px" }}>
                  <LucideArrowRight size={15} />
                </Icon>
              </VuiTypography>
            </VuiBox>
          </Stack>
          <VuiBox sx={{ position: "relative", display: "inline-flex" }}>
            <CircularProgress
              variant="determinate"
              value={
                stats?.goal === 1000
                  ? 100
                  : (stats?.completed / stats?.goal) * 100
              }
              size={
                window.innerWidth >= 1024
                  ? 200
                  : window.innerWidth >= 768
                  ? 170
                  : 200
              }
              color="success"
            />
            <VuiBox
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <VuiBox
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <VuiTypography
                  color="white"
                  variant="d5"
                  fontWeight="bold"
                  mb="4px"
                  sx={({ breakpoints }) => ({
                    [breakpoints.only("xl")]: {
                      fontSize: "32px",
                    },
                  })}
                >
                  {stats?.completed > 1000 ? <Infinity className="h-12 w-12"/> : stats?.distance}
                </VuiTypography>
                <VuiTypography color="text" variant="button">
                  Assignment to go
                </VuiTypography>
              </VuiBox>
            </VuiBox>
          </VuiBox>
        </VuiBox>
      </VuiBox>
    </Card>
  );
}
