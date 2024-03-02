import React, { useEffect, useState } from "react";
// import Box from "@mui/material/Box";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import Typography from "@mui/material/Typography";
import PieChart from "./PieChart";
// import TotalCard from "./TotalCard";
// import { X } from "lucide-react";
// import TotalFilteredCard from "./TotalFilteredCard";
// import MonthsSelect from "./headless/MonthsSelect";
// import YearsSelect from "./headless/YearsSelect";
// import CategorySelect from "./headless/CategorySelect";

const MarksChart = ({ dateFilters, setDateFilters, paginatedCryptoOrders }) => {
  // const handleChange = (event) => {
  //   const { name, value } = event.target;

  //   setDateFilters((prev) => ({ ...prev, [name]: value }));
  // };

  // const totalData = paginatedCryptoOrders?.reduce(
  //   (acc, item) => {
  //     acc.total_marks_obtained += parseInt(item.marks_obtained);
  //     acc.total_marks_out_of += parseInt(item.marks_out_of);
  //     acc.total_marks_category = item.marks_category; // Assuming all entries have the same category

  //     return acc;
  //   },
  //   {
  //     total_marks_obtained: 0,
  //     total_marks_out_of: 0,
  //     total_marks_category: "",
  //   }
  // );

  // totalData.total_marks_out_of_100 =
  //   (totalData.total_marks_obtained / totalData.total_marks_out_of) * 100;

  const [percentData, setPercentData] = useState([0, 0, 0, 0]);

  useEffect(() => {
    // Initialize counts for each category
    let resitCount = 0;
    let passingCount = 0;
    let meritCount = 0;
    let distinctionCount = 0;

    // Iterate over the marksData array
    paginatedCryptoOrders?.forEach((item) => {
      const category = item.marks_category;
      switch (category) {
        case "Resit":
          resitCount++; // Increment count for resit
          break;
        case "Passing":
          passingCount++; // Increment count for passing
          break;
        case "Merit":
          meritCount++; // Increment count for merit
          break;
        case "Distinction":
          distinctionCount++; // Increment count for distinction
          break;
        default:
          break;
      }
    });

    // Calculate total count
    const totalCount = paginatedCryptoOrders?.length;

    // Calculate percentages and update the array
    const percentages = [
      resitCount,
      passingCount,
      meritCount,
      distinctionCount,
    ];

    // Set the state with the calculated percentages
    setPercentData(percentages);
  }, [paginatedCryptoOrders]);

  return (
    <div className="flex md:flex-row flex-col items-center md:items-center  justify-between  gap-10 md:gap-2 py-10">
      {" "}
      <div>
        <PieChart graphData={percentData} />
      </div>
      {/* <div className="flex flex-col md:flex-col gap-5 justify-between">
        <div className="flex md:flex-row flex-col items-center gap-10">
          <div className="flex justify-center gap-2 md:w-[200px] w-[300px]">
            <CategorySelect
              dateFilters={dateFilters}
              setDateFilters={setDateFilters}
            />
            {dateFilters.category && (
              <button
                onClick={() => {
                  setDateFilters((prev) => ({ ...prev, category: "" }));
                }}
              >
                <X className="text-red-500" />
              </button>
            )}
          </div>
          <div className="flex justify-center gap-2 md:w-[200px] w-[300px]">
            <MonthsSelect
              dateFilters={dateFilters}
              setDateFilters={setDateFilters}
            />
            {dateFilters.months && (
              <button
                onClick={() => {
                  setDateFilters((prev) => ({ ...prev, months: "" }));
                }}
              >
                <X className="text-red-500" />
              </button>
            )}
          </div>
          <div className="flex justify-center gap-2 md:w-[200px] w-[300px]">
            <YearsSelect
              dateFilters={dateFilters}
              setDateFilters={setDateFilters}
            />
            {dateFilters.years && (
              <button
                onClick={() => {
                  setDateFilters((prev) => ({ ...prev, years: "" }));
                }}
              >
                <X className="text-red-500" />
              </button>
            )}
          </div>
        </div>
        {(dateFilters?.months ||
          dateFilters?.category ||
          dateFilters?.years) && (
          <div>
            <TotalFilteredCard totalData={totalData} />
          </div>
        )}
      </div> */}
    </div>
  );
};

export default MarksChart;
