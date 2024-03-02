import React, { useEffect, useState } from "react";
// import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import PieChart from "./PieChart";
import TotalCard from "./TotalCard";
import { X } from "lucide-react";
import TotalFilteredCard from "./TotalFilteredCard";

const data = [
  { value: 5, label: "ABHISHEK" },
  { value: 10, label: "BROCK" },
  { value: 15, label: "CHRISTIAN" },
  { value: 20, label: "DANIEL" },
];

const size = {
  width: 400,
  height: 200,
};
const Months = [
  { month: 1, month_name: "January" },
  { month: 2, month_name: "February" },
  { month: 3, month_name: "March" },
  { month: 4, month_name: "April" },
  { month: 5, month_name: "May" },
  { month: 6, month_name: "June" },
  { month: 7, month_name: "July" },
  { month: 8, month_name: "August" },
  { month: 9, month_name: "September" },
  { month: 10, month_name: "October" },
  { month: 11, month_name: "November" },
  { month: 12, month_name: "December" },
];

const Years = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029];

const Categories = [
  { label: "0-50", value: "Resit" },
  { label: "51-60", value: "Passing" },
  { label: "61-71", value: "Merit" },
  { label: "71-100", value: "Distinction" },
];

const MarksChart = ({ dateFilters, setDateFilters, paginatedCryptoOrders }) => {
  const handleChange = (event) => {
    const { name, value } = event.target;

    setDateFilters((prev) => ({ ...prev, [name]: value }));
  };

  console.log(paginatedCryptoOrders, "HIRBO");

  const totalData = paginatedCryptoOrders.reduce(
    (acc, item) => {
      acc.total_marks_obtained += parseInt(item.total_marks_obtained);
      acc.total_marks_out_of += parseInt(item.total_marks_out_of);
      // acc.total_marks_category = item.marks_category; // Assuming all entries have the same category

      return acc;
    },
    {
      total_marks_obtained: 0,
      total_marks_out_of: 0,
      // total_marks_category: "",
    }
  );

  totalData.total_marks_out_of_100 =
    (totalData.total_marks_obtained / totalData.total_marks_out_of) * 100;


    console.log(totalData)

  const [percentData, setPercentData] = useState([0, 0, 0, 0]);

  useEffect(() => {
    const percentDetails = paginatedCryptoOrders.reduce(
      (acc, item) => {
        acc[0] += parseInt(item?.total_resit);
        acc[1] += parseInt(item?.total_passing);
        acc[2] += parseInt(item?.total_merit);
        acc[3] += parseInt(item?.total_distinction);

        return acc;
      },
      [0, 0, 0, 0]
    );

    setPercentData(percentDetails);
  }, [paginatedCryptoOrders]);
  console.log(percentData);

  return (
    <div className="flex md:flex-row flex-col items-center md:items-center  justify-between px-0 md:px-20 gap-10 md:gap-2 py-10">
      {" "}
      <div>
        <PieChart graphData={percentData} />
      </div>
      <div className="flex flex-col md:flex-col gap-5 justify-between">
        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker", "DatePicker"]}>
            <DatePicker label={'"year"'} openTo="year" />
            <DatePicker
              label={'"month"'}
              openTo="month"
              views={["year", "month", "day"]}
            />
          </DemoContainer>
        </LocalizationProvider> */}

        {/* <Typography component="h3">Filters :</Typography> */}
        <div className="flex md:flex-row flex-col items-center gap-10">
          <Box className="flex gap-2 md:w-[450px] w-[300px]">
            <FormControl fullWidth>
              <InputLabel id="category_label">Category</InputLabel>
              <Select
                labelId="category_label"
                id="category-select"
                value={dateFilters.category}
                label="category"
                name="category"
                onChange={handleChange}
              >
                {Categories.map((item) => (
                  <MenuItem value={item.value}>
                    <div className="flex justify-between gap-10 w-full">
                      <span> {item.value}</span>
                      <span>{item.label}</span>
                    </div>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {dateFilters.category && (
              <button
                onClick={() => {
                  setDateFilters((prev) => ({ ...prev, category: "" }));
                }}
              >
                <X className="text-red-500" />
              </button>
            )}
          </Box>
          {/* <Box className="flex gap-2 md:w-[200px] w-[300px]">
            <FormControl fullWidth>
              <InputLabel id="months_label">Months</InputLabel>
              <Select
                labelId="months_label"
                id="months-select"
                value={dateFilters.months}
                label="months"
                name="months"
                onChange={handleChange}
              >
                {Months.map((item) => (
                  <MenuItem value={item.month}>{item.month_name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            {dateFilters.months && (
              <button
                onClick={() => {
                  setDateFilters((prev) => ({ ...prev, months: "" }));
                }}
              >
                <X className="text-red-500" />
              </button>
            )}
          </Box>
          <Box className="flex gap-2 md:w-[200px] w-[300px]">
            <FormControl fullWidth>
              <InputLabel id="years-label">Years</InputLabel>
              <Select
                labelId="years-label"
                id="years-select"
                name="years"
                value={dateFilters.years}
                label="Years"
                onChange={handleChange}
              >
                {Years.map((item) => (
                  <MenuItem value={item}>{item}</MenuItem>
                ))}
              </Select>
            </FormControl>
            {dateFilters.years && (
              <button
                onClick={() => {
                  setDateFilters((prev) => ({ ...prev, years: "" }));
                }}
              >
                <X className="text-red-500" />
              </button>
            )}
          </Box> */}
        </div>
        {(dateFilters?.months ||
          dateFilters?.category ||
          dateFilters?.years) && (
          <div>
            <TotalFilteredCard totalData={totalData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MarksChart;
