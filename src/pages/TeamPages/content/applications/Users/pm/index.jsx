import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { Grid, Container } from "@mui/material";

import ProfileCover from "./ProfileCover";
import Feed from "./Feed";
import PopularTags from "./PopularTags";
import MyCards from "./MyCards";
import { URL } from "~/utils/BaseURL";
import { useSelector } from "react-redux";
import { Card } from "@mui/material";
import { selectAuth } from "~/features/auth/authSlice";
import TotalCard from "./TotalCard";

function ManagementUserProfile() {
  const auth = useSelector(selectAuth);
  const { id } = useParams();

  useEffect(() => {
    localStorage.setItem("currentId", id);
  }, [id]);

  const [user, setUser] = useState({});
  const [userWork, setUserWork] = useState([]);

  const [totalData, setTotalData] = useState({
    total_marks_category: "",
    total_marks_obtained: "",
    total_marks_out_of: "",
    total_marks_out_of_100: "",
  });

  useEffect(() => {
    axios
      .get(`${URL}/team/pmdetails.php?pm_id=${id}&logged_in_id=${auth?.id}`)

      .then((res) => {
        setUser(res?.data[0]);
        setUserWork(res?.data[1]);
        setTotalData({
          total_marks_category: res?.data[2]?.total_marks_category,
          total_marks_obtained: res?.data[2]?.total_marks_obtained,
          total_marks_out_of: res?.data[2]?.total_marks_out_of,
          total_marks_out_of_100: res?.data[2]?.total_marks_out_of_100,
        });
        console.log(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  console.log(user);

  return (
    <React.Fragment>
      <Helmet>
        <title> Profile | PM </title>
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
          <Grid item xs={12} md={12}>
            <Grid item xs={12}>
              <Card>
                <TotalCard totalData={totalData} />
              </Card>
            </Grid>
            <MyCards user={user} cryptoOrders={userWork} />
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default ManagementUserProfile;
