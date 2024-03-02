import React from "react";
import { Suspense, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import * as Yup from "yup";
import {
  setAllNonLoggedPlagiarismDetails,
  clearAllNonLoggedPlagiarismDetails,
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
import DialogTitle from "@mui/material/DialogTitle";
import Label from "~/pages/TeamPages/components/Label";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloudDownloadTwoToneIcon from "@mui/icons-material/CloudDownloadTwoTone";
import CloseIcon from "@mui/icons-material/Close";
import { URL } from "~/utils/BaseURL";
import { UploadCloud } from "lucide-react";
import {
  UploadFileOutlined,
  UploadFileRounded,
  UploadFileSharp,
} from "@mui/icons-material";
// import FileUpload from "./FileUpload";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { selectAuth } from "~/features/auth/authSlice";

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
    Posted: {
      text: "Posted",
      color: "primary",
    },
    Likely: {
      text: "Likely",
      color: "info",
    },
    Converted: {
      text: "Converted",
      color: "warning",
    },
    Completed: {
      text: "Completed",
      color: "success",
    },
    Lost: {
      text: "Lost",
      color: "error",
    },
  };

  const { text, color } = map[cryptoOrderStatus];

  return <Label color={color}>{text}</Label>;
};

const PageTable = ({ cryptoOrders, statusName, streamName }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);

  const [selectedSearchOption, setSelectedSearchOption] = useState(
    localStorage.getItem("searchOption")
      ? localStorage.getItem("searchOption")
      : "name"
  );

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
      id: "Likely",
      name: "Likely",
    },
    {
      id: "Converted",
      name: "Converted",
    },
    {
      id: "Completed",
      name: "Completed",
    },
    {
      id: "Lost",
      name: "Lost",
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
          !cryptoOrder?.name
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
      } else if (selectedSearchOption === "budget") {
        if (
          filters?.search &&
          !cryptoOrder?.budget
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
      <Card>
        {!selectedBulkActions && (
          <CardHeader
            action={
              <div className="flex items-start md:justify-end md:w-[35rem] w-[20rem]">
                <div className="flex items-center justify-start w-2/3 ">
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
                    color={selectedSearchOption === "name" ? "success" : "info"}
                  >
                    Name
                  </Label>
                  <Label
                    sx={{
                      cursor: "pointer",
                    }}
                    onClick={() => {
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
                  {auth?.teamDomain !== "Brainheaters" && (
                    <Label
                      sx={{
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setSelectedSearchOption("budget");
                        JSON.stringify(
                          localStorage.setItem("searchOption", "budget")
                        );
                      }}
                      color={
                        selectedSearchOption === "budget" ? "success" : "info"
                      }
                    >
                      Budget
                    </Label>
                  )}
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
                <TableCell className="w-[5rem]">ID</TableCell>
                <TableCell>User Name</TableCell>
                <TableCell>Title</TableCell>
                {auth?.teamDomain !== "Brainheaters" && (
                  <TableCell>Number</TableCell>
                )}
                <TableCell>Status</TableCell>
                {auth?.teamDomain !== "Brainheaters" && (
                  <TableCell>Budget</TableCell>
                )}

                <TableCell>Deadline</TableCell>
                <TableCell>Submission Date</TableCell>
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
                      key={cryptoOrder?.id}
                      selected={isCryptoOrderSelected}
                    >
                      <TableCell>
                        <Typography
                          sx={{
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            navigate(
                              `/team/dashboards/brainheaters/details/${cryptoOrder?.id}`
                            )
                          }
                          variant="body1"
                          fontWeight="bold"
                          color="#3f51b5"
                          gutterBottom
                          noWrap
                        >
                          {cryptoOrder?.id}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          sx={{
                            cursor: "pointer",
                          }}
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {cryptoOrder?.name}
                        </Typography>
                      </TableCell>

                      <TableCell
                        sx={{
                          maxWidth: "350px",
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
                      </TableCell>
                      {auth?.teamDomain !== "Brainheaters" && (
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
                            href={`tel: ${cryptoOrder?.number}`}
                            className="cursor-pointer"
                          >
                            {cryptoOrder?.number}
                          </Typography>
                        </TableCell>
                      )}

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
                          {/* {cryptoOrder?.status} */}
                          {cryptoOrder?.status === ""
                            ? "In Progress"
                            : getStatusLabel(cryptoOrder?.status)}
                        </Typography>
                      </TableCell>

                      {auth?.teamDomain !== "Brainheaters" && (
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
                      )}

                      <TableCell
                        sx={{
                          maxWidth: "200px",
                          wordBreak: "break-all",
                        }}
                      >
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          gutterBottom
                          whiteSpace="nowrap"
                        >
                          {moment(
                            cryptoOrder?.deadline,
                            "YYYY-MM-DD HH:mm:ss"
                          ).format("DD-MM-YYYY")}
                        </Typography>
                      </TableCell>

                      <TableCell
                        sx={{
                          maxWidth: "150px",
                          wordBreak: "break-all",
                        }}
                      >
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          gutterBottom
                          whiteSpace="nowrap"
                        >
                          {moment(
                            cryptoOrder?.date_of_submission,
                            "DD-MM-YYYY HH:mm:ss"
                          ).format("DD-MM-YYYY")}
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
    </>
  );
};

export default PageTable;
