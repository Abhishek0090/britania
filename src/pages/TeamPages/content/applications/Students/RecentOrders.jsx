import { useState, useEffect } from "react";
import { Card } from "@mui/material";
import { Grid } from "@mui/material";
import RecentOrdersTable from "./RecentOrdersTable";
import axios from "axios";
import toast from "react-hot-toast";
import { URL } from "~/utils/BaseURL";
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
      .get(`${URL}/team/studentstable.php`)
      .then((response) => {
        setAllAssignmentsData(response?.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something Went Wrong");
      });
  }, []);

  return (
    <Card>
      {/* <Grid item xs={12}>
        <Card>
          <TotalCard totalData={totalData} />
        </Card>
      </Grid> */}
      {allAssignmentsData?.length > 0 && (
        <RecentOrdersTable cryptoOrders={allAssignmentsData} />
      )}
    </Card>
  );
}

export default RecentOrders;
