import React, { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import {
  Box,
  CardHeader,
  Typography,
  IconButton,
  FormControlLabel,
  FormGroup,
  CircularProgress,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import {
  Button,
  Autocomplete,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material ";
import { Radio, RadioGroup } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { selectAuth } from "~/features/auth/authSlice";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import AssignmentTwoToneIcon from "@mui/icons-material/AssignmentTwoTone";
import AccountTreeTwoToneIcon from "@mui/icons-material/AccountTreeTwoTone";
import BusinessCenterTwoToneIcon from "@mui/icons-material/BusinessCenterTwoTone";
import MoreVertTwoToneIcon from "@mui/icons-material/MoreVertTwoTone";
import { TimelineWrapper, CheckboxWrapper } from "~/utils/CustomStyles";
import { URL } from "~/utils/BaseURL";
import { useNavigate } from "react-router";

export default function CheckList({
  assignmentDetails,
  id,
  fetchAssignmentDetails,
}) {
  const ref = useRef(null);
  const auth = useSelector(selectAuth);
  const empArray = ["Technical hr", "Non-Technical hr"];
  const [isOpen, setOpen] = useState({
    setting: false,
    reason: false,
    delete: false,
  });
  const navigate = useNavigate();

  const handleOpen = (value) => {
    if (value === "setting") {
      setOpen((prev) => ({ ...prev, setting: true }));
    } else if (value === "reason") {
      setOpen((prev) => ({ ...prev, reason: true }));
    } else if (value === "delete") {
      setOpen((prev) => ({ ...prev, delete: true }));
    }
  };

  const handleClose = (value) => {
    if (value === "setting") {
      setOpen((prev) => ({ ...prev, setting: false }));
    } else if (value === "reason") {
      setOpen((prev) => ({ ...prev, reason: false }));
    } else if (value === "delete") {
      setOpen((prev) => ({ ...prev, delete: false }));
    }
  };

  const [loading, setLoading] = useState({
    bh_posted: false,
    bh_likely: false,
    bh_converted: false,
    bh_completed: false,
    reset: false,
    lost: false,
    delete: false,
  });
  const [assignmentStatus, setAssignmentStatus] = useState({
    bh_posted: assignmentDetails?.bh_posted === "1" ? true : false,
    bh_likely: assignmentDetails?.bh_likely === "1" ? true : false,
    bh_converted: assignmentDetails?.bh_converted === "1" ? true : false,
    bh_completed: assignmentDetails?.bh_completed === "1" ? true : false,
  });

  const lostOptions = [
    {
      id: 1,
      reason: "Budget",
    },
    {
      id: 2,
      reason: "Deadline",
    },
    {
      id: 3,
      reason: "Complexity",
    },
    {
      id: 4,
      reason: "Not Interested",
    },
    {
      id: 5,
      reason: "Not able to Contact",
    },
  ];

  const handlePosted = async () => {
    setLoading({ ...loading, bh_posted: true });
    try {
      const response = await axios.get(
        `${URL}/team/assignmentstatusunderprocess.php?id=${id}`
      );
      toast.success(response.data.message);
      setAssignmentStatus({
        ...assignmentStatus,
        bh_posted: !assignmentStatus.bh_posted,
      });
    } catch (error) {
      toast.error("Couldn't update assignment status");
    }
    setLoading({ ...loading, bh_posted: false });
  };

  const handleLikely = async () => {
    setLoading({ ...loading, bh_likely: true });
    try {
      const response = await axios.get(
        `${URL}/team/brainheatersassignmentstatuslikelytoconvert.php?id=${id}`
      );
      toast.success(response.data.message);
      setAssignmentStatus({
        ...assignmentStatus,
        bh_likely: !assignmentStatus.bh_likely,
      });
      fetchAssignmentDetails();
    } catch (error) {
      toast.error("Couldn't update assignment status");
    }
    setLoading({ ...loading, bh_likely: false });
  };

  const handleConverted = async () => {
    setLoading({ ...loading, bh_converted: true });
    try {
      const response = await axios.get(
        `${URL}/team/brainheatersassignmentstatusconverted.php?id=${id}`
      );
      toast.success(response.data.message);
      setAssignmentStatus({
        ...assignmentStatus,
        bh_converted: !assignmentStatus.bh_converted,
      });
      fetchAssignmentDetails();
    } catch (error) {
      toast.error("Couldn't update assignment status");
    }
    setLoading({ ...loading, bh_converted: false });
  };

  const handleCompleted = async () => {
    setLoading({ ...loading, bh_completed: true });
    try {
      const response = await axios.get(
        `${URL}/team/brainheatersassignmentstatuscompleted.php?id=${id}`
      );
      toast.success(response.data.message);
      setAssignmentStatus({
        ...assignmentStatus,
        bh_completed: !assignmentStatus.bh_completed,
      });
      fetchAssignmentDetails();
    } catch (error) {
      toast.error("Couldn't update assignment status");
    }
    setLoading({ ...loading, bh_completed: false });
  };

  const handleResetStatus = async () => {
    setLoading({ ...loading, reset: true });
    try {
      const response = await axios.get(
        `${URL}/team/brainheatersassignmentstatusreset.php?id=${id}`
      );
      toast.success(response.data.message);

      fetchAssignmentDetails();
    } catch (error) {
      toast.error("Couldn't reset assignment");
    }
    setLoading({ ...loading, reset: false });
    handleClose("setting");
  };

  const [declare, setDeclare] = useState({
    reason: "",
    lost: false,
  });

  const handleDeclareLost = async (reason) => {
    setLoading({ ...loading, lost: true });
    try {
      const response = await axios.get(
        `${URL}/team/brainheatersassignmentstatuslost.php?id=${id}&reason=${reason}`
      );  
      toast.success(response.data.message);
      fetchAssignmentDetails();
      // setDeclare((prev) => ({ ...prev, lost: true }));
      handleClose("reason");
      handleClose("setting");
    } catch (error) {
      toast.error("Couldn't declare assignment lost");
    }
    setLoading({ ...loading, lost: false });
  };

  const handleDeleteAssignment = async () => {
    setLoading({ ...loading, delete: true });
    try {
      const response = await axios.post(
        `${URL}/team/assignmentdelete.php?assignment_id=${id}`
      );

      console.log(response);
      toast.success("Assignment Deleted");
      navigate(-1);
      // handleClose(null);
    } catch (error) {
      toast.error("Couldn't Delete the Assignment");
    }
    setLoading({ ...loading, delete: false });
  };
  
  useEffect(() => {
    setAssignmentStatus({
      bh_posted: assignmentDetails?.bh_posted === "1" ? true : false,
      bh_likely: assignmentDetails?.bh_likely === "1" ? true : false,
      bh_converted: assignmentDetails?.bh_converted === "1" ? true : false,
      bh_completed: assignmentDetails?.bh_completed === "1" ? true : false,
    });
  }, [assignmentDetails]);
 

  return (
    <Box>
      <Box className="flex flex-row-reverse justify-between gap-5">
        <Typography variant="h4" style={{ color: "#f44336" }}>
          {assignmentDetails.bh_lost === "1" ? "Lost" : null}
        </Typography>
        <CardHeader
          sx={{
            px: 0,
            pt: 0,
            display: "flex",
            gap: "25px",
          }}
          action={
            <Box>
              <IconButton
                ref={ref}
                onClick={() => handleOpen("setting")}
                size="small"
                color="primary"
              >
                <MoreVertTwoToneIcon />
              </IconButton>
            </Box>
          }
          title="Assignment Status"
        />
      </Box>

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
              Assignment Details
            </Typography>
            <FormGroup>
              {loading.bh_posted ? (
                <span className="flex items-center justify-start">
                  <CircularProgress size={20} />
                  <span style={{ marginLeft: "10px" }}>Posted</span>
                </span>
              ) : (
                <FormControlLabel
                  control={
                    <CheckboxWrapper
                      color="primary"
                      disabled={
                        assignmentStatus?.bh_posted ||
                        empArray.includes(auth?.teamDomain) ||
                        assignmentDetails.bh_lost === "1"
                      }
                      checked={assignmentStatus?.bh_posted}
                      name="checkedC"
                      inputprops={{ "aria-label": "controlled" }}
                      sx={{
                        " &.Mui-disabled": {
                          color: "#0047AB",
                        },
                      }}
                    />
                  }
                  label="Posted"
                />
              )}
            </FormGroup>
            <br />
            <FormGroup>
              {loading.bh_likely ? (
                <span className="flex items-center justify-start">
                  <CircularProgress size={20} />
                  <span style={{ marginLeft: "10px" }}>Likely</span>
                </span>
              ) : (
                <FormControlLabel
                  control={
                    <CheckboxWrapper
                      color="primary"
                      disabled={
                        assignmentStatus?.bh_likely ||
                        empArray.includes(auth?.teamDomain) ||
                        assignmentDetails.bh_lost === "1"
                      }
                      checked={assignmentStatus?.bh_likely}
                      name="checkedC"
                      onChange={() => handleLikely()}
                      inputprops={{ "aria-label": "controlled" }}
                      sx={{
                        " &.Mui-disabled": {
                          color: "#0047AB",
                        },
                      }}
                    />
                  }
                  label="Likely"
                />
              )}
            </FormGroup>
            <br />
            <FormGroup>
              {loading.bh_converted ? (
                <span className="flex items-center justify-start">
                  <CircularProgress size={20} />
                  <span style={{ marginLeft: "10px" }}>Converted</span>
                </span>
              ) : (
                <FormControlLabel
                  control={
                    <CheckboxWrapper
                      disabled={
                        assignmentStatus?.bh_converted ||
                        empArray.includes(auth?.teamDomain) ||
                        assignmentDetails.bh_lost === "1"
                      }
                      checked={assignmentStatus?.bh_converted}
                      color="primary"
                      name="checkedC"
                      onChange={() => handleConverted()}
                      inputprops={{ "aria-label": "controlled" }}
                      sx={{
                        " &.Mui-disabled": {
                          color: "#0047AB",
                        },
                      }}
                    />
                  }
                  label="Converted"
                />
              )}
            </FormGroup>
            <br />
            <FormGroup>
              {loading.bh_completed ? (
                <span className="flex items-center justify-start">
                  <CircularProgress size={20} />
                  <span style={{ marginLeft: "10px" }}>Completed</span>
                </span>
              ) : (
                <FormControlLabel
                  control={
                    <CheckboxWrapper
                      disabled={
                        assignmentStatus?.bh_completed ||
                        empArray.includes(auth?.teamDomain) ||
                        assignmentDetails.bh_lost === "1"
                      }
                      checked={assignmentStatus?.bh_completed}
                      color="primary"
                      name="checked"
                      onChange={() => handleCompleted()}
                      inputprops={{ "aria-label": "controlled" }}
                      sx={{
                        " &.Mui-disabled": {
                          color: "#0047AB",
                        },
                      }}
                    />
                  }
                  label="Completed"
                />
              )}{" "}
            </FormGroup>
          </TimelineContent>
        </TimelineItem>
      </TimelineWrapper>

      <Menu
        anchorEl={ref.current}
        onClose={() => handleClose("setting")}
        open={isOpen.setting}
      >
        <MenuItem
          sx={{ px: 3 }}
          onClick={() => {
            handleResetStatus();
          }}
        >
          {loading.reset ? (
            <>
              <CircularProgress size={20} />
              <span style={{ marginLeft: "10px", color: "red" }}>Reset</span>
            </>
          ) : (
            <span>Reset</span>
          )}
        </MenuItem>
        <MenuItem
          sx={{ px: 3 }}
          onClick={() => {
            if (!declare.lost) {
              handleOpen("reason");
            }
          }}
        >
          <span
            style={{
              color: assignmentDetails.bh_lost == "1" ? "red" : "#918EF4",
            }}
          >
            {assignmentDetails.bh_lost == "1" ? "Lost" : "Declare Lost"}
          </span>
        </MenuItem>
      </Menu>

      <Menu
        anchorEl={ref.current}
        onClose={() => handleClose("reason")}
        open={isOpen.reason}
      >
        {lostOptions?.map((item, index) => (
          <MenuItem
            sx={{ px: 3 }}
            onClick={() => {
              handleDeclareLost(item?.reason);
            }}
          >
            {item?.reason}
          </MenuItem>
        ))}
      </Menu>

      {/* <Dialog open={isOpen.reason} onClose={() => handleClose("reason")}>
        <DialogTitle>Enter Reason for Declaring Lost </DialogTitle>
        <DialogContent component="form" className="p-[20px]">
          <TextField
            value={declare.reason}
            onChange={(e) =>
              setDeclare((prev) => ({ ...prev, reason: e.target.value }))
            }
            autoFocus
            margin="dense"
            id="reason"
            name="reason"
            label="Reason"
            type="text"
            className="w-[500px]"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <div className="flex justify-end">
          <DialogActions>
            <Button
              className="bg-blue141 text-white"
              onClick={() => {
                handleDeclareLost();
              }}
            >
              Submit
            </Button>
          </DialogActions>
          <DialogActions>
            <Button onClick={() => handleClose("reason")}>Close</Button>
          </DialogActions>
        </div>
      </Dialog> */}
      <Dialog open={isOpen.delete} onClose={() => handleClose("delete")}>
        <DialogTitle>Are You Sure You Want to Delete Assignment ?</DialogTitle>
        <div className="flex items-center justify-end gap-[5px] p-2 h-[100px]">
          <DialogActions>
            <Button
              className="bg-blue141 text-white"
              onClick={() => {
                handleDeleteAssignment();
              }}
            >
              Confirm
            </Button>
          </DialogActions>
          <DialogActions>
            <Button onClick={() => handleClose("delete")}>Close</Button>
          </DialogActions>
        </div>
      </Dialog>
    </Box>
  );
}
