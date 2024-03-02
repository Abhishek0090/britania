import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Typography,
  Tooltip,
  IconButton,
  CardMedia,
  Button,
} from "@mui/material";
import EmailTwoToneIcon from "@mui/icons-material/EmailTwoTone";
import CreateIcon from "@mui/icons-material/Create";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import FemaleIcon from "@mui/icons-material/Female";
import EditIcon from "@mui/icons-material/Edit";
import MaleIcon from "@mui/icons-material/Male";
import Grid3x3TwoToneIcon from "@mui/icons-material/Grid3x3TwoTone";
import coverImg from "~/assets/cool-background.png";
import Label from "~/pages/TeamPages/components/Label";
import SchoolIcon from "@mui/icons-material/School";
import DoneTwoToneIcon from "@mui/icons-material/DoneTwoTone";
import { AvatarWrapper, CardCover } from "~/utils/CustomStyles";
import React, { useEffect } from "react";
import axios from "axios";
import { URL } from "~/utils/BaseURL";
import { useState } from "react";
import { selectAuth } from "~/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { LucideLogIn, LucideMessageCircle } from "lucide-react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { setAllChatCreate } from "~/features/team/chats/chatSlice";
import { DialogActions } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import moment from "moment";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import {
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

const ProfileCover = ({ user, id, setSelectChanges, fetchUserDetails }) => {
  const [creator, setCreator] = useState(null);
  const [confirm, setConfirm] = useState(false);
  const [unselectConfirm, setUnSelectConfirm] = useState(false);

  const [education, setEducation] = useState({
    university: false,
    course: false,
  });

  const [editEducation, setEditEducation] = useState({
    university: false,
    course: false,
  });

  const handleEditEducation = (name) => {
    console.log(name);
    setEditEducation((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleAddEducation = (name) => {
    console.log(name);
    setEducation((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const [educationData, setEducationData] = useState({
    university: user?.university ? user?.university : "",
    course: user?.course ? user?.course : "",
  });

  useEffect(() => {
    setEducationData({
      university: user?.university || "",
      course: user?.course || "",
    });
  }, [user, editEducation]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEducationData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateUniversity = async () => {
    const data = {
      id: id,
      university: educationData.university,
    };

    await axios
      .post(`${URL}/team/edituserdetailsuniversity.php`, data)
      .then((res) => {
        if (res.status === 200) {
          toast.success("User University Updated Successfully");
        } else {
          toast.error("Something went wrong");
        }
        // window.location.reload();
        setEditEducation((prev) => ({ ...prev, university: false }));
        setEducation((prev) => ({ ...prev, university: false }));
        fetchUserDetails();
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateCourse = async () => {
    const data = {
      id: id,
      course: educationData.course,
    };

    await axios
      .post(`${URL}/team/edituserdetailscourse.php`, data)
      .then((res) => {
        if (res.status === 200) {
          toast.success("User Course Updated Successfully");
        } else {
          toast.error("Something went wrong");
        }
        // window.location.reload();
        setEditEducation((prev) => ({ ...prev, course: false }));
        setEducation((prev) => ({ ...prev, course: false }));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(`${URL}/team/pmdetails.php?pm_id=${user?.account_created_by}`)
      .then((res) => {
        setCreator(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);

  const auth = useSelector(selectAuth);

  console.log(auth);

  // const handleChatCreate = () => {
  //   const data = {
  //     created_by_id: auth?.teamData.id,
  //     user_id: id,
  //   };

  //   axios
  //     .post(`${URL}/team/createpersonalchatstudent.php`, data)
  //     .then((res) => {
  //       console.log(res.data.chat_id);
  //       toast.success(res.data.message);
  //       navigate(`/team/dashboards/chats?chat_id=${res?.data.chat_id}&type=TeamandStudentPersonal&new_chat=new`);
  //     })
  //     .catch((err) => console.log(err));
  // };

  // const handleGoToChat = () => {
  //   user?.chats?.map((item) => {
  //     navigate(`/team/dashboards/chats?chat_id=${item?.chat_id}&type=TeamandStudentPersonal`);
  //   });
  // };

  const handleSelectApi = async () => {
    const data = {
      student_id: id,
      team_id: auth?.teamData?.id,
    };

    await axios
      .post(`${URL}/team/studentaddtoselect.php`, data)
      .then((res) => {
        if (res.status === 200) {
          toast.success("User has become SELECT Member");
          setConfirm(false);
          setSelectChanges((prev) => !prev);
        } else {
          toast.error("Something went wrong");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleUnSelectApi = async () => {
    const data = {
      student_id: id,
      team_id: auth?.teamData?.id,
    };

    await axios
      .post(`${URL}/team/studentremovefromselect.php`, data)
      .then((res) => {
        if (res.status === 200) {
          toast.success("User has been removed from SELECT");
          setUnSelectConfirm(false);
          setSelectChanges((prev) => !prev);
        } else {
          toast.error("Something went wrong");
        }
      })
      .catch((err) => console.log(err));
  };

  function copyTextFn(message) {
    var copyText = document.getElementById("referral_code");

    navigator.clipboard.writeText(copyText.textContent);

    toast.success("Copied!");
  }

  return (
    <React.Fragment>
      <Box display="flex">
        <Tooltip arrow placement="top" title="User Id ">
          <IconButton color="primary" sx={{ mr: 2 }}>
            <Grid3x3TwoToneIcon />
            <Typography variant="h1" component="h1" gutterBottom>
              {id}
            </Typography>
          </IconButton>
        </Tooltip>
        <Box className="flex items-center">
          <Typography
            variant="h2"
            component="h2"
            gutterBottom
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <span>Profile of</span>
            <Typography variant="h3" color="primary">
              {user?.firstname} {user?.lastname}
            </Typography>
          </Typography>
        </Box>
      </Box>
      <CardCover>
        <CardMedia image={coverImg} />
      </CardCover>
      <AvatarWrapper>
        <Avatar variant="rounded" alt={user?.firstname} src={user?.firstname} />
      </AvatarWrapper>
      <div className="float-right mt-6 text-xl font-bold">
        <span>Referral Code :&nbsp;</span>
        <button onClick={copyTextFn}  id="referral_code">{user?.affiliate_code}</button>
      </div>
      <Box py={2} pl={2} mb={3}>
        <Typography component={"a"} href={`mailto:${user?.email}`} variant="h4">
          <EmailTwoToneIcon color="primary" sx={{ mr: 1 }} />
          {user?.email}{" "}
          {user?.email_verified === "1" ? (
            <Label color="success">
              <DoneTwoToneIcon fontSize="small" />
              <b>Verified</b>
            </Label>
          ) : null}
        </Typography>
        <Typography
          sx={{ py: 2 }}
          variant="subtitle2"
          color="text.primary"
          className="flex flex-wrap gap-6 items-center"
        >
          <a
            href={`tel:${user?.number}`}
            className="text-decoration-none cursor-pointer"
          >
            <LocalPhoneIcon color="primary" sx={{ mr: 1 }} /> {user?.number}
          </a>{" "}
          |
          <a
            href={`
             https://wa.me/${user?.country_code}${
               user?.number
             }?text=${encodeURIComponent(
               `Hey ${user?.firstname} ${user?.lastname},\nGreetings from Bluepen.co.in. This message is in regards to your application for academic writer as a freelancer in Bluepen. Is it a good time to talk to you?`
             )}
           `}
            className="text-decoration-none cursor-pointer"
          >
            <WhatsAppIcon color="success" sx={{ mx: 1 }} />
            {user?.number}
          </a>{" "}
          |
          {user?.gender === "Male" ? (
            <MaleIcon color="secondary" sx={{ ml: 1 }} />
          ) : (
            <FemaleIcon color="secondary" sx={{ ml: 1 }} />
          )}{" "}
          {user?.gender}
          {auth?.teamDomain === "Admin" ? (
            user?.is_select === "1" ? (
              <Button
                className="flex items-center justify-center  px-4 py-2 mb-3 text-md font-bold text-white goldCard rounded-lg md:w-auto md:mr-3 md:mb-0 focus:outline-none"
                onClick={() => setUnSelectConfirm(true)}
              >
                Remove From SELECT
              </Button>
            ) : (
              <Button
                className="flex items-center justify-center  px-4 py-2 mb-3 text-md font-bold text-white goldCard rounded-lg md:w-auto md:mr-3 md:mb-0 focus:outline-none"
                onClick={() => setConfirm(true)}
              >
                Make this a SELECT account
              </Button>
            )
          ) : (
            user?.is_select === "1" && (
              <Button className="flex items-center justify-center  px-4 py-2 mb-3 text-md font-bold text-white goldCard rounded-lg md:w-auto md:mr-3 md:mb-0 focus:outline-none">
                SELECT
              </Button>
            )
          )}
          <br />
          <Box>
            {user?.addition_date && (
              <Typography
                sx={{ py: 2 }}
                variant="subtitle2"
                color="text.primary"
                className="flex flex-wrap gap-2 items-center"
              >
                <b>Addition Date : </b>
                {moment(user?.addition_date, "DD-MM-YYYY HH:mm:ss").format(
                  "Do MMMM YYYY"
                )}
              </Typography>
            )}

            {user?.expiry_date && (
              <Typography
                sx={{ py: 2 }}
                variant="subtitle2"
                color="text.primary"
                className="flex flex-wrap gap-4 items-center"
              >
                <b>Expiry Date : </b>
                {moment(user?.expiry_date, "DD-MM-YYYY HH:mm:ss").format(
                  "Do MMMM YYYY"
                )}
              </Typography>
            )}
          </Box>
        </Typography>
        <Typography component={"p"} variant="h4">
          <CreateIcon color="primary" sx={{ mr: 1 }} />
          Created By : &nbsp;
          {user?.account_created_by != "student"
            ? (creator?.length > 0 && creator?.map((item) => item.name)) ||
              "Not Defined"
            : user?.account_created_by}
          {/* {user?.chats?.length ? (
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
        </Typography>
        <br />

        {user?.university ? (
          <Typography component={"p"} variant="h4" className="mt-5 mb-5">
            <SchoolIcon color="primary" sx={{ mr: 1 }} /> University{" "}
            <EditIcon
              className="cursor-pointer"
              color="secondary"
              sx={{ ml: 5, mr: 1 }}
              onClick={() => handleEditEducation("university")}
            />
            {!editEducation.university ? (
              <div className="ml-8 mt-5">{user?.university}</div>
            ) : (
              <>
                {" "}
                <div className="ml-8 mt-5">
                  <TextField
                    name="university"
                    type="text"
                    placeholder="Enter your university"
                    onChange={handleChange}
                    className="w-[100%]"
                    value={educationData.university}
                  />{" "}
                </div>
                <br />
                <div className="ml-8 flex gap-2 items-center">
                  <Button
                    className="bg-blue-800  flex items-center justify-center  px-4 py-2 mb-3 text-md font-bold text-white rounded-lg md:w-auto md:mr-3 md:mb-0 focus:outline-none"
                    onClick={handleUpdateUniversity}
                  >
                    Update
                  </Button>
                  <Button
                    className="bg-red-800  flex items-center justify-center  px-4 py-2 mb-3 text-md font-bold text-white rounded-lg md:w-auto md:mr-3 md:mb-0 focus:outline-none"
                    onClick={() => handleEditEducation("university")}
                  >
                    Close
                  </Button>
                </div>
              </>
            )}
          </Typography>
        ) : (
          !education.university && (
            <Button
              className="bg-blue141  flex items-center justify-center  px-4 py-2 mb-5 mt-5 text-md font-bold text-white rounded-lg md:w-auto md:mr-3 md:mb-5 focus:outline-none "
              onClick={() => handleAddEducation("university")}
            >
              Add University +
            </Button>
          )
        )}

        {education.university && (
          <Typography component={"p"} variant="h4" className="mt-5 mb-5">
            <SchoolIcon color="primary" sx={{ mr: 1 }} /> University{" "}
            {/* <EditIcon
              className="cursor-pointer"
              color="secondary"
              sx={{ ml: 5, mr: 1 }}
              onClick={() => handleAddEducation("university")}
            />{" "} */}
            <div className="ml-8 mt-5">
              <TextField
                name="university"
                type="text"
                placeholder="Enter your university"
                onChange={handleChange}
                className="w-[100%]"
                value={educationData.university}
              />{" "}
            </div>
            <br />
            <div className="ml-8 flex gap-2 items-center">
              <Button
                className="bg-blue-800  flex items-center justify-center  px-4 py-2 mb-3 text-md font-bold text-white rounded-lg md:w-auto md:mr-3 md:mb-0 focus:outline-none"
                onClick={handleUpdateUniversity}
              >
                Update
              </Button>
              <Button
                className="bg-red-800  flex items-center justify-center  px-4 py-2 mb-3 text-md font-bold text-white rounded-lg md:w-auto md:mr-3 md:mb-0 focus:outline-none"
                onClick={() => handleAddEducation("university")}
              >
                Close
              </Button>
            </div>
          </Typography>
        )}

        {user?.course ? (
          <Typography component={"p"} variant="h4" className="mt-5 mb-5">
            <HistoryEduIcon color="primary" sx={{ mr: 1 }} /> Course{" "}
            <EditIcon
              className="cursor-pointer"
              color="secondary"
              sx={{ ml: 5, mr: 1 }}
              onClick={() => handleEditEducation("course")}
            />
            {!editEducation.course ? (
              <div className="ml-8 mt-5">{user?.course}</div>
            ) : (
              <>
                <div className="ml-8 mt-5">
                  <TextField
                    name="course"
                    type="text"
                    placeholder="Enter your course"
                    className="w-[100%]"
                    onChange={handleChange}
                    value={educationData.course}
                  />{" "}
                </div>
                <br />
                <div className="ml-8 flex gap-2 items-center">
                  <Button
                    className="bg-blue-800  flex items-center justify-center  px-4 py-2 mb-3 text-md font-bold text-white rounded-lg md:w-auto md:mr-3 md:mb-0 focus:outline-none"
                    onClick={handleUpdateCourse}
                  >
                    Update
                  </Button>
                  <Button
                    className="bg-red-800  flex items-center justify-center  px-4 py-2 mb-3 text-md font-bold text-white rounded-lg md:w-auto md:mr-3 md:mb-0 focus:outline-none"
                    onClick={() => handleEditEducation("course")}
                  >
                    Close
                  </Button>
                </div>
              </>
            )}
          </Typography>
        ) : (
          !education.course && (
            <Button
              className="bg-blue141  flex items-center justify-center  px-4 py-2 mb-5 mt-5 text-md font-bold text-white rounded-lg md:w-auto md:mr-3 md:mb-5 focus:outline-none"
              onClick={() => handleAddEducation("course")}
            >
              Add Course +
            </Button>
          )
        )}

        {education.course && (
          <Typography component={"p"} variant="h4" className="mt-5 mb-5">
            <HistoryEduIcon color="primary" sx={{ mr: 1 }} /> Course{" "}
            {/* <EditIcon
              className="cursor-pointer"
              color="secondary"
              sx={{ ml: 5, mr: 1 }}
              onClick={() => handleEditEducation("course")}
            /> */}
            <div className="ml-8 mt-5">
              <TextField
                name="course"
                type="text"
                placeholder="Enter your course"
                className="w-[100%]"
                onChange={handleChange}
                value={educationData.course}
              />{" "}
            </div>
            <br />
            <div className="ml-8 flex gap-2 items-center">
              <Button
                className="bg-blue-800  flex items-center justify-center  px-4 py-2 mb-3 text-md font-bold text-white rounded-lg md:w-auto md:mr-3 md:mb-0 focus:outline-none"
                onClick={handleUpdateCourse}
              >
                Update
              </Button>
              <Button
                className="bg-red-800  flex items-center justify-center  px-4 py-2 mb-3 text-md font-bold text-white rounded-lg md:w-auto md:mr-3 md:mb-0 focus:outline-none"
                onClick={() => handleAddEducation("course")}
              >
                Close
              </Button>
            </div>
          </Typography>
        )}
      </Box>
      <Dialog open={confirm} onClose={() => setConfirm(false)}>
        <DialogTitle>
          Are You Sure You Want to make this account SELECT ?
        </DialogTitle>
        <div className="flex items-center justify-end gap-[5px] p-2 h-[100px]">
          <DialogActions>
            <Button
              className="bg-blue141  flex items-center justify-center  px-4 py-2 mb-3 text-md font-bold text-white goldCard rounded-lg md:w-auto md:mr-3 md:mb-0 focus:outline-none"
              onClick={handleSelectApi}
            >
              Confirm
            </Button>
          </DialogActions>
          <DialogActions>
            <Button onClick={() => setConfirm(false)}>Close</Button>
          </DialogActions>
        </div>
      </Dialog>
      <Dialog open={unselectConfirm} onClose={() => setUnSelectConfirm(false)}>
        <DialogTitle>
          Are You Sure You Want to remove this account from SELECT ?
        </DialogTitle>
        <div className="flex items-center justify-end gap-[5px] p-2 h-[100px]">
          <DialogActions>
            <Button
              className="bg-blue141  flex items-center justify-center  px-4 py-2 mb-3 text-md font-bold text-white goldCard rounded-lg md:w-auto md:mr-3 md:mb-0 focus:outline-none"
              onClick={handleUnSelectApi}
            >
              Confirm
            </Button>
          </DialogActions>
          <DialogActions>
            <Button onClick={() => setUnSelectConfirm(false)}>Close</Button>
          </DialogActions>
        </div>
      </Dialog>
    </React.Fragment>
  );
};

ProfileCover.propTypes = {
  // @ts-ignore
  user: PropTypes.object.isRequired,
};

export default ProfileCover;
