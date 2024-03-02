import { useState, useEffect } from "react";
import { Card } from "@mui/material";
import RecentOrdersTable from "./RecentOrdersTable";
import axios from "axios";
import toast from "react-hot-toast";
import { URL } from "~/utils/BaseURL";

function RecentOrders() {
  const [allAssignmentsData, setAllAssignmentsData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    axios
      .get(`${URL}/team/freelancerrewardsclaim.php`)
      .then((response) => {
        console.log(response?.data);
        setAllAssignmentsData(response?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateStatus = (id, status) => {
    console.log(id, status);
    setLoading(true);
    axios
      .get(
        `${URL}/team/freelancerrewardclaimupdate.php?claim_id=${id}&status=${status}`
      )
      .then((response) => {
        if (response?.data?.status === "success") {
          toast.success(response?.data?.message);
          console.log(response?.data);
          fetchData();
        } else {
          toast.error(response?.data?.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Card>
      {allAssignmentsData?.length > 0 && (
        <RecentOrdersTable
          loading={loading}
          cryptoOrders={allAssignmentsData}
          handleUpdateStatus={handleUpdateStatus}
        />
      )}
    </Card>
  );
}

export default RecentOrders;
