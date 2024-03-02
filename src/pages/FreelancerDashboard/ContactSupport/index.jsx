import { Card, Grid, Stack } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { LucidePhoneCall, LucideMail } from 'lucide-react';
import VuiBox from '~/components/VuiBox';
import VuiTypography from '~/components/VuiTypography';
import DashboardLayout from '~/layout/LayoutContainers/DashboardLayout';
import DashboardNavbar from '~/layout/Navbars/DashboardNavbar';
export default function ContactSupport() {
  return (
    <DashboardLayout>
      <Helmet>
        <title>Support | Bluepen</title>
      </Helmet>
      <div className="min-h-screen">
        <DashboardNavbar light />
        <VuiBox mt={5} mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} xl={8}>
              <Grid item xs={12} lg={12} xl={12}>
                <Card>
                  <VuiBox>
                    <VuiTypography
                      variant="lg"
                      color="white"
                      fontWeight="bold"
                      mb="5px"
                    >
                      Contact Support
                    </VuiTypography>
                    <VuiBox display="flex" alignItems="center" mb="40px">
                      <VuiTypography
                        variant="button"
                        color="text"
                        fontWeight="regular"
                      >
                        You can contact us on any of the following platforms
                      </VuiTypography>
                    </VuiBox>
                    <Grid container spacing="50px">
                      <Grid item xs={12} md={4} lg={4}>
                        <Stack
                          direction="row"
                          spacing={{ sm: '10px', xl: '4px', xxl: '10px' }}
                          mb="6px"
                        >
                          <VuiBox
                            bgColor="info"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            sx={{
                              borderRadius: '6px',
                              width: '25px',
                              height: '25px',
                            }}
                          >
                            <LucidePhoneCall color="#fff" size={20} />
                          </VuiBox>
                          <VuiTypography
                            color="text"
                            variant="button"
                            fontWeight="medium"
                          >
                            Call
                          </VuiTypography>
                        </Stack>
                        <VuiTypography
                          component="a"
                          href="tel:919174117419"
                          color="white"
                          variant="lg"
                          fontWeight="bold"
                          mb="8px"
                        >
                          <span className="text-blue-300">+91741 17419</span>
                        </VuiTypography>
                      </Grid>
                      <Grid item xs={12} md={4} lg={4}>
                        <Stack
                          direction="row"
                          spacing={{ sm: '10px', xl: '4px', xxl: '10px' }}
                          mb="6px"
                        >
                          <VuiBox
                            bgColor="info"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            sx={{
                              borderRadius: '6px',
                              width: '25px',
                              height: '25px',
                            }}
                          >
                            <LucideMail color="#fff" size={20} />
                          </VuiBox>
                          <VuiTypography
                            color="text"
                            variant="button"
                            fontWeight="medium"
                          >
                            Email
                          </VuiTypography>
                        </Stack>
                        <VuiTypography
                          component="a"
                          href="mailto:squad@bluepen.co.in"
                          color="white"
                          variant="lg"
                          fontWeight="bold"
                          mb="8px"
                        >
                          <span className="text-blue-300">
                            squad@bluepen.co.in
                          </span>
                        </VuiTypography>
                      </Grid>
                      <Grid item xs={12} md={4} lg={4}>
                        <Stack
                          direction="row"
                          spacing={{ sm: '10px', xl: '4px', xxl: '10px' }}
                          mb="6px"
                        >
                          <VuiBox
                            bgColor="info"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            sx={{
                              borderRadius: '6px',
                              width: '25px',
                              height: '25px',
                            }}
                          >
                            <WhatsAppIcon sx={{ color: '#fff' }} size="12px" />
                          </VuiBox>
                          <VuiTypography
                            color="text"
                            variant="button"
                            fontWeight="medium"
                          >
                            Whatsapp
                          </VuiTypography>
                        </Stack>
                        <VuiTypography
                          component="a"
                          href="https://wa.me/919174117419?text=I%20need%20assistance%20with%20my%20assignment"
                          color="white"
                          variant="lg"
                          fontWeight="bold"
                          mb="8px"
                        >
                          <span className="text-blue-300">91741 17419</span>
                        </VuiTypography>
                      </Grid>
                    </Grid>
                  </VuiBox>
                </Card>
              </Grid>
            </Grid>
            <Grid item xs={12} xl={8}>
              <Grid item xs={12} lg={12} xl={12}>
                <Card>
                  <VuiBox>
                    <VuiTypography
                      variant="lg"
                      color="white"
                      fontWeight="bold"
                      mb="5px"
                    >
                      Panel Issues?
                    </VuiTypography>
                    <VuiBox display="flex" alignItems="center" mb="40px">
                      <VuiTypography
                        variant="button"
                        color="text"
                        fontWeight="regular"
                      >
                        You can contact
                        <VuiTypography
                          variant="button"
                          color="success"
                          fontWeight="bold"
                          sx={{ mx: '4px' }}
                        >
                          Bhavya Haria{' '}
                        </VuiTypography>
                        on any of the following platforms
                      </VuiTypography>
                    </VuiBox>
                    <Grid container spacing="50px">
                      <Grid item xs={12} md={4} lg={4}>
                        <Stack
                          direction="row"
                          spacing={{ sm: '10px', xl: '4px', xxl: '10px' }}
                          mb="6px"
                        >
                          <VuiBox
                            bgColor="info"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            sx={{
                              borderRadius: '6px',
                              width: '25px',
                              height: '25px',
                            }}
                          >
                            <LucidePhoneCall color="#fff" size={20} />
                          </VuiBox>
                          <VuiTypography
                            color="text"
                            variant="button"
                            fontWeight="medium"
                          >
                            Call
                          </VuiTypography>
                        </Stack>
                        <VuiTypography
                          component="a"
                          href="tel:9196193 05482"
                          color="white"
                          variant="lg"
                          fontWeight="bold"
                          mb="8px"
                        >
                          <span className="text-blue-300">+96193 05482</span>
                        </VuiTypography>
                      </Grid>
                      <Grid item xs={12} md={4} lg={4}>
                        <Stack
                          direction="row"
                          spacing={{ sm: '10px', xl: '4px', xxl: '10px' }}
                          mb="6px"
                        >
                          <VuiBox
                            bgColor="info"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            sx={{
                              borderRadius: '6px',
                              width: '25px',
                              height: '25px',
                            }}
                          >
                            <LucideMail color="#fff" size={20} />
                          </VuiBox>
                          <VuiTypography
                            color="text"
                            variant="button"
                            fontWeight="medium"
                          >
                            Email
                          </VuiTypography>
                        </Stack>
                        <VuiTypography
                          component="a"
                          href="mailto:squad@bluepen.co.in"
                          color="white"
                          variant="lg"
                          fontWeight="bold"
                          mb="8px"
                        >
                          <span className="text-blue-300">
                            squad@bluepen.co.in
                          </span>
                        </VuiTypography>
                      </Grid>
                      <Grid item xs={12} md={4} lg={4}>
                        <Stack
                          direction="row"
                          spacing={{ sm: '10px', xl: '4px', xxl: '10px' }}
                          mb="6px"
                        >
                          <VuiBox
                            bgColor="info"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            sx={{
                              borderRadius: '6px',
                              width: '25px',
                              height: '25px',
                            }}
                          >
                            <WhatsAppIcon sx={{ color: '#fff' }} size="12px" />
                          </VuiBox>
                          <VuiTypography
                            color="text"
                            variant="button"
                            fontWeight="medium"
                          >
                            Whatsapp
                          </VuiTypography>
                        </Stack>
                        <VuiTypography
                          component="a"
                          href="https://wa.me/919619305482?text=I%20am%20facing%20some%20issues%20in%20my%20freelancing%20panel"
                          color="white"
                          variant="lg"
                          fontWeight="bold"
                          mb="8px"
                        >
                          <span className="text-blue-300">96193 05482</span>
                        </VuiTypography>
                      </Grid>
                    </Grid>
                  </VuiBox>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </VuiBox>
      </div>
    </DashboardLayout>
  );
}
