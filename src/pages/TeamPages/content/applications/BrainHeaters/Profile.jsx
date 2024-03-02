import { useNavigate } from "react-router-dom";
import {
  Typography,
  Tooltip,
  Rating,
  IconButton,
  Divider,
  Box,
  ListItem,
  ListItemText,
  List,
  Avatar,
  useTheme,
} from "@mui/material";
import PhoneTwoToneIcon from "@mui/icons-material/PhoneTwoTone";
import EmailTwoToneIcon from "@mui/icons-material/EmailTwoTone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import moment from "moment";
import { useSelector } from "react-redux";
import { selectAuth } from "~/features/auth/authSlice";

function Profile({ userDetails, id, lostReason }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const auth = useSelector(selectAuth);

  //   console.log(userDetails);

  console.log(lostReason);

  return (
    <>
      <Box>
        <Typography
          onClick={() => {
            navigate(
              `/team/management/student/details-student/${userDetails?.user_id}`
            );
          }}
          sx={{
            cursor: "pointer",
          }}
          align="center"
          variant="h4"
          gutterBottom
        >
          {userDetails?.name}
        </Typography>
        <Typography align="center" variant="subtitle2" gutterBottom>
          Student
        </Typography>

        {/* <Box display="flex" alignItems="center" justifyContent="center">
        <Rating value={4} defaultValue={5} precision={1} readOnly />
        <Typography
          variant="h5"
          sx={{
            pl: 0.5,
          }}
        >
          4.1
        </Typography>
      </Box> */}

        <Box py={2} display="flex" alignItems="center" justifyContent="center">
          <Tooltip arrow placement="top" title="Call">
            <IconButton
              component={"a"}
              href={`tel:${userDetails?.number}`}
              color="primary"
              sx={{
                mx: 0.5,
              }}
            >
              <PhoneTwoToneIcon />
            </IconButton>
          </Tooltip>
          {/* <Tooltip arrow placement="top" title="Send email">
              <IconButton
                component={"a"}
                href={`mailto:${item?.user_email}`}
                color="primary"
                sx={{
                  mx: 0.5,
                }}
              >
                <EmailTwoToneIcon />
              </IconButton>
            </Tooltip> */}
          {/* <Tooltip arrow placement="top" title="Whatsapp">
              <IconButton
                color="success"
                sx={{
                  mx: 0.5,
                }}
              >
                <WhatsAppIcon />
              </IconButton>
            </Tooltip> */}
        </Box>
        <List
          sx={{
            px: 2,
          }}
        >
          {/* <Divider component="li" /> */}
          {/* <ListItem
              sx={{
                py: 1.5,
              }}
            >
              <ListItemText
                primary="Email"
                primaryTypographyProps={{ variant: "subtitle2" }}
              />
              <Typography variant="subtitle2" color="text.primary">
                {item?.user_email}
              </Typography>
            </ListItem> */}

          <ListItem
            sx={{
              py: 1.5,
            }}
          >
            <ListItemText
              primary="Phone Number"
              primaryTypographyProps={{ variant: "subtitle2" }}
            />
            <Typography variant="subtitle2" color="text.primary">
              {userDetails?.number}
            </Typography>
          </ListItem>
        </List>
        <Divider />

        <Box className="flex flex-col gap-5 mt-5">
          {userDetails?.lost_reason && (
            <>
              {" "}
              <Typography variant="h4" style={{ color: "#f44336" }}>
                Lost Reason
              </Typography>
              <Typography
                variant="subtitle2"
                className="flex items-center gap-5"
                color="text.primary"
              >
                <Typography variant="h5">Reason :</Typography>{" "}
                {userDetails?.lost_reason}
              </Typography> 
            </>
          )}
        </Box>
      </Box>
    </>
  );
}

export default Profile;
