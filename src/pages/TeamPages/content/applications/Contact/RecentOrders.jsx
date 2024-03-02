import { useState, useEffect } from "react";
import { Card } from "@mui/material";
import RecentOrdersTable from "./RecentOrdersTable";
import axios from "axios";
import { URL } from "~/utils/BaseURL";

function RecentOrders() {
  const [allAssignmentsData, setAllAssignmentsData] = useState([]);

  useEffect(() => {
    axios
      .get(`${URL}/team/contacttable.php`)
      .then((response) => {
        console.log(response?.data);
        setAllAssignmentsData(response?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Card>
      {allAssignmentsData?.length > 0 && (
        <RecentOrdersTable cryptoOrders={allAssignmentsData} />
      )}
    </Card>
  );
}

export default RecentOrders;
