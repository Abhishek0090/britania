import React, { useEffect } from "react";

import { useState } from "react";

import { Card } from "@mui/material";
import { Grid } from "@mui/material";
import { BsCheckCircleFill } from "react-icons/bs";

import VuiBox from "~/components/VuiBox";
import VuiTypography from "~/components/VuiTypography";

// Vision UI Dashboard Materail-UI example components
import Table from "~/components/Tables/Table";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectAuth } from "~/features/auth/authSlice";
import { URL } from "~/utils/BaseURL";
import TotalCard from "./TotalCard";
import MarksChart from "./MarksChart";

const GraphChart = () => {
  const auth = useSelector(selectAuth);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${URL}/freelancer/freelanceassignments.php?freelancer_id=${auth?.id}`
      )
      .then((res) => {
        // if (title === "Completed Assignments") {
          // setAssignments(
            // res?.data.filter((item) => item.status === "Completed")
        //   );
        // } else if (title === "Incomplete Assignments") {
        //   setAssignments(
        //     res?.data.filter((item) => item.status === "InComplete")
        //   );
        // } else {
          setAssignments(res?.data);
        // }
      })
      .catch((err) => console.log(err));
  }, []);

  const totalData =
    assignments?.length > 0 &&
    assignments?.find((item) => item?.total_marks_obtained);

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
            Overview of your progress
          </VuiTypography>
          <VuiBox display="flex" alignItems="center" lineHeight={0}>
            <BsCheckCircleFill color="green" size="15px" />
            <VuiTypography
              variant="button"
              fontWeight="regular"
              color="text"
              ml="5px"
            >
              &nbsp;<strong>Assignments</strong> till now
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
        <Grid>
          <TotalCard totalData={totalData} />
        </Grid>
        <div className="flex items-center justify-center">
          <MarksChart paginatedCryptoOrders={assignments} />
        </div>
      </VuiBox>
    </Card>
  );
};

export default GraphChart;
