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

export default function Checklist({
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
    resit: false,
  });
  const navigate = useNavigate();

  const handleOpen = (value) => {
    if (value === "setting") {
      setOpen((prev) => ({ ...prev, setting: true }));
    } else if (value === "reason") {
      setOpen((prev) => ({ ...prev, reason: true }));
    } else if (value === "delete") {
      setOpen((prev) => ({ ...prev, delete: true }));
    } else if (value === "resit") {
      setOpen((prev) => ({ ...prev, resit: true }));
    }
  };

  const handleClose = (value) => {
    if (value === "setting") {
      setOpen((prev) => ({ ...prev, setting: false }));
    } else if (value === "reason") {
      setOpen((prev) => ({ ...prev, reason: false }));
    } else if (value === "delete") {
      setOpen((prev) => ({ ...prev, delete: false }));
    } else if (value === "resit") {
      setOpen((prev) => ({ ...prev, resit: false }));
    }
  };

  const [loading, setLoading] = useState({
    posted: false,
    under_process: false,
    assigned_to_pm: false,
    assigned_to_freelancer: false,
    completed: false,
    review_received: false,
    reset: false,
    lost: false,
    delete: false,
    resit: false,
  });
  const [assignmentStatus, setAssignmentStatus] = useState({
    posted: assignmentDetails?.posted === "1" ? true : false,
    under_process: assignmentDetails?.under_process === "1" ? true : false,
    assigned_to_pm: assignmentDetails?.assigned_to_pm === "1" ? true : false,
    assigned_to_freelancer:
      assignmentDetails?.assigned_to_freelancer === "1" ? true : false,
    completed: assignmentDetails?.completed === "1" ? true : false,
    review_received: assignmentDetails?.review_received === "1" ? true : false,
    resit: assignmentDetails?.resit === "1" ? true : false,
  });

  const handleUnderProcess = async () => {
    setLoading({ ...loading, under_process: true });
    try {
      const response = await axios.get(
        `${URL}/team/assignmentstatusunderprocess.php?id=${id}`
      );
      toast.success(response.data.message);
      setAssignmentStatus({
        ...assignmentStatus,
        under_process: !assignmentStatus.under_process,
      });
      fetchAssignmentDetails();
    } catch (error) {
      toast.error("Couldn't update assignment status");
    }
    setLoading({ ...loading, under_process: false });
  };

  const handleAssignedToPm = async () => {
    setLoading({ ...loading, assigned_to_pm: true });
    try {
      const response = await axios.get(
        `${URL}/team/assignmentstatusassignedtopm.php?id=${id}`
      );
      toast.success(response.data.message);
      setAssignmentStatus({
        ...assignmentStatus,
        assigned_to_pm: !assignmentStatus.assigned_to_pm,
      });
      fetchAssignmentDetails();
    } catch (error) {
      toast.error("Couldn't update assignment status");
    }
    setLoading({ ...loading, assigned_to_pm: false });
  };

  const handleAssignedToFreelancer = async () => {
    setLoading({ ...loading, assigned_to_freelancer: true });
    try {
      const response = await axios.get(
        `${URL}/team/assignmentstatusassignedtofreelancer.php?id=${id}`
      );
      toast.success(response.data.message);
      setAssignmentStatus({
        ...assignmentStatus,
        assigned_to_freelancer: !assignmentStatus.assigned_to_freelancer,
      });
      fetchAssignmentDetails();
    } catch (error) {
      toast.error("Couldn't update assignment status");
    }
    setLoading({ ...loading, assigned_to_freelancer: false });
  };

  const handleCompleted = async () => {
    setLoading({ ...loading, completed: true });
    try {
      const response = await axios.get(
        `${URL}/team/assignmentstatuscompleted.php?id=${id}`
      );
      toast.success(response.data.message);
      setAssignmentStatus({
        ...assignmentStatus,
        completed: !assignmentStatus.completed,
      });
      fetchAssignmentDetails();
    } catch (error) {
      toast.error("Couldn't update assignment status");
    }
    setLoading({ ...loading, completed: false });
  };

  const handleReviewReceived = async () => {
    setLoading({ ...loading, review_received: true });
    try {
      const response = await axios.get(
        `${URL}/team/assignmentstatusreviewreceived.php?id=${id}`
      );
      toast.success(response.data.message);
      setAssignmentStatus({
        ...assignmentStatus,
        review_received: !assignmentStatus.review_received,
      });
      fetchAssignmentDetails();
    } catch (error) {
      toast.error("Couldn't update assignment status");
    }
    setLoading({ ...loading, review_received: false });
  };

  const handleResetStatus = async () => {
    setLoading({ ...loading, reset: true });
    try {
      const response = await axios.get(
        `${URL}/team/assignmentreset.php?assignment_id=${id}`
      );
      toast.success(response.data.message);

      fetchAssignmentDetails();
    } catch (error) {
      toast.error("Couldn't reset assignment");
    }
    setLoading({ ...loading, reset: false });
    handleClose("setting");
  };

  const handleResitStatus = async () => {
    setLoading({ ...loading, resit: true });
    try {
      const response = await axios.put(
        `${URL}/team/assignmentstatusresit.php?id=${id}`
      );
      toast.success(response.data.message);

      console.log(response);
      handleClose("resit");
      fetchAssignmentDetails();
    } catch (error) {
      toast.error("Couldn't reset assignment");
    }
    setLoading({ ...loading, resit: false });
    handleClose("setting");
  };

  const [declare, setDeclare] = useState({
    reason: "",
    lost: false,
  });

  const handleDeclareLost = async () => {
    setLoading({ ...loading, lost: true });
    const reason = declare.reason;
    try {
      const response = await axios.post(`${URL}/team/assignmentlost.php`, {
        assignment_id: id,
        reason,
      });
      console.log(response);
      toast.success(response.data.message);
      // setDeclare((prev) => ({ ...prev, reason: response.data.reason }));
      // localStorage.setItem("lost", "lost");
      fetchAssignmentDetails();
      setDeclare((prev) => ({ ...prev, lost: true }));
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
      fetchAssignmentDetails();
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
      posted: assignmentDetails?.posted === "1" ? true : false,
      under_process: assignmentDetails?.under_process === "1" ? true : false,
      assigned_to_pm: assignmentDetails?.assigned_to_pm === "1" ? true : false,
      assigned_to_freelancer:
        assignmentDetails?.assigned_to_freelancer === "1" ? true : false,
      completed: assignmentDetails?.completed === "1" ? true : false,
      review_received:
        assignmentDetails?.review_received === "1" ? true : false,
    });
  }, [assignmentDetails]);

  return (
    <Box>
      <Box className="flex flex-row-reverse justify-between gap-5">
        <Typography variant="h4" style={{ color: "#f44336" }}>
          {assignmentDetails?.lost === "1" ? "Lost" : null}
        </Typography>
        <CardHeader
          sx={{
            px: 0,
            pt: 0,
            display: "flex",
            gap: "25px",
          }}
          action={
            <Box className="flex items-center gap-1">
              <IconButton
                ref={ref}
                onClick={() => handleOpen("setting")}
                size="small"
                color="primary"
              >
                <MoreVertTwoToneIcon />
              </IconButton>
              {assignmentDetails.resit === "1" ? (
                <Typography
                  variant="outlined"
                  className="font-bold text-xl text-orange-600 ml-4"
                >
                  Resit
                </Typography>
              ) : (
                <Button variant="outlined" onClick={() => handleOpen("resit")}>
                  Resit
                </Button>
              )}
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
              {loading.posted ? (
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
                        assignmentStatus?.posted ||
                        empArray.includes(auth?.teamDomain) ||
                        assignmentDetails?.resit === "1"
                      }
                      checked={assignmentStatus?.posted}
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
              {loading.under_process ? (
                <span className="flex items-center justify-start">
                  <CircularProgress size={20} />
                  <span style={{ marginLeft: "10px" }}>Under Process</span>
                </span>
              ) : (
                <FormControlLabel
                  control={
                    <CheckboxWrapper
                      color="primary"
                      disabled={
                        assignmentStatus?.under_process ||
                        empArray.includes(auth?.teamDomain) ||
                        assignmentDetails?.resit === "1"
                      }
                      checked={assignmentStatus?.under_process}
                      name="checkedC"
                      onChange={() => handleUnderProcess()}
                      inputprops={{ "aria-label": "controlled" }}
                      sx={{
                        " &.Mui-disabled": {
                          color: "#0047AB",
                        },
                      }}
                    />
                  }
                  label="Under Process"
                />
              )}
            </FormGroup>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="primary">
              <AccountTreeTwoToneIcon />
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
              Project Management
            </Typography>
            <FormGroup>
              {loading.assigned_to_pm ? (
                <span className="flex items-center justify-start">
                  <CircularProgress size={20} />
                  <span style={{ marginLeft: "10px" }}>Assigned to PM</span>
                </span>
              ) : (
                <FormControlLabel
                  control={
                    <CheckboxWrapper
                      disabled={
                        assignmentStatus?.assigned_to_pm ||
                        empArray.includes(auth?.teamDomain) ||
                        assignmentDetails?.resit === "1"
                      }
                      checked={assignmentStatus?.assigned_to_pm}
                      color="primary"
                      name="checkedC"
                      onChange={() => handleAssignedToPm()}
                      inputprops={{ "aria-label": "controlled" }}
                      sx={{
                        " &.Mui-disabled": {
                          color: "#0047AB",
                        },
                      }}
                    />
                  }
                  label="Assigned to PM"
                />
              )}
              {loading.assigned_to_freelancer ? (
                <span className="flex items-center justify-start">
                  <CircularProgress size={20} />
                  <span style={{ marginLeft: "10px" }}>
                    Assigned to Freelancer
                  </span>
                </span>
              ) : (
                <FormControlLabel
                  control={
                    <CheckboxWrapper
                      disabled={
                        assignmentStatus?.assigned_to_freelancer ||
                        empArray.includes(auth?.teamDomain) ||
                        assignmentDetails?.resit === "1"
                      }
                      checked={assignmentStatus?.assigned_to_freelancer}
                      onChange={() => handleAssignedToFreelancer()}
                      color="primary"
                      name="checkedC"
                      inputprops={{ "aria-label": "controlled" }}
                      sx={{
                        " &.Mui-disabled": {
                          color: "#0047AB",
                        },
                      }}
                    />
                  }
                  label="Assigned to Freelancer"
                />
              )}
            </FormGroup>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="primary">
              <BusinessCenterTwoToneIcon />
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
              Assignment Completion
            </Typography>
            <FormGroup>
              {loading.completed ? (
                <span className="flex items-center justify-start">
                  <CircularProgress size={20} />
                  <span style={{ marginLeft: "10px" }}>Completed</span>
                </span>
              ) : (
                <FormControlLabel
                  control={
                    <CheckboxWrapper
                      disabled={
                        assignmentStatus?.completed ||
                        empArray.includes(auth?.teamDomain) ||
                        assignmentDetails?.resit === "1"
                      }
                      checked={assignmentStatus?.completed}
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
              {loading.review_received ? (
                <span className="flex items-center justify-start">
                  <CircularProgress size={20} />
                  <span style={{ marginLeft: "10px" }}>Review Received</span>
                </span>
              ) : (
                <FormControlLabel
                  control={
                    <CheckboxWrapper
                      disabled={
                        assignmentStatus?.review_received ||
                        empArray.includes(auth?.teamDomain) ||
                        assignmentDetails?.resit === "1"
                      }
                      checked={assignmentStatus?.review_received}
                      color="primary"
                      name="checkedC"
                      onChange={() => handleReviewReceived()}
                      inputprops={{ "aria-label": "controlled" }}
                      sx={{
                        " &.Mui-disabled": {
                          color: "#0047AB",
                        },
                      }}
                    />
                  }
                  label="Review Received"
                />
              )}
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
              <span style={{ marginLeft: "10px" }}>Reset</span>
            </>
          ) : (
            <span>Reset</span>
          )}
        </MenuItem>
        <MenuItem
          sx={{ px: 3 }}
          onClick={() => {
            handleOpen("delete");
          }}
        >
          {/* {loading.delete ? (
            <>
              <CircularProgress size={20} />
              <span style={{ marginLeft: "10px" }}>Deleting...</span>
            </>
          ) : ( */}
          <span style={{ color: "#f44336" }}> Delete</span>
          {/* )} */}
        </MenuItem>
        <MenuItem
          sx={{ px: 3 }}
          onClick={() => {
            if (!declare?.lost) {
              handleOpen("reason");
            }
          }}
        >
          <span style={{ color: "#918EF4" }}>
            {assignmentDetails?.lost == "1" ? "Lost" : "Declare Lost"}
          </span>
        </MenuItem>
      </Menu>

      <Dialog open={isOpen.resit} onClose={() => handleClose("resit")}>
        <DialogTitle>
          Are You Sure You Want to Set Assignment to Resit ?
        </DialogTitle>
        <div className="flex items-center justify-end gap-[5px] p-2 h-[100px]">
          <DialogActions>
            <Button
              className="bg-blue141 text-white"
              onClick={() => {
                handleResitStatus();
              }}
            >
              Confirm
            </Button>
          </DialogActions>
          <DialogActions>
            <Button onClick={() => handleClose("resit")}>Close</Button>
          </DialogActions>
        </div>
      </Dialog>
      <Dialog open={isOpen.reason} onClose={() => handleClose("reason")}>
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
      </Dialog>
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
