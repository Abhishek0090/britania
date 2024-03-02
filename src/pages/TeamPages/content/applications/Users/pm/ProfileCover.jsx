import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Avatar,
  Box,
  Typography,
  Tooltip,
  Button,
  IconButton,
  CardMedia,
  Modal,
  Fade,
  Card,
} from "@mui/material";
import EmailTwoToneIcon from "@mui/icons-material/EmailTwoTone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import Grid3x3TwoToneIcon from "@mui/icons-material/Grid3x3TwoTone";
import coverImg from "~/assets/cool-background.png";
import Label from "~/pages/TeamPages/components/Label";
import Text from "~/pages/TeamPages/components/Text";
import DoneTwoToneIcon from "@mui/icons-material/DoneTwoTone";
import { AvatarWrapper, CardCover } from "~/utils/CustomStyles";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { URL } from "~/utils/BaseURL";
import { setAllChatCreate } from "~/features/team/Chats/ChatSlice";
import { selectAuth } from "~/features/auth/authSlice";
import toast from "react-hot-toast";
import { LucideLogIn, LucideMessageCircle } from "lucide-react";

const ProfileCover = ({ user, id }) => {
  console.log(user);
  const navigate = useNavigate();
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();

  const handleChatCreate = () => {
    const data = {
      created_by_id: auth?.teamData.id,
      member_id: id,
    };

    console.log(data);

    axios
      .post(`${URL}/team/createpersonalchatteam.php`, data)
      .then((res) => {
        console.log(res.data);
        console.log(res.data.chat_id)
        toast.success(res.data.message);
        navigate(
          `/team/dashboards/chats?chat_id=${res.data.chat_id}&type=TeamPersonal&new_chat=new`
        );
      })
      .catch((err) => console.log(err));
  };

  const handleGoToChat = () => {
    user?.chat?.map((item) => {
      navigate(
        `/team/dashboards/chats?chat_id=${item?.chat_id}&type=TeamPersonal`
      );
    });
  };

  return (
    <>
      <Box display="flex">
        <Tooltip arrow placement="top" title="User Id ">
          <IconButton color="primary" sx={{ mr: 2 }}>
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
        <Avatar variant="rounded" alt={user?.name} src={user?.name} />
      </AvatarWrapper>

      <Box py={2} pl={2} mb={3}>
        <Typography
          component={"a"}
          href={`mailto:${user?.email_old}`}
          variant="h4"
        >
          <EmailTwoToneIcon color="primary" sx={{ mr: 1 }} />
          {user?.email_old}
        </Typography>
        <Text color="black">
          <b>
            {user?.status === "Active" ? (
              <Label color="success">Active</Label>
            ) : null}
            {user?.status === "InActive" ? (
              <Label color="error">Inactive</Label>
            ) : null}
          </b>
        </Text>

        <Typography sx={{ py: 2 }} variant="subtitle2" color="text.primary">
          <a
            href={`tel:${user?.number}`}
            className="text-decoration-none cursor-pointer"
          >
            <LocalPhoneIcon color="primary" sx={{ mr: 1 }} /> {user?.number}
          </a>{" "}
          |
          <a
            href={`https://wa.me/${91}${
              user?.number_whatsapp
            }?text=Hi%20I%20am%20interested%20in%20your%20services%20and%20would%20like%20to%20know%20more%20about%20it.`}
            className="text-decoration-none cursor-pointer"
          >
            <WhatsAppIcon color="success" sx={{ mx: 1 }} />
            {user?.number_whatsapp}
          </a>{" "}
          |
          {user?.role === "admin" ? (
            <AdminPanelSettingsIcon color="secondary" sx={{ ml: 1 }} />
          ) : (
            <SupervisorAccountIcon color="secondary" sx={{ ml: 1 }} />
          )}{" "}
          {user?.role?.toUpperCase()}
          {/* {user?.chat?.length > 0 ? (
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

        {user?.is_technical === "1" ? (
          <Label color="primary">
            <DoneTwoToneIcon fontSize="small" />
            <b>Technical</b>
          </Label>
        ) : null}
        {user?.is_non_technical === "1" ? (
          <Label
            color="primary"
            sx={{
              mx: 1,
            }}
          >
            <DoneTwoToneIcon fontSize="small" />
            <b>Non Technical</b>
          </Label>
        ) : null}
      </Box>
    </>
  );
};

export default ProfileCover;
