import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Card, Grid, Stack } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { LucidePhoneCall, LucideMail } from "lucide-react";
import VuiBox from "~/components/VuiBox";
import ProfileInfoCard from "~/components/Cards/InfoCards/ProfileInfoCard";
import VuiTypography from "~/components/VuiTypography";
import DashboardLayout from "~/layout/LayoutContainers/DashboardLayout";
import DashboardNavbar from "~/layout/Navbars/DashboardNavbar";
import { URL } from "~/utils/BaseURL";
export default function AssignmentDetails() {
  const { id } = useParams();
  const [assignment, setAssignment] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `${URL}/freelancer/freelanceassignmentdetails.php?assignment_id=${id}`
      )
      .then((res) => {
        //console.log(res.data);
        setAssignment(res.data);
        setLoading(false);
      })
      .catch((err) => {
        window.alert(err);
      });
  }, [id]);

  return (
    <DashboardLayout>
      <Helmet>
        <title>Assignment Details | Bluepen</title>
      </Helmet>
      <div className="min-h-screen">
        <DashboardNavbar light />
        <VuiBox mt={5} mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} xl={8}>
              <Grid item xs={12} lg={12} xl={12}>
                <Card>
                  <VuiBox>
                    <Grid spacing="50px">
                      <ProfileInfoCard
                        title="Assignment information"
                        description="Following are the details of the assignment you have been assigned. Please go through them carefully and contact your project manager for any queries or concerns."
                        info={{
                          title: `${assignment?.title}`,
                          course: `${assignment?.course}`,
                          level: `${assignment?.level}`,
                          stream: `${assignment?.stream}`,
                          subjectTags: `${assignment?.subject_tags?.map(
                            (item) => item
                          )}`,

                          assignmentTypes: `${assignment?.type?.map(
                            (item) => item
                          )}`,
                        }}
                      />
                    </Grid>
                  </VuiBox>
                </Card>
              </Grid>
            </Grid>
            {assignment?.project_manager_details === undefined ||
            assignment?.project_manager_details === null ? (
              <Grid item xs={12} xl={4}>
                <Grid item xs={12} lg={12} xl={12}>
                  <Card>
                    <VuiBox>
                      <Grid spacing="50px">
                        <ProfileInfoCard
                          title="Project Manager information"
                          description="Project manager details are not available for this assignment. Please contact the support team for any queries or concerns regarding this assignment."
                          info={{
                            name: "Project Manager",
                          }}
                        />
                      </Grid>
                    </VuiBox>
                  </Card>
                </Grid>
              </Grid>
            ) : (
              <Grid item xs={12} xl={4}>
                <Grid item xs={12} lg={12} xl={12}>
                  <Card>
                    <VuiBox>
                      <Grid spacing="50px">
                        <ProfileInfoCard
                          title="Project Manager information"
                          description="Hey, I am your project manager. I will be your point of contact for this assignment. You can contact me for any queries or concerns regarding this assignment."
                          info={{
                            name: `${assignment?.project_manager_details?.name}`,
                            email: `${assignment?.project_manager_details?.email}`,
                            number: `${assignment?.project_manager_details?.number}`,
                            whatsapp: `${assignment?.project_manager_details?.number_whatsapp}`,
                          }}
                          contacts={[
                            {
                              link: `mailto:${assignment?.project_manager_details?.email}`,
                              icon: (
                                <LucideMail
                                  style={{ color: "#ea4335" }}
                                  fontSize="medium"
                                />
                              ),
                              color: "facebook",
                            },
                            {
                              link: `tel:${91}${
                                assignment?.project_manager_details?.number
                              }`,
                              icon: (
                                <LucidePhoneCall
                                  style={{ color: "#25D" }}
                                  fontSize="medium"
                                />
                              ),
                              color: "facebook",
                            },
                            {
                              link: `https://wa.me/${91}${
                                assignment?.project_manager_details
                                  ?.number_whatsapp
                              }?text=Hi%20I%20am%20interested%20in%20your%20services%20and%20would%20like%20to%20know%20more%20about%20it.`,
                              icon: (
                                <WhatsAppIcon
                                  style={{ color: "#25D366" }}
                                  fontSize="medium"
                                />
                              ),
                              color: "facebook",
                            },
                          ]}
                        />
                      </Grid>
                    </VuiBox>
                  </Card>
                </Grid>
              </Grid>
            )}
            <Grid item xs={12} xl={12}>
              <Grid item xs={12} lg={12} xl={12}>
                <Card>
                  <VuiBox>
                    <Grid spacing="50px">
                      <ProfileInfoCard
                        title="Assignment Description"
                        description="Following is the description of the assignment you have been assigned. Please go through them carefully and contact your project manager for any queries or concerns."
                        info={{
                          description: `${assignment?.description}`,
                        }}
                      />
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
