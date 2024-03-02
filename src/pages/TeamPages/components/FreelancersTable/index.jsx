import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
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
import LocalPhoneTwoToneIcon from "@mui/icons-material/LocalPhoneTwoTone";
import MarksChart from "./MarksChart";

const OutlinedInputWrapper = styled(OutlinedInput)(
  ({ theme }) => `
    background-color: ${theme.colors.alpha.white[100]};
    padding-right: ${theme.spacing(0.7)}
`
);

const getStatusLabel = (cryptoOrderStatus) => {
  const map = {
    "Technical Approved": {
      text: "Technical Approved",
      color: "success",
    },
    "Non Technical Approved": {
      text: "Non Technical Approved",
      color: "success",
    },
    "Not Approved": {
      text: "Not Approved",
      color: "error",
    },
    "Form Filled": {
      text: "Form Filled",
      color: "warning",
    },
    "Agreement Sent": {
      text: "Agreement Sent",
      color: "primary",
    },
    Rejected: {
      text: "Rejected",
      color: "error",
    },
    "Interview Conducted": {
      text: "Interview Conducted",
      color: "info",
    },
  };

  const { text, color } = map[cryptoOrderStatus] || {
    text: "Unknown Status",
    color: "default",
  };

  return <Label color={color}>{text}</Label>;
};

const applyPagination = (cryptoOrders, page, limit) => {
  if (cryptoOrders?.length > 0) {
    return cryptoOrders?.slice(page * limit, page * limit + limit);
  } else {
    return [];
  }
};

export default function FreelancersTable({
  cryptoOrders,
  statusName,
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
  const [filters, setFilters] = useState({
    status: statusName,
  });

  const [searchParam, setSearchParam] = useState({
    search: null,
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

    if (localStorage.getItem("status")) {
      let status = JSON.parse(localStorage.getItem("status"));
      Object.values(status).forEach((key, value) => {
        setFilters((prev) => ({ ...prev, status: key }));
      });
    }
  }, [location]);

  //for storing our search data locally
  useEffect(() => {
    if (!currentId) {
      localStorage.removeItem("search");
      localStorage.removeItem("status");
      localStorage.removeItem("currentId");
      localStorage.removeItem("searchOption");
      setSearchParam((prev) => ({ ...prev, search: null }));
      setFilters((prev) => ({ ...prev, status: statusName }));
      setSelectedSearchOption("name");
    }
  }, [location, currentId]);

  const [seachByTags, setSearchByTags] = useState({
    searchTags: null,
  });

  const statusOptions = [
    {
      id: "all",
      name: "All",
    },
    {
      id: "Technical Approved",
      name: "Technical Approved",
    },
    {
      id: "Non Technical Approved",
      name: "Non Technical Approved",
    },

    {
      id: "Form Filled",
      name: "Form Filled",
    },
    {
      id: "Agreement Sent",
      name: "Agreement Sent",
    },
    {
      id: "Interview Conducted",
      name: "Interview Conducted",
    },
    {
      id: "Not Approved",
      name: "Not Approved",
    },
    {
      id: "Rejected",
      name: "Rejected",
    },
  ];

  const applyFilters = (cryptoOrders, filters) => {
    return cryptoOrders?.filter((cryptoOrder) => {
      let matches = true;

      if (filters?.status && cryptoOrder?.status !== filters?.status) {
        matches = false;
      }

      //Category

      const category = cryptoOrder?.freelancer_marks_category;
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

      if (seachByTags?.searchTags) {
        if (
          !cryptoOrder?.subject_tags?.reduce((acc, curr) => {
            if (
              curr
                ?.toLowerCase()
                .includes(seachByTags?.searchTags?.toLowerCase())
            ) {
              acc = true;
            }
            return acc;
          }, false)
        ) {
          matches = false;
        }
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
          !cryptoOrder?.name
            ?.toLowerCase()
            .includes(filters?.search?.toLowerCase())
        ) {
          matches = false;
        }
      } else if (selectedSearchOption === "number") {
        if (
          filters?.search &&
          !cryptoOrder?.phone
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

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
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

  const handleClearFilters = () => {
    setFilters({
      status: null,
    });
  };

  const filteredCryptoOrders = applyFilters(cryptoOrders, filters);
  const filteredCryptoOrdersBySearch = applyFilters(
    filteredCryptoOrders,
    searchParam
  );

  const filteredCryptoOrdersBySearchTags = applyFilters(
    filteredCryptoOrdersBySearch,
    seachByTags
  );

  // Category

  const filteredByCategory = applyFilters(
    filteredCryptoOrdersBySearchTags,
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

    let searchParse = JSON.stringify({ search: event.target.value });

    localStorage.setItem("search", searchParse);

    console.log(searchParam);
  };

  const handleSearchBySubjectTags = (event) => {
    let value = null;
    if (event.target.value !== "") {
      value = event.target.value;
    }

    if (event.target.value === "") {
      value = null;
    }

    setSearchByTags((prevFilters) => ({
      ...prevFilters,
      searchTags: value,
    }));

    console.log(seachByTags);
  };

  const selectedSomeCryptoOrders =
    selectedCryptoOrders?.length > 0 &&
    selectedCryptoOrders?.length < cryptoOrders?.length;
  const selectedAllCryptoOrders =
    selectedCryptoOrders?.length === cryptoOrders?.length;
  const theme = useTheme();

  return (
    <Card>
      <MarksChart
        paginatedCryptoOrders={paginatedCryptoOrders}
        dateFilters={dateFilters}
        setDateFilters={setDateFilters}
        totalData={totalData}
      />
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      {!selectedBulkActions && (
        <CardHeader
          action={
            <Box
              width={250}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
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
                    <MenuItem key={statusOption?.id} value={statusOption?.id}>
                      {statusOption?.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          }
        />
      )}
      <div className="flex md:flex-row flex-col items-center justify-between  py-4 ">
        <div className="md:w-1/4 w-full">
          <FormControl
            variant="outlined"
            fullWidth
            sx={{
              p: 1,
            }}
          >
            <OutlinedInputWrapper
              type="text"
              value={seachByTags?.searchTags || ""}
              onChange={handleSearchBySubjectTags}
              placeholder="Search by subject tags here..."
              startAdornment={
                <InputAdornment position="start">
                  <SearchTwoToneIcon />
                </InputAdornment>
              }
            />
          </FormControl>
        </div>
        <div className="md:w-3/4 w-full">
          <FormControl
            variant="outlined"
            fullWidth
            sx={{
              p: 1,
            }}
          >
            <OutlinedInputWrapper
              type="text"
              value={searchParam?.search || ""}
              onChange={handleSearch}
              placeholder="Search freelancers here..."
              startAdornment={
                <InputAdornment position="start">
                  <SearchTwoToneIcon />
                  <div className="flex gap-2">
                    <Label
                      sx={{
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setSelectedSearchOption("id");
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
        </div>
      </div>

      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Freelancer Name</TableCell>
              <TableCell>Number</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
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
                          `/team/management/profile/details/${cryptoOrder?.id}`
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
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      sx={{
                        maxWidth: "350px",
                      }}
                    >
                      {cryptoOrder?.name}
                    </Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
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
                      href={`tel: ${cryptoOrder?.phone}`}
                    >
                      <LocalPhoneTwoToneIcon />
                      {cryptoOrder?.phone}
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
                        cryptoOrder?.whatsapp
                      }?text=${encodeURIComponent(
                        `Hey ${cryptoOrder?.name},\nGreetings from Bluepen.co.in. This message is in regards to your application for academic writer as a freelancer in Bluepen. Is it a good time to talk to you?`
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
                      <span className="mr-2">{cryptoOrder?.whatsapp}</span>
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
                      variant="body1"
                      fontWeight="bold"
                      gutterBottom
                      whiteSpace="nowrap"
                    >
                      {cryptoOrder?.status === "Technical Approved" ||
                      cryptoOrder?.status === "Non Technical Approved" ||
                      cryptoOrder?.status === "Not Approved" ||
                      cryptoOrder?.status === "Form Filled" ||
                      cryptoOrder?.status === "Agreement Sent" ||
                      cryptoOrder?.status === "Rejected" ||
                      cryptoOrder?.status === "Interview Conducted"
                        ? getStatusLabel(cryptoOrder?.status)
                        : null}
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
  );
}
