import { useState, useEffect } from "react";
import { Card } from "@mui/material";
import AssignmentsTable from "~/pages/TeamPages/components/AssignmentsTable";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectAuth } from "~/features/auth/authSlice";
import { URL } from "~/utils/BaseURL";
import { Grid, Box } from "@mui/material";
import TotalCard from "./TotalCard";

export default function RecentOrders({ id }) {
  const auth = useSelector(selectAuth);
  const pmid = auth?.id;
  const pmArray = ["Technical pm", "Non-Technical pm"];

  const hrArray = ["Technical hr", "Non-Technical hr"];

  const [allAssignmentsData, setAllAssignmentsData] = useState([]);
  const [filteredAssignmentsData, setFilteredAssignmentsData] = useState([]);

  const [totalData, setTotalData] = useState({
    total_marks_category: "",
    total_marks_obtained: "",
    total_marks_out_of: "",
    total_marks_out_of_100: "",
  });

  useEffect(() => {
    if (pmArray.includes(auth?.teamDomain)) {
      axios
        .get(`${URL}/team/pmdetails.php?pm_id=${pmid}`)
        .then((response) => {
          // console.log(response?.data);
          setAllAssignmentsData(response?.data[1]);
          setTotalData({
            total_marks_category: response?.data[2]?.total_marks_category,
            total_marks_obtained: response?.data[2]?.total_marks_obtained,
            total_marks_out_of: response?.data[2]?.total_marks_out_of,
            total_marks_out_of_100: response?.data[2]?.total_marks_out_of_100,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (hrArray.includes(auth?.teamDomain)) {
      axios
        .get(`${URL}/team/freelancingassignmenttable.php`)
        .then((response) => {
          const {
            map_array,
            total_marks_category,
            total_marks_obtained,
            total_marks_out_of,
            total_marks_out_of_100,
          } = response?.data;
          console.log(response?.data);
          if (auth?.teamDomain === "Technical hr") {
            setAllAssignmentsData(
              map_array?.filter((item) => item?.domain === "Technical")
            );
          } else {
            setAllAssignmentsData(
              map_array?.filter((item) => item?.domain === "Non-Technical")
            );
          }
          setTotalData({
            total_marks_category,
            total_marks_obtained,
            total_marks_out_of,
            total_marks_out_of_100,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .get(`${URL}/team/freelancingassignmenttable.php`)
        .then((response) => {
          console.log(response?.data);
          const {
            map_array,
            total_marks_category,
            total_marks_obtained,
            total_marks_out_of,
            total_marks_out_of_100,
          } = response?.data;
          setAllAssignmentsData(map_array);
          setTotalData({
            total_marks_category,
            total_marks_obtained,
            total_marks_out_of,
            total_marks_out_of_100,
          });
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

  console.log(allAssignmentsData);

  return (
    <Card>
      {/* <Grid item xs={12}>
        <Card>
          <TotalCard totalData={totalData} />
        </Card>
      </Grid> */}
      <AssignmentsTable
        statusName={"Completed"}
        streamName={null}
        cryptoOrders={id ? filteredAssignmentsData : allAssignmentsData}
        totalData={totalData}
      />
    </Card>
  );
}
