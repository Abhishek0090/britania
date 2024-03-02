import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const PieChart = ({ graphData }) => {
  console.log(graphData);

  const [chartData, setChartData] = useState({
    series: graphData,
    options: {
      chart: {
        width: 480,
        type: "pie",
        foreColor: "#000000",
        foreSize : "20px"
      },
      labels: ["Paid", "Unpaid"],
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
      colors: ["#4CAF50", "#F44336"],
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
          width={480}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default PieChart;
