import { format } from "date-fns";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectAuth } from "~/features/auth/authSlice";

import VuiBox from "~/components/VuiBox";
import VuiTypography from "~/components/VuiTypography";
import VuiButton from "~/components/VuiButton";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { URL } from "~/utils/BaseURL";
import moment from "moment";

// Images
export default function data() {
  const auth = useSelector(selectAuth);
  const [assignments, setAssignments] = useState([]);
  useEffect(() => {
    axios
      .get(
        `${URL}/freelancer/freelanceassignments.php?freelancer_id=${auth?.id}`
      )
      .then((res) => {
        setAssignments(res?.data);
        if (res?.data?.length > 5) {
          setAssignments(res?.data?.slice(0, 5));
        }
      })
      .catch((err) => console.log(err));
  }, []);

  function formatDate(deadlineString) {
    // Parse the date string using moment
    const deadlineMoment = moment(deadlineString, "YYYY-MM-DD HH:mm:ss");

    // Format the date as per your requirement
    const formattedDeadline = deadlineMoment.format("DD/MM/YYYY h:mm A");

    return formattedDeadline;
  }

  const navigate = useNavigate();

  let rows = [];

  if (assignments) {
    rows = assignments?.map((assignment) => {
      return {
        assignmentId: (
          <VuiTypography variant="button" color="white" fontWeight="bold">
            {assignment?.id}
          </VuiTypography>
        ),
        Title: (
          <VuiBox display="flex" alignItems="center">
            <VuiTypography
              color="white"
              variant="button"
              fontWeight="medium"
              sx={{
                whiteSpace: "pre-wrap",
                maxWidth: "20rem",
              }}
            >
              {assignment?.title}
            </VuiTypography>
          </VuiBox>
        ),
        Marks: (
          <VuiTypography variant="button" color="white" fontWeight="bold">
            {/* {assignment?.marks} */}

            {assignment?.marks_obtained &&
              assignment?.marks_out_of &&
              assignment?.marks_obtained + "/" + assignment?.marks_out_of}
          </VuiTypography>
        ),
        Deadline: (
          <VuiTypography variant="button" color="white" fontWeight="bold">
            {formatDate(assignment?.deadline)}
            {/* {assignment?.deadline} */}
          </VuiTypography>
        ),
        Details: (
          <VuiBox width="8rem" textAlign="left">
            <VuiButton
              onClick={() =>
                navigate(`/dashboard/freelancer/assignment/${assignment?.id}`)
              }
              target="_blank"
              rel="noreferrer"
              variant="contained"
              size="small"
              sx={{
                background: "#2D2E5F",
                color: "#fff",
                "&:hover": {
                  background: "#191D60",
                  color: "#fff",
                },
              }}
            >
              <VisibilityIcon className="mr-2" fontSize="small" color="white" />
              View
            </VuiButton>
          </VuiBox>
        ),
      };
    });
  }

  return {
    columns: [
      { name: "assignmentId", align: "left" },
      { name: "Title", align: "left" },
      { name: "Marks", align: "left" },
      { name: "Deadline", align: "left" },
      { name: "Details", align: "left" },
    ],

    rows: rows,
  };
}
