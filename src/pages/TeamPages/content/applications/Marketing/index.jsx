// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Helmet } from "react-helmet-async";
// import PageHeader from "./PageHeader";
// import PageTitleWrapper from "~/pages/TeamPages/components/PageTitleWrapper";
// import { Grid, Box, Tab, Tabs } from "@mui/material";
// import { TabsContainerWrapper } from "~/utils/CustomStyles";
// import RecentOrders from "./RecentOrders";
// import Chart from "./Chart";
// import { URL } from "~/utils/BaseURL";

// export default function Marketing() {
//   const [currentTab, setCurrentTab] = useState("table");
//   const [utmData, setUtmData] = useState([]);
//   const [gclidData, setGclidData] = useState([]);
//   const [datesData, setDatesData] = useState([]);
//   const [allAssignmentsData, setAllAssignmentsData] = useState([]);
//   const [marketingSource, setMarketingSource] = useState([]);
//   const [marketingSourceSeries, setMarketingSourceSeries] = useState([]);
//   const [marketingMedium, setMarketingMedium] = useState([]);
//   const [marketingCampaign, setMarketingCampaign] = useState([]);
//   const [combinedData, setCombinedData] = useState([]);
//   const tabs = [
//     { value: "table", label: "Table" },
//     { value: "chart", label: "Chart" },
//   ];

//   const handleTabsChange = (event, value) => {
//     setCurrentTab(value);
//   };

//   useEffect(() => {
//     axios
//       .get(`${URL}/team/marketingtable.php`)
//       .then((response) => {
//         console.log(response?.data);
//         setAllAssignmentsData(response?.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });

//     let source = [];
//     let medium = [];
//     let campaign = [];

//     allAssignmentsData?.map((cryptoOrder) => {
//       if (cryptoOrder?.data?.utm_data?.utm_source) {
//         source.push(cryptoOrder?.data?.utm_data?.utm_source);
//       }
//       if (cryptoOrder?.data?.utm_data?.utm_medium) {
//         medium.push(cryptoOrder?.data?.utm_data?.utm_medium);
//       }
//       if (cryptoOrder?.data?.utm_data?.utm_campaign) {
//         campaign.push(cryptoOrder?.data?.utm_data?.utm_campaign);
//       }
//     });

//     setMarketingSource([...new Set(source)]);
//     // setMarketingSourceSeries(
//     //   marketingSource?.map((source) => {
//     //     return {
//     //       name: source,
//     //       data: allAssignmentsData?.filter(
//     //         (cryptoOrder) => cryptoOrder?.data?.utm_data?.utm_source === source
//     //       ).length,
//     //     };
//     //   })
//     // );
//     setMarketingMedium([...new Set(medium)]);
//     setMarketingCampaign([...new Set(campaign)]);
//     setUtmData(
//       allAssignmentsData
//         ?.filter(
//           (cryptoOrder) => cryptoOrder?.data?.utm_data?.utm_source !== ""
//         )

//         // keep only unique values
//         .filter(
//           (cryptoOrder, index, self) =>
//             index ===
//             self.findIndex(
//               (t) =>
//                 t?.data?.utm_data?.utm_source ===
//                 cryptoOrder?.data?.utm_data?.utm_source
//             )
//         )
//     );

//     setGclidData(
//       allAssignmentsData?.filter(
//         (cryptoOrder) => cryptoOrder?.data?.gcl_data?.gclid !== null
//       )
//     );

//     // calculate the number of leads for utm source and gclid
//     setCombinedData([
//       {
//         name: "utm_source",
//         data: allAssignmentsData
//           ?.filter(
//             (cryptoOrder) => cryptoOrder?.data?.utm_data?.utm_source !== ""
//           )
//           .filter(
//             (cryptoOrder, index, self) =>
//               index ===
//               self.findIndex(
//                 (t) =>
//                   t?.data?.utm_data?.utm_source ===
//                   cryptoOrder?.data?.utm_data?.utm_source
//               )
//           ).length,
//       },
//       {
//         name: "gclid",
//         data: allAssignmentsData?.filter(
//           (cryptoOrder) => cryptoOrder?.data?.gcl_data?.gclid !== null
//         ).length,
//       },
//     ]);

//     setDatesData(
//       allAssignmentsData?.map((cryptoOrder) => cryptoOrder?.added_on)
//     );
//   }, []);

//   console.log("utmData", utmData);
//   console.log("gclidData", gclidData);
//   console.log("combinedData", combinedData);
//   console.log("datesData", datesData);
//   return (
//     <>
//       <Helmet>
//         <title>Marketing Response</title>
//       </Helmet>
//       <PageTitleWrapper>
//         <PageHeader />
//       </PageTitleWrapper>
//       <TabsContainerWrapper>
//         <Tabs
//           onChange={handleTabsChange}
//           value={currentTab}
//           variant="scrollable"
//           scrollButtons="auto"
//           textColor="primary"
//           indicatorColor="primary"
//         >
//           {tabs.map((tab) => (
//             <Tab key={tab.value} label={tab.label} value={tab.value} />
//           ))}
//         </Tabs>
//       </TabsContainerWrapper>
//       <Box
//         fullwidth="true"
//         sx={{
//           mx: 2,
//         }}
//       >
//         {currentTab === "table" && (
//           <Grid
//             container
//             direction="row"
//             justifyContent="center"
//             alignItems="stretch"
//             spacing={3}
//           >
//             <Grid item xs={12}>
//               <RecentOrders allAssignmentsData={allAssignmentsData} />
//             </Grid>
//           </Grid>
//         )}

//         {currentTab === "chart" && (
//           <Grid
//             container
//             direction="row"
//             justifyContent="center"
//             alignItems="stretch"
//             spacing={3}
//           >
//             <Grid item xs={12}>
//               <Chart utmData={utmData} gclidData={gclidData} />
//             </Grid>
//           </Grid>
//         )}
//       </Box>
//     </>
//   );
// }

import React from "react";

const Marketing = () => {
  return <div></div>;
};

export default Marketing;
