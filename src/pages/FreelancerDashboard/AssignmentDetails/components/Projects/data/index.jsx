import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectAuth } from "~/features/auth/authSlice";

import { format } from "date-fns";

import VuiBox from "~/components/VuiBox";
import VuiTypography from "~/components/VuiTypography";

import VuiButton from "~/components/VuiButton";
import { useNavigate } from "react-router-dom";

import { URL } from "~/utils/BaseURL";

// Images
export default function data({ title }) {
  console.log("title", title);
  const auth = useSelector(selectAuth);
  const [assignments, setAssignments] = useState([]);
  const [temp, setTemp] = useState([]);

  useEffect(() => {
    if (title === "My Inquiries") {
      axios
        .get(`${URL}/freelancer/freelanceinquiry.php?freelancer_id=${auth?.id}`)
        .then((res) => {
          setAssignments(res?.data);
          console.log("inq", res?.data);
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .get(
          `${URL}/freelancer/freelanceassignments.php?freelancer_id=${auth?.id}`
        )
        .then((res) => {
          if (title === "Completed Assignments") {
            setAssignments(
              res?.data.filter((item) => item.status === "Completed")
            );
          } else if (title === "Incomplete Assignments") {
            setAssignments(
              res?.data.filter((item) => item.status === "InComplete")
            );
          } else {
            setAssignments(res?.data);
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);
  const navigate = useNavigate();

  let rows = [];

  if (assignments) {
    rows = assignments.map((assignment) => {
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
                maxWidth: "30rem",
              }}
            >
              {assignment?.title}
            </VuiTypography>
          </VuiBox>
        ),
        Marks: (
          <VuiTypography variant="button" color="white" fontWeight="bold">
            {assignment?.marks}
          </VuiTypography>
        ),
        Deadline: (
          <VuiTypography variant="button" color="white" fontWeight="bold">
            {assignment?.deadline}
          </VuiTypography>
        ),
        Details: (
          <VuiBox width="8rem" textAlign="left">
            <VuiButton
              onClick={() =>
                navigate(`/freelancer/assignment/${assignment?.id}`)
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
      { name: "Deadline", align: "left" },
      { name: "Details", align: "left" },
    ],

    rows: rows,
  };
}
