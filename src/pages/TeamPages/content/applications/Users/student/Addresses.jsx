import React, { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import {
  Box,
  Button,
  Typography,
  Card,
  CardHeader,
  Divider,
  Grid,
  CircularProgress,
  IconButton,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import axios from "axios";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import AssignmentTwoToneIcon from "@mui/icons-material/AssignmentTwoTone";
import { TimelineWrapper, CheckboxWrapper } from "~/utils/CustomStyles";
import { URL } from "~/utils/BaseURL";

function Addresses({ user, id }) {
  const [loading_technical, setLoadingTechnical] = useState({
    agreement_received: false,
    agreement_sent: false,
    form_filled: false,
    interview_conducted: false,
    is_approved: false,
  });

  const [loading_non_technical, setLoadingNonTechnical] = useState({
    agreement_received: false,
    agreement_sent: false,
    form_filled: false,
    interview_conducted: false,
    is_approved: false,
  });

  const [technical, setTechnical] = useState({
    agreement_received:
      user?.technical_status?.agreement_received === "1" ? true : false,
    agreement_sent:
      user?.technical_status?.agreement_sent === "1" ? true : false,
    form_filled: user?.technical_status?.form_filled === "1" ? true : false,
    interview_conducted:
      user?.technical_status?.interview_conducted === "1" ? true : false,
    is_approved: user?.technical_status?.is_approved === "1" ? true : false,
  });

  const [non_technical, setNonTechnical] = useState({
    agreement_received:
      user?.non_technical_status?.agreement_received === "1" ? true : false,
    agreement_sent:
      user?.non_technical_status?.agreement_sent === "1" ? true : false,
    form_filled: user?.non_technical_status?.form_filled === "1" ? true : false,
    interview_conducted:
      user?.non_technical_status?.interview_conducted === "1" ? true : false,
    is_approved: user?.non_technical_status?.is_approved === "1" ? true : false,
  });

  const handleTechnicalStatus = async (statusValue) => {
    setLoadingTechnical({ ...loading_technical, [statusValue]: true });
    const status = technical[statusValue] ? statusValue : statusValue;
    let link = "";
    try {
      if (statusValue === "interview_conducted") {
        link = `${URL}/team/freelancerinterviewcond.php?id=${id}&role=technical`;
      } else if (statusValue === "is_approved") {
        link = `${URL}/team/freelancerapproved.php?id=${id}&role=technical`;
      } else if (statusValue === "agreement_sent") {
        link = `${URL}/team/freelanceragreementsent.php?id=${id}&role=technical`;
      } else if (statusValue === "agreement_received") {
        link = `${URL}/team/freelanceragreementreceived.php?id=${id}&role=technical`;
      }

      const response = await axios.get(link);
      console.log("response", response);
      toast.success(response.data.status);
      setTechnical({
        ...technical,
        [status]: !technical[status],
      });
      setLoadingTechnical({ ...loading_technical, [statusValue]: false });
    } catch (error) {
      toast.error("Couldn't update technical status");
      setLoadingTechnical({ ...loading_technical, [statusValue]: false });
    }
  };

  const handleNonTechnicalStatus = async (statusValue) => {
    setLoadingNonTechnical({ ...loading_non_technical, [statusValue]: true });
    const status = non_technical[statusValue] ? statusValue : statusValue;
    let link = "";
    try {
      if (statusValue === "interview_conducted") {
        link = `${URL}/team/freelancerinterviewcond.php?id=${id}&role=non_technical`;
      } else if (statusValue === "is_approved") {
        link = `${URL}/team/freelancerapproved.php?id=${id}&role=non_technical`;
      } else if (statusValue === "agreement_sent") {
        link = `${URL}/team/freelanceragreementsent.php?id=${id}&role=non_technical`;
      } else if (statusValue === "agreement_received") {
        link = `${URL}/team/freelanceragreementreceived.php?id=${id}&role=non_technical`;
      }

      const response = await axios.get(link);
      toast.success(response.data.status);
      setNonTechnical({
        ...non_technical,
        [status]: !non_technical[status],
      });
      setLoadingNonTechnical({
        ...loading_non_technical,
        [statusValue]: false,
      });
    } catch (error) {
      toast.error("Couldn't update non technical status");
      setLoadingNonTechnical({
        ...loading_non_technical,
        [statusValue]: false,
      });
    }
  };

  useEffect(() => {
    setTechnical({
      agreement_received:
        user?.technical_status?.agreement_received === "1" ? true : false,
      agreement_sent:
        user?.technical_status?.agreement_sent === "1" ? true : false,
      form_filled: user?.technical_status?.form_filled === "1" ? true : false,
      interview_conducted:
        user?.technical_status?.interview_conducted === "1" ? true : false,
      is_approved: user?.technical_status?.is_approved === "1" ? true : false,
    });
    setNonTechnical({
      agreement_received:
        user?.non_technical_status?.agreement_received === "1" ? true : false,
      agreement_sent:
        user?.non_technical_status?.agreement_sent === "1" ? true : false,
      form_filled:
        user?.non_technical_status?.form_filled === "1" ? true : false,
      interview_conducted:
        user?.non_technical_status?.interview_conducted === "1" ? true : false,
      is_approved:
        user?.non_technical_status?.is_approved === "1" ? true : false,
    });

    return () => {};
  }, [user]);

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="stretch"
      spacing={3}
    >
      <Grid item xs={12} sm={6}>
        <Card>
          <CardHeader title="Technical Domain" subheader="" />
          <Divider />
          <Box p={2}>
            <TimelineWrapper
              sx={{
                maxWidth: "fit-content",
              }}
            >
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot color="primary">
                    <AssignmentTwoToneIcon />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Typography
                    variant="h4"
                    sx={{
                      pb: 2,
                    }}
                  >
                    Technical Progress Status
                  </Typography>
                  <FormGroup
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "10px",
                    }}
                  >
                    {loading_technical.form_filled ? (
                      <span className="flex items-center justify-start">
                        <CircularProgress size={20} />
                        <span style={{ marginLeft: "10px" }}>Form Filled</span>
                      </span>
                    ) : (
                      <FormControlLabel
                        control={
                          <CheckboxWrapper
                            color="primary"
                            checked={technical?.form_filled}
                            name="checkedC"
                            onChange={(e) =>
                              handleTechnicalStatus("form_filled")
                            }
                            inputprops={{ "aria-label": "controlled" }}
                          />
                        }
                        label="Form Filled"
                      />
                    )}
                    {loading_technical.interview_conducted ? (
                      <span className="flex items-center justify-start">
                        <CircularProgress size={20} />
                        <span style={{ marginLeft: "10px" }}>
                          Interview Conducted
                        </span>
                      </span>
                    ) : (
                      <FormControlLabel
                        control={
                          <CheckboxWrapper
                            color="primary"
                            checked={technical?.interview_conducted}
                            name="checkedC"
                            onChange={(e) =>
                              handleTechnicalStatus("interview_conducted")
                            }
                            inputprops={{ "aria-label": "controlled" }}
                          />
                        }
                        label="Interview Conducted"
                      />
                    )}
                    {loading_technical.agreement_sent ? (
                      <span className="flex items-center justify-start">
                        <CircularProgress size={20} />
                        <span style={{ marginLeft: "10px" }}>
                          Agreement Sent
                        </span>
                      </span>
                    ) : (
                      <FormControlLabel
                        control={
                          <CheckboxWrapper
                            color="primary"
                            checked={technical?.agreement_sent}
                            name="checkedC"
                            onChange={(e) =>
                              handleTechnicalStatus("agreement_sent")
                            }
                            inputprops={{ "aria-label": "controlled" }}
                          />
                        }
                        label="Agreement Sent"
                      />
                    )}
                    {loading_technical.agreement_received ? (
                      <span className="flex items-center justify-start">
                        <CircularProgress size={20} />
                        <span style={{ marginLeft: "10px" }}>
                          Agreement Received
                        </span>
                      </span>
                    ) : (
                      <FormControlLabel
                        control={
                          <CheckboxWrapper
                            color="primary"
                            checked={technical?.agreement_received}
                            name="checkedC"
                            onChange={(e) =>
                              handleTechnicalStatus("agreement_received")
                            }
                            inputprops={{ "aria-label": "controlled" }}
                          />
                        }
                        label="Agreement Received"
                      />
                    )}

                    {loading_technical.is_approved ? (
                      <span className="flex items-center justify-start">
                        <CircularProgress size={20} />
                        <span style={{ marginLeft: "10px" }}>Is Approved</span>
                      </span>
                    ) : (
                      <FormControlLabel
                        control={
                          <CheckboxWrapper
                            color="primary"
                            checked={technical?.is_approved}
                            name="checkedC"
                            onChange={(e) =>
                              handleTechnicalStatus("is_approved")
                            }
                            inputprops={{ "aria-label": "controlled" }}
                          />
                        }
                        label="Is Approved"
                      />
                    )}
                  </FormGroup>
                </TimelineContent>
              </TimelineItem>
            </TimelineWrapper>
          </Box>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Card>
          <CardHeader title="Non Technical Domain" subheader="" />
          <Divider />
          <Box p={2}>
            <TimelineWrapper
              sx={{
                maxWidth: "fit-content",
              }}
            >
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot color="primary">
                    <AssignmentTwoToneIcon />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Typography
                    variant="h4"
                    sx={{
                      pb: 2,
                    }}
                  >
                    Non Tech Progress Status
                  </Typography>
                  <FormGroup
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "10px",
                    }}
                  >
                    {loading_non_technical.form_filled ? (
                      <span className="flex items-center justify-start">
                        <CircularProgress size={20} />
                        <span style={{ marginLeft: "10px" }}>Form Filled</span>
                      </span>
                    ) : (
                      <FormControlLabel
                        control={
                          <CheckboxWrapper
                            color="primary"
                            checked={non_technical?.form_filled}
                            name="checkedC"
                            onChange={(e) =>
                              handleNonTechnicalStatus("form_filled")
                            }
                            inputprops={{ "aria-label": "controlled" }}
                          />
                        }
                        label="Form Filled"
                      />
                    )}

                    {loading_non_technical.interview_conducted ? (
                      <span className="flex items-center justify-start">
                        <CircularProgress size={20} />
                        <span style={{ marginLeft: "10px" }}>
                          Interview Conducted
                        </span>
                      </span>
                    ) : (
                      <FormControlLabel
                        control={
                          <CheckboxWrapper
                            color="primary"
                            checked={non_technical?.interview_conducted}
                            name="checkedC"
                            onChange={(e) =>
                              handleNonTechnicalStatus("interview_conducted")
                            }
                            inputprops={{ "aria-label": "controlled" }}
                          />
                        }
                        label="Interview Conducted"
                      />
                    )}

                    {loading_non_technical.agreement_sent ? (
                      <span className="flex items-center justify-start">
                        <CircularProgress size={20} />
                        <span style={{ marginLeft: "10px" }}>
                          Agreement Sent
                        </span>
                      </span>
                    ) : (
                      <FormControlLabel
                        control={
                          <CheckboxWrapper
                            color="primary"
                            checked={non_technical?.agreement_sent}
                            name="checkedC"
                            onChange={(e) =>
                              handleNonTechnicalStatus("agreement_sent")
                            }
                            inputprops={{ "aria-label": "controlled" }}
                          />
                        }
                        label="Agreement Sent"
                      />
                    )}
                    {loading_non_technical.agreement_received ? (
                      <span className="flex items-center justify-start">
                        <CircularProgress size={20} />
                        <span style={{ marginLeft: "10px" }}>
                          Agreement Received
                        </span>
                      </span>
                    ) : (
                      <FormControlLabel
                        control={
                          <CheckboxWrapper
                            color="primary"
                            checked={non_technical?.agreement_received}
                            name="checkedC"
                            onChange={(e) =>
                              handleNonTechnicalStatus("agreement_received")
                            }
                            inputprops={{ "aria-label": "controlled" }}
                          />
                        }
                        label="Agreement Received"
                      />
                    )}

                    {loading_non_technical.is_approved ? (
                      <span className="flex items-center justify-start">
                        <CircularProgress size={20} />
                        <span style={{ marginLeft: "10px" }}>Is Approved</span>
                      </span>
                    ) : (
                      <FormControlLabel
                        control={
                          <CheckboxWrapper
                            color="primary"
                            checked={non_technical?.is_approved}
                            name="checkedC"
                            onChange={(e) =>
                              handleNonTechnicalStatus("is_approved")
                            }
                            inputprops={{ "aria-label": "controlled" }}
                          />
                        }
                        label="Is Approved"
                      />
                    )}
                  </FormGroup>
                </TimelineContent>
              </TimelineItem>
            </TimelineWrapper>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Addresses;
