import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectAuth } from "~/features/auth/authSlice";
import toast from "react-hot-toast";
import { Card, Box, useTheme } from "@mui/material";
import VuiBox from "~/components/VuiBox";
import VuiTypography from "~/components/VuiTypography";
import colors from "~/layout/SidebarLayout/theme/base/colors";
import CloudDownloadTwoToneIcon from "@mui/icons-material/CloudDownloadTwoTone";
import DownloadTwoToneIcon from "@mui/icons-material/DownloadTwoTone";
import VuiButton from "~/components/VuiButton";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import CloseIcon from "@mui/icons-material/Close";
import { URL } from "~/utils/BaseURL";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    color: theme.palette.text.primary,
    backgroundColor: "#000000",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
    color: theme.palette.text.primary,
    backgroundColor: "#000000",
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

const CarInformations = ({ work, user }) => {
  const auth = useSelector(selectAuth);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { gradients, info } = colors;
  const { cardContent } = gradients;
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

    console.log("fileName", fileName);

    axios
      .get(
        `${URL}/freelancer/downloadfreelancerpastworkfiles.php?freelancer_id=${auth?.id}&file_name=${fileName}`
      )
      .then((res) => {
        //console.log(res.data);
        if (res?.data?.status === "success") {
          toast.success("File downloaded successfully");
          let url = res?.data?.file_url;
          console.log("url", url);
          let link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", res?.data?.file_name);
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
  };
  const handleDownloadFileResume = (fileName) => {
    if (fileName === "") {
      toast.error("File name is empty");
      return;
    }

    console.log("fileName", fileName);

    axios
      .get(
        `${URL}/freelancer/downloadfreelancerresume.php?freelancer_id=${auth?.id}&file_name=${fileName}`
      )
      .then((res) => {
        console.log(res?.data);
        if (res?.data?.status === "success") {
          toast.success("File downloaded successfully");
          let url = res?.data?.file_url;
          console.log("url", url);
          let link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", res?.data?.file_name);
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
  };
  return (
    <Card
      sx={({ breakpoints }) => ({
        [breakpoints.up("xxl")]: {
          maxHeight: "600px",
          height: "500px",
        },
      })}
    >
      <VuiBox display="flex" flexDirection="column">
        <VuiTypography variant="lg" color="white" fontWeight="bold" mb="6px">
          Resume & Sample Files
        </VuiTypography>
        <VuiTypography variant="button" color="text" fontWeight="regular">
          Hello,
          {user?.firstname} {user?.lastname}! Here is your sample files &
          resume. You can download them by clicking the button on the right.
        </VuiTypography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            mt: 3,
          }}
        >
          <VuiButton
            sx={{
              my: 1,
            }}
            onClick={() =>
              handleDownloadFileResume(work?.resume?.split("_$_")[0])
            }
            variant="outlined"
            size="small"
          >
            <DownloadTwoToneIcon sx={{ mr: 1 }} /> Resume
          </VuiButton>
          <VuiButton
            sx={{
              mt: 1,
            }}
            onClick={handleClickOpen}
            variant="outlined"
            size="small"
          >
            <DownloadTwoToneIcon sx={{ mr: 1 }} /> Past Work Samples
          </VuiButton>
        </Box>
      </VuiBox>
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
          Download Past work Files
        </BootstrapDialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <div className="w-full text-gray-600 ">
              <div className="flex flex-wrap ">
                <div className="flex flex-col  rounded-lg sm:flex-row">
                  <div className="flex-grow flex-col flex items-start justify-start">
                    {work?.past_work_files
                      ?.split("_$_")
                      ?.filter((item) => item !== "")
                      ?.map((item, id) => (
                        <div
                          onClick={() => handleDownloadFile(item)}
                          key={id}
                          className="flex-grow flex items-center justify-between gap-5"
                        >
                          <p className="text-base leading-relaxed flex text-left text-white">
                            <span className="text-blue306 font-semibold text-xl pr-3">
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
    </Card>
  );
};

export default CarInformations;
