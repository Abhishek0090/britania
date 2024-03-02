import React, { useEffect } from "react";

// react-router-dom ~/components
import { useLocation, NavLink } from "react-router-dom";

import PropTypes from "prop-types";

// @mui material ~/components
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";

// Vision UI Dashboard React ~/components
import VuiBox from "../../../components/VuiBox";
import VuiTypography from "../../../components/VuiTypography";

// Vision UI Dashboard React example ~/components
import SidenavCollapse from "./SidenavCollapse";

// Custom styles for the Sidenav
import SidenavRoot from "./SidenavRoot";
import sidenavLogoLabel from "./styles/sidenav";

// Vision UI Dashboard React context
import {
  useVisionUIController,
  setMiniSidenav,
  setTransparentSidenav,
} from "~/context";

// Vision UI Dashboard React icons
import Logo from "~/assets/logo/bluepen.png";

// function Sidenav({ color, brand, brandName, routes, ...rest }) {
function Sidenav({ color, routes, ...rest }) {
  const [controller, dispatch] = useVisionUIController();
  const { miniSidenav, transparentSidenav } = controller;
  const location = useLocation();
  const { pathname } = location;
  const collapseName = window.location.pathname.split("/")[3];

  const closeSidenav = () => setMiniSidenav(dispatch, true);

  useEffect(() => {
    // A function that sets the mini state of the sidenav.
    function handleMiniSidenav() {
      setMiniSidenav(dispatch, window.innerWidth < 1400);
    }

    /** 
     The event listener that's calling the handleMiniSidenav function when resizing the window.
    */
    window.addEventListener("resize", handleMiniSidenav);

    // Call the handleMiniSidenav function to set the state with the initial value.
    handleMiniSidenav();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch, location]);

  useEffect(() => {
    if (window.innerWidth < 1440) {
      setTransparentSidenav(dispatch, false);
    }
    if (window.innerWidth < 768) {
      setTransparentSidenav(dispatch, true);
    }
  }, []);

  // Render all the routes from the routes.js (All the visible items on the Sidenav)
  const renderRoutes = routes.map(
    ({ type, name, icon, title, noCollapse, key, route, href }) => {
      let returnValue;

      if (type === "collapse") {
        returnValue = href ? (
          <Link
            href={href}
            key={key}
            target="_blank"
            rel="noreferrer"
            sx={{ textDecoration: "none" }}
          >
            <SidenavCollapse
              color={color}
              name={name}
              icon={icon}
              active={key === collapseName}
              noCollapse={noCollapse}
            />
          </Link>
        ) : (
          <NavLink to={route} key={key}>
            <SidenavCollapse
              color={color}
              key={key}
              name={name}
              icon={icon}
              active={key === collapseName}
              noCollapse={noCollapse}
            />
          </NavLink>
        );
      } else if (type === "title") {
        returnValue = (
          <VuiTypography
            key={key}
            color="white"
            display="block"
            variant="caption"
            fontWeight="bold"
            textTransform="uppercase"
            pl={3}
            mt={2}
            mb={1}
            ml={1}
          >
            {title}
          </VuiTypography>
        );
      } else if (type === "divider") {
        returnValue = <Divider light key={key} />;
      }
      // else if(title === "Chats"){
      //   <NavLink to={route} key={key}>
      //   <SidenavCollapse
      //     color={color}
      //     key={key}
      //     name={name}
      //     icon={icon}
      //     active={key === collapseName}
      //     noCollapse={noCollapse}
      //   />
      // </NavLink>
      // }

      return returnValue;
    }
  );

  return (
    <React.Fragment>

    <SidenavRoot {...rest} variant="permanent" ownerState={{ miniSidenav }}>
      <VuiBox
        textAlign="center"
        sx={{
          overflow: "unset !important",
        }}
      >
        <VuiBox
          component={NavLink}
          to="/dashboard/freelancer/dashboard"
          display="flex"
          alignItems="center"
        >
          <VuiBox
            sx={
              ((theme) => sidenavLogoLabel(theme, { miniSidenav }),
              {
                display: "flex",
                alignItems: "center",
                margin: "0 auto",
              })
            }
          >
            <VuiBox
              display="flex"
              sx={
                ((theme) =>
                  sidenavLogoLabel(theme, { miniSidenav, transparentSidenav }),
                {
                  mr:
                    miniSidenav || (miniSidenav && transparentSidenav) ? 0 : 1,
                })
              }
            ></VuiBox>
            <VuiTypography
              variant="button"
              textGradient={true}
              color="logo"
              fontSize={14}
              letterSpacing={2}
              fontWeight="medium"
              sx={
                ((theme) =>
                  sidenavLogoLabel(theme, { miniSidenav, transparentSidenav }),
                {
                  opacity:
                    miniSidenav || (miniSidenav && transparentSidenav) ? 0 : 1,
                  maxWidth:
                    miniSidenav || (miniSidenav && transparentSidenav)
                      ? 0
                      : "100%",
                  margin: "0 auto",
                })
              }
            >
              <img src={Logo} alt="logo" className="w-[8rem] h-[8rem]" />
            </VuiTypography>
          </VuiBox>
        </VuiBox>
      </VuiBox>
      <Divider light />
      <List>{renderRoutes}</List>
    </SidenavRoot>
    </React.Fragment>

  );
}

// Setting default values for the props of Sidenav
Sidenav.defaultProps = {
  color: "info",
  // brand: "",
};

// Typechecking props for the Sidenav
Sidenav.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
  ]),
  // brand: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidenav;
