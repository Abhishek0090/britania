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
import OrderTable from "./OrderTable";

const Orders = () => {
  const { id } = useParams();
  const auth = useSelector(selectAuth);

  const [allAssignmentsData, setAllAssignmentsData] = useState([]);
  const [filteredAssignmentsData, setFilteredAssignmentsData] = useState([]);

  useEffect(() => {
    axios
      .post(`${URL}/student/purchases.php`, { token: auth?.token })
      .then((response) => {
        console.log(response);
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
        <title>All Plagiarism Reports</title>
      </Helmet>
      <PageTitleWrapper> 
        <div>
          <h2 className="font-bold text-center text-[2rem] md:text-[3rem]">
            All Plagiarism Reports
          </h2>
        </div>
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
          <Grid item xs={12} sx={{ margin: "20px" }}>
            <OrderTable
              statusName={null}
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

export default Orders;
