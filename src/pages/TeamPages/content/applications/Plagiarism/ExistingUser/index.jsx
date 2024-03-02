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
import ExistingTable from "./ExistingTable";

const ExistingUser = () => {
  const { id } = useParams();
  const auth = useSelector(selectAuth);
  const user = {
    name: auth?.teamData?.name,
    avatar: "/static/images/avatars/1.jpg",
  };

  const pmid = auth?.id;
  const pmArray = ["Technical pm", "Non-Technical pm"];

  const hrArray = ["Technical hr", "Non-Technical hr"];

  const [allAssignmentsData, setAllAssignmentsData] = useState([]);
  const [filteredAssignmentsData, setFilteredAssignmentsData] = useState([]);

  useEffect(() => {
    axios
      .get(`${URL}/team/plagiarismtable.php`)
      .then((response) => {
        console.log(response?.data);
        setAllAssignmentsData(response?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getAllPlagDetails = () => {
    axios
      .get(`${URL}/team/plagiarismtable.php`)
      .then((response) => {
        console.log(response?.data);
        setAllAssignmentsData(response?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
        <title>All Existing Users Plagiarism</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader
          title="All Existing Users Plagiarism"
          subtitle={`${user.name}, these are all available plagiarism files.`}
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
            <ExistingTable
              statusName={null}
              streamName={null}
              cryptoOrders={id ? filteredAssignmentsData : allAssignmentsData}
              getAllPlagDetails={getAllPlagDetails}
              id={id}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ExistingUser;
