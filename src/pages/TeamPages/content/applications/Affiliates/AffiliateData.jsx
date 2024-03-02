import { useState, useEffect } from "react";
import { Card } from "@mui/material";
import AffiliateTable from "./AffiliateTable";
import axios from "axios";
import { URL } from "~/utils/BaseURL";
import { Grid, Box } from "@mui/material";

function Affiliates() {
  const [allAssignmentsData, setAllAssignmentsData] = useState([]);
  // something going on

  // const [totalData, setTotalData] = useState({
  //   total_marks_category: "",
  //   total_marks_obtained: "",
  //   total_marks_out_of: "",
  //   total_marks_out_of_100: "",
  // });

  useEffect(() => {
    axios
      .get(`${URL}/team/freelancingassignmenttableaffiliate.php`)
      .then((response) => {
        console.log(response?.data);
        setAllAssignmentsData(response?.data?.map_array);

        // setTotalData(
        //   response?.data?.find(
        //     (item) => item?.array_type === "Total Marks Array"
        //   )
        // );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(allAssignmentsData);

  return (
    <Card>
      {/* <Grid item xs={12}>
        <Card>
          <TotalCard totalData={totalData} />
        </Card>
      </Grid> */}
      {allAssignmentsData?.length > 0 && (
        <AffiliateTable cryptoOrders={allAssignmentsData} />
      )}
    </Card>
  );
}

export default Affiliates;
