import { AppBar, Card, Grid, Tab, Tabs, Menu, MenuItem } from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import { URL } from "~/utils/BaseURL";
// Images

import breakpoints from "~/layout/SidebarLayout/theme/base/breakpoints";

import VuiBox from "~/components/VuiBox";
import VuiTypography from "~/components/VuiTypography";
import VuiButton from "~/components/VuiButton";
// Vision UI Dashboard React icons
import { IoCube } from "react-icons/io5";
import { IoDocument } from "react-icons/io5";
import { IoGift } from "react-icons/io5";
// Vision UI Dashboard React example components
import DashboardNavbar from "~/layout/Navbars/DashboardNavbar";
import { useEffect, useState } from "react";

function Header({
  tabValue,
  setTabValue,
  user,
  fetchUser,
  oldRewards,
  oldRewardsCount,
}) {
  console.log(oldRewardsCount);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  const handleChageStatus = (status) => {
    axios
      .get(
        `${URL}/freelancer/updateswingstatus.php?id=${user?.id}&status=${status}`
      )
      .then((res) => {
        console.log(res?.data);
        toast.success(res?.data?.message);
        fetchUser();
      })
      .catch((err) => console.log(err));

    handleClose();
  };

  const renderMenu = (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
    >
      <MenuItem onClick={() => handleChageStatus("fully_available")}>
        Fully Available
      </MenuItem>
      <MenuItem onClick={() => handleChageStatus("partially_available")}>
        Partially Available
      </MenuItem>
      <MenuItem onClick={() => handleChageStatus("not_available")}>
        Not Available
      </MenuItem>
    </Menu>
  );
  return (
    <VuiBox position="relative">
      <DashboardNavbar light />
      <Card
        sx={{
          px: 1,
          mt: 2,
          "@media screen and (min-width: 600px)": {
            px: 1,
          },
          "@media screen and (min-width: 900px)": {
            px: 3,
          },
          "@media screen and (min-width: 1200px)": {
            px: 4,
          },
        }}
      >
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          sx={({ breakpoints }) => ({
            [breakpoints.up("xs")]: {
              gap: "16px",
            },
            [breakpoints.up("xs")]: {
              gap: "10px",
            },
            [breakpoints.up("xl")]: {
              gap: "0px",
            },
          })}
        >
          <Grid item xs={12} md={6} lg={6} xl={6} xxl={6}>
            <VuiBox
              height="100%"
              mt={0.5}
              lineHeight={1}
              display="flex"
              flexDirection="column"
              sx={({ breakpoints }) => ({
                [breakpoints.only("sm")]: {
                  justifyContent: "center",
                  alignItems: "center",
                },
              })}
            >
              <VuiTypography variant="lg" color="white" fontWeight="bold">
                {user?.firstname} {user?.lastname}
              </VuiTypography>
              <VuiTypography variant="button" color="text" fontWeight="regular">
                {user?.email}
              </VuiTypography>
              <VuiButton
                sx={{
                  mt: 1,
                  maxWidth: "200px",
                }}
                variant="outlined"
                size="small"
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                {user?.swing}
              </VuiButton>
              {renderMenu}
            </VuiBox>
          </Grid>
          <Grid item xs={12} md={6} lg={6} xl={6} xxl={6} sx={{ mx: "auto" }}>
            <AppBar position="static">
              <Tabs
                orientation={"horizontal"}
                value={tabValue}
                onChange={handleSetTabValue}
                sx={{
                  background: "transparent",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Tab
                  label="OVERVIEW"
                  icon={<IoCube color="white" size="16px" />}
                />

                <Tab
                  label="REWARDS"
                  icon={<IoGift color="white" size="16px" />}
                />
                {/* {oldRewardsCount !== 0 && ( */}
                  <Tab
                    label="OLD REWARDS"
                    icon={<IoGift color="white" size="16px" />}
                  />
                {/* )} */}
              </Tabs>
            </AppBar>
          </Grid>
        </Grid>
      </Card>
    </VuiBox>
  );
}

export default Header;
