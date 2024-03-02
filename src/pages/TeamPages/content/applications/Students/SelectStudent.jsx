import { Helmet } from "react-helmet-async";
import PageTitleWrapper from "~/pages/TeamPages/components/PageTitleWrapper";
import { Grid, Container } from "@mui/material";
import axios from "axios";
import SelectStudentTable from "./SelectStudentTable";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Card } from "@mui/material";
import { Typography } from "@mui/material";
import { URL } from "~/utils/BaseURL";
import TotalCard from "./TotalCard";

export default function SelectStudent() {
  const [allSelectStudents, setSelectStudents] = useState([]);

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
        setSelectStudents(
          response?.data?.filter((item) => item?.is_select === "1")
        );
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something Went Wrong");
      });
  }, []);

  return (
    <React.Fragment>
      <Helmet>
        <title>SELECT Students</title>
      </Helmet>
      <PageTitleWrapper>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              SELECT Students
            </Typography>
            <Typography variant="subtitle2">
              there are total {allSelectStudents?.length} students.
            </Typography>
          </Grid>
        </Grid>
      </PageTitleWrapper>
      <Container maxWidth="xl">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Grid item xs={12}>
              <Card>
                <TotalCard totalData={totalData} />
              </Card>
            </Grid>
            <Card>
              {allSelectStudents?.length > 0 && (
                <SelectStudentTable cryptoOrders={allSelectStudents} />
              )}
            </Card>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
