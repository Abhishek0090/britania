import { useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import BluepenLogo from '~/assets/logo/White.png';

function Logo() {
  const theme = useTheme();

  return (
    <Link to="/team/dashboards/tasks">
      <img
        src={BluepenLogo}
        alt="Bluepen Logo"
        style={{ width: '600px', height: '120px' , objectFit : "contain" }}
      />
    </Link>
  );
}

export default Logo;
