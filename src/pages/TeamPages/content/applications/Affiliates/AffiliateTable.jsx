import React, { Suspense, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import {
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
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

import Label from "~/pages/TeamPages/components/Label";
// import BulkActions from "./BulkActions";
import { LucideCrown } from "lucide-react";
import Premium from "~/assets/premium/select.png";
import axios from "axios";
import { URL } from "~/utils/BaseURL";
import Graphical from "./Graphical";

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
      color: "primary",
    },
    "Under Process": {
      text: "Under Process",
      color: "warning",
    },
    Lost: {
      text: "Lost",
      color: "error",
    },
    "Assigned to PM": {
      text: "Assigned to PM",
      color: "black",
    },
    "Assigned to Freelancer": {
      text: "Assigned to Freelancer",
      color: "black",
    },
    Completed: {
      text: "Completed",
      color: "success",
    },
    "Review Received": {
      text: "Review Received",
      color: "info",
    },
    Resit: {
      text: "Resit",
      color: "error",
    },
  };

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
    "Assigned to PM": {
      text: "Assigned to PM",
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
    Resit: {
      text: "Resit",
      color: "error",
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

export default function AffiliateTable({
  cryptoOrders,
  statusName,
  streamName,
  totalData,
}) {
  const navigate = useNavigate();
  const [selectedSearchOption, setSelectedSearchOption] = useState(
    localStorage.getItem("searchOption")
      ? localStorage.getItem("searchOption")
      : "name"
  );
  const [selectedCryptoOrders, setSelectedCryptoOrders] = useState([]);
  const selectedBulkActions = selectedCryptoOrders.length > 0;
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(50);

  const location = useLocation().pathname.split("/assignments")[1];

  const [filters, setFilters] = useState({
    status: statusName,
  });

  const [stream, setStream] = useState({
    stream: streamName,
  });

  const [pmFilter, setPmFilter] = useState({
    project_manager: null,
  });

  const [dateFilters, setDateFilters] = useState({
    months: "",
    years: "",
    category: "",
  });

  const [payStatus, setPayStatus] = useState({
    paystatus: null,
  });

  const [searchParam, setSearchParam] = useState({
    search: null,
  });

  const currentId = localStorage.getItem("currentId");

  useEffect(() => {
    if (localStorage.getItem("search")) {
      let search = JSON.parse(localStorage.getItem("search"));

      Object.values(search).forEach((key, value) => {
        setSearchParam((prev) => ({ ...prev, search: key }));
      });
    }
    if (localStorage.getItem("stream")) {
      let stream = JSON.parse(localStorage.getItem("stream"));
      Object.values(stream).forEach((key, value) => {
        setStream((prev) => ({ ...prev, stream: key }));
      });
    }

    if (localStorage.getItem("status")) {
      let status = JSON.parse(localStorage.getItem("status"));
      Object.values(status).forEach((key, value) => {
        setFilters((prev) => ({ ...prev, status: key }));
      });
    }

    if (localStorage.getItem("pm")) {
      let pm = JSON.parse(localStorage.getItem("pm"));
      Object.values(pm).forEach((key, value) => {
        setPmFilter((prev) => ({ ...prev, project_manager: key }));
      });
    }

    if (localStorage.getItem("paystatus")) {
      let status = JSON.parse(localStorage.getItem("paystatus"));
      Object.values(status).forEach((key, value) => {
        setFilters((prev) => ({ ...prev, paystatus: key }));
      });
    }
  }, [location]);

  //for storing our search data locally
  useEffect(() => {
    if (!currentId) {
      localStorage.removeItem("search");
      localStorage.removeItem("stream");
      localStorage.removeItem("status");
      localStorage.removeItem("paystatus");
      localStorage.removeItem("pm");
      localStorage.removeItem("currentId");
      localStorage.removeItem("searchOption");
      setSearchParam((prev) => ({ ...prev, search: null }));
      setStream((prev) => ({ ...prev, stream: streamName }));
      setPmFilter((prev) => ({ ...prev, project_manager: null }));
      setPayStatus((prev) => ({ ...prev, paystatus: null }));
      setFilters((prev) => ({ ...prev, status: statusName }));
      setSelectedSearchOption("name");
    }
  }, [location, currentId]);

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
      id: "Assigned to PM",
      name: "Assigned to PM",
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
    {
      id: "Resit",
      name: "Resit",
    },
  ];

  const streamOptions = [
    {
      id: "all",
      name: "All",
    },
    {
      id: "Engineering",
      name: "Engineering",
    },
    {
      id: "Arts",
      name: "Arts",
    },
    {
      id: "Medical",
      name: "Medical",
    },
    {
      id: "Commerce",
      name: "Commerce",
    },
  ];

  const payOptions = [
    {
      id: "all",
      name: "All",
    },
    {
      id: "Paid",
      name: "Paid",
    },
    {
      id: "Unpaid",
      name: "Unpaid",
    },
  ];

  // const pmO = [
  //   {
  //     id: "all",
  //     name: "All",
  //   },
  //   {
  //     id: "Engineering",
  //     name: "Engineering",
  //   },
  //   {
  //     id: "Arts",
  //     name: "Arts",
  //   },
  //   {
  //     id: "Medical",
  //     name: "Medical",
  //   },
  //   {
  //     id: "Commerce",
  //     name: "Commerce",
  //   },
  // ];

  const [pmData, setPmData] = useState([]);

  useEffect(() => {
    axios
      .get(`${URL}/team/pmtable.php`)
      .then((response) => {
        console.log(response?.data);

        const filteredData = response?.data?.filter(
          (item) => item?.array_type === "PM Array"
        );

        const finalData = filteredData?.map((item) => ({
          id: item.name,
          name: item.name,
        }));
        setPmData([{ id: "all", name: "All" }, ...finalData]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(pmData);

  const applyFilters = (cryptoOrders, filters) => {
    return cryptoOrders?.filter((cryptoOrder) => {
      let matches = true;

      // TODO: Project Manager Filter

      if (filters?.status && cryptoOrder?.status !== filters?.status) {
        matches = false;
      }

      if (filters?.stream && cryptoOrder?.stream !== filters?.stream) {
        matches = false;
      }

      if (
        filters?.project_manager &&
        cryptoOrder?.pm_name !== filters?.project_manager
      ) {
        matches = false;
      }

      if (
        filters?.paystatus &&
        cryptoOrder?.affiliate_data?.paid_status !== filters?.paystatus
      ) {
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

      if (selectedSearchOption === "id") {
        if (
          filters?.search &&
          !cryptoOrder?.id
            ?.toLowerCase()
            .includes(filters?.search?.toLowerCase())
        ) {
          matches = false;
        }
      } else if (selectedSearchOption === "name") {
        if (
          filters?.search &&
          !cryptoOrder?.user_name
            ?.toLowerCase()
            .includes(filters?.search?.toLowerCase())
        ) {
          matches = false;
        }
      } else if (selectedSearchOption === "title") {
        if (
          filters?.search &&
          !cryptoOrder?.title
            ?.toLowerCase()
            .includes(filters?.search?.toLowerCase())
        ) {
          matches = false;
        }
      } else if (selectedSearchOption === "desc") {
        if (
          filters?.search &&
          !cryptoOrder?.description
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

    let statusParse = JSON.stringify({ status: e.target.value });

    localStorage.setItem("status", statusParse);
  };

  const handleStreamChange = (e) => {
    let value = null;
    if (e.target.value !== "all") {
      value = e.target.value;
    }

    if (e.target.value === "all") {
      value = null;
    }
    setStream((prevFilters) => ({
      ...prevFilters,
      stream: value,
    }));

    let streamParse = JSON.stringify({ stream: e.target.value });

    localStorage.setItem("stream", streamParse);
  };

  const handlePmChange = (e) => {
    let value = null;
    if (e.target.value !== "all") {
      value = e.target.value;
    }

    if (e.target.value === "all") {
      value = null;
    }
    setPmFilter((prevFilters) => ({
      ...prevFilters,
      project_manager: value,
    }));

    let pmparse = JSON.stringify({ pm: e.target.value });

    localStorage.setItem("pm", pmparse);
  };

  const handlePayChange = (e) => {
    let value = null;
    if (e.target.value !== "all") {
      value = e.target.value;
    }

    if (e.target.value === "all") {
      value = null;
    }
    setPayStatus((prevFilters) => ({
      ...prevFilters,
      paystatus: value,
    }));

    let payparsed = JSON.stringify({ paystatus: e.target.value });

    localStorage.setItem("paystatus", payparsed);
  };
  const handleClearFilters = () => {
    setFilters({
      status: null,
    });

    setStream({
      stream: null,
    });
  };

  const handleSelectAllCryptoOrders = (event) => {
    setSelectedCryptoOrders(
      event.target.checked
        ? cryptoOrders?.map((cryptoOrder) => cryptoOrder?.id)
        : []
    );
  };

  const handleSelectOneCryptoOrder = (event, cryptoOrderId) => {
    if (!selectedCryptoOrders.includes(cryptoOrderId)) {
      setSelectedCryptoOrders((prevSelected) => [
        ...prevSelected,
        cryptoOrderId,
      ]);
    } else {
      setSelectedCryptoOrders((prevSelected) =>
        prevSelected?.filter((id) => id !== cryptoOrderId)
      );
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  const filteredCryptoOrders = applyFilters(cryptoOrders, filters);

  const filterdCryptoOrdersByPm = applyFilters(filteredCryptoOrders, pmFilter);

  const filteredCryptoOrdersByStream = applyFilters(
    filterdCryptoOrdersByPm,
    stream
  );

  const filteredCryptoOrdersBySearch = applyFilters(
    filteredCryptoOrdersByStream,
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

  // Pay Status

  const filteredFinalData = applyFilters(filteredByYears, payStatus);

  const paginatedCryptoOrders = applyPagination(filteredFinalData, page, limit);

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

    let searchParse = JSON.stringify({ search: event.target.value });

    localStorage.setItem("search", searchParse);
  };

  const selectedSomeCryptoOrders =
    selectedCryptoOrders?.length > 0 &&
    selectedCryptoOrders?.length < cryptoOrders?.length;
  const selectedAllCryptoOrders =
    selectedCryptoOrders?.length === cryptoOrders?.length;
  const theme = useTheme();

  return (
    <React.Fragment>
      <Card>
        {/* {selectedBulkActions && (
          <Box flex={1} p={2}>
            <BulkActions />
          </Box>
        )} */}

        {!selectedBulkActions && (
          <CardHeader
            action={
              <div className="flex flex-col md:flex-row flex-no-wrap items-center md:ml-0 ml-0 md:items-center justify-center md:justify-start gap-10 md:w-[72rem] w-[30rem]">
                <Graphical
                  paginatedCryptoOrders={paginatedCryptoOrders}
                  dateFilters={dateFilters}
                  setDateFilters={setDateFilters}
                  totalData={totalData}
                />
                {/* TODO: Stream Filter */}
                <div className="flex items-center justify-start w-2/3 ">
                  <FormControl fullWidth variant="outlined" sx={{ mr: 4 }}>
                    <InputLabel>PM</InputLabel>
                    <Select
                      value={pmFilter?.project_manager || "all"}
                      onChange={handlePmChange}
                      label="PM"
                      autoWidth
                    >
                      {pmData?.map((pm) => (
                        <MenuItem key={pm?.id} value={pm?.id}>
                          {pm?.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>

                <div className="flex items-center justify-start w-2/3 ">
                  <FormControl fullWidth variant="outlined" sx={{ mr: 4 }}>
                    <InputLabel>Stream</InputLabel>
                    <Select
                      value={stream?.stream || "all"}
                      onChange={handleStreamChange}
                      label="Stream"
                      autoWidth
                    >
                      {streamOptions.map((stream) => (
                        <MenuItem key={stream?.id} value={stream?.id}>
                          {stream?.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>

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

                <div className="flex items-center justify-start w-2/3 ">
                  {/* TODO: Status filter */}
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Pay Status</InputLabel>
                    <Select
                      value={payStatus?.paystatus || "all"}
                      onChange={handlePayChange}
                      label="Pay Status"
                      autoWidth
                    >
                      {payOptions.map((payOption) => (
                        <MenuItem key={payOption?.id} value={payOption?.id}>
                          {payOption?.name}
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
                      console.log("Assignment Id");
                      setSelectedSearchOption("id");
                      JSON.stringify(
                        localStorage.setItem("searchOption", "id")
                      );
                    }}
                    color={selectedSearchOption === "id" ? "success" : "info"}
                  >
                    ID
                  </Label>
                  <Label
                    sx={{
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      console.log("Name");
                      setSelectedSearchOption("name");
                      JSON.stringify(
                        localStorage.setItem("searchOption", "name")
                      );
                    }}
                    color={selectedSearchOption === "name" ? "success" : "info"}
                  >
                    Name
                  </Label>
                  <Label
                    sx={{
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      console.log("Title");
                      setSelectedSearchOption("title");
                      JSON.stringify(
                        localStorage.setItem("searchOption", "title")
                      );
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
                      JSON.stringify(
                        localStorage.setItem("searchOption", "desc")
                      );
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
        {/* <Suspense fallback={<div>Loading....</div>}> */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="w-[5rem]">Assignment ID</TableCell>
                <TableCell className="w-[13rem]">User Name</TableCell>
                <TableCell className="w-[13rem]">Affiliated Amount</TableCell>
                <TableCell className="w-[13rem]">Affiliated Status</TableCell>
                <TableCell>Stream</TableCell>
                <TableCell>Title</TableCell>
                <TableCell className="w-[12rem]">Budget</TableCell>
                <TableCell className="w-[12rem]">Marks</TableCell>
                <TableCell className="w-[12rem]">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedCryptoOrders?.map((cryptoOrder) => {
                const isCryptoOrderSelected = selectedCryptoOrders?.includes(
                  cryptoOrder?.id
                );

                const firstname = cryptoOrder?.user_name.split(" ")[0];
                const lastname = cryptoOrder?.user_name.split(" ")[1];

                return (
                  <TableRow
                    hover
                    key={cryptoOrder?.id}
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
                            `/team/management/assignments/details/${cryptoOrder?.id}`
                          )
                        }
                        color="#3f51b5"
                      >
                        {cryptoOrder?.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        onClick={() =>
                          navigate(
                            `/team/management/student/details-student/${cryptoOrder?.user_id}`
                          )
                        }
                        sx={{
                          cursor: "pointer",
                        }}
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                        className={`flex flex-wrap gap-4 items-center ${
                          cryptoOrder?.is_select === "1"
                            ? "text-yellow-500"
                            : "text-white"
                        }  `}
                        // className="flex items-center justify-center  px-1 py-2 mb-3 text-md font-bold text-[#b59a53] border-2 border-[#b59a53]  rounded-lg md:w-auto md:mr-3 md:mb-0 focus:outline-none"
                      >
                        <div className="flex gap-2">
                          {cryptoOrder?.affiliate_data?.affiliate_code_by !==
                            null && (
                            <span className="font-bold text-white">(A)</span>
                          )}

                          <span>
                            {firstname}
                            <br />
                            {lastname}
                          </span>
                        </div>
                        {/* {cryptoOrder?.is_select === "1" ? (
                          <img
                            src={Premium}
                            className="h-6 w-6"
                            alt="premium"
                          />
                        ) : null} */}
                      </Typography>
                      <Typography
                        onClick={() =>
                          navigate(
                            `/team/management/student/details-student/${cryptoOrder?.user_id}`
                          )
                        }
                        sx={{
                          cursor: "pointer",
                        }}
                        variant="body2"
                        color="#3f51b5"
                        noWrap
                      >
                        id : {cryptoOrder?.user_id}
                      </Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        maxWidth: "300px",
                        wordBreak: "break-all",
                      }}
                    >
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {cryptoOrder?.affiliate_data?.affiliate_payments_amount}
                      </Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        maxWidth: "300px",
                        wordBreak: "break-all",
                      }}
                    >
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {cryptoOrder?.affiliate_data?.paid_status == "Paid" ? (
                          <Label color="success">Paid</Label>
                        ) : cryptoOrder?.affiliate_data?.paid_status ==
                          "Unpaid" ? (
                          <Label color="warning">Unpaid</Label>
                        ) : (
                          "null"
                        )}
                      </Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        maxWidth: "300px",
                        wordBreak: "break-all",
                      }}
                    >
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {cryptoOrder?.stream}
                      </Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        maxWidth: "300px",
                        wordBreak: "break-all",
                      }}
                    >
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {cryptoOrder?.title}
                      </Typography>

                      {/* <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          maxWidth: "200px",
                        }}
                      >
                        {cryptoOrder?.description?.length > 300
                          ? cryptoOrder?.description?.slice(0, 300) + "..."
                          : cryptoOrder?.description}
                      </Typography> */}
                    </TableCell>

                    <TableCell
                      sx={{
                        maxWidth: "300px",
                        wordBreak: "break-all",
                      }}
                    >
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                      >
                        ₹
                        {cryptoOrder?.budget?.toLocaleString("en-US", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        maxWidth: "300px",
                        wordBreak: "break-all",
                      }}
                    >
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
                        gutterBottom
                        whiteSpace="nowrap"
                      >
                        {cryptoOrder?.status === ""
                          ? null
                          : getStatusLabel(cryptoOrder?.status)}
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
        {/* </Suspense> */}
      </Card>
    </React.Fragment>
  );
}
