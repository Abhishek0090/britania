import React from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import PageHeader from "~/pages/TeamPages/components/PageHeader";
import PageTitleWrapper from "~/pages/TeamPages/components/PageTitleWrapper";
import { Grid, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { selectAuth } from "~/features/auth/authSlice";
import { useState, useEffect } from "react";
import axios from "axios";
import { URL } from "~/utils/BaseURL";
import PageTable from "./PageTable";

const BrainHeaters = () => {
  const { id } = useParams();
  const auth = useSelector(selectAuth);
  const user = {
    name: auth?.teamData?.name,
    avatar: "/static/images/avatars/1.jpg",
  };

  const [allAssignmentsData, setAllAssignmentsData] = useState([]);
  const [filteredAssignmentsData, setFilteredAssignmentsData] = useState([]);

  const [existingStatus, setExistingStatus] = useState(
    localStorage.getItem("ActiveStatus") || ""
  );

  useEffect(() => {
    axios
      .get(`${URL}/team/brainheatersassignmentstable.php`)
      .then((response) => { 
        setAllAssignmentsData(response?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (id) {
      const filteredData = allAssignmentsData?.filter((item) =>
        item?.freelancers?.map((freelancer) => freelancer?.id).includes(id)
      );
      setFilteredAssignmentsData(filteredData);
    }
  }, [id, allAssignmentsData, auth?.teamDomain]);

  return (
    <>
      <Helmet>
        <title>All BrainHeaters Assignments</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader
          title="All BrainHeaters Assignments"
          subtitle={`${user.name}, these are all available BrainHeaters Assignments.`}
        />
      </PageTitleWrapper>
      <Box
        fullwidth="true"
        sx={{
          mx: 2,
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <PageTable
              statusName={existingStatus}
              streamName={null}
              cryptoOrders={id ? filteredAssignmentsData : allAssignmentsData}
              id={id}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default BrainHeaters;
