import { useSelector } from "react-redux";
import { selectAuth } from "~/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import FreelancerDashboard from "~/pages/FreelancerDashboard/Dashboard";
import Profile from "~/pages/FreelancerDashboard/Profile";
import ChangePassword from "~/pages/FreelancerDashboard/ChangePassword";
import Assignment from "~/pages/FreelancerDashboard/Assignment";
import AssignmentDetails from "~/pages/FreelancerDashboard/AssignmentDetails";
import ClaimRewards from "~/pages/FreelancerDashboard/ClaimRewards";
import ContactSupport from "~/pages/FreelancerDashboard/ContactSupport";
import Settings from "~/pages/FreelancerDashboard/Settings";
import Logout from "~/pages/FreelancerDashboard/Logout";

// react-router components
import { Route, useLocation, Routes } from "react-router-dom";

import { ThemeProvider } from "@mui/material";
import { Icon, CssBaseline } from "@mui/material";

// Vision UI Dashboard React example components
import Sidenav from "./Sidenav";

// Vision UI Dashboard React themes
import theme from "./theme";
import routes from "./routes";
// Vision UI Dashboard React contexts
import { useVisionUIController, setMiniSidenav } from "~/context";
import MessagingFreelancer from "~/pages/FreelancerDashboard/MessagingFreelancer";
import MarksOverview from "~/pages/FreelancerDashboard/Marks/MarksOverview";

export default function SidebarLayout() {
  const auth = useSelector(selectAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.id === null && auth?.role === null) {
      return navigate("/auth/freelancer/login", { replace: true });
    }
  }, [auth]);

  const [controller, dispatch] = useVisionUIController();
  const { miniSidenav, layout, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {layout === "dashboard" && (
          <>
            <Sidenav
              color={sidenavColor}
              brand=""
              routes={routes}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            />
          </>
        )}
        <Routes>
          <Route
            path="/freelancer/dashboard"
            element={<FreelancerDashboard />}
          />
          <Route path="/freelancer/marksoverview" element={<MarksOverview />} />
          <Route path="/freelancer/profile" element={<Profile />} />
          <Route path="/freelancer/chats" element={<MessagingFreelancer />} />
          <Route
            path="/freelancer/change-password"
            element={<ChangePassword />}
          />
          <Route path="/freelancer/assignment" element={<Assignment />} />
          <Route
            path="/freelancer/assignment/:id"
            element={<AssignmentDetails />}
          />
          <Route
            path="/freelancer/how-to-claim-rewards"
            element={<ClaimRewards />}
          />
          <Route path="/freelancer/settings" element={<Settings />} />
          <Route
            path="/freelancer/contact-support"
            element={<ContactSupport />}
          />
          <Route path="/freelancer/logout" element={<Logout />} />
        </Routes>
      </ThemeProvider>
    </React.Fragment>
  );
}
