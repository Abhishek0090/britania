import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import PageHeader from "./PageHeader";
import axios from "axios";
import { selectAuth } from "~/features/auth/authSlice";
import { useSelector } from "react-redux";
import { Grid, Tab, Tabs, Card, Box } from "@mui/material";
import PageTitleWrapper from "~/pages/TeamPages/components/PageTitleWrapper";
import Performance from "./Performance";
import PerformanceBh from "./PerformanceBh";
import PerformanceFreelancers from "./PerformanceFreelancers";
import PerformanceUsers from "./PerformanceUsers";
import { TabsContainerWrapper } from "~/utils/CustomStyles";
import { URL } from "~/utils/BaseURL";

export default function DashboardTasks() {
  const auth = useSelector(selectAuth);
  const pmArray = ["Technical pm", "Non-Technical pm"];
  const hrArray = ["Technical hr", "Non-Technical hr"];
  const id = auth?.id;

  const [currentTab, setCurrentTab] = useState(
    hrArray.includes(auth?.teamDomain) ? "freelancer" : "assignments"
  );
  const [assignmentsData, setAssignmentsData] = useState([]);
  const [freelancers, setFreelancers] = useState([]);
  const [users, setUsers] = useState([]);
  const [userWork, setUserWork] = useState([]);
  const [freelancerDataDomainSpecific, setFreelancerDataDomainSpecific] =
    useState([]);

  const tabs = [
    { value: "assignments", label: "Assignments Overview" },
    { value: "freelancer", label: "Freelancers Overview" },
    { value: "user", label: "Students Overview" },
  ];

  const tabs2 = [
    { value: "freelancer", label: "Freelancers Overview" },
    { value: "assignments", label: "Assignments Overview" },
    { value: "user", label: "Students Overview" },
  ];

  const tabs3 = [
    {
      value: "assignments",
      label: "Assignments Overview",
    },
  ];

  const [newTabs, setNewTabs] = useState(tabs);

  const [bhTabs, setBhTabs] = useState(tabs3);

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  const [bhAssignmentdata, setBhAssignment] = useState(null);

  useEffect(() => {
    //TODO: Freelancers api call

    axios
      .get(`${URL}/team/freelancertable.php`)
      .then((response) => {
        if (
          pmArray.includes(auth?.teamDomain) ||
          hrArray.includes(auth?.teamDomain)
        ) {
          if (
            auth?.teamDomain === "Non-Technical pm" ||
            auth?.teamDomain === "Non-Technical hr"
          )
            setFreelancerDataDomainSpecific(
              response?.data.filter((item) => item?.domain !== "Technical")
            );
          else if (
            auth?.teamDomain === "Technical pm" ||
            auth?.teamDomain === "Technical hr"
          )
            setFreelancerDataDomainSpecific(
              response?.data.filter((item) => item?.domain !== "Non Technical")
            );
        }
      })
      .catch((error) => {
        console.log(error);
      });

    //TODO: Assignments api call

    if (pmArray.includes(auth?.teamDomain)) {
      axios
        .get(`${URL}/team/pmdetails.php?pm_id=${id}`)
        .then((res) => {
          setUserWork(res?.data[1]);
          console.log(res?.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (hrArray.includes(auth?.teamDomain)) {
      setNewTabs(tabs2);
      axios
        .get(`${URL}/team/freelancingassignmenttable.php`)
        .then((response) => {
          console.log(response?.data);
          if (auth?.teamDomain === "Technical hr") {
            setUserWork(
              response?.data?.filter((item) => item?.domain === "Technical")
            );
          } else {
            setUserWork(
              response?.data?.filter((item) => item?.domain === "Non-Technical")
            );
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    axios
      .get(`${URL}/team/dashboard.php`)
      .then((response) => {
        console.log(response?.data);
        setAssignmentsData(response?.data[0]);
        setFreelancers(response?.data[1]);
        setUsers(response?.data[2]);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${URL}/team/brainheatersassignmentstable.php`)
      .then((response) => {
        console.log(response?.data);
        setBhAssignment(response?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [auth?.teamDomain, id]);

  return (
    <>
      <Helmet>
        <title>Bluepen Panel</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>

      {auth?.teamDomain === "Brainheaters" ? (
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
              {bhTabs.map((tab) => (
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
              {currentTab === "assignments" && (
                <>
                  <Grid item xs={12}>
                    <Box p={4}>
                      <PerformanceBh
                        title={"Assignments Overview"}
                        auth={auth}
                        assignmentsData={bhAssignmentdata}
                        userWork={userWork}
                      />
                    </Box>
                  </Grid>
                </>
              )}
            </Grid>
          </Card>
        </Box>
      ) : (
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
              {currentTab === "assignments" && (
                <>
                  <Grid item xs={12}>
                    <Box p={4}>
                      <Performance
                        title={"Assignments Overview"}
                        auth={auth}
                        assignmentsData={assignmentsData}
                        userWork={userWork}
                      />
                    </Box>
                  </Grid>
                </>
              )}
              {currentTab === "freelancer" && (
                <>
                  <Grid item xs={12}>
                    <Box p={4}>
                      <PerformanceFreelancers
                        title={"Freelancers Overview"}
                        auth={auth}
                        freelancers={freelancers}
                        freelancerDataDomainSpecific={
                          freelancerDataDomainSpecific
                        }
                      />
                    </Box>
                  </Grid>
                </>
              )}
              {currentTab === "user" && (
                <>
                  <Grid item xs={12}>
                    <Box p={4}>
                      <PerformanceUsers
                        title={"Students Overview"}
                        users={users}
                      />
                    </Box>
                  </Grid>
                </>
              )}
            </Grid>
          </Card>
        </Box>
      )}
    </>
  );
}
