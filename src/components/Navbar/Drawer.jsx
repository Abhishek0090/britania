import * as React from 'react';
import Box from '@mui/material/Box';
import Logo from '~/assets/logo/bluepen.png';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Divider from '@mui/material/Divider';

export default function DrawerComp({ children }) {
  const location = useLocation();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  useEffect(() => {
    setState({ ...state, left: false });
  }, [location]);

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, true)}
      onKeyDown={toggleDrawer(anchor, true)}
    >
      {children}
    </Box>
  );

  return (
    <button>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <svg
            className={`ham hamRotate ham1 ${state[anchor] ? 'active' : ''}`}
            onClick={toggleDrawer(anchor, true)}
            viewBox="0 0 100 100"
            width="50"
          >
            <path
              className="line top"
              d="m 30,33 h 40 c 0,0 9.044436,-0.654587 9.044436,-8.508902 0,-7.854315 -8.024349,-11.958003 -14.89975,-10.85914 -6.875401,1.098863 -13.637059,4.171617 -13.637059,16.368042 v 40"
            />
            <path className="line middle" d="m 30,50 h 40" />
            <path
              className="line bottom"
              d="m 30,67 h 40 c 12.796276,0 15.357889,-11.717785 15.357889,-26.851538 0,-15.133752 -4.786586,-27.274118 -16.667516,-27.274118 -11.88093,0 -18.499247,6.994427 -18.435284,17.125656 l 0.252538,40"
            />
          </svg>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            <nav
              className={`flex xl:hidden my-[0.75rem] max-w-screen-xl pl-12  items-center justify-between  trasition ease-in-out duration-500`}
            >
              <Link to="/">
                <img
                  src={Logo}
                  alt="bluepen logo"
                  className="md:cursor-pointer h-[5rem] w-[6rem]"
                />
              </Link>
            </nav>
            <Divider
              style={{
                margin: '5px',
                backgroundColor: '#fff',
              }}
            />
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </button>
  );
}
