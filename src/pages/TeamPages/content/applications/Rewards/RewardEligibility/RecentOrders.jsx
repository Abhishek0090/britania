import { useState, useEffect } from "react";
import { Card } from "@mui/material";
import RecentOrdersTable from "./RecentOrdersTable";
import axios from "axios";
import toast from "react-hot-toast";
import { URL } from "~/utils/BaseURL";

function RecentOrders() {
  const [allAssignmentsData, setAllAssignmentsData] = useState([]);

  const fetchEligibleRewards = () => {
    axios
      .get(`${URL}/team/freelancereligible.php`)
      .then((response) => {
        console.log(response?.data);
        setAllAssignmentsData(response?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleMakeEligible = (eligibility_id, number) => {
    const data = {
      eligibility_id: eligibility_id,
      number: number,
    };
    axios
      .post(`${URL}/team/freelancermakeelgibile.php`, data)
      .then((res) => {
        toast.success(res?.data?.message);
        fetchEligibleRewards();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchEligibleRewards();
  }, []);

  return (
    <Card>
      {allAssignmentsData?.length > 0 && (
        <RecentOrdersTable
          cryptoOrders={allAssignmentsData}
          handleMakeEligible={handleMakeEligible}
        />
      )}
    </Card>
  );
}

export default RecentOrders;
