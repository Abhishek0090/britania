// @mui icons
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectAuth } from "~/features/auth/authSlice";
import { Card, Grid, LinearProgress, Stack, Icon } from "@mui/material";
import linearGradient from "~/layout/SidebarLayout/theme/functions/linearGradient";
import VuiProgress from "~/components/VuiProgress";
import colors from "~/layout/SidebarLayout/theme/base/colors";
import { IoIosRocket } from "react-icons/io";
import { IoBuild } from "react-icons/io5";
import { IoWallet } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { URL } from "~/utils/BaseURL";

// Images

import VuiBox from "~/components/VuiBox";
import VuiTypography from "~/components/VuiTypography";
import ProfileInfoCard from "~/components/Cards/InfoCards/ProfileInfoCard";
import Reward from "~/components/Reward";
import { barChartDataDashboard } from "~/pages/FreelancerDashboard/Dashboard/data/barChartData";
import { barChartOptionsDashboard } from "~/pages/FreelancerDashboard/Dashboard/data/barChartOptions";
// Vision UI Dashboard React example components
import DashboardLayout from "~/layout/LayoutContainers/DashboardLayout";
// Overview page components
import ReferralTracking from "~/pages/FreelancerDashboard/Dashboard/components/ReferralTracking";
import OrderOverview from "~/pages/FreelancerDashboard/Dashboard/components/OrderOverview";
import Projects from "~/pages/FreelancerDashboard/Dashboard/components/Projects";
// Data
import { lineChartDataDashboard } from "~/pages/FreelancerDashboard/Dashboard/data/lineChartData";
import { lineChartOptionsDashboard } from "~/pages/FreelancerDashboard/Dashboard/data/lineChartOptions";
import { LucideLink, LucideLinkedin } from "lucide-react";
import DashboardNavbar from "~/layout/Navbars/DashboardNavbar";
export default function ClaimRewards() {
  const auth = useSelector(selectAuth);
  const { gradients } = colors;
  const { cardContent } = gradients;

  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    axios
      .get(`${URL}/freelancer/freelancerewards.php?freelancer_id=${auth?.id}`)
      .then((res) => {
        setRewards(res?.data);
        console.log(res?.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <DashboardLayout>
      <Helmet>
        <title>Rewards | Bluepen</title>
      </Helmet>
      <DashboardNavbar light />
      <VuiBox mt={5} mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} xl={12}>
            <Grid item xs={12} lg={12} xl={12}>
              <Card>
                <VuiBox>
                  <VuiTypography
                    variant="lg"
                    color="white"
                    fontWeight="bold"
                    mb="5px"
                  >
                    How To Claim Rewards
                  </VuiTypography>
                  <VuiBox display="flex" alignItems="center" mb="40px">
                    <VuiTypography
                      variant="button"
                      color="text"
                      fontWeight="bold"
                    >
                      Here is the step by step guide to claim your rewards
                    </VuiTypography>
                  </VuiBox>
                  <Grid container spacing="50px" direction="column">
                    <Grid item xs={6} md={3} lg={3}>
                      <Stack
                        direction="row"
                        spacing={{ sm: "10px", xl: "4px", xxl: "10px" }}
                        mb="6px"
                      >
                        <VuiBox
                          bgColor="info"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{
                            borderRadius: "6px",
                            width: "25px",
                            height: "25px",
                          }}
                        >
                          <span className="text-white">1.</span>
                        </VuiBox>
                        <VuiTypography
                          color="text"
                          variant="button"
                          fontWeight="medium"
                        >
                          Step One
                        </VuiTypography>
                      </Stack>
                      <VuiTypography
                        color="white"
                        variant="lg"
                        fontWeight="bold"
                        mb="8px"
                      >
                        Refer to the rewards section to check your eligibility,
                        for every step at the reward you'll get a claim button.
                      </VuiTypography>
                    </Grid>
                    <Grid item xs={6} md={3} lg={3}>
                      <Stack
                        direction="row"
                        spacing={{ sm: "10px", xl: "4px", xxl: "10px" }}
                        mb="6px"
                      >
                        <VuiBox
                          bgColor="info"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{
                            borderRadius: "6px",
                            width: "25px",
                            height: "25px",
                          }}
                        >
                          <span className="text-white">2.</span>
                        </VuiBox>
                        <VuiTypography
                          color="text"
                          variant="button"
                          fontWeight="medium"
                        >
                          Step Two
                        </VuiTypography>
                      </Stack>
                      <VuiTypography
                        color="white"
                        variant="lg"
                        fontWeight="bold"
                        mb="8px"
                      >
                        Click on the claim button to claim your reward,
                        <span className="text-red-700 pl-2">
                          claim your reward within 14 days of enabling.
                        </span>
                      </VuiTypography>
                    </Grid>
                    <Grid item xs={6} md={3} lg={3}>
                      <Stack
                        direction="row"
                        spacing={{ sm: "10px", xl: "4px", xxl: "10px" }}
                        mb="6px"
                      >
                        <VuiBox
                          bgColor="info"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{
                            borderRadius: "6px",
                            width: "25px",
                            height: "25px",
                          }}
                        >
                          <span className="text-white">3.</span>
                        </VuiBox>
                        <VuiTypography
                          color="text"
                          variant="button"
                          fontWeight="medium"
                        >
                          Step Three
                        </VuiTypography>
                      </Stack>
                      <VuiTypography
                        color="white"
                        variant="lg"
                        fontWeight="bold"
                        mb="8px"
                      >
                        Upon claiming, your reward will be processed promptly.
                        If the reward is a product, please consider creating an
                        unboxing video to document the condition of the package,
                        which can be useful in case there is any damage.
                      </VuiTypography>
                    </Grid>
                    <Grid item xs={6} md={3} lg={3}>
                      <Stack
                        direction="row"
                        spacing={{ sm: "10px", xl: "4px", xxl: "10px" }}
                        mb="6px"
                      >
                        <VuiBox
                          bgColor="info"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{
                            borderRadius: "6px",
                            width: "25px",
                            height: "25px",
                          }}
                        >
                          <span className="text-white">4.</span>
                        </VuiBox>
                        <VuiTypography
                          color="text"
                          variant="button"
                          fontWeight="medium"
                        >
                          Step Four
                        </VuiTypography>
                      </Stack>
                      <VuiTypography
                        color="success"
                        variant="lg"
                        fontWeight="bold"
                        mb="8px"
                      >
                        Move on to the next project
                      </VuiTypography>
                    </Grid>
                  </Grid>
                </VuiBox>
              </Card>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={12} xl={12}>
            <Card>
              <VuiBox display="flex" flexDirection="column" height="100%">
                <VuiBox display="flex" flexDirection="column" mb="24px">
                  <VuiTypography
                    color="white"
                    variant="lg"
                    fontWeight="bold"
                    mb="6px"
                  >
                    Rewards waiting for you
                  </VuiTypography>
                  <VuiTypography
                    color="text"
                    variant="button"
                    fontWeight="regular"
                  >
                    Rewards are given to freelancers who have completed certain
                    number of assignments.
                  </VuiTypography>
                </VuiBox>
                <Reward />
              </VuiBox>
            </Card>
          </Grid>
        </Grid>
      </VuiBox>
    </DashboardLayout>
  );
}
