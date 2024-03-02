import { AppBar, Card, Grid, Tab, Tabs } from '@mui/material';
import breakpoints from '~/layout/SidebarLayout/theme/base/breakpoints';
import VuiBox from '~/components/VuiBox';
import {
  LucideBellRing,
  LucideBell,
  LucideBellPlus,
  LucideBellOff,
} from 'lucide-react';
import DashboardNavbar from '~/layout/Navbars/DashboardNavbar';
import { useEffect, useState } from 'react';

function Header({ tabValue, setTabValue }) {
  const [tabsOrientation, setTabsOrientation] = useState('horizontal');
  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.lg
        ? setTabsOrientation('vertical')
        : setTabsOrientation('horizontal');
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener('resize', handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  return (
    <VuiBox position="relative">
      <DashboardNavbar light />
      <Card
        sx={{
          px: 3,
          mt: 2,
        }}
      >
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          sx={({ breakpoints }) => ({
            [breakpoints.up('xs')]: {
              gap: '16px',
            },
            [breakpoints.up('xs')]: {
              gap: '0px',
            },
            [breakpoints.up('xl')]: {
              gap: '0px',
            },
          })}
        >
          <Grid
            item
            xs={12}
            display="flex"
            sx={({ breakpoints }) => ({
              [breakpoints.only('sm')]: {
                justifyContent: 'center',
                alignItems: 'center',
              },
            })}
          >
            <VuiBox
              height="100%"
              mt={0.5}
              lineHeight={1}
              display="flex"
              flexDirection="column"
            >
              <AppBar position="static">
                <Tabs
                  orientation={tabsOrientation}
                  value={tabValue}
                  onChange={handleSetTabValue}
                  sx={{
                    background: 'transparent',
                    display: 'flex',
                  }}
                >
                  <Tab
                    label="MY INQUIRIES"
                    icon={<LucideBellRing color="white" size="16px" />}
                  />
                  <Tab
                    label="MY ASSIGNMENTS"
                    icon={<LucideBellPlus color="white" size="16px" />}
                  />
                  <Tab
                    label="COMPLETED ASSIGNMENTS"
                    icon={<LucideBell color="white" size="16px" />}
                  />
                  <Tab
                    label="INCOMPLETE ASSIGNMENTS"
                    icon={<LucideBellOff color="white" size="16px" />}
                  />
                </Tabs>
              </AppBar>
            </VuiBox>
          </Grid>
        </Grid>
      </Card>
    </VuiBox>
  );
}

export default Header;
