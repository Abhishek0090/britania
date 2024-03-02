import { useState, useEffect } from "react";
import { Card } from "@mui/material";
import FreelancersTable from "~/pages/TeamPages/components/FreelancersTable";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectAuth } from "~/features/auth/authSlice";
import { URL } from "~/utils/BaseURL";
import { Grid, Box } from "@mui/material";
import TotalCard from "./TotalCard";

function RecentOrders() {
  const auth = useSelector(selectAuth);
  const empArray = [
    "Technical pm",
    "Non-Technical pm",
    "Technical hr",
    "Non-Technical hr",
  ];

  const [totalData, setTotalData] = useState({
    total_marks_category: "",
    total_marks_obtained: "",
    total_marks_out_of: "",
    total_marks_out_of_100: "",
    total_resit: "",
    total_passing: "",
    total_merit: "",
    total_distinction: "",
  });

  const [allFreelancersData, setAllFreelancersData] = useState([]);

  useEffect(() => {
    axios
      .get(`${URL}/team/freelancertable.php`)
      .then((response) => {
        const { freelancer_array, marks_array } = response?.data;

        setTotalData({
          total_marks_category: marks_array?.total_marks_category,
          total_marks_obtained: marks_array.total_marks_obtained,
          total_marks_out_of: marks_array.total_marks_out_of,
          total_marks_out_of_100: marks_array.total_marks_out_of_100?.toFixed(2),
          total_resit: marks_array.total_resit,
          total_passing: marks_array.total_passing,
          total_merit: marks_array.total_merit,
          total_distinction: marks_array.total_distinction,
        });
        if (auth?.teamDomain === "Admin")
          setAllFreelancersData(freelancer_array);
        else if (empArray.includes(auth?.teamDomain))
          if (
            auth?.teamDomain === "Non-Technical pm" ||
            auth?.teamDomain === "Non-Technical hr"
          )
            setAllFreelancersData(
              freelancer_array?.filter((item) => item?.domain !== "Technical")
            );
          else if (
            auth?.teamDomain === "Technical pm" ||
            auth?.teamDomain === "Technical hr"
          )
            setAllFreelancersData(
              freelancer_array?.filter(
                (item) => item?.domain !== "Non Technical"
              )
            );
          else setAllFreelancersData(freelancer_array);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(allFreelancersData);

  // const totalData =
  //   allFreelancersData?.length > 0 &&
  //   allFreelancersData?.reduce(
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
      {allFreelancersData?.length > 0 && (
        <FreelancersTable
          statusName={null}
          cryptoOrders={allFreelancersData}
          totalData={totalData}
        />
      )}
    </Card>
  );
}

export default RecentOrders;
