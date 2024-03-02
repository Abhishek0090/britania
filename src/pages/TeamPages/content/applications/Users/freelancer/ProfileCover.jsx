import React, { useState } from "react";
import { AvatarPageTitle } from "~/utils/CustomStyles";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import toast from "react-hot-toast";
import { Link as ScrollLink } from "react-scroll";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  Avatar,
  Box,
  Typography,
  Tooltip,
  Button,
  CardMedia,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import EmailTwoToneIcon from "@mui/icons-material/EmailTwoTone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import ArrowForwardTwoToneIcon from "@mui/icons-material/ArrowForwardTwoTone";
import Grid3x3TwoToneIcon from "@mui/icons-material/Grid3x3TwoTone";
import DownloadTwoToneIcon from "@mui/icons-material/DownloadTwoTone";
import CloudDownloadTwoToneIcon from "@mui/icons-material/CloudDownloadTwoTone";
import coverImg from "~/assets/cool-background.png";
import CloseIcon from "@mui/icons-material/Close";
import ThumbDownAltTwoToneIcon from "@mui/icons-material/ThumbDownAltTwoTone";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import MoreHorizTwoToneIcon from "@mui/icons-material/MoreHorizTwoTone";
import { AvatarWrapper, CardCover } from "~/utils/CustomStyles";
import { URL } from "~/utils/BaseURL";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "~/features/auth/authSlice";
import { Chat } from "@mui/icons-material";
import { LucideLogIn, LucideMessageCircle } from "lucide-react";
import { setAllChatCreate } from "~/features/team/Chats/ChatSlice";

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

const ProfileCover = ({ user, id, userWork, otherIds, chatDetails }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleFreeOpen = () => {
    setIsOpen(true);
  };
  const handleFreeClose = () => {
    setIsOpen(false);
  };

  const [loading, setLoading] = useState({
    delete: false,
    reject: false,
  });

  const handleFreelancerDelete = async () => {
    setLoading({ ...loading, delete: true });
    try {
      const response = await axios.post(
        `${URL}/team/freelancerdelete.php?freelancer_id=${id}`
      );
      console.log(response);
      toast.success(response.data.message);
      navigate(-1);
      // handleClose(null);
    } catch (error) {
      toast.error("Couldn't Delete the Freelancer");
    }
    setLoading({ ...loading, delete: false });
  };

  const [rejecting, setRejecting] = useState(false);

  const handleRejectFreelancer = async (value) => {
    setLoading({ ...loading, reject: true });
    try {
      const response = await axios.post(`${URL}/team/freelancerreject.php`, {
        freelancer_id: id,
        reject_reason: value,
      });
      toast.success(response.data.message);
      setRejecting(true);
      // window.location.reload();
      handleCloseMenu();
    } catch (error) {
      toast.error("Couldn't Reject the Freelancer");
    }
    setLoading({ ...loading, delete: false });
  };

  let profilePhoto = userWork?.profile_photo?.replace("_$_", "")?.toString();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleDownloadFile = (fileName) => {
    if (fileName === "") {
      toast.error("File name is empty");
      return;
    }

    console.log("fileName", fileName);

    axios
      .get(
        `${URL}/team/downloadfreelancerpastworkfiles.php?freelancer_id=${id}&file_name=${fileName}`
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
        `${URL}/team/downloadfreelancerresume.php?freelancer_id=${id}&file_name=${fileName}`
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

  const nextHandler = () => {
    if (!otherIds?.next) {
      return;
    }
    navigate(`/team/management/profile/details/${Number(otherIds?.next)}`);
    console.log("next");
  };

  const prevHandler = () => {
    if (!otherIds?.previous) {
      return;
    }
    navigate(`/team/management/profile/details/${Number(otherIds?.previous)}`);
    console.log("prev");
  };

  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();

  const handleChatCreate = () => {
    const data = {
      created_by_id: auth?.teamData.id,
      freelancer_id: id,
    };

    console.log(data);

    axios
      .post(`${URL}/team/createpersonalchatfreelancer.php`, data)
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
        navigate(
          `/team/dashboards/chats?chat_id=${res.data.chat_id}&type=TeamandFreelancerPersonal&new_chat=new`
        );
      })
      .catch((err) => console.log(err));
  };

  console.log(chatDetails);

  console.log(user);

  const handleGoToChat = () => {
    navigate(
      `/team/dashboards/chats?chat_id=${chatDetails?.chat_id}&type=TeamandFreelancerPersonal`
    );
  };

  return (
    <>
      <div className="flex items-center justify-between gap-2 mb-3">
        {" "}
        <div className="flex items-center md:flex-row flex-col justify-between gap-2">
          <AvatarPageTitle
            onClick={prevHandler}
            sx={{ cursor: "pointer" }}
            variant="rounded"
          >
            <ArrowBackTwoToneIcon fontSize="large" />
          </AvatarPageTitle>
        </div>
        <Box>
          <AvatarPageTitle
            onClick={nextHandler}
            sx={{ cursor: "pointer" }}
            variant="rounded"
          >
            <ArrowForwardTwoToneIcon fontSize="large" />
          </AvatarPageTitle>
        </Box>
      </div>
      <Box>
        <Tooltip arrow placement="top" title="User Id ">
          <IconButton color="primary" sx={{ mr: 1 }}>
            <Grid3x3TwoToneIcon />
            <Typography variant="h1" component="h1" gutterBottom>
              {id}
            </Typography>
          </IconButton>
        </Tooltip>
        <Box>
          <Typography
            variant="h2"
            component="h2"
            gutterBottom
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <span>Profile of</span>
            <Typography variant="h3" color="primary">
              {user?.name}
            </Typography>
          </Typography>
        </Box>
      </Box>

      <CardCover>
        <CardMedia image={coverImg} />
      </CardCover>
      <AvatarWrapper>
        <Avatar variant="rounded" alt={user?.name} src={profilePhoto} />
      </AvatarWrapper>

      <Box py={2} pl={2} mb={3}>
        <Typography component={"a"} href={`mailto:${user?.email}`} variant="h4">
          <EmailTwoToneIcon color="primary" sx={{ mr: 1 }} />
          {user?.email}
        </Typography>
        <Typography sx={{ py: 2 }} variant="subtitle2" color="text.primary">
          <a
            href={`tel:${user?.number}`}
            className="text-decoration-none cursor-pointer"
          >
            <LocalPhoneIcon color="primary" /> {user?.number}
          </a>{" "}
          |
          <a
            href={`
          https://wa.me/${user?.country_code}${
            user?.whatsapp
          }?text=${encodeURIComponent(
            `Hey ${user?.name},\nGreetings from Bluepen.co.in. This message is in regards to your application for academic writer as a freelancer in Bluepen. Is it a good time to talk to you?`
          )}
        `}
            className="text-decoration-none cursor-pointer"
          >
            <WhatsAppIcon color="success" sx={{ ml: 1 }} />
            {user?.whatsapp}
          </a>{" "}
          {user?.gender === "Male" ? (
            <MaleIcon color="secondary" />
          ) : (
            <FemaleIcon color="secondary" />
          )}{" "}
          {user?.gender}
        </Typography>

        <Box
          display={{ xs: "block", md: "flex" }}
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <Button
              size="small"
              variant="contained"
              sx={{
                backgroundColor: "#8C7CF0 !important",
              }}
              onClick={() =>
                handleDownloadFileResume(userWork?.resume?.split("_$_")[0])
              }
            >
              <DownloadTwoToneIcon sx={{ mr: 1 }} /> Resume
            </Button>
            <Button
              onClick={handleClickOpen}
              size="small"
              sx={{ mx: 1 }}
              variant="outlined"
            >
              <DownloadTwoToneIcon sx={{ mr: 1 }} /> Past Work Samples
            </Button>

            {/* {chatDetails ? (
            <Button
              variant="outlined"
              color="success"
              className="ml-4"
              onClick={handleGoToChat}
            >
              Go to Chat &nbsp;
              <LucideLogIn />
            </Button>
          ) : (
            <Button
              variant="outlined"
              className="ml-4"
              onClick={handleChatCreate}
            >
              Create Chat &nbsp;
              <LucideMessageCircle />
            </Button>
          )} */}
            <br />
            <br />
            {user?.technical_status?.is_approved == "-1" ||
            user?.non_technical_status?.is_approved == "-1" ||
            rejecting ? (
              <Button
                size="small"
                sx={{ mx: 1, color: "red" }}
                variant="outlined"
              >
                Rejected
              </Button>
            ) : (
              <Button
                aria-controls={openMenu ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openMenu ? "true" : undefined}
                onClick={handleClickMenu}
                size="small"
                sx={{ mx: 0, p: 0.5, mr: 2 }}
                variant="outlined"
                color="error"
              >
                <Box className="flex gap-5 mx-2 items-center">
                  Reject
                  <ThumbDownAltTwoToneIcon />
                </Box>
              </Button>
            )}

            <Button
              variant="outlined"
              size="small"
              aria-controls={openMenu ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openMenu ? "true" : undefined}
              onClick={handleFreeOpen}
              color="error"
              sx={{ p: 0.5 }}
            >
              <Box className="flex gap-5 mx-2 items-center">
                {" "}
                Delete Freelancer <PersonRemoveIcon />
              </Box>
            </Button>
          </Box>{" "}
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleCloseMenu}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={() => handleRejectFreelancer("1")}>
              Reject for utter incompetence
            </MenuItem>
            <MenuItem onClick={() => handleRejectFreelancer("2")}>
              Reject for dis-agreement
            </MenuItem>
            <MenuItem onClick={() => handleRejectFreelancer("3")}>
              Reject for poor performance
            </MenuItem>
          </Menu>
          <ScrollLink
            to="table"
            smooth={true}
            duration={1000}
            exact="true"
            offset={-80}
          >
            <Button
              sx={{ mt: { xs: 2, md: 0 } }}
              size="small"
              variant="text"
              endIcon={<ArrowForwardTwoToneIcon />}
            >
              See all assigments
            </Button>
          </ScrollLink>
        </Box>
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
          Download Pastwork Files
        </BootstrapDialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <div className="w-full text-gray-600 ">
              <div className="flex flex-wrap ">
                <div className="flex flex-col  rounded-lg sm:flex-row">
                  <div className="flex-grow flex-col flex items-start justify-start">
                    {userWork?.past_work_files
                      ?.split("_$_")
                      ?.filter((item) => item !== "")
                      ?.map((item, id) => (
                        <div
                          onClick={() => handleDownloadFile(item)}
                          key={id}
                          className="flex-grow flex items-center justify-between gap-5"
                        >
                          <p className="break-all text-base leading-relaxed flex text-left text-white">
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

      <Dialog open={isOpen} onClose={handleFreeClose}>
        <DialogTitle>
          Are You Sure You Want to Delete Freelancer Delete ?
        </DialogTitle>
        <div className="flex items-center justify-end gap-[5px] p-2 h-[100px]">
          <DialogActions>
            <Button
              className="bg-blue141 text-white"
              onClick={() => {
                handleFreelancerDelete();
              }}
            >
              Confirm
            </Button>
          </DialogActions>
          <DialogActions>
            <Button onClick={handleFreeClose}>Close</Button>
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
};

ProfileCover.propTypes = {
  // @ts-ignore
  user: PropTypes.object.isRequired,
};

export default ProfileCover;
