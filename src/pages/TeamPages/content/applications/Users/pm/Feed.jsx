import { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardHeader,
  Divider,
  Button,
} from '@mui/material';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import HomeIcon from '@mui/icons-material/Home';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PlaceIcon from '@mui/icons-material/Place';
import { ArrowForwardTwoTone } from '@mui/icons-material';

function Feed({ user }) {
  const [selectedValue, setSelectedValue] = useState('a');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <Card>
      <CardHeader
        title="
      Saved Address"
      />
      <Divider />
      <Box p={2} display="flex" alignItems="center">
        <Card
          sx={{
            width: '100%',
          }}
        >
          <CardHeader
            title={
              <Typography variant="h5" fontWeight="bold">
                <HomeIcon color="primary" sx={{ mr: 1 }} />
                Current Address
              </Typography>
            }
          />
          <Divider />
          <Box p={2}>
            <Typography variant="caption" fontWeight="bold">
              Country: {'India'}
            </Typography>
            <br />
            <Typography variant="caption" fontWeight="bold">
              Country Code: (+91)
            </Typography>
            <Box
              py={2}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                justifyContent: 'start',
              }}
            >
              <Typography variant="h5">
                <PlaceIcon color="primary" sx={{ mr: 1 }} />
                {user?.city}
              </Typography>
              <Typography
                component={'a'}
                href={`tel:${user?.number}`}
                variant="h5"
                sx={{ py: 1 }}
                fontWeight="normal"
              >
                <LocalPhoneIcon color="primary" sx={{ mr: 1 }} /> {user?.number}
              </Typography>

              <Typography
                component={'a'}
                href={`https://wa.me/${91}${user?.number_whatsapp}`}
                variant="h5"
                sx={{ py: 1 }}
                fontWeight="normal"
              >
                <WhatsAppIcon color="success" sx={{ mr: 1 }} />
                {user?.number_whatsapp}
              </Typography>
            </Box>
          </Box>
        </Card>
      </Box>
    </Card>
  );
}

export default Feed;
