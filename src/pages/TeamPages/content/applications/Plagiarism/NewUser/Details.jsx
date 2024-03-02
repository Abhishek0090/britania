import React, { useState, forwardRef } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import {
  Button,
  Card,
  Grid,
  Box,
  Typography,
  Divider,
  Link,
  useTheme,
  DialogActions,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Text from "~/pages/TeamPages/components/Text";
import useMediaQuery from "@mui/material/useMediaQuery";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloudDownloadTwoToneIcon from "@mui/icons-material/CloudDownloadTwoTone";
import PageHeader from "~/pages/TeamPages/components/PageHeader";
import PageTitleWrapper from "~/pages/TeamPages/components/PageTitleWrapper";
import CloseIcon from "@mui/icons-material/Close";
import { URL } from "~/utils/BaseURL";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "~/features/auth/authSlice";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import FileUpload from "./FileUpload";
import {
  AccessTime,
  CurrencyRupee,
  DateRange,
  Email,
  Flag,
  Language,
  Numbers,
  Person2,
  Person2Outlined,
  Person2Sharp,
  Person2TwoTone,
  SignalWifiStatusbar4Bar,
  TimeToLeave,
  Timeline,
  Upload,
} from "@mui/icons-material";
import {
  setAllNonLoggedPlagiarismDetails,
  clearAllNonLoggedPlagiarismDetails,
} from "~/features/student/studentSlice";
import { DownloadCloud } from "lucide-react";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function NewUserDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("currentId", id);
  }, [id]);

  const [assignmentDetails, setAssignmentDetails] = useState(null);
  const studentData = useSelector(
    (state) => state.student.allNonLoggedPlagiarismDetails
  );

  useEffect(() => {
    axios
      .get(`${URL}/team/plagdetails.php?id=${id}`)
      .then((res) => {
        console.log(res);
        setAssignmentDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const getPlagDetails = () => {
    axios
      .get(`${URL}/team/plagdetails.php?id=${id}`)
      .then((res) => {
        console.log(res);
        setAssignmentDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const theme = useTheme();
  const navigate = useNavigate();

  const auth = useSelector(selectAuth);

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleUClickOpen = (id) => {
    setIsOpen(true);
  };

  const handleUClose = () => {
    setIsOpen(false);
    dispatch(
      setAllNonLoggedPlagiarismDetails({
        ...studentData,
        assignment_files: null,
        assignment_files_random_number: null,
      })
    );
  };

  const handleUpload = async (values) => {
    if (!studentData.assignment_files) {
      toast.error("Please Upload A File");

      return;
    }
    const data = {
      team_id: auth.teamData.id,
      assignment_id: id,
      assignment_files: studentData.assignment_files,
      assignment_files_random_number:
        studentData.assignment_files_random_number,
      submit: "submit",
    };

    console.log(data);

    await axios
      .post(`${URL}/team/submitfilesplagcheck.php`, data)
      .then((res) => {
        console.log(res);

        toast.success(res.data.message);
        dispatch(
          setAllNonLoggedPlagiarismDetails({
            ...studentData,
            assignment_files: null,
            assignment_files_random_number: null,
          })
        );
        handleUClose();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
    getPlagDetails();
  };

  const handleDownloadFile = (fileName) => {
    if (fileName === "") {
      toast.error("File name is empty");
      return;
    }

    axios
      .get(
        `${URL}/team/downloadplagcheckfiles.php?assignment_id=${id}&file_name=${fileName}`
      )
      .then((res) => {
        console.log(res);
        if (res?.data?.status === "success") {
          toast.success("File downloaded successfully");
          let url = res?.data?.file_url;
          let link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", res?.data?.file_name);
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
        } else {
          toast.error("Something went wrong");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
  };

  //download plag uploaded report

  const [plagOpen, setPlagOpen] = useState(false);

  const handlePOpen = () => {
    setPlagOpen(true);
  };

  const handlePClose = () => {
    setPlagOpen(false);
  };

  const [assignment_id, setAssignment_id] = useState(null);

  const handlePlagDownload = (fileName) => {
    if (fileName === "") {
      toast.error("File name is empty");
      return;
    }

    axios
      .get(
        `${URL}/team/downloadplagcheckedfiles.php?assignment_id=${id}&file_name=${fileName}`
      )
      .then((res) => {
        console.log(res);
        if (res?.data?.status === "success") {
          toast.success("File downloaded successfully");
          let url = res?.data?.file_url;
          let link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", res?.data?.file_name);
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
        } else {
          toast.error("Something went wrong");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
  };
  //   const [submittedName, setSubmittedName] = useState(null);

  //   useEffect(() => {
  //     axios
  //       .get(`${URL}/team/pmdetails.php?pm_id=${assignmentDetails.submitted_by}`)
  //       .then((res) => {
  //         setSubmittedName(res.data);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }, [id]);

  return (
    <>
      <Helmet>
        <title>Details Plagiarism</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader
          title="New Users Plagiarism Details"
          subtitle={`these are plagiarism details of ${assignmentDetails?.name}.`}
        />
      </PageTitleWrapper>
      <Box
        fullwidth="true"
        sx={{
          mx: 2,
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Grid item xs={12} md={12}>
              <Card
                variant="outlined"
                sx={{
                  p: 2,
                  background: `${theme.colors.alpha.black[5]}`,
                }}
              >
                <div className="flex  items-center justify-between md:mb-5 flex-col md:flex-row gap-5">
                  {assignmentDetails?.files ? (
                    window.innerWidth > 768 ? (
                      <Button
                        onClick={handleClickOpen}
                        size="small"
                        variant="outlined"
                        color="success"
                        startIcon={<AttachFileIcon />}
                      >
                        Download Assignment Files
                      </Button>
                    ) : (
                      <Button
                        onClick={handleClickOpen}
                        size="small"
                        color="success"
                        variant="outlined"
                        startIcon={<AttachFileIcon />}
                      >
                        Download Assignment Files
                      </Button>
                    )
                  ) : null}
                  {assignmentDetails?.status === "Submitted" ? (
                    <>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        gutterBottom
                        whiteSpace="nowrap"
                        sx={{ color: "#57CA22" }}
                        className="flex flex-col items-center gap-3"
                      >
                        <p className="text-blue111">
                          {" "}
                          Uploaded by &nbsp;{" "}
                          <b
                            className="text-purple-500 cursor-pointer"
                            onClick={() => {
                              navigate(
                                `/team/management/pm/details-pm/${assignmentDetails?.checked_by}`
                              );
                            }}
                          >
                            {assignmentDetails?.team_name || "NULL"}
                          </b>
                        </p>
                        {assignmentDetails?.delivery_time
                          ? ` 
                                ${moment(
                                  assignmentDetails?.delivery_time,
                                  "DD-MM-YYYY HH:mm:ss"
                                ).format("Do MMMM YYYY h:mm:ss a")}`
                          : ""}
                        {window.innerWidth > 768 ? (
                          <Button
                            onClick={() => {
                              handlePOpen();
                            }}
                            size="small"
                            variant="outlined"
                            color="warning"
                            startIcon={<DownloadCloud />}
                          >
                            Download Plagiarism Report
                          </Button>
                        ) : (
                          <Button
                            onClick={() => {
                              handlePOpen();
                            }}
                            size="small"
                            color="warning"
                            variant="outlined"
                            startIcon={<DownloadCloud />}
                          >
                            Download Plagiarism Report
                          </Button>
                        )}
                      </Typography>
                    </>
                  ) : assignmentDetails?.status === "PAID" ? (
                    <Button
                      onClick={handleUClickOpen}
                      size="small"
                      color="primary"
                      variant="outlined"
                      startIcon={<Upload />}
                    >
                      Upload Plagiarism Files
                    </Button>
                  ) : null}
                </div>

                <Box
                  sx={{
                    mt: 3,
                  }}
                >
                  {assignmentDetails?.name !== "NULL" && (
                    <Typography color="text.secondary">
                      <Text
                        sx={{
                          "@media (min-width: 768px)": {
                            fontSize: "1.2rem",
                          },
                          "@media (max-width: 400px)": {
                            fontSize: "1rem",
                          },
                        }}
                      >
                        <Person2
                          sx={{
                            mr: 1,
                          }}
                        />
                        <span className="text-white">Name:</span>{" "}
                        <b color="text.secondary">{assignmentDetails?.name}</b>
                      </Text>
                    </Typography>
                  )}
                  <Typography
                    color="text.secondary"
                    sx={{
                      mt: 1,
                    }}
                  >
                    <Email
                      sx={{
                        mr: 1,
                      }}
                    />
                    Email:{" "}
                    <Text color="black">
                      <b>{assignmentDetails?.email}</b>
                    </Text>
                  </Typography>
                  <Typography
                    color="text.secondary"
                    sx={{
                      mt: 1,
                    }}
                  >
                    <Language
                      sx={{
                        mr: 1,
                      }}
                    />
                    Country :{" "}
                    <Text color="black">
                      <b>{assignmentDetails?.country_name}</b>
                    </Text>
                  </Typography>
                  <Typography
                    color="text.secondary"
                    sx={{
                      mt: 1,
                    }}
                  >
                    <Flag
                      sx={{
                        mr: 1,
                      }}
                    />
                    Country Code:{" "}
                    <Text color="black">
                      <b>{assignmentDetails?.country_code}</b>
                    </Text>
                  </Typography>
                  <Typography
                    color="text.secondary"
                    sx={{
                      mt: 1,
                    }}
                  >
                    <Numbers
                      sx={{
                        mr: 1,
                      }}
                    />
                    Number:{" "}
                    <Text color="black">
                      <b>{assignmentDetails?.number}</b>
                    </Text>
                  </Typography>
                  <Typography
                    color="text.secondary"
                    sx={{
                      mt: 1,
                    }}
                  >
                    <DateRange
                      sx={{
                        mr: 1,
                      }}
                    />
                    Submission Date:{" "}
                    <Text color="black">
                      <b>
                        {moment(
                          assignmentDetails?.submission_date,
                          "DD-MM-YYYY HH:mm:ss"
                        ).format("Do MMMM YYYY h:mm:ss a")}
                      </b>
                    </Text>
                  </Typography>
                  <Typography
                    color="text.secondary"
                    sx={{
                      mt: 1,
                    }}
                  >
                    <CurrencyRupee
                      sx={{
                        mr: 1,
                      }}
                    />
                    Amount:{" "}
                    <Text color="black">
                      <b>{assignmentDetails?.amount}</b>
                    </Text>
                  </Typography>
                  <Typography
                    color="text.secondary"
                    sx={{
                      mt: 1,
                    }}
                  >
                    <SignalWifiStatusbar4Bar
                      sx={{
                        mr: 1,
                      }}
                    />
                    Status:{" "}
                    <Text color="black">
                      <b>{assignmentDetails?.status}</b>
                    </Text>
                  </Typography>
                  {/* <Typography
                    color="text.secondary"
                    sx={{
                      mt: 1,
                    }}
                  >
                    <AccessTime
                      sx={{
                        mr: 1,
                      }}
                    />
                    Update Time:{" "}
                    <Text color="black">
                      <b>
                        {moment(
                          assignmentDetails?.update_time,
                          "DD-MM-YYYY HH:mm:ss"
                        ).format("Do MMMM YYYY h:mm:ss a")}
                      </b>
                    </Text>
                  </Typography> */}
                </Box>

                <Divider
                  sx={{
                    my: 2,
                  }}
                />
              </Card>
              {/* <Card
          variant="outlined"
          sx={{
            p: 1,
            mt: 2,
            background: `${theme.colors.alpha.black[5]}`,
          }}
        >
          <Box>
            {assignedPM !== undefined ? (
              <>
                <Typography
                  color="text.primary"
                  variant="h3"
                  sx={{
                    mt: 1,
                  }}
                >
                  PM Details
                </Typography>
                <Typography
                  color="text.secondary"
                  sx={{
                    mt: 1,
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    navigate(
                      `/team/management/pm/details-pm/${assignedPM?.id}`
                    );
                  }}
                >
                  Name:{" "}
                  <Text color="info">
                    <b>{assignedPM?.name}</b>
                  </Text>
                </Typography>
                <Typography
                  component={"a"}
                  color="text.secondary"
                  sx={{
                    mt: 1,
                  }}
                  href={`https://wa.me/91${assignedPM?.number}?text=Hi%20I%20am%20interested%20in%20your%20services%20and%20would%20like%20to%20know%20more%20about%20it.`}
                >
                  Number:{" "}
                  <Text color="success">
                    <b>{assignedPM?.number}</b>
                  </Text>
                </Typography>
              </>
            ) : null}
            {assignedFreelancer?.length !== 0 ? (
              <>
                {" "}
                <Divider
                  sx={{
                    my: 2,
                  }}
                />
                <Typography
                  color="text.primary"
                  variant="h3"
                  sx={{
                    mt: 1,
                  }}
                >
                  Freelancer Details
                </Typography>
                {assignedFreelancer?.map((freelancer, id) => (
                  <div key={id}>
                    <Typography
                      color="text.secondary"
                      sx={{
                        mt: 1,
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        navigate(
                          `/team/management/profile/details/${freelancer?.id}`
                        );
                      }}
                    >
                      Name:{" "}
                      <Text color="info">
                        <b>{freelancer?.name}</b>
                      </Text>
                    </Typography>
                    <Typography
                      component={"a"}
                      color="text.secondary"
                      sx={{
                        mt: 1,
                      }}
                      href={`https://wa.me/91${freelancer?.number}?text=Hi%20I%20am%20interested%20in%20your%20services%20and%20would%20like%20to%20know%20more%20about%20it.`}
                    >
                      Number:{" "}
                      <Text color="success">
                        <b>{freelancer?.number}</b>
                      </Text>
                    </Typography> 
                    {assignedFreelancer?.length !== id + 1 ? (
                      <Divider
                        sx={{
                          my: 2,
                        }}
                      />
                    ) : null}
                  </div>
                ))}
              </>
            ) : null}
          </Box>
        </Card>  */}
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <BootstrapDialog
        scroll="paper"
        fullScreen={fullScreen}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Download Assignment Files
        </BootstrapDialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <div className="w-full text-gray-600 ">
              <div className="flex flex-wrap ">
                <div className="flex flex-col  rounded-lg sm:flex-row">
                  <div className="flex-grow flex-col flex items-start justify-start">
                    <span className="flex-grow flex flex-col">
                      {/* <span className="mt-1 text-base font-medium text-gray-900 capitalize">
                        Download Sample Files
                      </span> */}
                    </span>
                    {assignmentDetails?.files
                      ?.split("_$_")
                      ?.filter((item) => item !== "")
                      ?.map((item, id) => (
                        <div
                          onClick={() => handleDownloadFile(item)}
                          key={id}
                          className="flex items-center justify-between gap-5"
                        >
                          <p className="text-base leading-relaxed flex text-left text-white break-all">
                            <span className="text-purple-400 font-semibold text-xl pr-3">
                              {id + 1}.
                            </span>{" "}
                            {item}
                          </p>

                          <button className="inline-flex items-center justify-center flex-shrink-0   text-indigo-500 rounded-full sm:mr-8 sm:mb-0">
                            <CloudDownloadTwoToneIcon />
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
      </BootstrapDialog>

      <Dialog open={plagOpen} onClose={handlePClose} maxWidth>
        <DialogTitle>Download Plagiarism Reports</DialogTitle>
        <div className="flex flex-col  items-center justify-center   p-5  w-full gap-[20px] p-2 ">
          <DialogActions className="w-[100%] flex flex-col gap-5">
            <div className="w-full text-gray-600 ">
              <div className="flex flex-wrap ">
                <div className="flex flex-col  rounded-lg sm:flex-row">
                  <div className="flex-grow flex-col flex items-start justify-start">
                    {assignmentDetails?.checked_files
                      ?.split("_$_")
                      ?.filter((item) => item !== "")
                      ?.map((item, id) => (
                        <div
                          onClick={() => handlePlagDownload(item)}
                          key={id}
                          className="flex items-center justify-between gap-5"
                        >
                          <p className="text-base leading-relaxed flex text-left text-white break-all">
                            <span className="text-purple-400 font-semibold text-xl pr-3">
                              {id + 1}.
                            </span>{" "}
                            {item}
                          </p>

                          <button className="inline-flex items-center justify-center flex-shrink-0   text-indigo-500 rounded-full sm:mr-8 sm:mb-0">
                            <CloudDownloadTwoToneIcon />
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-5">
              <Button onClick={handlePClose}>Close</Button>
            </div>
          </DialogActions>
        </div>
      </Dialog>

      <Dialog open={isOpen} onClose={handleUClose} maxWidth>
        {/* <DialogTitle>File Upload ?</DialogTitle> */}
        <div className="flex flex-col  items-center justify-center   p-5  w-full gap-[20px] p-2 ">
          <DialogActions className="w-[100%] flex flex-col gap-2">
            <FileUpload />
            <div className="flex gap-5">
              <Button
                className="bg-blue141 text-white"
                onClick={() => {
                  handleUpload();
                }}
              >
                Submit
              </Button>
              <Button onClick={handleUClose}>Close</Button>
            </div>
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
}
