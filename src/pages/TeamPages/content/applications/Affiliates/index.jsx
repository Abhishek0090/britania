import { Helmet } from "react-helmet-async";
import PageHeader from "./PageHeader";
import Affiliates from "./AffiliateData";
import PageTitleWrapper from "~/pages/TeamPages/components/PageTitleWrapper";
import { Grid, Container } from "@mui/material";

export default function Referrals() {
  return (
    <>
      <Helmet>
        <title>All Affiliates's</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
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
            <Affiliates />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
