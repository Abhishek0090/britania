import { Helmet } from "react-helmet-async";
import PageHeader from "./PageHeader";
import PageTitleWrapper from "~/pages/TeamPages/components/PageTitleWrapper";
import { Grid, Box } from "@mui/material";
import MarksTable from "./MarksTable";
import { Card } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "~/utils/BaseURL";
import MarksChart from "./MarksChart";
import TotalCard from "./TotalCard";

export default function MarksTables() {
  const [marksData, setMarksData] = useState(null);
  const [totalData, setTotalData] = useState({
    total_marks_category: "",
    total_marks_obtained: "",
    total_marks_out_of: "",
    total_marks_out_of_100: "",
  });

  const [dateFilters, setDateFilters] = useState({
    months: "",
    years: "",
    category: "",
  });
  console.log(dateFilters, "DATE FILTERES");

  useEffect(() => {
    axios
      .get(`${URL}/team/markstable.php`)
      .then((res) => {
        const {
          table,
          total_marks_category,
          total_marks_obtained,
          total_marks_out_of,
          total_marks_out_of_100,
        } = res?.data;

        setMarksData(table);
        setTotalData({
          total_marks_category,
          total_marks_obtained,
          total_marks_out_of,
          total_marks_out_of_100,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <React.Fragment>
      <Helmet>
        <title>Marks Table</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Box
        fullwidth="true"
        sx={{
          mx: 2,
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card>
              <TotalCard totalData={totalData} />
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <MarksTable
                dateFilters={dateFilters}
                setDateFilters={setDateFilters}
                cryptoOrders={marksData}
                totalData={totalData}
              />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}
