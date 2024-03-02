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
import React from "react";
import MarksChart from "./MarksChart";
import TotalCard from "./TotalCard";

function Projects({ title }) {
  const { columns, dateFilters, setDateFilters, rows, finalData, totalData } =
    data({
      title,
    });
  const auth = useSelector(selectAuth);
  const [stats, setStats] = useState({});

  console.log(dateFilters, "DateFilters");
  // rows?.find((item) => item?.total_marks_obtained)

  // const totalData =
  //   finalData?.length > 0 &&
  //   finalData?.find((item) => item?.total_marks_obtained);

  // const [totalData, setTotalData] = useState({
  //   total_marks_obtained: valr?.total_marks_obtained,
  //   total_marks_out_of: valr?.total_marks_out_of,
  //   total_marks_category: valr?.total_marks_category,
  // });
  // console.log(valr, "TOTALDATA");

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
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb="32px"
      >
        <VuiBox mb="auto">
          {/* <VuiTypography color="white" variant="lg" mb="6px" gutterBottom>
            Average Marks :
          </VuiTypography>
          <VuiTypography color="white" variant="lg" mb="6px" gutterBottom>
            12
          </VuiTypography> */}

          {title !== "My Inquiries" && <TotalCard totalData={totalData} />}

          <VuiBox display="flex" alignItems="center" lineHeight={0}>
            {/* <BsCheckCircleFill color="green" size="15px" /> */}
            {/* <VuiTypography
              variant="button"
              fontWeight="regular"
              color="text"
              ml="5px"
            > */}

            {title !== "My Inquiries" && (
              <div className="flex md:flex-row flex-col items-start justify-between px-0 md:px-20 gap-10 md:gap-2 py-10">
                <MarksChart
                  dateFilters={dateFilters}
                  setDateFilters={setDateFilters}
                  paginatedCryptoOrders={finalData}
                />
              </div>
            )}

            {/* </VuiTypography> */}
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
          textAlign: "center",
        }}
      >
        <Table columns={columns} rows={rows} />
      </VuiBox>
    </Card>
  );
}

export default Projects;
