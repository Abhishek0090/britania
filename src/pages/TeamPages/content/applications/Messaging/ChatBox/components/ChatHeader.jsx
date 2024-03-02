import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import {
  LucideChevronLeft,
  LucideInfo,
  LucideSettings,
  LucideCheckCheck,
} from "lucide-react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import SearchIcon from "@mui/icons-material/Search";
import {
  Assessment,
  Assignment,
  Close,
  CopyAll,
  Delete,
  DeleteForever,
  Description,
  Edit,
  Title,
} from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth } from "~/features/auth/authSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { URL } from "~/utils/BaseURL";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Menu,
  MenuItem,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import AssignmentDetails from "./AssignmentDetails";

const ChatHeader = ({
  currentUser,
  currentAssignmentDetails,
  Logo,
  chat_type,
  members,
  searchOption,
  setSearchOption,
  setSearch,
  setSearchCount,
  setMatchedIds,
  longPressedMessageIndex,
  setDeleteOption,
  enabled_status,
  setEnablingStatus,
  messageId,
  longPressedMessageId,
  handleIsClose,
  handleInfoOpen,
  copyText,
  selectedText,
}) => { 
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const chatIds = searchParams.get("chat_id");
  const auth = useSelector(selectAuth);

  //menu option for dot option
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [status, setStatus] = useState(false);

  //chat enable and disable

  const handleSwitchChange = (event) => {
    console.log(event.target.checked);
    if (event.target.checked) {
      handleDisable();
    } else {
      handleEnable();
    }
  };

  const handleEnable = async () => {
    const data = {
      chat_id: chatIds,
      team_id: auth?.teamData.id,
    };

    await axios
      .post(`${URL}/team/chatenable.php`, data)
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
        setEnablingStatus("Enabled");
      })
      .catch((err) => console.log(err));
  };

  const handleDisable = async () => {
    const data = {
      chat_id: chatIds,
      team_id: auth?.teamData.id,
    };

    await axios
      .post(`${URL}/team/chatdisable.php`, data)
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
        setEnablingStatus("Disabled");
      })
      .catch((err) => console.log(err));
  };

  const [assignmentDetails, setAssignmentDetails] = useState({});
  const [assignedPM, setAssignedPM] = useState({});
  const [assignedFreelancer, setAssignedFreelancer] = useState([]);

  const fetchAssignmentDetails = async () => {
    await axios
      .get(
        `${URL}/team/freelancingassignmentdetails.php?id=${currentAssignmentDetails.assignment_id}&role=admin&logged_in_id=${auth?.id}`
      )
      .then((res) => {
        setAssignmentDetails(res?.data[0]);

        setAssignedPM(res?.data[3].find((pm) => pm?.status === "Assigned"));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchAssignmentDetails();
  }, [currentAssignmentDetails.assignment_id]);

  // assignment Details

  const detailRef = useRef(null);

  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleDetailsOpen = () => {
    setDetailsOpen(true);
  };

  const handleDetailsClose = () => {
    setDetailsOpen(false);
  };

  return (
    <>
      <div
        className="font-bold text-lg ml-0 md:ml-2 flex items-center w-auto gap-4 md:gap-4"
        onClick={handleDetailsOpen}
      >
        {currentUser ? (
          <button
            className="flex gap-1 rounded-full p-1 flex md:hidden items-center justify-center bg-blue141 hover:bg-opacity-20"
            onClick={() => {
              navigate("/team/dashboards/chats");
            }}
          >
            <LucideChevronLeft />
          </button>
        ) : null}
        {currentUser ? (
          currentUser === "Admin" ? (
            <img
              className={`rounded-full bg-gray-800 object-contain p-2 flex items-center justify-center h-12 w-12`}
              src={Logo}
              alt="logo"
            />
          ) : (
            <span
              className={`inline-block rounded-full bg-gray-500 text-black999 font-bold p-5 flex items-center justify-center h-4 w-4`}
            >
              {currentUser
                ? currentAssignmentDetails?.assignment_id || currentUser[0]
                : // + currentUser?.split(" ")[1]?.charAt(0)
                  ""}
            </span>
          )
        ) : null}
        <span className="text-[1.2rem] cursor-pointer" ref={detailRef}>
          <span className="flex flex-col md:flex-row gap-2 items-start md:items-center">
            {currentUser && (
              <>
                <p>
                  {currentAssignmentDetails?.assignment_title !== "NULL"
                    ? currentAssignmentDetails?.assignment_title
                    : `Assignment_id_${currentAssignmentDetails?.assignment_id}` || currentUser}
                </p>
                {/* <p className="text-sm text-gray-400 hidden md:block">
                  {" "}
                  {" > " + chat_type?.replace("Team and", "")}
                </p> */}
              </>
            )}
          </span>
          {members && members?.length > 0 && (
            <p className="text-sm font-thin text-gray-300">
              {members?.map((item, index) => (
                <span key={index}>
                  {item.name}
                  {index < members.length - 1 && item.name && ", "}
                </span>
              ))}
            </p>
          )}
        </span>
      </div>
      <div className="flex items-center gap-4 md:gap-6">
        {currentUser && (
          <>
            {searchOption ? (
              <>
                <FormGroup className="hidden md:block">
                  <FormControlLabel
                    control={
                      <Switch
                        checked={enabled_status === "Disabled" ? true : false}
                        onChange={handleSwitchChange}
                      />
                    }
                    label={
                      enabled_status === "Disabled" ? "Disabled" : "Enabled"
                    }
                  />
                </FormGroup>
                <Close
                  className="text-[20px] text-white cursor-pointer"
                  onClick={() => {
                    setSearchOption((prev) => !prev);
                    setSearch(null);
                    setSearchCount(0);
                    setMatchedIds([]);
                  }}
                />
              </>
            ) : (
              <>
                <FormGroup className="hidden md:block">
                  <FormControlLabel
                    control={
                      <Switch
                        checked={enabled_status === "Disabled"}
                        onChange={handleSwitchChange}
                      />
                    }
                    label={enabled_status}
                  />
                </FormGroup>
                {window.innerWidth > 768 && ( 

<SearchIcon
className="text-[20px] text-white cursor-pointer hidden md:block"
onClick={() => {
  setSearchOption((prev) => !prev);
}}
/>
                )}
               
              </>
            )}
            {/* {longPressedMessageIndex && (
              <button
                className="block md:hidden"
                onClick={() => {
                  setDeleteOption(true);
                }}
              >
                <Delete size="large" className="text-white" />
              </button>
            )} */}

            <button onClick={handleClick} className="cursor-pointer">
              <MoreVertIcon size="large" />
            </button>
          </>
        )}
      </div>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        getContentAnchorEl={null}
        PaperProps={{
          style: {
            maxHeight: 40 * 4,
            width: "30ch",
          },
        }}
      >
        {longPressedMessageId && (
          <MenuItem
            className="flex items-center justify-between gap-4"
            onClick={() => {
              handleClose();
              setDeleteOption(true);
            }}
          >
            Delete <DeleteForever className="h-6 w-6" />
          </MenuItem>
        )}

        {longPressedMessageId && (
          <MenuItem
            className="flex items-center justify-between gap-4"
            onClick={() => {
              copyText();
              handleClose();
            }}
          >
            Copy <CopyAll className="h-6 w-6" />
          </MenuItem>
        )}

        {longPressedMessageId && (
          <MenuItem
            className="flex md:hidden items-center justify-between gap-4"
            onClick={() => {
              handleInfoOpen();
            }}
          >
            Info <LucideInfo className="h-6 w-6" />
          </MenuItem>
        )}

        <MenuItem
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
          onClick={() => {
            handleDetailsOpen();
          }}
        >
          Assignment Details <Assignment className="h-6 w-6" />
        </MenuItem>

        <MenuItem
          className="flex md:hidden items-center justify-between gap-4"
          onClick={() => setStatus(true)}
        >
          Chat Status <LucideSettings className="h-6 w-6" />
        </MenuItem>
      </Menu>

      <Menu
        anchorEl={detailRef}
        open={detailsOpen}
        onClose={() => {
          handleDetailsClose();
          handleClose();
        }}
        anchorReference="anchorPosition"
        anchorPosition={{ top: 150, left: 600 }}
        anchorOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        getContentAnchorEl={null}
        PaperProps={{
          style: {
            maxHeight: 100 * 4,
            width: "110ch",
            // overflow: "hidden",
          },
        }}
      >
        <Typography variant="h4" color="primary" className="mb-3 ml-1">
          Assignment Details
        </Typography>

        <AssignmentDetails
          assignmentDetails={assignmentDetails}
          assignedPM={assignedPM}
          assignedFreelancer={assignedFreelancer}
          id={currentAssignmentDetails.assignment_id}
          chatIds={chatIds}
        />
      </Menu>

      <Dialog open={status} onClose={() => setStatus(false)}>
        <DialogTitle>Set the Chat Status</DialogTitle>
        <DialogActions className="flex flex-col items-center justify-around">
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={enabled_status === "Disabled"}
                  onChange={handleSwitchChange}
                />
              }
              label={enabled_status}
            />
          </FormGroup>

          <br />

          <Button
            variant="contained"
            color="secondary"
            style={{ color: "black" }}
            className="w-[100%] leftText"
            onClick={() => {
              setStatus(false);
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ChatHeader;
