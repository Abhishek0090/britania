import React from "react";
import { Suspense, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import * as Yup from "yup";
import {
  setAllPlagiarismDetails,
  clearAllPlagiarismDetails,
} from "~/features/student/studentSlice";
import {
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Button,
  Grid,
  Link,
  useTheme,
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
  CardHeader,
  OutlinedInput,
  styled,
  InputAdornment,
  DialogActions,
} from "@mui/material";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import PropTypes from "prop-types";
import moment from "moment";
import axios from "axios";
import toast from "react-hot-toast";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Label from "~/pages/TeamPages/components/Label";
import Text from "~/pages/TeamPages/components/Text";
import useMediaQuery from "@mui/material/useMediaQuery";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloudDownloadTwoToneIcon from "@mui/icons-material/CloudDownloadTwoTone";
import CloseIcon from "@mui/icons-material/Close";
import { URL } from "~/utils/BaseURL";
import { selectAuth } from "~/features/auth/authSlice";
import {
  DownloadDone,
  UploadFileOutlined,
  UploadFileRounded,
  UploadFileSharp,
} from "@mui/icons-material";
import FileUpload from "./FileUpload";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { DownloadCloud } from "lucide-react";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

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

const getStatusLabel = (cryptoOrderStatus) => {
  const map = {
    Unknown: {
      text: "UNKNOWN",
      color: "error",
    },
    Submitted:{
      text: "SUBMITTED",
      color: "success",
    },
    Paid: {
      text: "PAID",
      color: "warning",
    },
    Pending: {
      text: "PENDING",
      color: "primary",
    },
    Failed: {
      text: "FAILED",
      color: "error",
    },
  };


  // Check if cryptoOrderStatus exists in the map, or use a default value
  const { text, color } = map[cryptoOrderStatus] || {
    text: "Unknown Status",
    color: "default",
  };

  return <Label color={color}>{text}</Label>;
};

const ExistingTable = ({
  cryptoOrders,
  statusName,
  streamName,
  getAllPlagDetails,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const [selectedSearchOption, setSelectedSearchOption] = useState(
    localStorage.getItem("searchOption")
      ? localStorage.getItem("searchOption")
      : "name"
  );
  const studentData = useSelector(
    (state) => state.student.allPlagiarismDetails
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

    console.log(assignment_id);

    axios
      .get(
        `${URL}/team/downloadplagiarismcheckfiles.php?assignment_id=${assignment_id}&file_name=${fileName}`
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
        `${URL}/team/downloadplagiarismcheckedfiles.php?assignment_id=${assignment_id}&file_name=${fileName}`
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
      setAllPlagiarismDetails({
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
      team_id: auth.teamData.id,
      assignment_id: assignId,
      assignment_files: studentData.assignment_files,
      assignment_files_random_number:
        studentData.assignment_files_random_number,
      submit: "submit",
    };

    console.log(data);

    await axios
      .post(`${URL}/team/submitfilesplagiarismcheck.php`, data)
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
        dispatch(
          setAllPlagiarismDetails({
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
    getAllPlagDetails();
  };

  // assignemnt data table

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
      setStream((prev) => ({ ...prev, stream: streamName }));
      setFilters((prev) => ({ ...prev, status: statusName }));
      setSelectedSearchOption("name");
    }
  }, [location, currentId]);

  const statusOptions = [
    {
      id: "all",
      name: "ALL",
    },
    {
      id: "PAID",
      name: "PAID",
    },
    {
      id: "ACTIVE",
      name: "ACTIVE",
    },
    {
      id: "Submitted",
      name: "SUBMITTED",
    },
  ];

  const applyFilters = (cryptoOrders, filters) => {
    return cryptoOrders?.filter((cryptoOrder) => {
      let matches = true;

      if (filters?.status && cryptoOrder?.status !== filters?.status) {
        matches = false;
      }

      if (filters?.stream && cryptoOrder?.stream !== filters?.stream) {
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
      } else if (selectedSearchOption === "amount") {
        if (
          filters?.search &&
          !cryptoOrder?.amount
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
    console.log(e.target.value);

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

  // const [teamNav, setTeamNav] = useState(null);

  // const getPmDetails = (checked_by) => {
  //   axios
  //     .get(`${URL}/team/pmdetails.php?pm_id=${checked_by}`)
  //     .then((res) => {
  //       setTeamNav(res.data[0].name);
  //       // return res.data[0].name;
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

  //   return teamNav;
  // };

  // console.log(teamNav);

  return (
    <>
      <Card>
        {!selectedBulkActions && (
          <CardHeader
            action={
              <div className="flex items-start md:justify-end md:w-[35rem] w-[20rem]">
                {/* TODO: Stream Filter */}

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
                      setSelectedSearchOption("amount");
                      JSON.stringify(
                        localStorage.setItem("searchOption", "amount")
                      );
                    }}
                    color={
                      selectedSearchOption === "amount" ? "success" : "info"
                    }
                  >
                    Amount
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
                <TableCell className="w-[10rem]">Assignment ID</TableCell>
                <TableCell>User Name</TableCell>
                <TableCell>Download Files</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell className="w-[10rem]">Status</TableCell>
                <TableCell className="w-[10rem]">Submission Date</TableCell>
                <TableCell className="w-[12rem]">Upload File</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedCryptoOrders?.map((cryptoOrder, index) => {
                const isCryptoOrderSelected = selectedCryptoOrders?.includes(
                  cryptoOrder?.id
                );

                const firstname = cryptoOrder?.user_name.split(" ")[0];
                const lastname = cryptoOrder?.user_name.split(" ")[1];

                return (
                  <>
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
                        >
                          {cryptoOrder?.assignment_id}
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
                        >
                          {firstname}
                          <br />
                          {lastname}
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
                          <div className="flex mt-5 items-center justify-center md:mb-5 flex-row ">
                            {cryptoOrder.files ? (
                              window.innerWidth > 768 ? (
                                <Button
                                  onClick={() => {
                                    handleClickOpen();
                                    handleFiles(
                                      cryptoOrder.files,
                                      cryptoOrder.assignment_id
                                    );
                                  }}
                                  size="small"
                                  variant="outlined"
                                  color="success"
                                  startIcon={<AttachFileIcon />}
                                >
                                  Download Assignment Files
                                </Button>
                              ) : (
                                <Button
                                  onClick={() => {
                                    handleClickOpen();
                                    handleFiles(
                                      cryptoOrder.files,
                                      cryptoOrder.assignment_id
                                    );
                                  }}
                                  size="small"
                                  color="success"
                                  variant="outlined"
                                  startIcon={<AttachFileIcon />}
                                >
                                  Download Assignment Files
                                </Button>
                              )
                            ) : null}
                          </div>
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
                          ₹
                          {cryptoOrder?.amount?.toLocaleString("en-US", {
                            style: "currency",
                            currency: "INR",
                          })}
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
                          {cryptoOrder?.status === ""
                            ? "In Progress"
                            : getStatusLabel(cryptoOrder?.status)}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          gutterBottom
                          whiteSpace="nowrap"
                        >
                          {moment(
                            cryptoOrder?.submission_date,
                            "DD-MM-YYYY HH:mm:ss"
                          ).format("Do MMMM YYYY h:mm:ss a")}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          gutterBottom
                          whiteSpace="nowrap"
                          sx={{ background: "#" }}
                        >
                          {cryptoOrder?.status === "Submitted" ? (
                            <Typography
                              variant="body1"
                              fontWeight="bold"
                              gutterBottom
                              whiteSpace="nowrap"
                              sx={{ color: "#57CA22" }}
                              className="flex flex-col items-center gap-3"
                            >
                              <p className="text-blue111">
                                {" "}
                                Uploaded by &nbsp;{" "}
                                <b
                                  className="text-purple-500 cursor-pointer"
                                  onClick={() => {
                                    navigate(
                                      `/team/management/pm/details-pm/${cryptoOrder.checked_by}`
                                    );
                                  }}
                                >
                                  {cryptoOrder.team_name || "NULL"}
                                </b>
                              </p>
                              {cryptoOrder?.delivery_time
                                ? ` 
                                ${moment(
                                  cryptoOrder?.delivery_time,
                                  "DD-MM-YYYY HH:mm:ss"
                                ).format("Do MMMM YYYY h:mm:ss a")}`
                                : ""}
                              {window.innerWidth > 768 ? (
                                <Button
                                  onClick={() => {
                                    handlePOpen();
                                    handleFiles(
                                      cryptoOrder.checked_files,
                                      cryptoOrder.assignment_id
                                    );
                                  }}
                                  size="small"
                                  variant="outlined"
                                  color="warning"
                                  startIcon={<DownloadCloud />}
                                >
                                  Download Plagiarism Report
                                </Button>
                              ) : (
                                <Button
                                  onClick={() => {
                                    handlePOpen();
                                    handleFiles(
                                      cryptoOrder.checked_files,
                                      cryptoOrder.assignment_id
                                    );
                                  }}
                                  size="small"
                                  color="warning"
                                  variant="outlined"
                                  startIcon={<DownloadCloud />}
                                >
                                  Download Plagiarism Report
                                </Button>
                              )}
                            </Typography>
                          ) : (
                            <Button
                              onClick={() => {
                                handleUClickOpen(cryptoOrder?.assignment_id);
                              }}
                              size="small"
                              variant="outlined"
                              color="primary"
                              startIcon={<UploadFileSharp />}
                            >
                              Upload Files
                            </Button>
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
                          {/* {cryptoOrder?.status === ""
                          ? null
                          : getStatusLabel(cryptoOrder?.status)} */}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </>
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
                          <p className="text-base leading-relaxed flex text-left text-white break-all">
                            <span className="text-purple-400 font-semibold text-xl pr-3">
                              {id + 1}.
                            </span>{" "}
                            {item}
                          </p>

                          <button className="inline-flex items-center justify-center flex-shrink-0   text-indigo-500 rounded-full sm:mr-8 sm:mb-0">
                            <CloudDownloadTwoToneIcon />
                          </button>
                        </div>
                      ))}
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
                          <p className="text-base leading-relaxed flex text-left text-white break-all">
                            <span className="text-purple-400 font-semibold text-xl pr-3">
                              {id + 1}.
                            </span>{" "}
                            {item}
                          </p>

                          <button className="inline-flex items-center justify-center flex-shrink-0   text-indigo-500 rounded-full sm:mr-8 sm:mb-0">
                            <CloudDownloadTwoToneIcon />
                          </button>
                        </div>
                      ))}
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
            <FileUpload /> 
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

export default ExistingTable;
