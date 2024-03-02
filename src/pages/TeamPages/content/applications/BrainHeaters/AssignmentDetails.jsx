import React, { useState } from "react";
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
import Label from "~/pages/TeamPages/components/Label";
// import FileUpload from "./FileUpload";
import {
  AccessTime,
  BookmarkRemove,
  Collections,
  CurrencyRupee,
  DateRange,
  Description,
  Email,
  Flag,
  Language,
  NewReleases,
  Numbers,
  Person2,
  Person2Outlined,
  Person2Sharp,
  Person2TwoTone,
  School,
  SignalWifiStatusbar4Bar,
  StarOutlineSharp,
  TimeToLeave,
  Timeline,
  Title,
  Upload,
} from "@mui/icons-material";

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

export default function AssignmentDetails({ exisitingDetails }) {
  const { id } = useParams();
  const auth = useSelector(selectAuth);

  useEffect(() => {
    localStorage.setItem("currentId", id);
  }, [id]);
 
  console.log(exisitingDetails);
  

  const theme = useTheme();

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

    console.log(fileName);

    axios
      .get(
        `${URL}/team/downloadbrainheatersassignmentfiles.php?assignment_id=${id}&file_name=${fileName}`
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

  const renderStatusLabel = () => {
    const { bh_lost, bh_posted, bh_likely, bh_converted, bh_completed } =
      exisitingDetails || {};

    if (bh_lost > 0) {
      return <Label color="error">Lost</Label>;
    } else if (bh_completed > 0) {
      return <Label color="success">Completed</Label>;
    } else if (bh_converted > 0) {
      return <Label color="warning">Converted</Label>;
    } else if (bh_likely > 0) {
      return <Label color="info">Likely</Label>;
    } else if (bh_posted > 0) {
      return <Label color="primary">Posted</Label>;
    } else {
      return <Label color="default">No Status</Label>;
    }
  };

  return (
    <>
      <Helmet>
        <title>Details</title>
      </Helmet>
      <Box
        sx={{
          p: 2,
        }}
      >
        {/* <Box>
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
                
                  background: `${theme.colors.alpha.black[5]}`,
                }}
              > */}
        <div className="flex  items-center justify-between md:mb-5 flex-col md:flex-row gap-5">
          {exisitingDetails?.files ? (
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
        </div>

        <Box
          sx={{
            mt: 3,
            display: "flex",
            gap: "5px",
            flexDirection: "column",
          }}
        >
          {exisitingDetails?.name !== "NULL" && (
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
                <b color="text.secondary">{exisitingDetails?.name}</b>
              </Text>
            </Typography>
          )}
          {auth?.teamDomain !== "Brainheaters" && (
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
                <b>{exisitingDetails?.number}</b>
              </Text>
            </Typography>
          )}
          <Typography
            color="text.secondary"
            sx={{
              mt: 1,
            }}
          >
            <School
              sx={{
                mr: 1,
              }}
            />
            College Name :{" "}
            <Text color="black">
              <b>{exisitingDetails?.college_name}</b>
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
            Course:{" "}
            <Text color="black">
              <b>{exisitingDetails?.course}</b>
            </Text>
          </Typography>
          <Typography
            color="text.secondary"
            sx={{
              mt: 1,
            }}
          >
            <Title
              sx={{
                mr: 1,
              }}
            />
            Title:{" "}
            <Text color="black">
              <b>{exisitingDetails?.title}</b>
            </Text>
          </Typography>
          <Typography
            color="text.secondary"
            sx={{
              mt: 1,
            }}
          >
            <Description
              sx={{
                mr: 1,
              }}
            />
            Description:{" "}
            <Text color="black">
              <b>{exisitingDetails?.description}</b>
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
                  exisitingDetails?.date_of_submission,
                  "DD-MM-YYYY HH:mm:ss"
                ).format("Do MMMM YYYY h:mm:ss a")}
              </b>
            </Text>
          </Typography>
          {auth?.teamDomain !== "Brainheaters" && (
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
              Budget:{" "}
              <Text color="black">
                <b>{exisitingDetails?.budget}</b>
              </Text>
            </Typography>
          )}
          <Typography
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
            Deadline:{" "}
            <Text color="black">
              <b>
                {" "}
                {moment(
                  exisitingDetails?.deadline,
                  "YYYY-MM-DD HH:mm:ss"
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
            <StarOutlineSharp
              sx={{
                mr: 1,
              }}
            />
            Status:{" "}
            <Text color="black">
              {/* {exisitingDetails?.status === ""
                        ? "In Progress"
                        : getStatusLabel(exisitingDetails?.status)} */}

              {renderStatusLabel()}
            </Text>
          </Typography>

          {exisitingDetails?.lost_reason && (
            <Typography
              color="text.secondary"
              sx={{
                mt: 1,
              }}
            >
              <NewReleases
                sx={{
                  mr: 1,
                }}
              />
              Lost Reason:{" "}
              <Text color="black">
                <b>{exisitingDetails?.lost_reason}</b>
              </Text>
            </Typography>
          )}
        </Box>
        {/* </Card> */}
        {/* </Grid>
          </Grid>
        </Grid>
      */}
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
                    {exisitingDetails?.files
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
                              {id + 1}
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
