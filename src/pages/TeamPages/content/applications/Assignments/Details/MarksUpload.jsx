import React, { useState } from "react";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import { selectAuth } from "~/features/auth/authSlice";
import { useSelector } from "react-redux";
import { URL } from "~/utils/BaseURL";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";
import { Box, Typography, TextField } from "@mui/material";
import toast from "react-hot-toast";

const MarksUpload = ({
  handleUploadOpen,
  handleUploadClose,
  marksOpen,
  fetchAssignmentDetails,
  assignment_id,
  alreadyMarks,
}) => {
  const auth = useSelector(selectAuth);
  const [loading, setLoading] = useState(false);
  const [marksDetails, setMarksDetails] = useState({
    assignment_id,
    marks_obtained: null,
    marks_out_of: null,
    feedback: null,
    team_id: auth?.teamData?.id,
  });

  const handleChange = (e) => {
    setMarksDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleMarksUpload = async () => {
    setLoading(true);
    await axios
      .post(`${URL}/team/addassignmentmarks.php`, marksDetails)
      .then((res) => {
        if (res.status) {
          toast.success(res.data.message);
          fetchAssignmentDetails();
          handleUploadClose();
        } else {
          toast.error(res.data.message);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      <Button variant="outlined" className="mt-5" onClick={handleUploadOpen}>
        Upload Marks
      </Button>

      <Dialog open={marksOpen} onClose={handleUploadClose}>
        <DialogTitle>Write down the marks of assignment</DialogTitle>
        {/* <div className="flex flex-col items-center justify-center gap-[5px] p-2 w-[600px]"> */}
        <DialogContent>
          <Box className="flex flex-col gap-4">
            <Box className="flex flex-col gap-4">
              <Typography>Marks Obtained : </Typography>
              <TextField
                type="number"
                placeholder="Write down the marks obtained"
                className="w-auto md:w-[25rem]"
                onChange={handleChange}
                value={marksDetails?.marks_obtained}
                name="marks_obtained"
              />
            </Box>
            <Box className="flex flex-col gap-4">
              <Typography>Marks Out of :</Typography>
              <TextField
                type="number"
                placeholder="Write down the marks out of"
                className="w-auto md:w-[25rem]"
                name="marks_out_of"
                onChange={handleChange}
                value={marksDetails?.marks_out_of}
              />
            </Box>
            <Box className="flex flex-col gap-4">
              <Typography>Feedback :</Typography>
              <TextField
                placeholder="Write down the feedback"
                className="w-auto md:w-[25rem]"
                name="feedback"
                onChange={handleChange}
                value={marksDetails?.feedback}
              />
            </Box>
          </Box>
        </DialogContent>
        <div className="flex justify-end gap-3 mb-2">
          <DialogActions>
            <LoadingButton
              loading={loading}
              disabled={
                !marksDetails.feedback ||
                !marksDetails.marks_obtained ||
                !marksDetails.marks_out_of
              }
              onClick={handleMarksUpload}
              variant="contained"
              type="submit"
              startIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
            >
              Save
            </LoadingButton>
          </DialogActions>
          <DialogActions>
            <Button onClick={handleUploadClose}>Close</Button>
          </DialogActions>
        </div>
        {/* </div> */}
      </Dialog>
    </React.Fragment>
  );
};

export default MarksUpload;
