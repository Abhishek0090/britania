import React, { useState, useEffect } from "react";
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
import AssignmentsTable from "./AssignmentsTable";
import AssignmentStats from "./AssignmentStats";
import { set } from "nprogress";
import { URL } from "~/utils/BaseURL";
import Comment from "./Comment";
import { useSelector } from "react-redux";
import { selectAuth } from "~/features/auth/authSlice";

function ManagementUserProfile() {
  const auth = useSelector(selectAuth);
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [userWork, setUserWork] = useState([]);
  const [otherIds, setOtherIds] = useState([]);
  const [inquiriesTable, setInquiriesTable] = useState([]);
  const [assignedTable, setAssignedTable] = useState([]);
  const [assignmentStats, setAssignmentStats] = useState({
    assigned: 0,
    inquiries: 0,
    completed: 0,
  });
  const [chatDetails, setChatDetails] = useState(null);

  const [totalData, setTotalData] = useState({
    total_marks_category: "",
    total_marks_obtained: "",
    total_marks_out_of: "",
    total_marks_out_of_100: "",
  });

  useEffect(() => {
    localStorage.setItem("currentId", id);
  }, [id]);

  useEffect(() => {
    axios
      .get(
        `${URL}/team/freelancerdetails.php?id=${id}&logged_in_id=${auth?.id}`
      )
      .then((res) => {
        setOtherIds(res?.data[0]);
        setUser(res?.data[1]);
        setUserWork(res?.data[2]);
        setInquiriesTable(res?.data[3]);
        setAssignedTable(res?.data[4]);
        setChatDetails(res?.data[3][0]);
        setTotalData({
          total_marks_category: res?.data[5]?.total_marks_category,
          total_marks_obtained: res?.data[5]?.total_marks_obtained,
          total_marks_out_of: res?.data[5]?.total_marks_out_of,
          total_marks_out_of_100:
            (res?.data[5]?.total_marks_obtained /
              res?.data[5]?.total_marks_out_of) *
            100,
        });
        // console.log(res?.data[3][0])
        let tempArray = [];
        res?.data[4]?.map((a) => {
          if (a?.status === "Completed") {
            tempArray.push(a);
          }
        });
        setAssignmentStats({
          assigned: res?.data[4]?.length,
          inquiries: res?.data[3]?.length,
          completed: tempArray?.length,
        });
        console.log(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  console.log(totalData , "BRRRRRRRRRR")

  return (
    <React.Fragment>
      <Helmet>
        <title> Profile | Freelancer</title>
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
              userWork={userWork}
              otherIds={otherIds}
              chatDetails={chatDetails}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Feed user={user} userWork={userWork} />
          </Grid>
          <Grid item xs={12} md={4}>
            <PopularTags user={user} userWork={userWork} />
          </Grid>
          <Grid item xs={12} md={7}>
            <MyCards user={user} />
          </Grid>
          <Grid item xs={12} md={5}>
            <Addresses user={user} id={id} />
          </Grid>
          <Grid item xs={12} md={12}>
            <AssignmentStats
              assignmentStats={assignmentStats}
              user={user}
              id={id}
              totalData={totalData}
            />
          </Grid>

          {inquiriesTable?.length > 0 || assignedTable?.length > 0 ? (
            <Grid item xs={12} md={12}>
              <AssignmentsTable
                inquiriesTable={inquiriesTable}
                assignedTable={assignedTable}
                totalData={totalData}
              />
            </Grid>
          ) : null}
          <Grid item xs={12} md={12}>
            <Comment user={user} id={id} />
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default ManagementUserProfile;
