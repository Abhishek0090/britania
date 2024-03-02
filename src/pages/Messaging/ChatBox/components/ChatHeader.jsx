import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { LucideChevronLeft, LucideInfo } from "lucide-react";
import {
  Assignment,
  Close,
  CopyAll,
  Delete,
  DeleteForever,
  MoreVert,
} from "@mui/icons-material";
import { Menu, MenuItem, Typography } from "@mui/material";
import toast from "react-hot-toast";
import AssignmentDetails from "./AssignmentDetails";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectAuth } from "~/features/auth/authSlice";
import { useGetAssignmentsMutation } from "~/features/student/studentApiSlice";

function ChatHeader({
  currentUser,
  Logo,
  currentAssignmentDetails,
  chattypes,
  members,
  searchOption,
  setSearchOption,
  setSearch,
  setSearchCount,
  setMatchedIds,
  messageId,
  longPressedMessageId,
  longPressedMessageIndex,
  handleSearchIconClick,
  setDeleteOption,
  handleInfoOpen,
  copyText,
  selectedText,
}) {
  const auth = useSelector(selectAuth);
  const navigate = useNavigate();

  //menu option for dot option
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [
    getAssignmentData,
    { isLoading: assignmentLoading, data: assignmentData },
  ] = useGetAssignmentsMutation();

  useEffect(() => {
    getAssignmentData(auth?.id);
  }, [currentAssignmentDetails.assignment_id]);

  const currentAssignment =
    Array.isArray(assignmentData) &&
    assignmentData?.filter(
      (item) => item?.assignment_id === currentAssignmentDetails?.assignment_id
    );

  // assignment Details

  const detailRef = useRef(null);

  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleDetailsOpen = () => {
    setDetailsOpen(true);
  };

  const handleDetailsClose = () => {
    setDetailsOpen(false);
  };

  // first set current loggin as You and Freelancer id as freelancer#31

  const updatedData = members?.map((item) => {
    if (item.id === auth?.id) {
      return { ...item, name: "You" };
    }

    if (item.role === "Freelancer") {
      return { ...item, name: `freelancer#${item.id}` };
    }

    if (item.role === "admin") {
      return { ...item, name: null };
    }

    return item;
  });

  return (
    <>
      <div
        className="flex items-center justify-between p-2 gap-8 bg-[#6EC9F1] bg-opacity-50 backdrop-blur-2xl shadow-xl"
        style={{ width: "100%" }}
      >
        <div
          className="font-bold text-lg ml-2 flex items-center gap-4 cursor-pointer text-black"
          onClick={() => handleDetailsOpen()}
        >
          {currentUser ? (
            <button
              className="flex gap-1 rounded-full p-1 flex md:hidden items-center justify-center rightText hover-bg-opacity-20"
              onClick={() => {
                navigate("/chats");
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
                {currentUser && (
                  <p>
                    {currentAssignmentDetails.assignment_id || currentUser[0]}
                  </p>
                )}
              </span>
            )
          ) : null}
          <div className="flex flex-col cursor-pointer" ref={detailRef}>
            <span className="text-[1.2rem]">
              <span className="flex flex-col md:flex-row gap-1 items-start md:items-center">
                {currentUser && (
                  <>
                    <p>
                      {currentAssignmentDetails?.assignment_title !== "NULL"
                        ? currentAssignmentDetails?.assignment_title
                        : `Assignment_id_${currentAssignmentDetails?.assignment_id}` ||
                          currentUser}
                    </p>
                    {/* <p className="text-sm text-gray-900 hidden md:block">
                      {" > " + chattypes?.replace("and Student", "")}
                    </p> */}
                  </>
                )}
              </span>
              {members && members?.length > 0 && (
                <p className="text-sm font-semibold text-gray-800">
                  {updatedData?.map((item, index) => (
                    <span key={index}>
                      {item.name}
                      {index < updatedData.length - 1 && item.name && ", "}
                    </span>
                  ))}
                </p>
              )}
            </span>
          </div>
        </div>
        <div className="flex gap-4">
          {currentUser &&
            (searchOption ? (
              <>
                <Close
                  className="text-[20px] text-black cursor-pointer"
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
                    <Delete size="large" />
                  </button>
                )} */}
                <button onClick={handleClick}>
                  <MoreVert size="large" />
                </button>
              </>
            ) : (
              <>
                {window.innerWidth > 768 && (
                  <SearchIcon
                    className=" hidden md:block text-[20px] text-black cursor-pointer "
                    onClick={handleSearchIconClick}
                  />
                )}

                {/* {longPressedMessageIndex && (
                  <button
                    className="block md:hidden"
                    onClick={() => {
                      setDeleteOption(true);
                    }}
                  >
                    <Delete size="large" />
                  </button>
                )} */}
                <button onClick={handleClick}>
                  <MoreVert size="large" />
                </button>
              </>
            ))}
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
        anchorPosition={{ top: 150, left: 400 }}
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
            background: "#b5dbf100",
            backdropFilter: "blur(23px)",
          },
        }}
      >
        <Typography
          variant="h5"
          color="primary"
          className="mb-4 px-2 "
          sx={{ fontWeight: "bold" }}
        >
          Assignment Details
        </Typography>

        {Array.isArray(currentAssignment) &&
          currentAssignment?.map((item, idx) => (
            <AssignmentDetails
              key={idx}
              assignmentDetails={item}
              assignedPM={item?.assignment_project_manager}
              id={currentAssignmentDetails.assignment_id}
            />
          ))}
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
            width: "25ch",
            borderRadius: "10px",
            background: "#b5dbf1",
            backdropFilter: "blur(23px)",
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
              if (!messageId || !longPressedMessageId) {
                toast.error("Please Select Message For Info");
                return;
              }
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
              if (!messageId || !longPressedMessageId) {
                toast.error("Please Select Message For Info");
                return;
              }
              handleInfoOpen();
            }}
          >
            Info <LucideInfo className="h-6 w-6" />
          </MenuItem>
        )}
      </Menu>
    </>
  );
}

export default ChatHeader;
