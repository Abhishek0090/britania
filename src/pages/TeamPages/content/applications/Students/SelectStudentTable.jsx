import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  Divider,
  Box,
  FormControl,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Typography,
  OutlinedInput,
  styled,
  InputAdornment,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import StarsIcon from "@mui/icons-material/Stars";
import Label from "~/pages/TeamPages/components/Label";
import Premium from "~/assets/premium/select.png";
import LocalPhoneTwoToneIcon from "@mui/icons-material/LocalPhoneTwoTone";
import MarksChart from "./MarksChart";

const OutlinedInputWrapper = styled(OutlinedInput)(
  ({ theme }) => `
    background-color: ${theme.colors.alpha.white[100]};
    padding-right: ${theme.spacing(0.7)}
`
);

const applyPagination = (cryptoOrders, page, limit) => {
  if (cryptoOrders?.length > 0) {
    return cryptoOrders?.slice(page * limit, page * limit + limit);
  } else {
    return [];
  }
};

const SelectStudentTable = ({ cryptoOrders }) => {
  const navigate = useNavigate();
  const [selectedSearchOption, setSelectedSearchOption] = useState(
    localStorage.getItem("searchOption")
      ? localStorage.getItem("searchOption")
      : "name"
  );
  const [selectedFilterOption, setSelectedFilterOption] = useState("source");
  const [selectedCryptoOrders, setSelectedCryptoOrders] = useState([]);
  const selectedBulkActions = selectedCryptoOrders.length > 0;
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(50);
  const [marketingSource, setMarketingSource] = useState([]);
  const [marketingMedium, setMarketingMedium] = useState([]);
  const [marketingCampaign, setMarketingCampaign] = useState([]);

  const location = useLocation().pathname.split("/student")[1];

  const [searchParam, setSearchParam] = useState({
    search: null,
  });

  const [filters, setFilters] = useState({
    status: null,
  });

  const [dateFilters, setDateFilters] = useState({
    months: "",
    years: "",
    category: "",
  });

  const currentId = localStorage.getItem("currentId");

  useEffect(() => {
    if (localStorage.getItem("search")) {
      let search = JSON.parse(localStorage.getItem("search"));

      Object.values(search).forEach((key, value) => {
        setSearchParam((prev) => ({ ...prev, search: key }));
      });
    }
  }, [location]);

  useEffect(() => {
    if (!currentId) {
      localStorage.removeItem("search");
      localStorage.removeItem("stream");
      localStorage.removeItem("status");
      localStorage.removeItem("currentId");
      localStorage.removeItem("searchOption");
      setSearchParam((prev) => ({ ...prev, search: null }));
      setFilters((prev) => ({ ...prev, status: null }));
      setSelectedSearchOption("name");
    }
  }, [location, currentId]);

  const applyFilters = (cryptoOrders, filters) => {
    return cryptoOrders?.filter((cryptoOrder) => {
      let matches = true;

      //Category

      const category = cryptoOrder?.total_marks_category;
      const selectedCategory = filters?.category;

      if (selectedCategory && category !== selectedCategory) {
        matches = false;
      }

      const monthInData = parseInt(cryptoOrder?.total_marks_added_on?.split("-")[1]);
      const selectedMonth = parseInt(filters.months);

      //Months
      if (selectedMonth && monthInData !== selectedMonth) {
        matches = false;
      }

      const yearsInData = parseInt(cryptoOrder?.total_marks_added_on?.split("-")[2]);
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
          !cryptoOrder?.firstname
            ?.toLowerCase()
            .includes(filters?.search?.toLowerCase()) &&
          filters?.search &&
          !cryptoOrder?.lastname
            ?.toLowerCase()
            .includes(filters?.search?.toLowerCase())
        ) {
          matches = false;
        }
      } else if (selectedSearchOption === "number") {
        if (
          filters?.search &&
          !cryptoOrder?.number
            ?.toLowerCase()
            .includes(filters?.search?.toLowerCase())
        ) {
          matches = false;
        }
      } else if (selectedSearchOption === "email") {
        if (
          filters?.search &&
          !cryptoOrder?.email
            ?.toLowerCase()
            .includes(filters?.search?.toLowerCase())
        ) {
          matches = false;
        }
      }
      return matches;
    });
  };

  //   const applyFiltersByMarketing = (cryptoOrders, filters) => {
  //     return cryptoOrders?.filter((cryptoOrder) => {
  //       let matches = true;
  // if(selectedFilterOption === 'source') {
  //       if (

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

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

  const filteredCryptoOrdersBySearch = applyFilters(cryptoOrders, searchParam);
  const filteredCryptoOrdersByFilters = applyFilters(
    filteredCryptoOrdersBySearch,
    filters
  );

  // Category

  const filteredByCategory = applyFilters(
    filteredCryptoOrdersByFilters,
    dateFilters
  );

  // Months

  const filteredByMonths = applyFilters(filteredByCategory, dateFilters);

  // Years

  const filteredByYears = applyFilters(filteredByMonths, dateFilters);

  const paginatedCryptoOrders = applyPagination(filteredByYears, page, limit);

  useEffect(() => {
    let source = [];
    let medium = [];
    let campaign = [];

    cryptoOrders?.map((cryptoOrder) => {
      if (cryptoOrder?.utm_data?.utm_source) {
        source.push(cryptoOrder?.utm_data?.utm_source);
      }
      if (cryptoOrder?.utm_data?.utm_medium) {
        medium.push(cryptoOrder?.utm_data?.utm_medium);
      }
      if (cryptoOrder?.utm_data?.utm_campaign) {
        campaign.push(cryptoOrder?.utm_data?.utm_campaign);
      }
    });

    setMarketingSource([...new Set(source)]);
    setMarketingMedium([...new Set(medium)]);
    setMarketingCampaign([...new Set(campaign)]);
  }, [cryptoOrders]);

  return (
    <React.Fragment>
      <Card>
        <MarksChart
          setDateFilters={setDateFilters}
          dateFilters={dateFilters}
          paginatedCryptoOrders={paginatedCryptoOrders}
        />
        {selectedBulkActions && (
          <Box flex={1} p={2}>
            <BulkActions />
          </Box>
        )}
        <div className="flex flex-col md:flex-row items-center justify-between p-4 md:px-6">
          <FormControl
            variant="outlined"
            sx={{
              p: 2,
              width: { xs: "100%", sm: "auto", md: "80ch" },
            }}
          >
            <OutlinedInputWrapper
              type="text"
              value={searchParam?.search || ""}
              onChange={handleSearch}
              placeholder="Search students here..."
              startAdornment={
                <InputAdornment position="start">
                  <SearchTwoToneIcon />
                  <div className="flex gap-2 ml-2">
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
                        setSelectedSearchOption("name");
                        JSON.stringify(
                          localStorage.setItem("searchOption", "name")
                        );
                      }}
                      color={
                        selectedSearchOption === "name" ? "success" : "info"
                      }
                    >
                      Name
                    </Label>
                    <Label
                      sx={{
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setSelectedSearchOption("number");
                        JSON.stringify(
                          localStorage.setItem("searchOption", "number")
                        );
                      }}
                      color={
                        selectedSearchOption === "number" ? "success" : "info"
                      }
                    >
                      Number
                    </Label>
                    <Label
                      sx={{
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setSelectedSearchOption("email");
                        JSON.stringify(
                          localStorage.setItem("searchOption", "email")
                        );
                      }}
                      color={
                        selectedSearchOption === "email" ? "success" : "info"
                      }
                    >
                      Email
                    </Label>
                  </div>
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl
            variant="outlined"
            sx={{
              p: 2,
            }}
          >
            <Select
              value={""}
              // onChange={handleStatusChange}
              autoWidth
              startAdornment={
                <InputAdornment position="start">
                  <StarsIcon color="primary" />
                  <div className="flex gap-2 ml-2">
                    <Label
                      sx={{
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setSelectedFilterOption("source");
                      }}
                      color={
                        selectedFilterOption === "source" ? "success" : "info"
                      }
                    >
                      Source
                    </Label>
                    <Label
                      sx={{
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setSelectedFilterOption("medium");
                      }}
                      color={
                        selectedFilterOption === "medium" ? "success" : "info"
                      }
                    >
                      Medium
                    </Label>
                    <Label
                      sx={{
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setSelectedFilterOption("campaign");
                      }}
                      color={
                        selectedFilterOption === "campaign" ? "success" : "info"
                      }
                    >
                      Campaign
                    </Label>
                  </div>
                </InputAdornment>
              }
            >
              {/* {statusOptions.map((statusOption) => (
            <MenuItem key={statusOption?.id} value={statusOption?.id}>
              {statusOption?.name}
            </MenuItem>
          ))} */}
              {selectedFilterOption === "source" &&
                marketingSource?.map((source) => (
                  <MenuItem key={source} value={source}>
                    {source}
                  </MenuItem>
                ))}
              {selectedFilterOption === "medium" &&
                marketingMedium?.map((medium) => (
                  <MenuItem key={medium} value={medium}>
                    {medium}
                  </MenuItem>
                ))}
              {selectedFilterOption === "campaign" &&
                marketingCampaign?.map((campaign) => (
                  <MenuItem key={campaign} value={campaign}>
                    {campaign}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </div>
        <Divider />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Campaign</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedCryptoOrders?.map((cryptoOrder) => {
                const isCryptoOrderSelected = selectedCryptoOrders?.includes(
                  cryptoOrder?.id
                );
                return (
                  <TableRow
                    hover
                    key={cryptoOrder?.id}
                    selected={isCryptoOrderSelected}
                  >
                    <TableCell>
                      <Typography
                        component="a"
                        variant="body1"
                        fontWeight="bold"
                        gutterBottom
                        noWrap
                        onClick={() => {
                          navigate(
                            `/team/management/student/details-student/${cryptoOrder?.id}`
                          );
                        }}
                        sx={{
                          cursor: "pointer",
                        }}
                        color="#3f51b5"
                      >
                        {cryptoOrder?.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        component="a"
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
                      >
                        {cryptoOrder?.firstname} {cryptoOrder?.lastname}
                        {/* {cryptoOrder?.is_select === "1" ? (
                          <img
                            src={Premium}
                            className="h-6 w-6"
                            alt="premium"
                          />
                        ) : null} */}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        component="a"
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                        sx={{
                          cursor: "pointer",
                        }}
                        href={`tel: ${cryptoOrder?.number}`}
                      >
                        <LocalPhoneTwoToneIcon />
                        (+{cryptoOrder?.country_code} ){cryptoOrder?.number}
                      </Typography>

                      <Typography
                        sx={{
                          cursor: "pointer",
                          display: "flex",
                          marginTop: "10px",
                        }}
                        component="a"
                        variant="body2"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                        href={`
                      https://wa.me/${cryptoOrder?.country_code}${
                        cryptoOrder?.number
                      }?text=${encodeURIComponent(
                        `Hey ${cryptoOrder?.firstname} ${cryptoOrder?.lastname},\nGreetings from Bluepen.co.in. Thankyou for registering with us and submitting your requirements. Can we have a discussion about your requirements?`
                      )}
                    `}
                      >
                        <img
                          src="https://img.icons8.com/color/96/null/whatsapp--v1.png"
                          width="20px"
                          height="20px"
                          alt="whatsapp"
                          className="mr-2"
                        />
                        <span className="mr-2">{cryptoOrder?.number}</span>
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {cryptoOrder?.country_name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        component="a"
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                        href={`mailto: ${cryptoOrder?.email}`}
                      >
                        {cryptoOrder?.email}
                      </Typography>
                    </TableCell>
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
                        {cryptoOrder?.utm_data?.utm_source ||
                          "Source not found"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {cryptoOrder?.utm_data?.utm_medium ||
                          "Medium not found"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {cryptoOrder?.utm_data?.utm_campaign ||
                          "Campaign not found"}
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
            count={cryptoOrders?.length}
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
};

export default SelectStudentTable;
