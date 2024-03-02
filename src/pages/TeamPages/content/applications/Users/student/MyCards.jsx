import { Box, Typography, Card, CardHeader, Divider } from '@mui/material';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import HomeIcon from '@mui/icons-material/Home';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PlaceIcon from '@mui/icons-material/Place';

function MyCards({ user }) {
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
              Country: {user?.country_name}
            </Typography>
            <br />
            <Typography variant="caption" fontWeight="bold">
              Country Code: (+{user?.country_code})
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
                {user?.address}, {user?.city}, {user?.state}, {user?.pincode}
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
                href={`https://wa.me/${user?.country_code}${user?.whatsapp}`}
                variant="h5"
                sx={{ py: 1 }}
                fontWeight="normal"
              >
                <WhatsAppIcon color="success" sx={{ mr: 1 }} />
                {user?.whatsapp}
              </Typography>
            </Box>
          </Box>
        </Card>
      </Box>
    </Card>
  );
}

export default MyCards;
