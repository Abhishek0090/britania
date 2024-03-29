import { useState } from "react";
import { Helmet } from "react-helmet-async";
import PageHeader from "./PageHeader";
import PageTitleWrapper from "~/pages/TeamPages/components/PageTitleWrapper";
import { Container, Tabs, Tab, Grid } from "@mui/material";

import { styled } from "@mui/material";

import ActivityTab from "./ActivityTab";
import EditProfileTab from "./EditProfileTab";
import NotificationsTab from "./NotificationsTab";

const TabsWrapper = styled(Tabs)(
  () => `
    .MuiTabs-scrollableX {
      overflow-x: auto !important;
    }
`
);

function ManagementUserSettings() {
  const [currentTab, setCurrentTab] = useState("activity");

  const tabs = [
    { value: "activity", label: "Activity" },
    { value: "edit_profile", label: "Edit Profile" },
    { value: "notifications", label: "Notifications" },
    { value: "security", label: "Passwords/Security" },
  ];

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  return (
    <>
      <Helmet>
        <title>User Settings - Applications</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <TabsWrapper
              onChange={handleTabsChange}
              value={currentTab}
              variant="scrollable"
              scrollButtons="auto"
              textColor="primary"
              indicatorColor="primary"
            >
              {tabs.map((tab) => (
                <Tab key={tab.value} label={tab.label} value={tab.value} />
              ))}
            </TabsWrapper>
          </Grid>
          <Grid item xs={12}>
            {currentTab === "activity" && <ActivityTab />}
            {currentTab === "edit_profile" && <EditProfileTab />}
            {currentTab === "notifications" && <NotificationsTab />}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default ManagementUserSettings;
