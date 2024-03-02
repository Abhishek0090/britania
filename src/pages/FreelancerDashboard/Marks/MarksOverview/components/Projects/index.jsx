import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectAuth } from "~/features/auth/authSlice";
import axios from "axios";

import { Card } from "@mui/material";
import { BsCheckCircleFill } from "react-icons/bs";

import VuiBox from "~/components/VuiBox";
import VuiTypography from "~/components/VuiTypography";

// Vision UI Dashboard Materail-UI example components
import Table from "~/components/Tables/Table";

// Data
import data from "../Projects/data";

import { URL } from "~/utils/BaseURL";

function Projects({ title }) {
  const { columns, rows } = data({ title });
  const auth = useSelector(selectAuth);
  const [stats, setStats] = useState({});

  useEffect(() => {
    axios
      .get(`${URL}/freelancer/dashboard.php?freelancer_id=${auth?.id}`)
      .then((res) => {
        setStats(res.data);
        // console.log('Stats', res?.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Card
      sx={{
        height: "100% !important",
      }}
    >
      <VuiBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb="32px"
      >
        <VuiBox mb="auto">
          <VuiTypography color="white" variant="lg" mb="6px" gutterBottom>
            {title}
          </VuiTypography>
          <VuiBox display="flex" alignItems="center" lineHeight={0}>
            <BsCheckCircleFill color="green" size="15px" />
            <VuiTypography
              variant="button"
              fontWeight="regular"
              color="text"
              ml="5px"
            >
              &nbsp;Total&nbsp;&nbsp;
              <strong className="text-green-500">
                {title === "Incomplete Assignments"
                  ? stats?.incomplete
                  : title === "Completed Assignments"
                  ? stats?.completed
                  : title === "My Assignments"
                  ? stats?.assigned_to_me
                  : title === "My Inquiries"
                  ? stats?.total_inquiries
                  : null}
              </strong>
              &nbsp; assignments
            </VuiTypography>
          </VuiBox>
        </VuiBox>
      </VuiBox>
      <VuiBox
        sx={{
          "& th": {
            borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
              `${borderWidth[1]} solid ${grey[700]}`,
          },
          "& .MuiTableRow-root:not(:last-child)": {
            "& td": {
              borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                `${borderWidth[1]} solid ${grey[700]}`,
            },
          },
        }}
      >
        <Table columns={columns} rows={rows} />
      </VuiBox>
    </Card>
  );
}

export default Projects;
