import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { Grid, Container } from "@mui/material";

import ProfileCover from "./ProfileCover";
import RecentActivity from "./RecentActivity";
import Feed from "./Feed";
import PopularTags from "./PopularTags";
import MyCards from "./MyCards";
import Addresses from "./Addresses";
import { URL } from "~/utils/BaseURL";

function ManagementUserProfile() {
  const { id } = useParams();

  useEffect(() => {
    localStorage.setItem("currentId", id);
  }, [id]);
  
  const [user, setUser] = useState({});
  const [userWork, setUserWork] = useState([]);

  useEffect(() => {
    axios
      .get(`${URL}/team/pmdetails.php?pm_id=${id}`)

      .then((res) => {
        setUser(res?.data[0]);
        setUserWork(res?.data[1]);
        console.log(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <>
      <Helmet>
        <title> Profile | HR </title>
      </Helmet>
      <Container sx={{ mt: 3 }} maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} md={12}>
            <ProfileCover user={user} id={id} userWork={userWork} />
          </Grid>
          {/* <Grid item xs={12} md={4}>
            <PopularTags user={user} />
          </Grid>{' '} */}
          {/* <Grid item xs={12} md={4}>
            <RecentActivity user={user} />
          </Grid> */}
          <Grid item xs={12} md={7}>
            <Feed user={user} userWork={userWork} />
          </Grid>
          <Grid item xs={12} md={5}>
            <PopularTags user={user} userWork={userWork} />
          </Grid>
          {/* <Grid item xs={12} md={12}>
            <MyCards user={user} cryptoOrders={userWork} />
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
}

export default ManagementUserProfile;
