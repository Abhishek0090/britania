import { useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Box,
  FormControl,
  Typography,
  OutlinedInput,
  InputAdornment,
  Menu,
  MenuItem,
  styled,
  CircularProgress,
  Chip,
  DialogTitle,
  TextField,
} from "@mui/material";

import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import ExpandMoreTwoToneIcon from "@mui/icons-material/ExpandMoreTwoTone";
import LocalPhoneTwoToneIcon from "@mui/icons-material/LocalPhoneTwoTone";
import { DataGrid } from "@mui/x-data-grid";
import { URL } from "~/utils/BaseURL";
import React from "react";
import { DialogActions } from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import Dialog from "@mui/material/Dialog";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./editor.css";
import draftToHtml from "draftjs-to-html";
import {
  LucideAlignCenter,
  LucideChevronLeft,
  LucideChevronRight,
  LucideXCircle,
} from "lucide-react";
import Logo from "~/assets/logo/bluepen.png";
import { useSelector } from "react-redux";
import { selectAuth } from "~/features/auth/authSlice";

const editorStyle = {
  backgroundColor: "#ffffff", // Set the background color here
  color: "#000000",
  width: "auto",
  minHeight: "400px",
  fontSize: "18px",
};

const OutlinedInputWrapper = styled(OutlinedInput)(
  ({ theme }) => `
    background-color: ${theme.colors.alpha.white[100]};
    padding-right: ${theme.spacing(0.7)}
`
);

const filters = [
  {
    value: "",
    text: "All",
  },
  {
    value: "inquiry sent",
    text: "Inquiry Sent",
  },
  {
    value: "inquiry not sent",
    text: "Inquiry Not Sent",
  },
  {
    value: "assigned",
    text: "Assigned",
  },
  {
    value: "not assigned",
    text: "Not Assigned",
  },
];

export default function FreelancerList({
  freelancers,
  isLoading,
  handleInquiry,
  handleUnassign,
  handleAssign,
  fetchAssignmentDetails,
}) {
  const [tempRows, setTempRows] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const [filter, setFilter] = useState("");
  const actionRef1 = useRef(null);
  const [openPeriod, setOpenMenuPeriod] = useState(false);
  const auth = useSelector(selectAuth);

  const { id } = useParams();

  console.log(freelancers);

  let rows = [];

  if (freelancers) {
    rows = freelancers?.map((freelancer) => {
      return {
        id: freelancer?.id,
        name: freelancer?.name,
        number: freelancer?.number,
        country_code: freelancer?.country_code,
        swing_status: freelancer?.swing_status,
        inquiry_status: freelancer?.inquiry_status,
        assigned_status: freelancer?.assigned_status,
        whatsapp_number: freelancer?.whatsapp_number,
      };
    });
  }

  //modal popup
  const [isOpen, setIsOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const [step, setStep] = useState(1);

  const [username, setUserName] = useState(null);

  const titleFocus = useRef(null);

  const [title, setTitle] = useState("Assignment Assigned to You");

  const [selectedFreelancerId, setSelectedFreelancerId] = useState("");
  //editor data
  const defaultContent =
    EditorState.createWithText(`  Hi, Freelancer \n  Assignment ID ${id} has been assigned to you on the agreed upon commercial.\n
  Thanks,
  Team Bluepen`);

  // Set the editor state with the default content

  const [editorState, setEditorState] = useState(defaultContent);

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const editorContent = draftToHtml(
    convertToRaw(editorState.getCurrentContent())
  );

  const handleUClickOpen = (id, name) => {
    setIsOpen(true);
  };
  const handleUClose = () => {
    setIsOpen(false);
    setOpenConfirm(false);
  };

  const handleOpenConfirm = (id, name) => {
    setOpenConfirm(true);
    setSelectedFreelancerId(id);
    setUserName(name);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handlePreview = () => {
    setStep(2);
  };

  console.log(editorContent);

  const handleMail = async (values) => {
    if (title === "") {
      toast.error("Please Enter Title");
      return;
    }
    if (editorContent === "<p></p>\n") {
      toast.error("Please Enter Comment");
      return;
    }
    const data = {
      freelancer_id: selectedFreelancerId,
      team_id: auth.teamData.id,
      assignment_id: id,
      title: title,
      body: editorContent,
      submit: "submit",
    };

    console.log(data);

    try {
      const response = await axios.post(
        `${URL}/team/assigntofreelancerwithmail.php`,
        data
      );
      console.log(response);
      if (response.status === 200) {
        toast.success(response.data.message);
        setEditorState(EditorState.createEmpty());
        // handleAssign(selectedFreelancerId);
        setStep(1);
        fetchAssignmentDetails();
        handleUClose();
        handleCloseConfirm();
        setEditorState(EditorState.createEmpty());
        setSelectedFreelancerId(null);
        setUserName(null);
      } else {
        toast.error(response.data.message);
        console.log(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAssignWithOutMail = async (values) => {
    const data = {
      freelancer_id: selectedFreelancerId,
      assignment_id: id,
      submit: "submit",
    };

    try {
      const response = await axios.post(
        `${URL}/team/assigntofreelancerwithoutmail.php`,
        data
      );
      console.log(response);
      if (response.status === 200) {
        toast.success(response.data.message);
        // handleAssign(selectedFreelancerId);
        fetchAssignmentDetails();
        handleUClose();
        handleCloseConfirm();
        setSelectedFreelancerId(null);
        setUserName(null);
      } else {
        toast.error(response.data.message);
        console.log(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      field: "id",
      minWidth: window.innerWidth > 600 ? 140 : 100,
      headerName: "Freelancer ID",
      renderCell: (params) => (
        <Link
          to={`/team/management/profile/details/${params?.row?.id}`}
          className="flex items-center text-blue141 hover:text-gray-200"
        >
          {params?.row?.id}
        </Link>
      ),
    },
    {
      field: "name",
      minWidth: window.innerWidth > 600 ? 200 : 170,
      headerName: "Full name",
      renderCell: (params) => (
        <span className="flex items-center">{params?.row?.name}</span>
      ),
    },
    {
      field: "number",
      minWidth: window.innerWidth > 600 ? 200 : 170,
      headerName: "Whatsapp Number",
      renderCell: (params) => (
        <span className="flex flex-col items-center justify-start gap-5">
          <span className="flex items-center gap-2">
            <LocalPhoneTwoToneIcon />
            <a href={`tel:${params?.row?.number}`}>{params?.row?.number}</a>
          </span>
          {params?.row?.whatsapp_number && (
            <span className="flex items-center justify-start">
              <img
                src="https://img.icons8.com/color/96/null/whatsapp--v1.png"
                width="20px"
                height="20px"
                alt="whatsapp"
                className="mr-2"
              />
              <a
                href={`
                  https://wa.me/${params?.row?.country_code}${
                    params?.row?.whatsapp_number
                  }?text=${encodeURIComponent(
                    `Hey ${params?.row?.name},\nGreetings from Bluepen.co.in. This message is in regards to your application for academic writer as a freelancer in Bluepen. Is it a good time to talk to you?`
                  )}
              `}
              >
                {params?.row?.whatsapp_number}
              </a>
            </span>
          )}
        </span>
      ),
    },
    {
      field: "swing_status",
      minWidth: window.innerWidth > 600 ? 150 : 100,
      headerName: "Swing Status",
      renderCell: (params) => (
        <>
          {params?.row?.swing_status !== null ||
          params?.row?.swing_status === "0" ? (
            <>
              {params?.row?.swing_status === "1" && (
                <Chip
                  size="small"
                  label={"Partially Available"}
                  color="warning"
                />
              )}
              {params?.row?.swing_status === "2" && (
                <Chip size="small" label={"Fully Available"} color="success" />
              )}
              {params?.row?.swing_status === "-1" && (
                <Chip
                  size="small"
                  label={"Not Available"}
                  sx={{
                    backgroundColor: "#2856A9 ",
                  }}
                />
              )}
            </>
          ) : (
            <Chip size="small" label="Not Set" color="error" />
          )}
        </>
      ),
    },
    {
      field: "send_details",
      minWidth: window.innerWidth > 600 ? 200 : 100,
      headerName: "Send Details",
      renderCell: (params) => (
        <>
          {params?.row?.inquiry_status === "Inquiry Not Sent" ? (
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
                  variant="outlined"
                  size="small"
                  onClick={() => handleInquiry(params?.row?.id)}
                >
                  Send Inquiry
                </Button>
              )}
            </>
          ) : (
            <Button variant="outlined" size="small" color="success">
              Inquiry Sent
            </Button>
          )}
        </>
      ),
    },
    {
      field: "assign_task",
      minWidth: window.innerWidth > 600 ? 200 : 100,
      headerName: "Assign Task",
      renderCell: (params) => (
        <>
          {params.row.assigned_status === "Not Assigned" ? (
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
                  variant="contained"
                  size="small"
                  sx={{
                    backgroundColor: "#8C7CF0 !important",
                  }}
                  onClick={() => {
                    // handleAssign(params?.row?.id);
                    // handleUClickOpen(params?.row?.id, params?.row?.name);
                    handleOpenConfirm(params?.row?.id, params?.row?.name);
                  }}
                >
                  Assign
                </Button>
              )}
            </>
          ) : (
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
                  variant="outlined"
                  size="small"
                  color="error"
                  onClick={() => handleUnassign(params?.row?.id)}
                >
                  Unassign
                </Button>
              )}
            </>
          )}
        </>
      ),
    },
  ];

  const handleSearch = (event) => {
    setSearchParam(event.target.value);
    if (searchParam !== "") {
      const filteredRows = rows.filter((row) => {
        return row.name
          .toLowerCase()
          .includes(event.target.value.toLowerCase());
      });
      setTempRows(filteredRows);
    }
  };

  const handleFilter = (filterOption) => {
    setFilter(filterOption);
    if (filterOption !== "") {
      if (filterOption === "inquiry sent") {
        const filteredRows = rows.filter((row) => {
          return (
            row?.inquiry_status?.toLowerCase() === filterOption?.toLowerCase()
          );
        });
        setTempRows(filteredRows);
      } else if (filterOption === "inquiry not sent") {
        const filteredRows = rows.filter((row) => {
          return (
            row?.inquiry_status?.toLowerCase() === filterOption?.toLowerCase()
          );
        });
        setTempRows(filteredRows);
      } else if (filterOption === "assigned") {
        const filteredRows = rows.filter((row) => {
          return (
            row.assigned_status.toLowerCase() === filterOption?.toLowerCase()
          );
        });
        setTempRows(filteredRows);
      } else if (filterOption === "not assigned") {
        const filteredRows = rows.filter((row) => {
          return (
            row.assigned_status.toLowerCase() === filterOption?.toLowerCase()
          );
        });
        setTempRows(filteredRows);
      }
    } else {
      setTempRows(rows);
    }
  };

  return (
    <>
      <div className="flex md:flex-row flex-col-reverse items-start gap-2 md:items-center md:justify-between md:w-full mb-2 w-[20rem]">
        <Box>
          <FormControl variant="outlined" fullWidth>
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
        </Box>
        <Box display="flex" alignItems="center">
          <Typography
            variant="subtitle2"
            sx={{
              pr: 1,
            }}
          >
            Filter by:
          </Typography>
          <Button
            size="small"
            variant="outlined"
            ref={actionRef1}
            onClick={() => setOpenMenuPeriod(true)}
            endIcon={<ExpandMoreTwoToneIcon fontSize="small" />}
          >
            {filter === "" ? "All" : filter}
          </Button>
          <Menu
            disableScrollLock
            anchorEl={actionRef1.current}
            onClose={() => setOpenMenuPeriod(false)}
            open={openPeriod}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            {filters.map((_period) => (
              <MenuItem
                key={_period.value}
                onClick={() => {
                  handleFilter(_period.value);
                  setOpenMenuPeriod(false);
                }}
              >
                {_period.text}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </div>
      <Box sx={{ width: "100%" }}>
        <DataGrid
          autoHeight
          rowHeight={100}
          rows={searchParam !== "" || filter !== "" ? tempRows : rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 25,
              },
            },
          }}
          disableRowSelectionOnClick
        />
      </Box>

      <Dialog open={openConfirm} onClose={handleCloseConfirm}>
        <DialogTitle>Do You Want To Send Customize Mail ?</DialogTitle>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            className="text-white"
            sx={{
              backgroundColor: "#8C7CF0 !important",
            }}
            onClick={() => {
              handleUClickOpen();
            }}
          >
            Yes
          </Button>
          <Button
            onClick={() => {
              handleCloseConfirm();
              handleAssignWithOutMail();
            }}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isOpen} maxWidth>
        <DialogTitle className="flex items-center mt-2 justify-between cursor-pointer">
          <span className="flex  gap-2">
            {step === 2 && (
              <LucideChevronLeft
                className="rounded-xl bg-blue141"
                onClick={() => setStep(1)}
              />
            )}
            {step !== 2 && title && editorContent !== "<p></p>\n" && (
              <LucideChevronRight
                className="rounded-xl bg-blue141"
                onClick={() => setStep(2)}
              />
            )}
          </span>
          {step === 2 && (
            <span className="text-3xl   text-white font-bold ">
              Preview of Mail
            </span>
          )}
          <LucideXCircle size="30" onClick={() => handleUClose()} />{" "}
        </DialogTitle>
        <div className="flex flex-col  items-center justify-center   p-5  w-full gap-[20px] p-2 ">
          <DialogActions className="w-[100%] flex flex-col gap-2">
            {step === 1 && (
              <>
                {" "}
                <div className="flex items-start flex-col w-[100%] gap-4">
                  <Typography variant="h4" className="font-bold">
                    Enter Your Title
                  </Typography>
                  <TextField
                    type="text"
                    name="title"
                    ref={titleFocus}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                  />
                </div>
                <div className="mt-2" style={{ background: "#fff" }}>
                  <Editor
                    editorStyle={editorStyle}
                    editorState={editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={onEditorStateChange}
                    toolbarStyle={{
                      color: "black",
                      width: "90%",
                      background: "#fff",
                    }}
                  />
                </div>
                <div className="flex gap-5 mt-5">
                  <Button
                    disabled={!title || editorContent === "<p></p>\n"}
                    className="bg-blue141 text-white"
                    onClick={() => {
                      handlePreview();
                    }}
                  >
                    Next
                  </Button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                {" "}
                <div
                  className="mt-2 w-[100%] md:w-[60rem] h-[100%] rounded-xl"
                  style={{ background: "#fff" }}
                >
                  <span className="text-center p-5 font-Bold text-2xl flex flex-col flex-wrap w-full  text-black999">
                    {/* <h2 className="font-Bold text-2xl text-black999"> */}
                    {title}
                    {/* </h2> */}
                  </span>

                  <html>
                    <head></head>
                    <body>
                      <table
                        style={{ width: "100%", color: "black" }}
                        cellPadding="0"
                        cellSpacing="0"
                        role="presentation"
                      >
                        <tr style={{ backgroundColor: "#FFCC33" }}>
                          <th align="center" width="auto">
                            <a href="https://bluepen.co.in" className="">
                              <img
                                src={Logo}
                                title=""
                                style={{ width: "100px", height: "auto" }}
                              />
                            </a>
                          </th>
                        </tr>
                      </table>
                      {/* Rest of the email content */}
                      {/* Email Body */}
                      <table
                        className="email-wrapper text-black m-[20px]"
                        width="100%"
                        cellPadding="0"
                        cellSpacing="0"
                        role="presentation"
                      >
                        <tr>
                          <td align="center">
                            <table
                              className="email-content"
                              width="100%"
                              cellPadding="0"
                              cellSpacing="0"
                              role="presentation"
                            >
                              {/* Body content */}
                              <tr>
                                <td
                                  className="email-body"
                                  width="100%"
                                  cellPadding="0"
                                  cellSpacing="0"
                                >
                                  <table
                                    className="email-body_inner"
                                    align="center"
                                    width="570"
                                    cellPadding="0"
                                    cellSpacing="0"
                                    role="presentation"
                                  >
                                    <tr>
                                      <td className="content-cell">
                                        <div className="f-fallback">
                                          <div
                                            className="text-black999 assignmail"
                                            dangerouslySetInnerHTML={{
                                              __html: editorContent,
                                            }}
                                          />
                                          {/* Sub copy */}
                                          <table
                                            className="body-sub"
                                            role="presentation"
                                          >
                                            {/* Sub copy content */}
                                          </table>
                                        </div>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>

                              {/* <tr>
                                <td>
                                  <table
                                    className="email-footer"
                                    align="center"
                                    width="570"
                                    cellPadding="0"
                                    cellSpacing="0"
                                    role="presentation"
                                  >
                                    <tr>
                                      <td
                                        className="content-cell"
                                        align="center"
                                      >
                                        <p className="f-fallback sub align-center">
                                          &copy; 2023 Blue Pen. All rights
                                          reserved.
                                        </p>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr> */}
                            </table>
                          </td>
                        </tr>
                      </table>
                      <table
                        style={{ width: "100%", color: "black" }}
                        cellPadding="0"
                        cellSpacing="0"
                        role="presentation"
                      >
                        <tr
                          style={{
                            backgroundColor: "#FFCC33",
                            height: "100px",
                          }}
                        >
                          <th align="center" width="auto">
                            <td className="content-cell" align="center">
                              <p className="f-fallback sub align-center">
                                &copy; 2023 Blue Pen. All rights reserved.
                              </p>
                            </td>
                          </th>
                        </tr>
                      </table>
                    </body>
                  </html>
                </div>
                <div className="flex mt-5 gap-10">
                  <Button
                    onClick={() => {
                      setStep(1);
                    }}
                  >
                    Previous
                  </Button>
                  <Button
                    className="bg-blue141 text-white"
                    onClick={() => {
                      handleMail();
                    }}
                  >
                    Send Mail
                  </Button>

                  {/* <Button onClick={handleUClose}>Close</Button> */}
                </div>
              </>
            )}
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
}
