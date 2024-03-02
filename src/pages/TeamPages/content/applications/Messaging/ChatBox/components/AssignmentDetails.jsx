import React, { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import {
  Button,
  Card,
  Grid,
  Box,
  Typography,
  Divider,
  useTheme,
  Menu,
  MenuItem,
  DialogActions,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Label from "~/pages/TeamPages/components/Label";
import Text from "~/pages/TeamPages/components/Text";
import useMediaQuery from "@mui/material/useMediaQuery";
import ViewStreamIcon from "@mui/icons-material/ViewStream";
import SchoolIcon from "@mui/icons-material/School";
import SubtitlesIcon from "@mui/icons-material/Subtitles";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import DescriptionIcon from "@mui/icons-material/Description";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CloudDownloadTwoToneIcon from "@mui/icons-material/CloudDownloadTwoTone";
import EventAvailableTwoToneIcon from "@mui/icons-material/EventAvailableTwoTone";
import CurrencyRupeeTwoToneIcon from "@mui/icons-material/CurrencyRupeeTwoTone";
import CloseIcon from "@mui/icons-material/Close";
import { URL } from "~/utils/BaseURL";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "~/features/auth/authSlice";
import { useEffect } from "react";
import { LucideLogIn, LucideMessageCircle } from "lucide-react";
import { useRef } from "react"; 

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
 
export default function AssignmentDetails({
  assignmentDetails,
  assignedPM,
  assignedFreelancer,
  id,
  chatDetails,
  chatIds,
}) {
  console.log(assignmentDetails);
  const theme = useTheme();
  const navigate = useNavigate();
  const ref = useRef(null);

  const auth = useSelector(selectAuth);

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDownloadFile = (fileName) => {
    if (fileName === "") {
      toast.error("File name is empty");
      return;
    } 

    let endpoint = "";
    if (assignmentDetails.stream === "Programming") {
      endpoint = "downloadprogrammingassignmentfiles";
    } else if (assignmentDetails.stream === "Professional Writing") {
      endpoint = "downloadprofessionalwritingassignmentfiles";
    } else if (assignmentDetails.stream === "Academic Writing") {
      endpoint = "downloadacademicwritingassignmentfiles";
    }
    axios
      .get(
        `${URL}/team/${endpoint}.php?assignment_id=${id}&file_name=${fileName}`
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
  const [submittedName, setSubmittedName] = useState(null);

  useEffect(() => {
    axios
      .get(`${URL}/team/pmdetails.php?pm_id=${assignmentDetails?.submitted_by}`)
      .then((res) => {
        setSubmittedName(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [assignmentDetails]);

  const [isOpen, setIsOpen] = useState(false);

  const [confirm, setConfirm] = useState(false);

  const [chatFunction, setChatFunction] = useState(null);

  const handleIsOpen = () => {
    setIsOpen(true);
  };

  const handleIsClose = () => {
    setIsOpen(false);
  };

  const handleAssignmentChatStudent = () => {
    const data = {
      created_by_id: auth?.teamData.id,
      assignment_id: id,
    };

    axios
      .post(`${URL}/team/createassignmentchatstudent.php`, data)
      .then((res) => {
        console.log(res.data.chat_id);
        toast.success(res.data.message);
        navigate(
          `/team/dashboards/chats?chat_id=${res.data.chat_id}&type=UserAssignment&new_chat=new`
        );
      })
      .catch((err) => console.log(err));
  };

  const handleAssignmentChatFreelancer = () => {
    const data = {
      created_by_id: auth?.teamData.id,
      assignment_id: id,
    };

    axios
      .post(`${URL}/team/createassignmentchatfreelancer.php`, data)
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
        navigate(
          `/team/dashboards/chats?chat_id=${res.data.chat_id}&type=TeamandFreelancerAssignment&new_chat=new`
        );
      })
      .catch((err) => console.log(err));
  };

  const handleAssignmentChatTeam = () => {
    const data = {
      created_by_id: auth?.teamData.id,
      assignment_id: id,
    };

    axios
      .post(`${URL}/team/createassignmentchatteam.php`, data)
      .then((res) => { 
        toast.success(res.data.message);
        navigate(
          `/team/dashboards/chats?chat_id=${res.data.chat_id}&type=TeamAssignment&new_chat=new`
        );
      })
      .catch((err) => console.log(err));
  };

  const handleAssignmentGroupChat = () => {
    const data = {
      created_by_id: auth?.teamData.id,
      assignment_id: id,
    };

    axios
      .post(`${URL}/team/createassignmentgroup.php`, data)
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
        navigate(
          `/team/dashboards/chats?chat_id=${res.data.chat_id}&type=AssignmentGroup&new_chat=new`
        );
      })
      .catch((err) => console.log(err));
  };

  const handleGoToChat = (type, chat_id) => {
    if (type === "team assignment") {
      navigate(`/team/dashboards/chats?chat_id=${chat_id}&type=TeamAssignment`);
    }
    if (type === "freelancer assignment") {
      navigate(
        `/team/dashboards/chats?chat_id=${chat_id}&type=TeamandFreelancerAssignment`
      );
    }
    if (type === "student assignment") {
      navigate(`/team/dashboards/chats?chat_id=${chat_id}&type=UserAssignment`);
    }
    if (type === "group assignment") {
      navigate(
        `/team/dashboards/chats?chat_id=${chat_id}&type=AssignmentGroup`
      );
    }
  };

  return (
    <>
      <Grid item xs={12} md={12} sx={{paddingX : "2px"}}>
        <Card
          variant="outlined"
          sx={{
            p : 1,
            background: `${theme.colors.alpha.black[5]}`,
          }}
          className="ml-1 mr-3 "
        >
          <div
            className={`flex flex-col md:flex-row items-center gap-2 justify-between md:mb-5 flex-row `}
          >
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
                  {/* <CloudDownloadTwoToneIcon /> */}
                </Button>
              )
            ) : null}
            {!chatIds ? (
              <div className="flex flex-col justify-start md:flex-row gap-2 mt-2">
                <Button
                  variant="outlined"
                  color="warning"
                  className="ml-4"
                  ref={ref}
                  onClick={handleIsOpen}
                >
                  Chat Options &nbsp;
                  <LucideMessageCircle />
                </Button>
              </div>
            ) : null}
          </div>
          <Box
            sx={{
              mt: 3,
            }}
          >
            {assignmentDetails?.title !== "NULL" && (
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
                  <ViewStreamIcon
                    sx={{
                      mr: 1,
                      color: "white",
                    }}
                  />
                  <span className="text-white">Title:</span>{" "}
                  <b color="text.secondary">{assignmentDetails?.title}</b>
                </Text>
              </Typography>
            )}

            <Typography
              color="text.secondary"
              sx={{
                mt: 1,
              }}
            >
              <SubtitlesIcon
                sx={{
                  mr: 1,
                }}
              />
              Assignment Level:{" "}
              <Text color="black">
                <b>{assignmentDetails?.level}</b>
              </Text>
            </Typography>
            <Typography
              color="text.secondary"
              sx={{
                mt: 1,
              }}
            >
              <SchoolIcon
                sx={{
                  mr: 1,
                }}
              />
              Assignment Stream:{" "}
              <Text color="black">
                <b>{assignmentDetails?.stream}</b>
              </Text>
            </Typography>
            <Typography
              color="text.secondary"
              sx={{
                mt: 1,
              }}
            >
              <KeyboardIcon
                sx={{
                  mr: 1,
                }}
              />
              Assignment Type:{" "}
              <Text color="black">
                <b>
                  {assignmentDetails?.type?.map((type, id) => (
                    <Label color="primary" sx={{ mr: 1, mb: 1 }} key={id}>
                      {type}
                    </Label>
                  ))}
                </b>
              </Text>
            </Typography>
            <Typography
              color="text.secondary"
              sx={{
                mt: 1,
              }}
            >
              <DescriptionIcon
                sx={{
                  mr: 1,
                }}
              />
              Description:{" "}
              <Text color="black">
                <b>{assignmentDetails?.description}</b>
              </Text>
            </Typography>
            <Typography
              color="text.secondary"
              sx={{
                mt: 1,
              }}
            >
              <TurnedInIcon
                sx={{
                  mr: 1,
                }}
              />
              Submitted By:{" "}
              <Text color="black">
                <b>
                  {assignmentDetails?.submitted_by != "student"
                    ? submittedName?.map((item) => item.name) || "Not Defined"
                    : assignmentDetails?.submitted_by}
                </b>
              </Text>
            </Typography>
          </Box>

          <Divider
            sx={{
              my: 2,
            }}
          />
          <div className="flex md:items-center md:justify-between md:flex-row flex-col items-start justify-start gap-10 md:gap-0">
        
              <div className="flex  items-center justify-between flex-row   gap-2">
                <Typography
                  sx={{
                    mr: 1,
                    color: "green",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <CurrencyRupeeTwoToneIcon
                    sx={{
                      mr: 1,
                    }}
                  />
                  Budget:
                </Typography>
                <span>
                  <b>₹ {assignmentDetails?.budget}</b>
                </span>
              </div> 

            <div className="flex md:items-center md:justify-between md:flex-row flex-col items-start justify-start gap-2">
              <Typography
                sx={{
                  mr: 1,
                  color: "red",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <EventAvailableTwoToneIcon
                  sx={{
                    mr: 1,
                  }}
                />
                Deadline:
              </Typography>
              <span>
                {moment(assignmentDetails?.deadline).format(
                  "MMMM Do YYYY, h:mm:ss a"
                )}
              </span>
            </div>
            <div className="flex md:items-center md:justify-between md:flex-row flex-col items-start justify-start gap-2">
              <Typography
                sx={{
                  mr: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <PendingActionsIcon
                  sx={{
                    mr: 1,
                  }}
                />
                Submission Date:
              </Typography>

              {/* submission_date */}
              <span>
                {moment(
                  assignmentDetails?.submission_date,
                  "DD-MM-YYYY HH:mm:ss"
                ).format("Do MMMM YYYY h:mm:ss a")}
              </span>
            </div>
          </div>
        </Card>
        {/* {assignedPM === undefined && assignedFreelancer?.length !== 0 ? ( */}
         <Card
          variant="outlined"
          sx={{
            p: 1,
            mt: 2,
            background: `${theme.colors.alpha.black[5]}`,
          }}
          className="ml-1 mr-3 "
        >  
          <Box sx={{paddingX : "2px"}}>
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
                    {/* {assignedFreelancer?.length > 1 ? (
                      <Divider
                        sx={{
                          my: 2,
                        }}
                      />
                    ) : null} */}
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
        </Card>
        {/* ) : null} */}
      </Grid>

      <Menu anchorEl={ref.current} onClose={handleIsClose} open={isOpen}>
        

        {chatDetails?.assignment_group?.length > 0 ? (
          <MenuItem
            sx={{
              px: 3,
            }}
            className="flex justify-between gap-4"
            variant="outlined"
            onClick={() => {
              handleGoToChat(
                "group assignment",
                chatDetails?.assignment_group[0]?.chat_id
              );
            }}
          >
            <span> Go to Assignment Group Chat</span>
            <span>
              <LucideLogIn />
            </span>
          </MenuItem>
        ) : (
          <MenuItem
            sx={{
              px: 3,
            }}
            className="flex justify-between gap-4"
            variant="outlined"
            onClick={() => {
              setConfirm(true);
              setChatFunction("group assignment");
            }}
          >
            <span> Create Assignment Group Chat</span>
            <span>
              <LucideMessageCircle />
            </span>
          </MenuItem>
        )}
      </Menu>

      <Dialog open={confirm} onClose={() => setConfirm(false)}>
        <DialogTitle>Are You Sure You Want to Create Chat ?</DialogTitle>
        <div className="flex items-center justify-end gap-[5px] p-2 h-[100px]">
          <DialogActions>
            <Button
              className="bg-blue141 text-white"
              onClick={() => {
                if (chatFunction === "team assignment") {
                  handleAssignmentChatTeam();
                } else if (chatFunction === "freelancer assignment") {
                  handleAssignmentChatFreelancer();
                } else if (chatFunction === "student assignment") {
                  handleAssignmentChatStudent();
                } else if (chatFunction === "group assignment") {
                  handleAssignmentGroupChat();
                }
                setChatFunction(null);
              }}
            >
              Confirm
            </Button>
          </DialogActions>
          <DialogActions>
            <Button onClick={() => setConfirm(false)}>Close</Button>
          </DialogActions>
        </div>
      </Dialog>
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
                    {/* <span className="flex-grow flex flex-col">
                      <span className="mt-1 text-base font-medium text-gray-900 capitalize">
                        Download Sample Files
                      </span>
                    </span> */}
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
    </>
  );
}
