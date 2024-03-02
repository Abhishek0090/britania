import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import moment from "moment";
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
  Select,
  MenuItem,
  Typography,
  InputAdornment,
  OutlinedInput,
  styled,
} from "@mui/material";

import Label from "~/pages/TeamPages/components/Label";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import StarsIcon from "@mui/icons-material/Stars";
import RemoveRedEyeTwoToneIcon from "@mui/icons-material/RemoveRedEyeTwoTone";
import MarksChart from "./MarksChart";
// import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

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

const MarksTable = ({ dateFilters, setDateFilters, cryptoOrders ,totalData }) => {
  const navigate = useNavigate();
  const [selectedCryptoOrders, setSelectedCryptoOrders] = useState([]);
  const [selectedSearchOption, setSelectedSearchOption] = useState("name");
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(50);
  const [searchParam, setSearchParam] = useState({
    search: null,
  });

  const [filters, setFilters] = useState({
    status: null,
  });
  const applyFilters = (marksData, filters) => {
    return marksData?.filter((data) => {
      let matches = true;

      const category = data?.marks_category;
      const selectedCategory = filters?.category;

      //Category
      if (selectedCategory && category !== selectedCategory) {
        matches = false;
      }

      const monthInData = parseInt(data?.marks_added_on.split("-")[1]);
      const selectedMonth = parseInt(filters.months);

      //Months
      if (selectedMonth && monthInData !== selectedMonth) {
        matches = false;
      }

      const yearsInData = parseInt(data?.marks_added_on.split("-")[2]);
      const selectedYears = parseInt(filters.years);

      //Years
      if (selectedYears && yearsInData !== selectedYears) {
        matches = false;
      }

      // if (selectedSearchOption === "name") {
      //   if (
      //     filters?.search &&
      //     !cryptoOrder?.name
      //       ?.toLowerCase()
      //       .includes(filters?.search?.toLowerCase())
      //   ) {
      //     matches = false;
      //   }
      // } else if (selectedSearchOption === "message") {
      //   if (
      //     filters?.search &&
      //     !cryptoOrder?.message
      //       ?.toLowerCase()
      //       .includes(filters?.search?.toLowerCase())
      //   ) {
      //     matches = false;
      //   }
      // } else if (selectedSearchOption === "email") {
      //   if (
      //     filters?.search &&
      //     !cryptoOrder?.email
      //       ?.toLowerCase()
      //       .includes(filters?.search?.toLowerCase())
      //   ) {
      //     matches = false;
      //   }
      // }
      return matches;
    });
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
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };
  const filteredOriginal = applyFilters(cryptoOrders, searchParam);

  // Category

  const filteredByCategory = applyFilters(filteredOriginal, dateFilters);

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
  }, [cryptoOrders]);

  return (
    <React.Fragment>
      <Card>
        <MarksChart
          paginatedCryptoOrders={paginatedCryptoOrders}
          dateFilters={dateFilters}
          setDateFilters={setDateFilters}
          totalData={totalData}
        />

        <div className="flex flex-col md:flex-row items-center justify-between p-4 md:px-6">
          {/* <FormControl
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
                placeholder="Search here..."
                startAdornment={
                  <InputAdornment position="start">
                    <SearchTwoToneIcon />
                    <div className="flex gap-2 ml-2">
                      <Label
                        sx={{
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setSelectedSearchOption("user_name");
                        }}
                        color={
                          selectedSearchOption === "user_name" ? "success" : "info"
                        }
                      >
                        Name
                      </Label>
                      <Label
                        sx={{
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setSelectedSearchOption("email");
                        }}
                        color={
                          selectedSearchOption === "email" ? "success" : "info"
                        }
                      >
                        Freelancer
                      </Label>
                      {/* <Label
                        sx={{
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setSelectedSearchOption("message");
                        }}
                        color={
                          selectedSearchOption === "message"
                            ? "success"
                            : "info"
                        }
                      >
                        Message
                      </Label> */}
          {/* </div> */}
          {/* </InputAdornment>
                }
              />
            </FormControl> */}
        </div>
        <Divider />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Assignment ID</TableCell>
                {/* <TableCell>Marks Obtained</TableCell> */}
                <TableCell>Marks</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>User ID</TableCell>
                <TableCell>User Name</TableCell>
                <TableCell>Feedback</TableCell>
                <TableCell>Freelancer Id</TableCell>
                <TableCell>Freelancer Name</TableCell>
                <TableCell>Assignment Title</TableCell>
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
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {cryptoOrder?.marks_obtained &&
                          cryptoOrder?.marks_out_of &&
                          cryptoOrder?.marks_obtained +
                            "/" +
                            cryptoOrder?.marks_out_of}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Typography
                          component="a"
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            maxWidth: "400px",
                            maxHeight: "100px",
                            overflowY: "scroll",
                            cursor: "pointer",

                            //scrollbar hidden
                            "&::-webkit-scrollbar": {
                              display: "none",
                            },
                            "-ms-overflow-style": "none",
                            "scrollbar-width": "none",
                          }}
                          onClick={() =>
                            navigate(
                              `/team/management/student/details-student/${cryptoOrder?.user_id}`
                            )
                          }
                        >
                          {cryptoOrder?.marks_category}
                        </Typography>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Typography
                          component="a"
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            maxWidth: "400px",
                            maxHeight: "100px",
                            overflowY: "scroll",
                            cursor: "pointer",

                            //scrollbar hidden
                            "&::-webkit-scrollbar": {
                              display: "none",
                            },
                            "-ms-overflow-style": "none",
                            "scrollbar-width": "none",
                          }}
                          onClick={() =>
                            navigate(
                              `/team/management/student/details-student/${cryptoOrder?.user_id}`
                            )
                          }
                        >
                          {cryptoOrder?.user_id}
                        </Typography>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Typography
                          component="a"
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            maxWidth: "400px",
                            maxHeight: "100px",
                            overflowY: "scroll",
                            cursor: "pointer",
                            //scrollbar hidden
                            "&::-webkit-scrollbar": {
                              display: "none",
                            },
                            "-ms-overflow-style": "none",
                            "scrollbar-width": "none",
                          }}
                          onClick={() =>
                            navigate(
                              `/team/management/student/details-student/${cryptoOrder?.user_id}`
                            )
                          }
                        >
                          {cryptoOrder?.user_name}
                        </Typography>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            maxWidth: "400px",
                            maxHeight: "100px",
                            overflowY: "scroll",
                            //scrollbar hidden
                            "&::-webkit-scrollbar": {
                              display: "none",
                            },
                            "-ms-overflow-style": "none",
                            "scrollbar-width": "none",
                          }}
                        >
                          {cryptoOrder?.feedback}
                        </Typography>
                      </div>
                    </TableCell>
                    <TableCell>
                      {cryptoOrder?.freelancers?.map((item, idx) => (
                        <div className="flex gap-2" key={idx}>
                          <Typography
                            variant="body2"
                            sx={{
                              maxWidth: "400px",
                              maxHeight: "100px",
                              overflowY: "scroll",
                              cursor: "pointer",
                              //scrollbar hidden
                              "&::-webkit-scrollbar": {
                                display: "none",
                              },
                              "-ms-overflow-style": "none",
                              "scrollbar-width": "none",
                            }}
                            onClick={() =>
                              navigate(
                                `/team/management/profile/details/${item?.freelancer_id}`
                              )
                            }
                            color="#3f51b5"
                          >
                            {item?.freelancer_id}
                          </Typography>
                        </div>
                      ))}
                    </TableCell>
                    <TableCell>
                      {cryptoOrder?.freelancers?.map((item, idx) => (
                        <div className="flex gap-2" key={idx}>
                          <Typography
                            component="a"
                            variant="body2"
                            fontWeight="bold"
                            sx={{
                              maxWidth: "400px",
                              maxHeight: "100px",
                              overflowY: "scroll",
                              cursor: "pointer",
                              //scrollbar hidden
                              "&::-webkit-scrollbar": {
                                display: "none",
                              },
                              "-ms-overflow-style": "none",
                              "scrollbar-width": "none",
                            }}
                            onClick={() =>
                              navigate(
                                `/team/management/profile/details/${item?.freelancer_id}`
                              )
                            }
                            color="#3f51b5"
                          >
                            {item?.freelancer_name}
                          </Typography>
                        </div>
                      ))}
                    </TableCell>

                    <TableCell>
                      <div className="flex gap-2">
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            maxWidth: "400px",
                            maxHeight: "100px",
                            overflowY: "scroll",
                            //scrollbar hidden
                            "&::-webkit-scrollbar": {
                              display: "none",
                            },
                            "-ms-overflow-style": "none",
                            "scrollbar-width": "none",
                          }}
                        >
                          {cryptoOrder?.assignment_title}
                        </Typography>
                      </div>
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

export default MarksTable;
