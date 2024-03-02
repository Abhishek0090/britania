import { Helmet } from "react-helmet-async";
import PageHeader from "./PageHeader";
import PageTitleWrapper from "~/pages/TeamPages/components/PageTitleWrapper";
import { Grid, Box } from "@mui/material";
import Chart from "react-apexcharts";
import React, { useState } from "react";

export default function MarksOverview() {
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
    ],
  });

  const [donutData, setDonutData] = useState({
    options: {},
    series: [44, 55, 41, 17, 15],
    labels: ['A', 'B', 'C', 'D', 'E'],
  });
  return (
    <>
      <Helmet>
        <title>Marks overview</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Box
        fullwidth="true"
        sx={{
          mx: 2,
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <div>
              <select>Range</select>
            </div>
            <div className="mixed-chart flex gap-2 justify-between">
              <Chart
                options={chartData.options}
                series={chartData.series}
                type="bar"
                width="700"
              /> 
              <Chart
                options={donutData.options}
                series={donutData.series}
                type="donut"
                width="500"
              />
            </div>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
