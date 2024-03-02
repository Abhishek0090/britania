import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import { selectAuth } from "~/features/auth/authSlice";
import axios from "axios";
import { URL } from "~/utils/BaseURL";
import VuiBox from "~/components/VuiBox";

// Vision UI Dashboard React example components
import DashboardLayout from "~/layout/LayoutContainers/DashboardLayout";
import DashboardNavbar from "~/layout/Navbars/DashboardNavbar";
import MiniStatisticsCard from "~/components/Cards/StatisticsCards/MiniStatisticsCard";

// Dashboard layout components
import WelcomeMark from "~/pages/FreelancerDashboard/Dashboard/components/WelcomeMark";
import Projects from "~/pages/FreelancerDashboard/Dashboard/components/Projects";
import OrderOverview from "~/pages/FreelancerDashboard/Dashboard/components/OrderOverview";
import ReferralTracking from "~/pages/FreelancerDashboard/Dashboard/components/ReferralTracking";

import {
  LucideBellRing,
  LucideBell,
  LucideBellPlus,
  LucideBellOff,
} from "lucide-react";
import GraphChart from "./components/GraphChart";

function Dashboard() {
  const auth = useSelector(selectAuth);
  const [user, setUser] = useState({});
  const [rewards, setRewards] = useState([]);
  const [stats, setStats] = useState({});
  const [latestAssignment, setLatestAssignment] = useState({});

  useEffect(() => {
    axios
      .get(`${URL}/freelancer/freelancerprofile.php?freelancer_id=${auth?.id}`)
      .then((res) => {
        setUser(res?.data[0]);
        // console.log('User', res?.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`${URL}/freelancer/dashboard.php?freelancer_id=${auth?.id}`)
      .then((res) => {
        setStats(res.data);
        // console.log('Stats', res?.data);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axios
      .get(
        `${URL}/freelancer/freelanceassignments.php?freelancer_id=${auth?.id}`
      )
      .then((res) => {
        axios
          .get(
            `${URL}/freelancer/freelanceassignmentdetails.php?assignment_id=${res?.data[0]?.id}`
          )
          .then((res) => {
            setLatestAssignment(res?.data);
            // console.log('latestAssignment', res?.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <DashboardLayout>
      <Helmet>
        <title>Dashboard | Bluepen</title>
      </Helmet>
      <DashboardNavbar />
      <VuiBox py={3}>
        <VuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                link="/dashboard/freelancer/assignment"
                tabIndex={0}
                title={{ text: "Total Inquiries", fontWeight: "regular" }}
                count={stats?.total_inquiries}
                icon={{
                  color: "warning",
                  component: <LucideBellRing size="22px" color="white" />,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                link="/dashboard/freelancer/assignment"
                tabIndex={1}
                title={{ text: "Assigned to me" }}
                count={stats?.assigned_to_me}
                icon={{
                  color: "info",
                  component: <LucideBellPlus size="22px" color="white" />,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                link="/dashboard/freelancer/assignment"
                tabIndex={2}
                title={{ text: "Completed Assignments" }}
                count={stats?.completed}
                icon={{
                  color: "success",
                  component: <LucideBell size="22px" color="white" />,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                link="/dashboard/freelancer/assignment"
                tabIndex={3}
                title={{ text: "Incomplete Assignments" }}
                count={stats?.incomplete}
                icon={{
                  color: "error",
                  component: <LucideBellOff size="20px" color="white" />,
                }}
              />
            </Grid>
          </Grid>
        </VuiBox>
        <VuiBox mb={3}>
          <Grid container spacing="18px">
            <Grid item xs={12} lg={12} xl={6}>
              <WelcomeMark user={user} />
            </Grid>
            {/* <Grid item xs={12} lg={6} xl={3}>
              <SatisfactionRate />
            </Grid> */}
            <Grid item xs={12} lg={6} xl={6}>
              <ReferralTracking />
            </Grid>
          </Grid>
        </VuiBox>
        <VuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12} xl={12}>
              <GraphChart  />
            </Grid>
          </Grid>
        </VuiBox>
        <VuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={8} xl={8}>
              <Projects title="Assignments &amp; Projects" />
            </Grid>

            <Grid item xs={12} md={6} lg={4} xl={4}>
              <OrderOverview latestAssignment={latestAssignment} />
            </Grid>
          </Grid>
        </VuiBox>
      </VuiBox>
    </DashboardLayout>
  );
}

export default Dashboard;
