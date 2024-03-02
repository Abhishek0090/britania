import { useNavigate } from "react-router-dom";
import {
  Typography,
  Tooltip,
  Rating,
  Button,
  IconButton,
  Divider,
  Box,
  ListItem,
  ListItemText,
  List,
  Avatar,
  useTheme,
  CircularProgress,
  DialogTitle,
  Dialog,
  DialogActions,
} from "@mui/material";
import PhoneTwoToneIcon from "@mui/icons-material/PhoneTwoTone";
import EmailTwoToneIcon from "@mui/icons-material/EmailTwoTone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import moment from "moment";
import { useSelector } from "react-redux";
import { selectAuth } from "~/features/auth/authSlice";
import { useState } from "react";
import axios from "axios";
import { URL } from "~/utils/BaseURL";
import toast from "react-hot-toast";

function Profile({ userDetails, id, lostReason, fetchAssignmentDetails }) {
  console.log(userDetails);

  const theme = useTheme();
  const navigate = useNavigate();
  const auth = useSelector(selectAuth);

  const [loading, setLoading] = useState(false);

  const [confirm, setConfirm] = useState(false);

  const handlePaymentDone = async () => {
    setLoading(true);
    try {
      const resData = await axios.get(
        `${URL}/team/affiliatepaymentupdate.php?id=${id}`
      );

      if (resData?.data?.status === "success") {
        toast.success(resData?.data?.message);
        fetchAssignmentDetails();
        setConfirm(false);
      } else {
        toast.error(resData?.data?.message);
        setConfirm(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("An error occurred while processing the payment.");
    } finally {
      setLoading(false);
      setConfirm(false);
    }
  };

  return (
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
        {userDetails?.user_first_name} {userDetails?.user_last_name}
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
            href={`tel:${userDetails?.user_number}`}
            color="primary"
            sx={{
              mx: 0.5,
            }}
          >
            <PhoneTwoToneIcon />
          </IconButton>
        </Tooltip>
        <Tooltip arrow placement="top" title="Send email">
          <IconButton
            component={"a"}
            href={`mailto:${userDetails?.user_email}`}
            color="primary"
            sx={{
              mx: 0.5,
            }}
          >
            <EmailTwoToneIcon />
          </IconButton>
        </Tooltip>
        <Tooltip arrow placement="top" title="Whatsapp">
          <IconButton
            color="success"
            sx={{
              mx: 0.5,
            }}
          >
            <a
              href={`
                https://wa.me/${userDetails?.user_country_code}${
                  userDetails?.user_number
                }?text=${encodeURIComponent(
                  `Hey ${userDetails?.user_first_name} ${userDetails?.user_last_name},\nGreetings from Bluepen.co.in. Thankyou for registering with us and submitting your requirements. Can we have a discussion about your requirements?`
                )}
              `}
            >
              <WhatsAppIcon />
            </a>
          </IconButton>
        </Tooltip>
      </Box>
      <List
        sx={{
          px: 2,
        }}
      >
        <Divider component="li" />
        <ListItem
          sx={{
            py: 1.5,
          }}
        >
          <ListItemText
            primary="Email"
            primaryTypographyProps={{ variant: "subtitle2" }}
          />
          <Typography variant="subtitle2" color="text.primary">
            {userDetails?.user_email}
          </Typography>
        </ListItem>
        <Divider component="li" />
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
            {userDetails?.user_number}
          </Typography>
        </ListItem>
      </List>

      <Box
        className="flex flex-col gap-5"
        sx={{
          px: 2,
        }}
      >
        {lostReason?.reason && (
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
              {lostReason?.reason}
            </Typography>
            <Typography
              variant="p"
              color="text.primary"
              className="flex items-center gap-5"
            >
              <Typography variant="h5">Lost On :</Typography>{" "}
              {moment(lostReason?.date).format("MMMM Do YYYY, h:mm:ss a")}
            </Typography>
          </>
        )}
      </Box>

      <Box
        className="flex flex-col gap-5"
        sx={{
          px: 2,
        }}
      >
        {userDetails?.affiliate_data?.affiliate_code_by !== null && (
          <>
            {" "}
            <Box className="flex justify-between gap-2 items-center">
              <Typography variant="h4" style={{ color: "green" }}>
                Affiliated Student
              </Typography>
              {userDetails?.affiliate_data?.affiliate_data_paid_on === null && (
                <Button
                  variant="outlined"
                  color="primary"
                  disabled={loading}
                  onClick={() => setConfirm(true)}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Payment Update"
                  )}
                </Button>
              )}
            </Box>
            <Typography
              variant="subtitle2"
              className="flex items-center gap-5"
              color="text.primary"
            >
              <Typography variant="h5">Affiliate by user id :</Typography>{" "}
              {userDetails?.affiliate_data?.affiliate_code_by}
            </Typography>
            <Typography
              variant="subtitle2"
              className="flex items-center gap-5"
              color="text.primary"
            >
              <Typography variant="h5">Affiliate by Student Name :</Typography>{" "}
              {userDetails?.affiliate_data?.affiliate_code_by_name}
            </Typography>
            <Typography
              variant="subtitle2"
              className="flex items-center gap-5"
              color="text.primary"
            >
              <Typography variant="h5">Affiliate Payment Amount :</Typography>{" "}
              {userDetails?.affiliate_data?.affiliate_data_amount}
            </Typography>
            <Typography
              variant="subtitle2"
              className="flex items-center gap-5"
              color="text.primary"
            >
              <Typography variant="h5">Affiliate Status :</Typography>{" "}
              {userDetails?.affiliate_data?.affiliate_data_paid_on === null
                ? "Unpaid"
                : "Paid"}
            </Typography>
          </>
        )}
      </Box>

      <Dialog open={confirm} onClose={() => setConfirm(false)}>
        <DialogTitle>Are You Sure You Want to Update Payment Status ?</DialogTitle>
        <div className="flex items-center justify-end gap-[5px] p-2 h-[100px]">
          <DialogActions>
            <Button
              className="bg-blue141 text-white"
              onClick={() => {
                handlePaymentDone();
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
    </Box>
  );
}

export default Profile;
