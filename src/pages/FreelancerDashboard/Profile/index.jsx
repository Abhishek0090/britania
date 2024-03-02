import React from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAuth } from "~/features/auth/authSlice";
import axios from "axios";
import { Card, Grid, Stack, Icon } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { RewardsData } from "~/utils/RewardsData";
import toast from "react-hot-toast";
import { URL } from "~/utils/BaseURL";

import VuiBox from "~/components/VuiBox";
import VuiTypography from "~/components/VuiTypography";
import VuiButton from "~/components/VuiButton";
import ProfileInfoCard from "~/components/Cards/InfoCards/ProfileInfoCard";
import Reward from "./components/Rewards";
// Vision UI Dashboard React example components
import DashboardLayout from "~/layout/LayoutContainers/DashboardLayout";
// Overview page components
import Header from "./components/Header";
import ReferralTracking from "~/pages/FreelancerDashboard/Dashboard/components/ReferralTracking";
import CarInformations from "./components/CarInformations";
// Data
import { LucideLink, LucideLinkedin } from "lucide-react";
import OldRewards from "./components/Old_Rewards/OldRewards";

function Overview() {
  const { state } = useLocation();

  console.log(state);
  const auth = useSelector(selectAuth);
  const [tabValue, setTabValue] = useState(state?.tab ?? 0);
  const [user, setUser] = useState({});
  const [work, setWork] = useState({});
  const [rewards, setRewards] = useState([]);
  const [oldRewards, setOldRewards] = useState([]);
  const [oldRewardsCount, setOldRewardsCount] = useState(null);
  const [stats, setStats] = useState({});
  const fetchRewards = async () => {
    await axios
      .get(
        `${URL}/freelancer/freelancerrewarddetails.php?freelancer_id=${auth?.id}`
      )
      .then((res) => {
        setStats(res?.data);
        setRewards(res?.data?.rewards_array);
        setOldRewards(res?.data?.old_rewards_array);
        setOldRewardsCount(res?.data?.old_rewards);
        console.log("Rewards", res?.data);
      })
      .catch((err) => console.log(err));
  };

  const fetchUser = async () => {
    await axios
      .get(`${URL}/freelancer/freelancerprofile.php?freelancer_id=${auth?.id}`)
      .then((res) => {
        setUser(res?.data[0]);
        setWork(res?.data[1]);
        // console.log(res?.data);
      })
      .catch((err) => console.log(err));
  };

  const handleRewardClaim = async (ass) => {
    await axios
      .post(`${URL}/freelancer/claimreward.php`, {
        freelancer_id: auth?.id,
        number_of_assignments: ass,
      })
      .then((res) => {
        // console.log(res?.data);
        if (res?.data?.status === "success") {
          toast.success(res?.data?.message);
          fetchRewards();
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchUser();
    fetchRewards();
  }, []);

  return (
    <React.Fragment>
      <DashboardLayout>
        <Helmet>
          <title>Profile | Bluepen</title>
        </Helmet>
        <Header
          user={user}
          tabValue={tabValue}
          setTabValue={setTabValue}
          fetchUser={fetchUser}
          oldRewards={oldRewards}
          oldRewardsCount={oldRewardsCount}
        />
        {tabValue === 0 && (
          <>
            <VuiBox mt={5} mb={3}>
              <Grid
                container
                spacing={3}
                sx={({ breakpoints }) => ({
                  [breakpoints.only("xl")]: {
                    gridTemplateColumns: "repeat(2, 1fr)",
                  },
                })}
              >
                <Grid
                  item
                  xs={12}
                  xl={4}
                  xxl={4}
                  sx={({ breakpoints }) => ({
                    minHeight: "400px",
                    [breakpoints.only("xl")]: {
                      gridArea: "1 / 1 / 2 / 2",
                    },
                  })}
                >
                  <ProfileInfoCard
                    title="profile information"
                    description=""
                    info={{
                      fullName: `${user?.firstname} ${user?.lastname} `,
                      gender: `${user?.gender}`,
                      mobileNumber: `${user?.number}`,
                      WhatsappNumber: `${user?.whatsapp}`,
                      email: `${user?.email}`,
                      country: `(${user?.country_code}) ${user?.country_name}`,
                    }}
                    social={[
                      {
                        link: `https://wa.me/${user?.country_code}${user?.whatsapp}?text=Hi%20I%20am%20interested%20in%20your%20services%20and%20would%20like%20to%20know%20more%20about%20it.`,
                        icon: (
                          <WhatsAppIcon
                            style={{ color: "#25D366" }}
                            fontSize="medium"
                          />
                        ),
                        color: "facebook",
                      },
                    ]}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  xl={4}
                  xxl={4}
                  sx={({ breakpoints }) => ({
                    [breakpoints.only("xl")]: {
                      gridArea: "1 / 2 / 2 / 3",
                    },
                  })}
                >
                  <ProfileInfoCard
                    title="freelancing information"
                    info={{
                      domains: `${work?.domains
                        ?.split(",")
                        ?.map((item) => item)}`,
                      subjectTags: `${work?.subject_tags?.map((item) => item)}`,

                      assignmentTypes: `${work?.assignment_type?.map(
                        (item) => item
                      )}`,
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  xl={4}
                  xxl={4}
                  sx={({ breakpoints }) => ({
                    [breakpoints.only("xl")]: {
                      gridArea: "1 / 2 / 2 / 3",
                    },
                  })}
                >
                  <ProfileInfoCard
                    title="experience information"
                    info={{
                      qualification: `${work?.qualification}`,
                      workingHours: `${work?.working_hours}`,
                      pastExperience: `${work?.past_experience}`,
                      experience: `${work?.experience}`,
                      address: `${user?.address}, ${user?.street}, ${user?.city}, ${user?.state}, ${user?.pincode}, ${user?.country_name} (${user?.country_code})`,
                      panNumber: "123456789",
                    }}
                    worklinks={[
                      {
                        link: `${work?.linkedin}`,
                        icon: <LucideLinkedin />,
                        color: "#0e76a8",
                      },
                      {
                        link: `${work?.work_links}`,
                        icon: <LucideLink />,
                        color: "#1da1f2",
                      },
                    ]}
                  />
                </Grid>
              </Grid>
            </VuiBox>
            <Grid container spacing={3}>
              <Grid item xs={12} xl={4} height="100%">
                <CarInformations work={work} user={user} />
              </Grid>
            </Grid>
          </>
        )}
        {tabValue === 1 && (
          <VuiBox mt={5} mb={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} xl={12}>
                <ReferralTracking />
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
                        Rewards are given to users who have completed certain
                        number of assignments.
                      </VuiTypography>
                    </VuiBox>
                    <Reward
                      handleRewardClaim={handleRewardClaim}
                      rewards={rewards}
                      color={"bg-transparent"}
                    />
                  </VuiBox>
                </Card>
              </Grid>
            </Grid>
          </VuiBox>
        )}

        {tabValue === 2 && (
          <VuiBox mt={5} mb={3}>
            <Grid container spacing={3}>
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
                        Rewards are given to users who have completed certain
                        number of assignments.
                      </VuiTypography>
                    </VuiBox>
                    <OldRewards
                      handleRewardClaim={handleRewardClaim}
                      rewards={oldRewards}
                      color={"bg-transparent"}
                    />
                  </VuiBox>
                </Card>
              </Grid>
            </Grid>
          </VuiBox>
        )}

        {/* <Footer /> */}
      </DashboardLayout>
    </React.Fragment>
  );
}

export default Overview;
