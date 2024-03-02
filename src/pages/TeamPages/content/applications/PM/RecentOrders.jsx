import { useState, useEffect } from "react";
import { Card } from "@mui/material";
import RecentOrdersTable from "./RecentOrdersTable";
import axios from "axios";
import { URL } from "~/utils/BaseURL";
import { Grid, Box } from "@mui/material";
import TotalCard from "./TotalCard";

function RecentOrders() {
  const [allAssignmentsData, setAllAssignmentsData] = useState([]);

  const [totalData, setTotalData] = useState({
    total_marks_category: "",
    total_marks_obtained: "",
    total_marks_out_of: "",
    total_marks_out_of_100: "",
  });

  useEffect(() => {
    axios
      .get(`${URL}/team/pmtable.php`)
      .then((response) => {
        console.log(response?.data);
        setAllAssignmentsData(
          response?.data?.filter((item) => item?.array_type === "PM Array")
        );

        setTotalData(
          response?.data?.find(
            (item) => item?.array_type === "Total Marks Array"
          )
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(allAssignmentsData);

  // const totalData =
  //   allAssignmentsData?.length > 0 &&
  //   allAssignmentsData?.reduce(
  //     (acc, item) => {
  //       acc.total_marks_obtained += parseInt(item.total_marks_obtained);
  //       acc.total_marks_out_of += parseInt(item.total_marks_out_of);
  //       acc.total_marks_category = item.total_marks_category; // Assuming all entries have the same category

  //       return acc;
  //     },
  //     {
  //       total_marks_obtained: 0,
  //       total_marks_out_of: 0,
  //       total_marks_category: "",
  //     }
  //   );

  // totalData.total_marks_out_of_100 =
  //   (totalData.total_marks_obtained / totalData.total_marks_out_of) * 100;

  return (
    <Card>
      <Grid item xs={12}>
        <Card>
          <TotalCard totalData={totalData} />
        </Card>
      </Grid>
      {allAssignmentsData?.length > 0 && (
        <RecentOrdersTable
          cryptoOrders={allAssignmentsData}
          totalData={totalData}
        />
      )}
    </Card>
  );
}

export default RecentOrders;
