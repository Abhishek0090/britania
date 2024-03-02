import React, { useState } from "react";
import { useNavigate } from "react-router";
import moment from "moment";
import {
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader,
  OutlinedInput,
  styled,
  InputAdornment,
} from "@mui/material";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import MarksChat from "./MarksChart";

import Label from "~/pages/TeamPages/components/Label";

const OutlinedInputWrapper = styled(OutlinedInput)(
  ({ theme }) => `
    background-color: ${theme.colors.alpha.white[100]};
    padding-right: ${theme.spacing(0.7)}
`
);

const getStatusLabel = (cryptoOrderStatus) => {
  const map = {
    Posted: {
      text: "Posted",
      color: "secondary",
    },
    "Under Process": {
      text: "Under Process",
      color: "warning",
    },
    Lost: {
      text: "Lost",
      color: "error",
    },
    "Assigned to Project Manager": {
      text: "Assigned to Project Manager",
      color: "primary",
    },
    "Assigned to Freelancer": {
      text: "Assigned to Freelancer",
      color: "primary",
    },
    Completed: {
      text: "Completed",
      color: "success",
    },
    "Review Received": {
      text: "Review Received",
      color: "info",
    },
  };

  // Check if cryptoOrderStatus exists in the map, or use a default value
  const { text, color } = map[cryptoOrderStatus] || {
    text: "Unknown Status",
    color: "default",
  };

  return <Label color={color}>{text}</Label>;
};

const getProgressLabel = (cryptoOrderStatus) => {
  const map = {
    Posted: {
      text: "Posted",
      color: "success",
    },
    "Under Process": {
      text: "Under Process",
      color: "warning",
    },
    Lost: {
      text: "Lost",
      color: "error",
    },
    "Assigned to Project Manager": {
      text: "Assigned to Project Manager",
      color: "success",
    },
    Completed: {
      text: "Completed",
      color: "warning",
    },
    Reviewed: {
      text: "Reviewed",
      color: "info",
    },
  };

  const { text, color } = map[cryptoOrderStatus];

  return <Label color={color}>{text}</Label>;
};

const applyPagination = (cryptoOrders, page, limit) => {
  if (cryptoOrders?.length > 0) {
    return cryptoOrders?.slice(page * limit, page * limit + limit);
  } else {
    return [];
  }
};

export default function AssignmentsTable({ cryptoOrders }) {
  const navigate = useNavigate();
  const [selectedSearchOption, setSelectedSearchOption] = useState("title");
  const [selectedCryptoOrders, setSelectedCryptoOrders] = useState([]);
  const selectedBulkActions = selectedCryptoOrders.length > 0;
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(50);
  const [filters, setFilters] = useState({
    status: null,
  });

  const [searchParam, setSearchParam] = useState({
    search: null,
  });

  const statusOptions = [
    {
      id: "all",
      name: "All",
    },
    {
      id: "Posted",
      name: "Posted",
    },
    {
      id: "Under Process",
      name: "Under Process",
    },
    {
      id: "Assigned to Project Manager",
      name: "Assigned to Project Manager",
    },
    {
      id: "Assigned to Freelancer",
      name: "Assigned to Freelancer",
    },
    {
      id: "Completed",
      name: "Completed",
    },
    {
      id: "Review Received",
      name: "Review Received",
    },
    {
      id: "Lost",
      name: "Lost",
    },
  ];

  const [dateFilters, setDateFilters] = useState({
    months: "",
    years: "",
    category: "",
  });
  const applyFilters = (cryptoOrders, filters) => {
    return cryptoOrders?.filter((cryptoOrder) => {
      let matches = true;

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

      if (
        filters?.status &&
        cryptoOrder?.assignment_status !== filters?.status
      ) {
        matches = false;
      }

      if (selectedSearchOption === "title") {
        if (
          filters?.search &&
          !cryptoOrder?.assignment_title
            ?.toLowerCase()
            .includes(filters?.search?.toLowerCase())
        ) {
          matches = false;
        }
      } else if (selectedSearchOption === "desc") {
        if (
          filters?.search &&
          !cryptoOrder?.assignment_description
            ?.toLowerCase()
            .includes(filters?.search?.toLowerCase())
        ) {
          matches = false;
        }
      }

      return matches;
    });
  };

  const handleStatusChange = (e) => {
    let value = null;

    if (e.target.value !== "all") {
      value = e.target.value;
    }

    if (e.target.value === "all") {
      value = null;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value,
    }));
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  const filteredCryptoOrders = applyFilters(cryptoOrders, filters);

  const filteredCryptoOrdersBySearch = applyFilters(
    filteredCryptoOrders,
    searchParam
  );

  // Category

  const filteredByCategory = applyFilters(
    filteredCryptoOrdersBySearch,
    dateFilters
  );

  // Months

  const filteredByMonths = applyFilters(filteredByCategory, dateFilters);

  // Years

  const filteredByYears = applyFilters(filteredByMonths, dateFilters);

  const paginatedCryptoOrders = applyPagination(filteredByYears, page, limit);

  const handleSearch = (event) => {
    let value = null;
    if (event.target.value !== "") {
      value = event.target.value;
    }

    if (event.target.value === "") {
      value = null;
    }

    setSearchParam((prevFilters) => ({
      ...prevFilters,
      search: value,
    }));
  };

  return (
    <React.Fragment>
      <Card>
        <MarksChat
          paginatedCryptoOrders={paginatedCryptoOrders}
          dateFilters={dateFilters}
          setDateFilters={setDateFilters}
        />

        {selectedBulkActions && (
          <Box flex={1} p={2}>
            <BulkActions />
          </Box>
        )}
        {!selectedBulkActions && (
          <CardHeader
            action={
              <div className="flex items-start md:justify-end md:w-[35rem] w-[20rem]">
                <div className="flex items-center justify-start w-2/3 ">
                  {/* TODO: Status filter */}
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={filters?.status || "all"}
                      onChange={handleStatusChange}
                      label="Status"
                      autoWidth
                    >
                      {statusOptions.map((statusOption) => (
                        <MenuItem
                          key={statusOption?.id}
                          value={statusOption?.id}
                        >
                          {statusOption?.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
            }
          />
        )}
        <FormControl
          variant="outlined"
          fullWidth
          sx={{
            p: 2,
          }}
        >
          <OutlinedInputWrapper
            type="text"
            value={searchParam?.search || ""}
            onChange={handleSearch}
            placeholder="Search text here..."
            startAdornment={
              <InputAdornment position="start">
                <SearchTwoToneIcon />
                <div className="flex gap-2">
                  <Label
                    sx={{
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      console.log("Title");
                      setSelectedSearchOption("title");
                    }}
                    color={
                      selectedSearchOption === "title" ? "success" : "info"
                    }
                  >
                    Title
                  </Label>
                  <Label
                    sx={{
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      console.log("Desc");
                      setSelectedSearchOption("desc");
                    }}
                    color={selectedSearchOption === "desc" ? "success" : "info"}
                  >
                    Desc
                  </Label>
                </div>
              </InputAdornment>
            }
          />
        </FormControl>
        <Divider />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Assignment ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Marks</TableCell>
                <TableCell>Budget</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedCryptoOrders?.map((cryptoOrder) => {
                const isCryptoOrderSelected = selectedCryptoOrders?.includes(
                  cryptoOrder?.assignment_id
                );
                return (
                  <TableRow
                    hover
                    key={cryptoOrder?.assignment_id}
                    selected={isCryptoOrderSelected}
                  >
                    <TableCell>
                      <Typography
                        sx={{
                          cursor: "pointer",
                        }}
                        variant="body1"
                        fontWeight="bold"
                        gutterBottom
                        noWrap
                        onClick={() =>
                          navigate(
                            `/team/management/assignments/details/${cryptoOrder?.assignment_id}`
                          )
                        }
                        color="#3f51b5"
                      >
                        {cryptoOrder?.assignment_id}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {moment(cryptoOrder?.assignment_deadline).format(
                          "MMMM Do YYYY, h:mm:ss a"
                        )}
                      </Typography>
                    </TableCell>

                    <TableCell
                      sx={{
                        maxWidth: "430px",
                        wordBreak: "break-words",
                      }}
                    >
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {cryptoOrder?.assignment_title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          maxWidth: "430px",
                        }}
                      >
                        {cryptoOrder?.assignment_description?.length > 350
                          ? cryptoOrder?.assignment_description?.slice(0, 350) +
                            "..."
                          : cryptoOrder?.assignment_description}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                      >
                        {cryptoOrder?.marks_obtained &&
                          cryptoOrder?.marks_out_of &&
                          cryptoOrder?.marks_obtained +
                            "/" +
                            cryptoOrder?.marks_out_of}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                      >
                        ₹
                        {cryptoOrder?.assignment_budget?.toLocaleString(
                          "en-US",
                          {
                            style: "currency",
                            currency: "INR",
                          }
                        )}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        gutterBottom
                        whiteSpace="nowrap"
                      >
                        {cryptoOrder?.assignment_status === ""
                          ? null
                          : getStatusLabel(cryptoOrder?.assignment_status)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Box p={2}>
          <TablePagination
            component="div"
            count={filteredCryptoOrders?.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25, 30, 50, 75, 100, 200]}
          />
        </Box>
      </Card>
    </React.Fragment>
  );
}
