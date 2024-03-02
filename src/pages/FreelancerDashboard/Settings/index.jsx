import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { selectAuth } from "~/features/auth/authSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import Grid from "@mui/material/Grid";
import VuiBox from "~/components/VuiBox";
import BasicDetails from "./components/BasicDetails";
import DashboardLayout from "~/layout/LayoutContainers/DashboardLayout";
import DashboardNavbar from "~/layout/Navbars/DashboardNavbar"; 
import SpecificDetails from "./components/SpecificDetails";
import AddressDetails from "./components/AddressDetails";
import SubjectTags from "./components/SubjectTags";
import AssignmentType from "./components/AssignmentType";
import WorkDetails from "./components/WorkDetails";
import { URL } from "~/utils/BaseURL";

export default function Settings() {
  const auth = useSelector(selectAuth);
  const [user, setUser] = useState({});
  const [work, setWork] = useState({});
  const fetchUser = async () => {
    await axios
      .get(`${URL}/freelancer/freelancerprofile.php?freelancer_id=${auth?.id}`)
      .then((res) => {
        setUser(res?.data[0]);
        setWork(res?.data[1]);
        console.log(res?.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <DashboardLayout>
      <Helmet>
        <title>Settings | Bluepen</title>
      </Helmet>
      <DashboardNavbar />
      <VuiBox mt={4}>
        <VuiBox mb={1.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={7} xl={8}>
              <Grid container spacing={3}>
                <Grid item xs={12} xl={6}>
                  <BasicDetails user={user} />
                </Grid>
                <Grid item xs={12} md={12} xl={6}>
                  <SpecificDetails user={user} />
                </Grid>
                <Grid item xs={12}>
                  <SubjectTags work={work} user={user} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={5} xl={4}>
              <AddressDetails user={user} />
            </Grid>
          </Grid>
        </VuiBox>
        <VuiBox my={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <AssignmentType work={work} user={user} />
            </Grid>
            <Grid item xs={12} md={5}>
              <WorkDetails user={user} work={work} />
            </Grid>
          </Grid>
        </VuiBox>
      </VuiBox>
    </DashboardLayout>
  );
}
