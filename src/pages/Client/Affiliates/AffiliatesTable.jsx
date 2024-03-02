import React from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

import { setAllNonLoggedPlagiarismDetails } from "~/features/student/studentSlice";
import {
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Button,
  useTheme,
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
  CardHeader,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloudDownloadTwoToneIcon from "@mui/icons-material/CloudDownloadTwoTone";
import { URL } from "~/utils/BaseURL";
import { useDispatch, useSelector } from "react-redux";

import moment from "moment";
import GraphData from "./GraphData";

const getStatusLabel = (cryptoOrderStatus) => {
  const map = {
    Unknown: {
      text: "UNKNOWN",
      color: "gray",
    },
    "Report Received": {
      text: "Report Received",
      color: "green",
    },
    Paid: {
      text: "PAID",
      color: "blue",
    },
    Pending: {
      text: "PENDING",
      color: "yellow",
    },
    Failed: {
      text: "FAILED",
      color: "red",
    },
  };

  // Check if cryptoOrderStatus exists in the map, or use a default value
  const { text, color } = map[cryptoOrderStatus] || {
    text: "UNKNOWN",
    color: "gray",
  };
  return (
    <Typography
      variant="p"
      className={`text-black font-medium bg-${color}-500 p-2 rounded-full`}
    >
      {text}
    </Typography>
  );
};

const applyPagination = (cryptoOrders, page, limit) => {
  if (cryptoOrders?.length > 0) {
    return cryptoOrders?.slice(page * limit, page * limit + limit);
  } else {
    return [];
  }
};

const AffiliatesTable = ({ cryptoOrders, statusName, streamName }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedSearchOption, setSelectedSearchOption] = useState(
    localStorage.getItem("searchOption")
      ? localStorage.getItem("searchOption")
      : "name"
  );

  const studentData = useSelector(
    (state) => state.student.allNonLoggedPlagiarismDetails
  );

  const theme = useTheme();

  //file download toggle
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [open, setOpen] = useState(false);

  const [tempFile, setTempFile] = useState(null);

  const [assignment_id, setAssignment_id] = useState(null);

  const handleFiles = (value, assignment_id) => {
    setTempFile(value);
    setAssignment_id(assignment_id);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDownloadFile = (fileName) => {
    if (fileName === "") {
      toast.error("File name is empty");
      return;
    }

    axios
      .get(
        `${URL}/student/downloadplagiarismcheckfiles.php?assignment_id=${assignment_id}&file_name=${fileName}`
      )
      .then((res) => {
        console.log(res);
        if (res?.data?.status === "success") {
          toast.success("File downloaded successfully");
          let url = res?.data?.file_url;
          let link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", res?.data?.file_name);
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
        } else {
          toast.error("Something went wrong");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
  };

  //download plag uploaded report

  const [plagOpen, setPlagOpen] = useState(false);

  const handlePOpen = () => {
    setPlagOpen(true);
  };

  const handlePClose = () => {
    setPlagOpen(false);
  };

  const handlePlagDownload = (fileName) => {
    if (fileName === "") {
      toast.error("File name is empty");
      return;
    }

    console.log(assignment_id);

    axios
      .get(
        `${URL}/student/downloadplagiarismcheckedfiles.php?assignment_id=${assignment_id}&file_name=${fileName}`
      )
      .then((res) => {
        console.log(res);
        if (res?.data?.status === "success") {
          toast.success("File downloaded successfully");
          let url = res?.data?.file_url;
          let link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", res?.data?.file_name);
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
        } else {
          toast.error("Something went wrong");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
  };

  //file upload Functions
  const [isOpen, setIsOpen] = useState(false);

  const [assignId, setAssignId] = useState(null);

  const handleUClickOpen = (id) => {
    setIsOpen(true);
    setAssignId(id);
  };

  const handleUClose = () => {
    setIsOpen(false);
    dispatch(
      setAllNonLoggedPlagiarismDetails({
        ...studentData,
        assignment_files: null,
        assignment_files_random_number: null,
      })
    );
  };

  const handleUpload = async (values) => {
    if (!studentData.assignment_files) {
      toast.error("Please Upload A File");

      return;
    }
    const data = {
      ...studentData,
      assignment_id: assignId,
      submit: "submit",
    };

    console.log(data);

    await axios
      .post(`${URL}/team/submitfilesplagiarismcheck.php`, data)
      .then((res) => {
        console.log(res);

        toast.success(res.data.message);
        dispatch(
          setAllNonLoggedPlagiarismDetails({
            ...studentData,
            assignment_files: null,
            assignment_files_random_number: null,
          })
        );
        handleUClose();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
  };

  //download plag file

  // assignemnt data table

  const [selectedCryptoOrders, setSelectedCryptoOrders] = useState([]);
  const selectedBulkActions = selectedCryptoOrders.length > 0;
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(50);

  const [filters, setFilters] = useState({
    status: statusName,
  });

  const [stream, setStream] = useState({
    stream: streamName,
  });
  const [searchParam, setSearchParam] = useState({
    search: null,
  });

  const [statusFilters, setStatusFilters] = useState("");

  const statusOptions = [
    {
      id: "all",
      name: "ALL",
    },
    {
      id: "Paid",
      name: "Paid",
    },
    {
      id: "Unpaid",
      name: "Unpaid",
    },
    // {
    //   id: "Submitted",
    //   name: "SENT",
    // },
  ];

  const applyFilters = (cryptoOrders, filters) => {
    return cryptoOrders?.filter((cryptoOrder) => {
      let matches = true;

      if (filters?.status && cryptoOrder?.paid_status !== filters?.status) {
        matches = false;
      }

      if (filters?.stream && cryptoOrder?.stream !== filters?.stream) {
        matches = false;
      }

      //   if (filters?.stream && cryptoOrder?.stream !== filters?.stream) {
      //     matches = false;
      //   }

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

  const filteredCryptoOrdersByStream = applyFilters(
    filteredCryptoOrders,
    stream
  );

  const filteredCryptoOrdersBySearch = applyFilters(
    filteredCryptoOrdersByStream,
    searchParam
  );

  const paginatedCryptoOrders = applyPagination(
    filteredCryptoOrdersBySearch,
    page,
    limit
  );

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

  return (
    <>
      <Card
        sx={{
          background: "none",
          backdropFilter: "blur(10px)",
          border: "none",
        }}
      >
        {!selectedBulkActions && (
          <CardHeader
            className="shadow-2xl backdrop-blur-3xl  "
            action={
              <div className="flex flex-col md:flex-row flex-no-wrap items-center  md:items-center justify-center md:justify-start gap-5 md:w-[75rem] w-[22rem]">
                <GraphData paginatedCryptoOrders={paginatedCryptoOrders} />
                <div className="flex items-center justify-end md:w-1/3 w-2/3">
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={filters?.status || "all"}
                      onChange={handleStatusChange}
                      label="Status"
                      fullWidth
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
        <Divider />
        {/* <Suspense fallback={<div>Loading....</div>}> */}
        <TableContainer>
          <Table
            sx={{ background: "none" }}
            className="   shadow-3xl  backdrop-blur-3xl w-full"
          >
            <TableHead className="  bg-opacity-20  shadow-3xl bg-blue111 backdrop-blur-3xl w-full">
              <TableRow>
                <TableCell className="w-[10rem]">Affiliate Id</TableCell>
                {/* <TableCell className="w-[10rem]">Download Files</TableCell> */}
                <TableCell className="w-[10rem]">Assignment Id</TableCell>
                <TableCell className="w-[10rem]">User Name</TableCell>
                <TableCell className="w-[10rem]">Amount</TableCell>
                <TableCell className="w-[10rem]">Status</TableCell>
                <TableCell className="w-[10rem]">Added On</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedCryptoOrders?.map((cryptoOrder) => {
                const isCryptoOrderSelected = selectedCryptoOrders?.includes(
                  cryptoOrder?.id
                );

                return (
                  <>
                    <TableRow
                      hover
                      key={cryptoOrder?.affiliate_id}
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
                        >
                          {cryptoOrder?.affiliate_id}
                        </Typography>
                      </TableCell>

                      <TableCell
                        sx={{
                          maxWidth: "200px",
                          wordBreak: "break-all",
                        }}
                      >
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                        >
                          {cryptoOrder?.assignment_id}
                        </Typography>
                      </TableCell>
                      <TableCell
                        sx={{
                          maxWidth: "200px",
                          wordBreak: "break-all",
                        }}
                      >
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                        >
                          {cryptoOrder?.affiliate_by_user_id_name}
                          <br />
                          {cryptoOrder?.user_id}
                        </Typography>
                      </TableCell>
                      <TableCell
                        sx={{
                          maxWidth: "200px",
                          wordBreak: "break-all",
                        }}
                      >
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                        >
                          {cryptoOrder?.amount}
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
                          gutterBottom
                          whiteSpace="nowrap"
                        >
                          {cryptoOrder?.paid_status == "Unpaid" ? (
                            <Typography
                              variant="p"
                              className={`text-white font-medium bg-red-500 p-2 rounded-full`}
                            >
                              Unpaid
                            </Typography>
                          ) : cryptoOrder?.paid_status == "Paid" ? (
                            <Typography
                              variant="p"
                              className={`text-white font-medium bg-green-500 p-2 rounded-full`}
                            >
                              Paid
                            </Typography>
                          ) : (
                            "null"
                          )}
                        </Typography>
                      </TableCell>
                      <TableCell
                        sx={{
                          maxWidth: "200px",
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
                          {cryptoOrder?.added_on}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Box p={2} className="shadow-2xl backdrop-blur-3xl">
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
      <Dialog open={open} onClose={handleClose} maxWidth>
        <DialogTitle>Download Assignment Files</DialogTitle>
        <div className="flex flex-col  items-center justify-center   p-5  w-full gap-[20px] p-2 ">
          <DialogActions className="w-[100%] flex flex-col gap-5">
            <div className="w-full text-gray-600 ">
              <div className="flex flex-wrap ">
                <div className="flex flex-col  rounded-lg sm:flex-row">
                  <div className="flex-grow flex-col flex items-start justify-start">
                    {tempFile
                      ?.split("_$_")
                      ?.filter((item) => item !== "")
                      ?.map((item, id) => (
                        <div
                          onClick={() => handleDownloadFile(item)}
                          key={id}
                          className="flex items-center justify-between gap-5"
                        >
                          <p className="text-base leading-relaxed flex text-left text-blue141 break-all">
                            <span className="text-blue141 font-semibold text-xl pr-3">
                              {id + 1}.
                            </span>{" "}
                            {item}
                          </p>

                          <button className="inline-flex items-center justify-center flex-shrink-0   text-blue141 rounded-full sm:mr-8 sm:mb-0">
                            <CloudDownloadTwoToneIcon />
                          </button>
                        </div>
                      ))}
                    <span className="text-blue141   ">
                      {" "}
                      {!tempFile && "Not Available"}{" "}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-5">
              <Button onClick={handleClose}>Close</Button>
            </div>
          </DialogActions>
        </div>
      </Dialog>
      <Dialog open={plagOpen} onClose={handlePClose} maxWidth>
        <DialogTitle>Download Plagiarism Reports</DialogTitle>
        <div className="flex flex-col  items-center justify-center   p-5  w-full gap-[20px] p-2 ">
          <DialogActions className="w-[100%] flex flex-col gap-5">
            <div className="w-full text-gray-600 ">
              <div className="flex flex-wrap ">
                <div className="flex flex-col  rounded-lg sm:flex-row">
                  <div className="flex-grow flex-col flex items-start justify-start">
                    {tempFile
                      ?.split("_$_")
                      ?.filter((item) => item !== "")
                      ?.map((item, id) => (
                        <div
                          onClick={() => handlePlagDownload(item)}
                          key={id}
                          className="flex items-center justify-between gap-5"
                        >
                          <p className="text-base leading-relaxed flex text-left text-blue141 break-all">
                            <span className="text-blue141 font-semibold text-xl pr-3">
                              {id + 1}.
                            </span>{" "}
                            {item}
                          </p>

                          <button className="inline-flex items-center justify-center flex-shrink-0   text-indigo-500 rounded-full sm:mr-8 sm:mb-0">
                            <CloudDownloadTwoToneIcon />
                          </button>
                        </div>
                      ))}
                    <span className="text-blue141   ">
                      {" "}
                      {!tempFile && "Not Available"}{" "}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-5">
              <Button onClick={handlePClose}>Close</Button>
            </div>
          </DialogActions>
        </div>
      </Dialog>

      <Dialog open={isOpen} onClose={handleUClose} maxWidth>
        {/* <DialogTitle>File Upload ?</DialogTitle> */}
        <div className="flex flex-col  items-center justify-center   p-5  w-full gap-[20px] p-2 ">
          <DialogActions className="w-[100%] flex flex-col gap-2">
            <div className="flex gap-5">
              <Button
                className="bg-blue141 text-white"
                onClick={() => {
                  handleUpload();
                }}
              >
                Submit
              </Button>
              <Button onClick={handleUClose}>Close</Button>
            </div>
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
};

export default AffiliatesTable;
