import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Box,
  FormControl,
  OutlinedInput,
  InputAdornment,
  styled,
  CircularProgress,
  Chip,
} from "@mui/material";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { selectAuth } from "~/features/auth/authSlice";
import toast from "react-hot-toast";

const OutlinedInputWrapper = styled(OutlinedInput)(
  ({ theme }) => `
    background-color: ${theme.colors.alpha.white[100]};
    padding-right: ${theme.spacing(0.7)}
`
);

export default function PMList({
  projectManagers,
  isLoading,
  handleAssignPM,
  assignmentDetailsStream,
}) {
  const auth = useSelector(selectAuth);

  const [tempRows, setTempRows] = useState([]);
  const [tempRowsOthers, setTempRowsOthers] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const [searchParamOthers, setSearchParamOthers] = useState("");
  let rows = [];
  let otherRows = [];

  if (projectManagers) {
    rows = projectManagers
      ?.filter((pm) => {
        return pm?.domain === assignmentDetailsStream;
      })
      ?.map((pm) => {
        return {
          id: pm?.id,
          name: pm?.name,
          number: pm?.number,
          status: pm?.status,
          domain: pm?.domain,
        };
      });

    otherRows = projectManagers
      ?.filter((pm) => {
        return pm?.domain !== assignmentDetailsStream;
      })
      ?.map((pm) => {
        return {
          id: pm?.id,
          name: pm?.name,
          number: pm?.number,
          status: pm?.status,
          domain: pm?.domain,
        };
      });
  }

  const columns = [
    {
      field: "id",
      headerName: "PM ID",
      minWidth: window.innerWidth > 600 ? 150 : 100,
      renderCell: (params) => (
        <Link
          to={`/team/management/profile/details/${params?.row?.id}`}
          className="flex items-center"
        >
          {params?.row?.id}
        </Link>
      ),
    },
    {
      field: "name",
      headerName: "Full name",
      minWidth: window.innerWidth > 600 ? 250 : 100,
      renderCell: (params) => (
        <span className="flex items-center">{params?.row?.name}</span>
      ),
    },
    {
      field: "number",
      headerName: "Phone Number",
      minWidth: window.innerWidth > 600 ? 250 : 100,
      renderCell: (params) => (
        <a href={`tel:${params?.row?.number}`} className="flex items-center">
          {params?.row?.number}
        </a>
      ),
    },
    {
      field: "domain",
      headerName: "Domain",
      minWidth: window.innerWidth > 600 ? 180 : 100,
      renderCell: (params) => (
        <>
          {params?.row?.domain === "Non-Technical" && (
            <Chip size="small" label={"Non-Technical"} color="info" />
          )}
          {params?.row?.domain === "Technical" && (
            <Chip size="small" label={"Technical"} color="success" />
          )}
        </>
      ),
    },
    {
      field: "action",
      headerName: "Assign Task",
      sortable: false,
      minWidth: window.innerWidth > 600 ? 200 : 100,
      description: "Assign Task to Project Manager Here",
      renderCell: (params) => (
        <>
          {params?.row?.status === "Not Assigned" ? (
            <>
              {isLoading[params?.row?.id] ? (
                <span className="flex items-center justify-start">
                  <CircularProgress
                    size={20}
                    sx={{
                      color: "#fff !important",
                    }}
                  />
                  <span style={{ marginLeft: "10px" }}>Please Wait</span>
                </span>
              ) : (
                <Button
                  onClick={() => {
                    if (
                      auth?.id == params?.id &&
                      (auth?.teamData?.teamDomain === "Non-Technical pm" ||
                        auth?.teamData?.teamDomain === "Technical pm")
                    ) {
                      toast.error("You cannot assign yourself");
                      return;
                    } else {
                      handleAssignPM(params?.row?.id);
                    }
                  }}
                  variant="contained"
                  size="small"
                  sx={{
                    backgroundColor: "#8C7CF0 !important",
                  }}
                >
                  Assign
                </Button>
              )}
            </>
          ) : (
            <Button variant="outlined" size="small" color="success">
              Assigned
            </Button>
          )}
        </>
      ),
    },
  ];

  const handleSearch = (event) => {
    setSearchParam(event.target.value);
    if (searchParam !== "") {
      const filteredRows = rows?.filter((row) => {
        return row?.name
          .toLowerCase()
          .includes(event.target.value.toLowerCase());
      });
      setTempRows(filteredRows);
    }
  };
  const handleSearchOther = (event) => {
    setSearchParamOthers(event.target.value);
    if (searchParamOthers !== "") {
      const filteredRows = otherRows?.filter((row) => {
        return row?.name
          .toLowerCase()
          .includes(event.target.value.toLowerCase());
      });
      setTempRowsOthers(filteredRows);
    }
  };

  return (
    <>
      <span className="flex text-xl font-bold items-center justify-start mt-5 mb-5">
        {assignmentDetailsStream} Project Managers
      </span>
      <FormControl variant="outlined">
        <OutlinedInputWrapper
          type="text"
          value={searchParam}
          onChange={handleSearch}
          placeholder="Search name here..."
          startAdornment={
            <InputAdornment position="start">
              <SearchTwoToneIcon />
            </InputAdornment>
          }
        />
      </FormControl>
      <Box sx={{ mt: 3 }} />
      <Box sx={{ width: "100%" }}>
        <DataGrid
          autoHeight
          rows={searchParam !== "" ? tempRows : rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          disableRowSelectionOnClick
          hideFooterPagination
        />
      </Box>
      <span className="flex text-xl font-bold items-center justify-start mt-5 mb-5">
        Other Project Managers
      </span>
      <FormControl variant="outlined">
        <OutlinedInputWrapper
          type="text"
          value={searchParamOthers}
          onChange={handleSearchOther}
          placeholder="Search name here..."
          startAdornment={
            <InputAdornment position="start">
              <SearchTwoToneIcon />
            </InputAdornment>
          }
        />
      </FormControl>
      <Box sx={{ mt: 3 }} />
      <Box sx={{ width: "100%" }}>
        <DataGrid
          autoHeight
          rows={searchParamOthers !== "" ? tempRowsOthers : otherRows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          disableRowSelectionOnClick
          hideFooterPagination
        />
      </Box>
    </>
  );
}
