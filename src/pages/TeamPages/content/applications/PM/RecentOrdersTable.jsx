import { useState } from "react";
import { useLocation, useNavigate } from "react-router";

import numeral from "numeral";
import moment from "moment";
import PropTypes from "prop-types";
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
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
  Button,
} from "@mui/material";

import Label from "~/pages/TeamPages/components/Label";
import RemoveRedEyeTwoToneIcon from "@mui/icons-material/RemoveRedEyeTwoTone";
// import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from "./BulkActions";
import { useEffect } from "react";
import MarksChart from "./MarksChart";

const applyPagination = (cryptoOrders, page, limit) => {
  if (cryptoOrders?.length > 0) {
    return cryptoOrders?.slice(page * limit, page * limit + limit);
  } else {
    return [];
  }
};

const applyFilters = (cryptoOrders, filters) => {
  return cryptoOrders?.filter((cryptoOrder) => {
    let matches = true;

    if (filters?.status && cryptoOrder?.status !== filters?.status) {
      matches = false;
    }

    //Category

    const category = cryptoOrder?.total_marks_category;
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

const RecentOrdersTable = ({ cryptoOrders, totalData }) => {
  const navigate = useNavigate();
  const [selectedCryptoOrders, setSelectedCryptoOrders] = useState([]);
  const selectedBulkActions = selectedCryptoOrders.length > 0;
  const [page, setPage] = useState(0);

  const location = useLocation().pathname.split("/pm")[1];

  const [limit, setLimit] = useState(50);
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
    if (localStorage.getItem("status")) {
      let status = JSON.parse(localStorage.getItem("status"));

      Object.values(status).forEach((key, value) => {
        setFilters((prev) => ({ ...prev, status: key }));
      });
    }
  }, [location]);

  useEffect(() => {
    if (!currentId) {
      localStorage.removeItem("status");
      localStorage.removeItem("currentId");
      localStorage.removeItem("search");
      localStorage.removeItem("stream");
      localStorage.removeItem("searchOption");
      setFilters((prev) => ({ ...prev, status: null }));
    }
  }, [location, currentId]);

  const statusOptions = [
    {
      id: "all",
      name: "All",
    },
    {
      id: "Active",
      name: "Active",
    },
    {
      id: "InActive",
      name: "InActive",
    },
  ];

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

    console.log(e.target.value);

    let convert = JSON.stringify({ status: e.target.value });
    localStorage.setItem("status", convert);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  const filteredCryptoOrders = applyFilters(cryptoOrders, filters);

  // Category

  const filteredByCategory = applyFilters(filteredCryptoOrders, dateFilters);

  // Months

  const filteredByMonths = applyFilters(filteredByCategory, dateFilters);

  // Years

  const filteredByYears = applyFilters(filteredByMonths, dateFilters);

  const paginatedCryptoOrders = applyPagination(filteredByYears, page, limit);

  const selectedSomeCryptoOrders =
    selectedCryptoOrders?.length > 0 &&
    selectedCryptoOrders?.length < cryptoOrders?.length;
  const selectedAllCryptoOrders =
    selectedCryptoOrders?.length === cryptoOrders?.length;
  const theme = useTheme();

  return (
    <>
      {cryptoOrders?.length > 0 ? (
        <Card>
          <MarksChart
            paginatedCryptoOrders={paginatedCryptoOrders}
            dateFilters={dateFilters}
            setDateFilters={setDateFilters}
            totalData={totalData}
          />
          {!selectedBulkActions && (
            <CardHeader
              action={
                <Box
                  width={200}
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
                        <MenuItem
                          key={statusOption?.id}
                          value={statusOption?.id}
                        >
                          {statusOption?.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              }
              title="All PM"
            />
          )}
          <Divider />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Freelancer Name</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Whatsapp</TableCell>
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
                              `/team/management/pm/details-pm/${cryptoOrder?.id}`
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
                        >
                          {cryptoOrder?.name}
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
                          href={`tel: ${cryptoOrder?.number}`}
                        >
                          {cryptoOrder?.number}
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
                          href={`https://wa.me/${cryptoOrder?.country_code}${cryptoOrder?.number_whatsapp}?text=Hi%20I%20am%20interested%20in%20your%20services%20and%20would%20like%20to%20know%20more%20about%20it.`}
                        >
                          {cryptoOrder?.number_whatsapp}
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
                          href={`mailto: ${cryptoOrder?.email_old}`}
                        >
                          {cryptoOrder?.email_old}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <IconButton
                          sx={{
                            "&:hover": {
                              background: theme.colors.primary.lighter,
                            },
                            color: theme.palette.primary.main,
                          }}
                          color="inherit"
                          size="small"
                        >
                          {cryptoOrder?.status === "Active" ? (
                            <Label color="success">Active</Label>
                          ) : null}
                          {cryptoOrder?.status === "InActive" ? (
                            <Label color="error">Inactive</Label>
                          ) : null}
                        </IconButton>
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
      ) : (
        <Typography variant="h3" component="h3" gutterBottom>
          No PM Found
        </Typography>
      )}
    </>
  );
};

export default RecentOrdersTable;
