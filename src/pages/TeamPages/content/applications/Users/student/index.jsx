import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { Grid, Container } from "@mui/material";

import ProfileCover from "./ProfileCover";
import PopularTags from "./PopularTags";
import MyCards from "./MyCards";
import AssignmentsTable from "./AssignmentsTable";
import { URL } from "~/utils/BaseURL";
import { useSelector } from "react-redux";
import { selectAuth } from "~/features/auth/authSlice";
import { Card } from "@mui/material";
import TotalCard from "./TotalCard";
import AffiliateTable from "./AffiliateTable";

function ManagementUserProfile() {
  const auth = useSelector(selectAuth);
  const { id } = useParams();
  const [selectChanges, setSelectChanges] = useState(false);

  const [totalData, setTotalData] = useState({
    total_marks_category: "",
    total_marks_obtained: "",
    total_marks_out_of: "",
    total_marks_out_of_100: "",
  });

  const [affiliatedData, setAffiliatedData] = useState(null);

  useEffect(() => {
    localStorage.setItem("currentId", id);
  }, [id]);

  const [user, setUser] = useState({});

  useEffect(() => {
    axios
      .get(`${URL}/team/studentsdetails.php?id=${id}&logged_in_id=${auth?.id}`)
      .then((res) => {
        // console.log(res?.data[0]?.marks_array);

        setUser(res?.data[0]);
        setAffiliatedData(res?.data[0]?.affiliate_users);
        setTotalData({
          total_marks_category: res?.data[0]?.marks_array?.total_marks_category,
          total_marks_obtained: res?.data[0]?.marks_array?.total_marks_obtained,
          total_marks_out_of: res?.data[0]?.marks_array?.total_marks_out_of,
          total_marks_out_of_100:
            res?.data[0]?.marks_array?.total_marks_out_of_100,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, selectChanges]);

  // "total_marks_obtained": 239,
  // "total_marks_out_of": 400,
  // "total_marks_out_of_100": 59.75,
  // "total_marks_category": "Passing",
  // "total_resit": 0,
  // "total_passing": 76,
  // "total_merit": 0,
  // "total_distinction": 3

  const fetchUserDetails = () => {
    axios
      .get(`${URL}/team/studentsdetails.php?id=${id}&logged_in_id=${auth?.id}`)
      .then((res) => {
        setUser(res?.data[0]);

        setTotalData({
          total_marks_category: res?.data[0]?.marks_array?.total_marks_category,
          total_marks_obtained: res?.data[0]?.marks_array?.total_marks_obtained,
          total_marks_out_of: res?.data[0]?.marks_array?.total_marks_out_of,
          total_marks_out_of_100:
            res?.data[0]?.marks_array?.total_marks_out_of_100,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(user);

  return (
    <>
      <Helmet>
        <title> Profile | Student</title>
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
            <ProfileCover
              user={user}
              id={id}
              setSelectChanges={setSelectChanges}
              fetchUserDetails={fetchUserDetails}
            />
          </Grid>

          <Grid item xs={12} md={8}>
            <MyCards user={user} />
          </Grid>
          <Grid item xs={12} md={4}>
            <PopularTags user={user} />
          </Grid>

          {affiliatedData && (
            <Grid item xs={12} md={12}>
              <Grid>
                <Card>
                  <AffiliateTable cryptoOrders={affiliatedData} />
                </Card>
              </Grid>
            </Grid>
          )}

          {user?.assignments_details ? (
            <Grid item xs={12} md={12}>
              <Grid>
                <Card>
                  <TotalCard totalData={totalData} />
                </Card>
              </Grid>
              <AssignmentsTable cryptoOrders={user?.assignments_details} />
            </Grid>
          ) : null}
        </Grid>
      </Container>
    </>
  );
}

export default ManagementUserProfile;
