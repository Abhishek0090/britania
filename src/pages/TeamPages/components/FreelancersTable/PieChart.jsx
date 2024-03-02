import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const PieChart = ({ graphData }) => {

    console.log(graphData)

  const [chartData, setChartData] = useState({
    series: graphData,
    options: {
      chart: {
        width: 480,
        type: "pie",
        foreColor: "#ffffff",
      },
      labels: ["Resit", "Passing", "Merit", "Distinction"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 380,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
      colors: ["#F44336", "#FFEB3B", "#2196F3", "#4CAF50"],
    },
  });

  useEffect(() => {
    // Dispatch a resize event after the component is mounted

    setChartData((prev) => ({ ...prev, series: graphData }));

    // window.dispatchEvent(new Event("resize"));
  }, [graphData]);

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="pie"
          width={380}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default PieChart;
