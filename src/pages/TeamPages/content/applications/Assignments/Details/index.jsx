import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import PageHeader from "./PageHeader";
import toast from "react-hot-toast";
import axios from "axios";
import { Grid, Tab, Tabs, Divider, Card, Box, useTheme } from "@mui/material";
import PageTitleWrapper from "~/pages/TeamPages/components/PageTitleWrapper";
import Checklist from "./Checklist";
import Profile from "./Profile";
import AssignmentDetails from "./AssignmentDetails";
import PMList from "./PMList";
import FreelancerList from "./FreelancerList";
import { TabsContainerWrapper } from "~/utils/CustomStyles";
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

  const tabs = [
    { value: "details", label: "Details Overview" },
    { value: "projectManagers", label: "All Project Managers" },
    { value: "freelancers", label: "All Freelancers" },
  ];

  const tabshr = [{ value: "details", label: "Details Overview" }];

  const [currentTab, setCurrentTab] = useState("details");
  const [assignmentDetails, setAssignmentDetails] = useState({});
  const [marksDetails, setMarksDetails] = useState({});
  const [userDetails, setUserDetails] = useState({});
  const [projectManagers, setProjectManagers] = useState([]);
  const [freelancers, setFreelancers] = useState([]);
  const [assignedPM, setAssignedPM] = useState({});
  const [assignedFreelancer, setAssignedFreelancer] = useState([]);
  const [assignmentDetailsStream, setAssignmentDetailsStream] = useState("");
  const [lostReason, setLostReason] = useState({});
  const [chatDetails, setChatDetails] = useState(null);

  //Freelancer Table
  const [isLoading, setIsLoading] = useState({
    id: false,
  });

  const [newTabs, setNewTabs] = useState(tabs);

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  const fetchAssignmentDetails = async () => {
    if (hrArray.includes(auth?.teamDomain)) setNewTabs(tabshr);
    await axios
      .get(
        `${URL}/team/freelancingassignmentdetails.php?id=${id}&role=admin&logged_in_id=${auth?.id}`
      )
      .then((res) => {
        console.log(res);
        setAssignmentDetails(res?.data[0]);
        setMarksDetails(res?.data[1]);
        setLostReason(res?.data[3]);
        if (
          res?.data[0]?.stream?.toLowerCase() === "commerce" ||
          res?.data[0]?.stream?.toLowerCase() === "arts"
        ) {
          setAssignmentDetailsStream("Non-Technical");
        } else {
          setAssignmentDetailsStream("Technical");
        }
        setAssignedPM(res?.data[4].find((pm) => pm?.status === "Assigned"));
        // update assigned freelancer array
        const assignedFreelancer = [];
        res?.data[5]?.forEach((freelancer) => {
          if (freelancer?.assigned_status === "Assigned") {
            assignedFreelancer.push(freelancer);
          }
        });
        setAssignedFreelancer(assignedFreelancer);

        // /* TODO: change the indexing when making live
        setUserDetails(res?.data[3]);
        setProjectManagers(res?.data[4]);
        setFreelancers(res?.data[5]);
        setChatDetails(res?.data[3]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(assignedPM);

  const handleAssignPM = async (PMid) => {
    setIsLoading({ ...isLoading, [PMid]: true });
    try {
      const response = await axios.get(
        `${URL}/team/assigntopm.php?pm_id=${PMid}&assignment_id=${id}`
      );
      if (response?.data?.status === 200) {
        toast.success(response?.data?.message);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occured");
    }
    setIsLoading({ ...isLoading, [PMid]: false });
    fetchAssignmentDetails();
  };

  const handleAssign = async (Fid) => {
    setIsLoading({ ...isLoading, [Fid]: true });
    try {
      const response = await axios.get(
        `${URL}/team/assigntofreelancer.php?freelancer_id=${Fid}&assignment_id=${id}`
      );

      console.log(response?.data);
      if (response?.data?.status === 200) {
        toast.success(response?.data?.message);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occured");
    }
    setIsLoading({ ...isLoading, [Fid]: false });
    fetchAssignmentDetails();
  };

  const handleUnassign = async (Fid) => {
    setIsLoading({ ...isLoading, [Fid]: true });
    try {
      const response = await axios.get(
        `${URL}/team/unassigntofreelancer.php?freelancer_id=${Fid}&assignment_id=${id}`
      );
      console.log(response?.data);
      toast.success(response?.data?.status);
    } catch (error) {
      console.log(error);
      toast.error("An error occured");
    }
    setIsLoading({ ...isLoading, [Fid]: false });
    fetchAssignmentDetails();
  };

  const handleInquiry = async (Fid) => {
    setIsLoading({ ...isLoading, [Fid]: true });
    try {
      const response = await axios.get(
        `${URL}/team/sendinquirytoassign.php?freelancer_id=${Fid}&assignment_id=${id}`
      );
      // console.log(response?.data);
      toast.success(response?.data?.status);
    } catch (error) {
      console.log(error);
      toast.error("An error occured");
    }

    setIsLoading({ ...isLoading, [Fid]: false });
    fetchAssignmentDetails();
  };

  useEffect(() => {
    fetchAssignmentDetails();
  }, [id]);

  return (
    <React.Fragment>
      <Helmet>
        <title>Tasks Dashboard</title>
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
        <TabsContainerWrapper>
          <Tabs
            onChange={handleTabsChange}
            value={currentTab}
            variant="scrollable"
            scrollButtons="auto"
            textColor="primary"
            indicatorColor="primary"
          >
            {newTabs.map((tab) => (
              <Tab key={tab.value} label={tab.label} value={tab.value} />
            ))}
          </Tabs>
        </TabsContainerWrapper>
        <Card variant="outlined">
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={0}
          >
            {currentTab === "details" && (
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
                              p: 3,
                            },
                          }}
                        >
                          <AssignmentDetails
                            assignmentDetails={assignmentDetails}
                            assignedPM={assignedPM}
                            assignedFreelancer={assignedFreelancer}
                            id={id}
                            chatDetails={chatDetails}
                            fetchAssignmentDetails={fetchAssignmentDetails}
                            marksDetails={marksDetails}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
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
                          <Checklist
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
                            fetchAssignmentDetails={fetchAssignmentDetails}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                  <Divider />
                </Grid>

                <Grid item xs={12}>
                  <Divider />
                </Grid>
              </>
            )}
            {currentTab === "projectManagers" && (
              <Grid item xs={12}>
                <Box
                  sx={{
                    "@media screen and (max-width: 600px)": {
                      p: 1,
                    },
                    "@media screen and (min-width: 1200px)": {
                      p: 3,
                    },
                  }}
                >
                  <PMList
                    assignmentDetailsStream={assignmentDetailsStream}
                    projectManagers={projectManagers}
                    handleAssignPM={handleAssignPM}
                    isLoading={isLoading}
                  />
                </Box>
              </Grid>
            )}
            {currentTab === "freelancers" && (
              <Grid item xs={12}>
                <Box
                  sx={{
                    "@media screen and (max-width: 600px)": {
                      p: 1,
                    },
                    "@media screen and (min-width: 1200px)": {
                      p: 3,
                    },
                  }}
                >
                  <FreelancerList
                    freelancers={freelancers}
                    isLoading={isLoading}
                    handleAssign={handleAssign}
                    handleUnassign={handleUnassign}
                    handleInquiry={handleInquiry}
                    fetchAssignmentDetails={fetchAssignmentDetails}
                  />
                </Box>
              </Grid>
            )}
          </Grid>
        </Card>
      </Box>
    </React.Fragment>
  );
}
