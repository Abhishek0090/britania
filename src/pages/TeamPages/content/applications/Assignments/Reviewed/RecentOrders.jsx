import { useState, useEffect } from "react";
import { Card } from "@mui/material";
import AssignmentsTable from "~/pages/TeamPages/components/AssignmentsTable";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectAuth } from "~/features/auth/authSlice";
import { URL } from "~/utils/BaseURL";

export default function RecentOrders({ id }) {
  const auth = useSelector(selectAuth);
  const pmid = auth?.id;
  const pmArray = ["Technical pm", "Non-Technical pm"];

  const hrArray = ["Technical hr", "Non-Technical hr"];

  const [allAssignmentsData, setAllAssignmentsData] = useState([]);
  const [filteredAssignmentsData, setFilteredAssignmentsData] = useState([]);

  useEffect(() => {
    if (pmArray.includes(auth?.teamDomain)) {
      axios
        .get(`${URL}/team/pmdetails.php?pm_id=${pmid}`)
        .then((response) => {
          console.log(response?.data);
          setAllAssignmentsData(response?.data[1]);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (hrArray.includes(auth?.teamDomain)) {
      axios
        .get(`${URL}/team/freelancingassignmenttable.php`)
        .then((response) => {
          console.log(response?.data);
          if (auth?.teamDomain === "Technical hr") {
            setAllAssignmentsData(
              response?.data?.filter((item) => item?.domain === "Technical")
            );
          } else {
            setAllAssignmentsData(
              response?.data?.filter((item) => item?.domain === "Non-Technical")
            );
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .get(`${URL}/team/freelancingassignmenttable.php`)
        .then((response) => {
          console.log(response?.data);
          setAllAssignmentsData(response?.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  useEffect(() => {
    if (id) {
      const filteredData = allAssignmentsData?.filter((item) =>
        item?.freelancers?.map((freelancer) => freelancer?.id).includes(id)
      );
      setFilteredAssignmentsData(filteredData);
    }
  }, [id, allAssignmentsData, auth?.teamDomain]);

  return (
    <Card>
      <AssignmentsTable
        statusName={"Review Received"}
        streamName={null}
        cryptoOrders={id ? filteredAssignmentsData : allAssignmentsData}
      />
    </Card>
  );
}
