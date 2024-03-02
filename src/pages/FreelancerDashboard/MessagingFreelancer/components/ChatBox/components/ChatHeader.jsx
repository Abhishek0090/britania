import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { LucideChevronLeft } from "lucide-react";
import {
  Assignment,
  Close,
  CopyAll,
  Delete,
  DeleteForever,
  Details,
  Info,
  MoreVert,
} from "@mui/icons-material";
import { Menu, MenuItem, Typography } from "@mui/material";
import toast from "react-hot-toast";
import AssignmentDetails from "./AssignmentDetails";
import axios from "axios";
import { URL } from "~/utils/BaseURL";
import { selectAuth } from "~/features/auth/authSlice";
import { useSelector } from "react-redux";

function ChatHeader({
  currentUser,
  currentAssignmentDetails,
  Logo,
  members,
  chattypes,
  searchOption,
  setSearchOption,
  setSearch,
  setSearchCount,
  setMatchedIds,
  longPressedMessageIndex,
  setDeleteOption,
  handleInfoOpen,
  messageId,
  longPressedMessageId,
  copyText,
}) {
  const navigate = useNavigate();

  const auth = useSelector(selectAuth);
  //menu option for dot option
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // assignment Details

  const [assignmentDetails, setAssignmentDetails] = useState({});

  const fetchAssignmentDetails = async () => {
    await axios
      .get(
        `${URL}/freelancer/freelanceassignmentdetails.php?assignment_id=${currentAssignmentDetails.assignment_id}`
      )
      .then((res) => {
        console.log(res);
        setAssignmentDetails(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchAssignmentDetails();
  }, [currentAssignmentDetails.assignment_id]);

  //details

  const detailRef = useRef(null);

  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleDetailsOpen = () => {
    setDetailsOpen(true);
  };

  const handleDetailsClose = () => {
    setDetailsOpen(false);
  };

  console.log(members);

  const updatedData = members?.map((item) => {
    if (item.role === "Student") {
      item.name = `student#${item.id}`;
    }
    if (item.id === auth?.id) {
      item.name = "You";
    }

    if (item.role === "admin") {
      item.name = null;
    }

    return item;
  });
  updatedData.sort((a, b) => {
    if (a.role === "Freelancer" && b.role !== "Freelancer") {
      return 1;
    }
    if (a.role !== "Freelancer" && b.role === "Freelancer") {
      return -1;
    }
    return 0;
  });

  return (
    <>
      <div
        className="flex items-center justify-between p-2 gap-[3rem] md:gap-8 sticky bg-gray-900 rounded-xl"
        style={{ width: "inherit" }}
      >
        <div
          className="font-bold text-lg ml-2 flex items-center gap-4 text-white cursor-pointer"
          onClick={() => handleDetailsOpen()}
        >
          {currentUser ? (
            <button
              className="flex gap-1 rounded-full p-1 flex md:hidden items-center justify-center bg-blue141 text-white hover-bg-opacity-20"
              onClick={() => {
                navigate("/dashboard/freelancer/chats");
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
                {currentUser ? (
                  <p>
                    {currentAssignmentDetails.assignment_id || currentUser[0]}
                  </p>
                ) : (
                  ""
                )}
              </span>
            )
          ) : null}
          <div className="flex flex-col" ref={detailRef}>
            <span className="text-[1.2rem]">
              <span className="flex flex-col md:flex-row gap-2 items-start md:items-center">
                {currentUser && (
                  <>
                    <p>
                      {currentAssignmentDetails?.assignment_title !== "NULL"
                        ? currentAssignmentDetails?.assignment_title
                        : `Assignment_id_${currentAssignmentDetails?.assignment_id}` ||
                          currentUser}
                    </p>
                    {/* <p className="text-sm text-gray-400 hidden md:block">
                      {" > " + chattypes?.replace("and Freelancer", "")}
                    </p> */}
                  </>
                )}
              </span>
              {members && members?.length > 0 && (
                <p className="text-sm font-thin text-gray-300">
                  {updatedData?.map((item, index) => (
                    <span key={item.id}>
                      {item.name}
                      {index < updatedData.length - 1 && item.name && ", "}
                    </span>
                  ))}
                </p>
              )}
            </span>
          </div>
        </div>

        <div className="flex gap-4 flex items-center gap-4 bg-gray-800 text-lg rounded-xl px-2 py-1 relative">
          {currentUser && searchOption ? (
            <>
              <Close
                className="text-[20px] text-white cursor-pointer"
                onClick={() => {
                  setSearchOption((prev) => !prev);
                  setSearch(null);
                  setSearchCount(0);
                  setMatchedIds([]);
                }}
              />
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
              <button onClick={handleClick}>
                <MoreVert size="large" className="text-white" />
              </button>
            </>
          ) : (
            <>
              {window.innerWidth > 768 && (
                <SearchIcon
                  className="text-[20px] text-white cursor-pointer hidden md:block"
                  onClick={() => setSearchOption((prev) => !prev)}
                />
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
              <button onClick={handleClick}>
                <MoreVert size="large" className="text-white" />
              </button>
            </>
          )}
        </div>
      </div>

      <Menu
        anchorEl={detailRef}
        open={detailsOpen}
        onClose={() => {
          handleDetailsClose();
          handleClose();
        }}
        anchorReference="anchorPosition"
        anchorPosition={{ top: 200, left: 600 }}
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
            maxHeight: 80 * 4,
            width: "100ch",
            borderRadius: "10px",
            // background: "#b5dbf1",
            border: "none",
          },
        }}
      >
        <Typography
          variant="h6"
          color="primary"
          className="mb-3 px-2 py-1 "
          sx={{ fontWeight: "bold" }}
        >
          Assignment Details
        </Typography>

        <hr className="border-1 border-gray-500" />

        <AssignmentDetails
          assignmentDetails={assignmentDetails}
          assignedPM={assignmentDetails?.project_manager_details}
          id={currentAssignmentDetails.assignment_id}
        />
      </Menu>

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
            width: "20ch",
          },
        }}
      >
        {longPressedMessageId && (
          <MenuItem
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
            }}
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
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
            }}
            onClick={() => {
              copyText();
              handleClose();
            }}
          >
            Copy <CopyAll className="h-6 w-6" />
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
        {longPressedMessageId && (
          <MenuItem
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
            }}
            onClick={() => {
              handleInfoOpen();
            }}
          >
            Info <Info className="h-6 w-6" />
          </MenuItem>
        )}
      </Menu>
    </>
  );
}

export default ChatHeader;
