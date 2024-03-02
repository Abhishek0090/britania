import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import PageHeader from "./PageHeader";
import toast from "react-hot-toast";
import axios from "axios";
import {
  Grid,
  Tab,
  Tabs,
  Divider,
  Card,
  Box,
  useTheme,
  styled,
} from "@mui/material";
import PageTitleWrapper from "~/pages/TeamPages/components/PageTitleWrapper";
import CheckList from "./CheckList";
import Profile from "./Profile";
import AssignmentDetails from "./AssignmentDetails";
import { selectAuth } from "~/features/auth/authSlice";
import { useSelector } from "react-redux";
import { URL } from "~/utils/BaseURL";

export default function Details() {
  const theme = useTheme();
  const { id } = useParams();

  useEffect(() => {
    localStorage.setItem("currentId", id);
  }, [id]);

  const auth = useSelector(selectAuth);
  const hrArray = ["Technical hr", "Non-Technical hr"];

  const [assignmentDetails, setAssignmentDetails] = useState({});
  const [userDetails, setUserDetails] = useState({});
  const [freelancers, setFreelancers] = useState([]);
  const [assignedPM, setAssignedPM] = useState({});
  const [assignedFreelancer, setAssignedFreelancer] = useState([]);
  const [lostReason, setLostReason] = useState({});

  //Freelancer Table
  const [isLoading, setIsLoading] = useState({
    id: false,
  });

  const fetchAssignmentDetails = async () => {
    await axios
      .get(`${URL}/team/brainheatersassignmentsdetails.php?id=${id}`)
      .then(async (res) => {
        setAssignmentDetails(res?.data[0]);
        setLostReason(res?.data[0]);

        // setAssignedPM(res?.data[2].find((pm) => pm?.status === "Assigned"));
        // update assigned freelancer array
        // const assignedFreelancer = [];
        // res?.data[3]?.forEach((freelancer) => {
        //   if (freelancer?.assigned_status === "Assigned") {
        //     assignedFreelancer.push(freelancer);
        //   }
        // });
        // setAssignedFreelancer(assignedFreelancer);
  
        setUserDetails(res?.data[0]);
        setFreelancers(res?.data[3]);
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchAssignmentDetails();
  }, [id]);

  return (
    <React.Fragment>
      <Helmet>
        <title>Details</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader assignmentDetails={assignmentDetails} id={id} />
      </PageTitleWrapper>
      <Box
        fullwidth="true"
        sx={{
          mx: 2,
        }}
      >
        <Card variant="outlined">
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={0}
          >
            <>
              <Grid item xs={12}>
                <Box
                  sx={{
                    background: `${theme.colors.alpha.black[5]}`,
                  }}
                >
                  <Grid container spacing={0}>
                    <Grid item xs={12} md={12}>
                      <Box
                        sx={{
                          background: `${theme.colors.alpha.white[70]}`,
                          "@media screen and (max-width: 600px)": {
                            p: 0,
                          },
                          "@media screen and (min-width: 1200px)": {
                            p: 2,
                          },
                        }}
                      >
                        <AssignmentDetails
                          exisitingDetails={assignmentDetails}
                          assignedPM={assignedPM}
                          assignedFreelancer={assignedFreelancer}
                          id={id}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12}>
                  <Divider />
                </Grid>
              {auth?.teamDomain !== "Brainheaters" && (
                <Grid item xs={12}>
                  <Box
                    p={2}
                    sx={{
                      background: `${theme.colors.alpha.black[5]}`,
                    }}
                  >
                    <Grid container spacing={4}>
                      <Grid item xs={12} sm={6} md={6}>
                        <Box
                          sx={{
                            "@media screen and (max-width: 600px)": {
                              p: 0,
                            },
                            "@media screen and (min-width: 1200px)": {
                              p: 2,
                            },
                          }}
                        >
                          <CheckList
                            assignmentDetails={assignmentDetails}
                            fetchAssignmentDetails={fetchAssignmentDetails}
                            id={id}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={6}>
                        <Box
                          sx={{
                            "@media screen and (max-width: 600px)": {
                              p: 0,
                            },
                            "@media screen and (min-width: 1200px)": {
                              p: 5,
                            },
                          }}
                        >
                          <Profile
                            lostReason={lostReason}
                            id={id}
                            userDetails={userDetails}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              )}
            </>
          </Grid>
        </Card>
      </Box>
    </React.Fragment>
  );
}
