import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  Divider,
  FormControl,
  OutlinedInput,
  InputAdornment,
  styled,
  Box,
  Tab,
  Tabs,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import { TabsContainerWrapper } from "~/utils/CustomStyles";
import Label from "~/pages/TeamPages/components/Label";
import TotalCard from "./TotalCard";
import MarksChart from "./MarksChart";
import moment from "moment";

const OutlinedInputWrapper = styled(OutlinedInput)(
  ({ theme }) => `
    background-color: ${theme.colors.alpha.white[100]};
    padding-right: ${theme.spacing(0.7)}
`
);

function AssignmentsTable({ inquiriesTable, assignedTable, totalData }) {
  const [currentTab, setCurrentTab] = useState("1");
  const [tempRows, setTempRows] = useState([]);
  const [tempRowsAssigned, setTempRowsAssigned] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const [searchParamAssigned, setSearchParamAssigned] = useState("");
  let inqRows = [];
  let assignedRows = [];

  const [dateFilters, setDateFilters] = useState({
    months: "",
    years: "",
    category: "",
  });

  const tabs = [
    { value: "1", label: "Assigned Table" },
    { value: "2", label: "Inquiries Table" },
  ];

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  if (inquiriesTable) {
    inqRows = inquiriesTable?.map((ass) => {
      return {
        id: ass?.inquiry_id,
        assignmentId: ass?.assignment_id,
        title: ass?.assignment_title,
        marks:
          ass?.marks_obtained &&
          ass?.marks_out_of &&
          ass?.marks_obtained + "/" + ass?.marks_out_of,
        marks_obtained: ass?.marks_obtained,
        marks_out_of: ass?.marks_out_of,
        marks_category: ass?.marks_category,
        feedback: ass?.feedback,
        marks_added_on: ass?.marks_added_on,
        deadline: ass?.assignment_deadline,
        budget: ass?.assignment_budget,
        status: ass?.status,
      };
    });
  }
  if (assignedTable) {
    assignedRows = assignedTable?.map((ass) => {
      return {
        id: ass?.assignment_id,
        assignmentId: ass?.assignment_id,
        title: ass?.assignment_title,
        marks:
          ass?.marks_obtained &&
          ass?.marks_out_of &&
          ass?.marks_obtained + "/" + ass?.marks_out_of,
        marks_obtained: ass?.marks_obtained,
        marks_out_of: ass?.marks_out_of,
        marks_category: ass?.marks_category,
        feedback: ass?.feedback,
        marks_added_on: ass?.marks_added_on,

        deadline: ass?.assignment_deadline,
        budget: ass?.assignment_budget,
        status: ass?.status,
      };
    });
  }

  const applyFilters = (cryptoOrders, filters) => {
    return cryptoOrders?.filter((cryptoOrder) => {
      let matches = true;

      if (filters?.status && cryptoOrder?.status !== filters?.status) {
        matches = false;
      }

      //Category

      const category = cryptoOrder?.marks_category;
      const selectedCategory = filters?.category;

      if (selectedCategory && category !== selectedCategory) {
        matches = false;
      }

      const monthInData = parseInt(cryptoOrder?.marks_added_on?.split("-")[1]);
      const selectedMonth = parseInt(filters.months);

      //Months
      if (selectedMonth && monthInData !== selectedMonth) {
        matches = false;
      }

      const yearsInData = parseInt(cryptoOrder?.marks_added_on?.split("-")[2]);
      const selectedYears = parseInt(filters.years);

      //Years
      if (selectedYears && yearsInData !== selectedYears) {
        matches = false;
      }

      return matches;
    });
  };

  // Category

  const filteredByCategory = applyFilters(assignedRows, dateFilters);
  // Months
  const filteredByMonths = applyFilters(filteredByCategory, dateFilters);
  // Years
  const finalFilteredData = applyFilters(filteredByMonths, dateFilters);

  // Inquiry Filters
  // Category

  const filteredByCategoryInq = applyFilters(inqRows, dateFilters);
  // Months
  const filteredByMonthsInq = applyFilters(filteredByCategoryInq, dateFilters);
  // Years
  const finalFilteredDataInq = applyFilters(filteredByMonthsInq, dateFilters);

  function formatDate(deadlineString) {
    // Parse the date string using moment
    const deadlineMoment = moment(deadlineString, "YYYY-MM-DD HH:mm:ss");

    // Format the date as per your requirement
    const formattedDeadline = deadlineMoment.format("DD/MM/YYYY h:mm A");

    return formattedDeadline;
  }

  const columns = [
    {
      field: "assignmentId",
      headerName: "ID",
      minWidth: window.innerWidth > 600 ? 100 : 150,
      renderCell: (params) => (
        <Link
          to={`/team/management/assignments/details/${params?.row?.assignmentId}`}
          className="flex items-center text-blue306 font-semibold"
        >
          {params?.row?.assignmentId}
        </Link>
      ),
    },
    {
      field: "title",
      headerName: "Title",
      minWidth: window.innerWidth > 600 ? 500 : 250,
      renderCell: (params) => <div className="w-20">{params?.row?.title}</div>,
    },
    {
      field: "marks",
      headerName: "Marks",
      minWidth: window.innerWidth > 200 ? 200 : 200,
      renderCell: (params) => (
        <div className="w-20">
          {params?.row?.marks}

          {/* {params?.rows?.marks_obtained &&
            params?.rows?.marks_out_of &&
            params?.rows?.marks_obtained + "/" + params?.rows?.marks_out_of} */}
        </div>
      ),
    },
    {
      field: "marks_added_on",
      headerName: "Marks Added On",
      minWidth: window.innerWidth > 200 ? 200 : 200,
      renderCell: (params) => (
        <div className="w-20">
          {formatDate(params?.row?.marks_added_on)}

          {/* {params?.rows?.marks_obtained &&
            params?.rows?.marks_out_of &&
            params?.rows?.marks_obtained + "/" + params?.rows?.marks_out_of} */}
        </div>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: window.innerWidth > 600 ? 200 : 250,
      renderCell: (params) => (
        <div className="w-20">
          {params?.row?.status === "Posted" && (
            <Label color="primary">{params?.row?.status}</Label>
          )}
          {params?.row?.status === "Under Process" && (
            <Label color="warning">{params?.row?.status}</Label>
          )}
          {params?.row?.status === "Lost" && (
            <Label color="error">{params?.row?.status}</Label>
          )}
          {params?.row?.status === "Assigned to PM" && (
            <Label color="black">{params?.row?.status}</Label>
          )}
          {params?.row?.status === "Assigned to Freelancer" && (
            <Label color="black">{params?.row?.status}</Label>
          )}
          {params?.row?.status === "Completed" && (
            <Label color="success">{params?.row?.status}</Label>
          )}
          {params?.row?.status === "Review Received" && (
            <Label color="info">{params?.row?.status}</Label>
          )}
          {params?.row?.status === "Error" && (
            <Label color="error">{params?.row?.status}</Label>
          )}
          {params?.row?.status === "Resit" && (
            <Label color="error">{params?.row?.status}</Label>
          )}
        </div>
      ),
    },
    {
      field: "deadline",
      headerName: "Deadline",
      minWidth: window.innerWidth > 600 ? 200 : 220,
      renderCell: (params) => (
        <span className="flex items-center">
          {formatDate(params?.row?.deadline)}
        </span>
      ),
    },
    {
      field: "budget",
      headerName: "Budget",
      minWidth: window.innerWidth > 600 ? 100 : 100,
      renderCell: (params) => (
        <span className="flex items-center">₹{params?.row?.budget}</span>
      ),
    },
  ];

  const handleSearch = (event) => {
    setSearchParam(event.target.value);
    if (searchParam !== "") {
      const filteredRows = inqRows?.filter((row) => {
        return row?.title
          .toLowerCase()
          .includes(event.target.value.toLowerCase());
      });
      setTempRows(filteredRows);
    }
  };

  const handleSearchAssigned = (event) => {
    setSearchParamAssigned(event.target.value);
    if (searchParamAssigned !== "") {
      const filteredRows = assignedRows?.filter((row) => {
        return row?.title
          .toLowerCase()
          .includes(event.target.value.toLowerCase());
      });
      setTempRowsAssigned(filteredRows);
    }
  };

  return (
    <div id="table">
      <Card sx={{ height: "100%" }}>
        <CardHeader title="Assignment History" />

        <Card>
          <TotalCard totalData={totalData} />
        </Card>

        <Box
          fullwidth="true"
          sx={{
            mx: 2,
            my: 3,
          }}
        >
          {" "}
          <TabsContainerWrapper>
            <Tabs
              onChange={handleTabsChange}
              value={currentTab}
              variant="scrollable"
              scrollButtons="auto"
              textColor="primary"
              indicatorColor="primary"
            >
              {tabs.map((tab) => (
                <Tab key={tab.value} label={tab.label} value={tab.value} />
              ))}
            </Tabs>
          </TabsContainerWrapper>
        </Box>
        <Divider />

        {currentTab === "1" && (
          <>
            <MarksChart
              dateFilters={dateFilters}
              setDateFilters={setDateFilters}
              paginatedCryptoOrders={finalFilteredData}
            />

            <FormControl variant="outlined" sx={{ m: 2 }}>
              <OutlinedInputWrapper
                type="text"
                value={searchParamAssigned}
                onChange={handleSearchAssigned}
                placeholder="Search title here..."
                startAdornment={
                  <InputAdornment position="start">
                    <SearchTwoToneIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
            <Box sx={{ width: "100%", p: 1 }}>
              <DataGrid
                autoHeight
                rows={
                  searchParamAssigned !== ""
                    ? tempRowsAssigned
                    : finalFilteredData
                }
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 25,
                    },
                  },
                }}
                disableRowSelectionOnClick
              />
            </Box>
          </>
        )}
        {currentTab === "2" && (
          <>
            {" "}
            {/* <MarksChart
              dateFilters={dateFilters}
              setDateFilters={setDateFilters}
              paginatedCryptoOrders={finalFilteredDataInq}
            /> */}
            <FormControl variant="outlined" sx={{ m: 2 }}>
              <OutlinedInputWrapper
                type="text"
                value={searchParam}
                onChange={handleSearch}
                placeholder="Search title here..."
                startAdornment={
                  <InputAdornment position="start">
                    <SearchTwoToneIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
            <Box sx={{ width: "100%", p: 1 }}>
              <DataGrid
                autoHeight
                rows={searchParam !== "" ? tempRows : finalFilteredDataInq}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 25,
                    },
                  },
                }}
                disableRowSelectionOnClick
              />
            </Box>
          </>
        )}
      </Card>
    </div>
  );
}

export default AssignmentsTable;
