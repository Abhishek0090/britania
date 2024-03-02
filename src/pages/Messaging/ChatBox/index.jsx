import React, { useMemo, useRef, useState } from "react";
import moment from "moment";
import axios from "axios";
import { URL } from "~/utils/BaseURL";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "~/features/auth/authSlice";
import { CircularProgress, Typography, Box, Divider } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import xls from "~/assets/fileTypes/xls.png";
import xlsx from "~/assets/fileTypes/xlsx.png";
import doc from "~/assets/fileTypes/doc.png";
import pdf from "~/assets/fileTypes/pdf.png";
import docx from "~/assets/fileTypes/docx.png";
import ppt from "~/assets/fileTypes/ppt.png";
import pptx from "~/assets/fileTypes/pptx.png";
import photo from "~/assets/fileTypes/photo.png";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import {
  LucideCheck,
  LucideCheckCheck,
  LucideChevronDown,
  Download,
  LucideInfo,
} from "lucide-react";
import {
  CopyAll,
  DeleteForever,
  Edit,
  InsertDriveFile,
} from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Menu,
  MenuItem,
} from "@mui/material";
import Logo from "~/assets/logo/favicon.png";
import Bluepen from "~/assets/logo/bluepen.png";
import Slide from "@mui/material/Slide";
import {
  setAllChatStudentDetails,
  clearAllChatStudentDetails,
} from "~/features/team/Chats/chatSlice";
import { useSearchParams } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import ChatHeader from "./components/ChatHeader";
import FileUpload from "./components/FileUpload";
import MessageSend from "./components/MessageSend";
import Scrollbars from "react-custom-scrollbars-2";
import Skeleton from "../ChatInfo/components/Skeleton";
import MessageSkeleton from "./components/MessageSkeleton";
import ScrollableFeed from "react-scrollable-feed";
import {
  getTime,
  getSpecifiedTime,
  getRangeDate,
} from "~/utils/MessageTimeDate";

const MAX_COUNT = 10;
const MAX_SIZE = 10242880;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ChatBox = ({
  currentUser,
  personalChat,
  loading,
  getMessageApi,
  sendMessageApi,
  colorArray,
  existingMembersIds,
  readApi,
  deletedApi,
  loggedInUserId,
  fileUploadApi,
  downloadApi,
  assignmentDetails,
  messageScrolling,
  setMessageScrolling,
  members,
  chattypes,
  enabled_status,
  allMembers,
}) => {
  const dispatch = useDispatch();
  const filesData = useSelector((state) => state.chats.allChatStudentDetails);
  const [searchParams] = useSearchParams();
  const chatIds = searchParams.get("chat_id");
  const auth = useSelector(selectAuth);

  //chat messages sections
  const scroll = useRef(null);
  const messageRefs = useRef([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const latestMessageRef = useRef(null);
  const messageContainerRef = useRef(null);

  //message section

  const [newMessage, setNewMessage] = useState(personalChat || null);
  const [deleteOption, setDeleteOption] = useState(false);
  const [messageId, setMessageId] = useState(null);

  //get messages continously

  const getMessages = () => {
    axios
      .post(`${URL}/student/${getMessageApi}`, {
        chat_id: chatIds,
      })
      .then((res) => {
        setNewMessage(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      getMessages();
    }, 1000);

    return () => clearInterval(intervalId);
  }, [chatIds,personalChat]);

  //-------------files transfer section----------//
  const fileInputRef = useRef();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileLoading, setFileLoading] = useState(false);
  const [uniqueId, setUniqueId] = useState(null);
  const [fileSelect, setFileSelect] = useState([]);

  const handleUploadFiles = async (files) => {
    let uploaded = [...uploadedFiles];
    setFileLoading(true);
    files.forEach((file) => {
      if (uploaded.length < MAX_COUNT) {
        if (file.size > MAX_SIZE) {
          toast.error("File size is too large");
          setFileLoading(false);
          return;
        }

        uploaded.push(file);
        const extractFirst = uploaded[0].name;
        setFileSelect([extractFirst]);
      } else {
        toast.error("You can upload maximum 10 files");
        setFileLoading(false);
      }
    });
    setUploadedFiles(uploaded);

    setDiscardOpen(false);

    //file upload issue fixed
    let uniqueIdLocal = JSON.parse(
      localStorage.getItem("assignment_files_random_number")
        ? localStorage.getItem("assignment_files_random_number")
        : uniqueId
    );

    let data = {
      chat_file: uploaded,
      submit: "submit",
      random_number: uniqueIdLocal ? uniqueIdLocal : uniqueId,
      student_id: auth?.id,
    };

    await axios
      .post(`${URL}/student/${fileUploadApi}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setUniqueId(res?.data?.random_number);
        console.log(res);
        localStorage.setItem(
          "assignment_files_random_number",
          res?.data?.random_number
        );
        dispatch(
          setAllChatStudentDetails({
            assignment_files: res?.data?.file_name_string,
            assignment_files_random_number: res?.data?.random_number,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
    setFileLoading(false);
  };

  const handleFileSend = async () => {
    if (!filesData?.assignment_files) {
      toast.error("Please Select a File");
      return;
    }
    const newData = {
      chat_id: chatIds,
      sent_by_id: auth.id,
      type: "File",
      message: filesData?.assignment_files,
    };

    await axios
      .post(`${URL}/student/${sendMessageApi}`, newData)
      .then((res) => {
        setUploadedFiles([]);
        fileInputRef.current.value = null;
        localStorage.removeItem("assignment_files_random_number");
        dispatch(
          clearAllChatStudentDetails({
            assignment_files: null,
            assignment_files_random_number: null,
          })
        );
        setMessageScrolling(true);
        getMessages();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const outerContainerRef = useRef(null);
  const innerContainerRef = useRef(null);

  const handleMouseWheel = (e) => {
    if (e.deltaY !== 0) {
      e.preventDefault();

      innerContainerRef.current.scrollLeft += e.deltaY;
    }
  };
  const renderMessageFilePreview = (fileName, sent_by_id, message_id) => {
    const filteredFileName = fileName.replace(/^[0-9_]+/, "");

    return (
      <div
        className={`flex  flex-row items-center cursor-pointer gap-2 px-2 py-1 hover:bg-opacity-50  ${
          sent_by_id == auth?.id ? "bg-[#69e3fb]" : "bg-[#77d0dd]"
        } rounded-xl`}
        onClick={() => handleDownloadFile(fileName, message_id)}
      >
        {displayFileType(filteredFileName?.split(".")[1])}
        <span className="text-black hidden md:flex flex-col items-start justify-center    p-2">
          <b className="text-[1rem]">
            {" "}
            {filteredFileName.length > 10
              ? filteredFileName?.slice(0, 10) +
                ".." +
                filteredFileName?.split(".")[1]
              : filteredFileName}
          </b>
          <p className="text-xs">{getFileExtension(filteredFileName)}</p>
        </span>
        <span className="text-black flex md:hidden flex-col items-start justify-center    p-2">
          <b className="text-[1rem]">
            {" "}
            {filteredFileName.length > 10
              ? filteredFileName?.slice(0, 10) +
                ".." +
                filteredFileName?.split(".")[1]
              : filteredFileName}
          </b>
          <p className="text-xs">{getFileExtension(filteredFileName)}</p>
        </span>
        {/* {sent_by_id === auth?.id ? ( */}
        <button className="text-gray-900 text-gray-800 flex gap-2 backdrop-blur-2xl rounded-full  bg-white bg-opacity-50 p-2 cursor-pointer hover:bg-opacity-20   mx-auto my-auto">
          <Download />
        </button>
        {/* ) : null} */}
      </div>
    );
  };

  const displayFileType = (fileType) => {
    if (fileType.toLowerCase() == "doc") {
      return <img src={doc} alt="doc" className="h-[3rem]" />;
    } else if (fileType.toLowerCase() == "pdf") {
      return <img src={pdf} alt="pdf" className="h-[3rem]" />;
    } else if (fileType.toLowerCase() == "docx") {
      return <img src={docx} alt="docx" className="h-[3rem]" />;
    } else if (fileType.toLowerCase() == "xls") {
      return <img src={xls} alt="xls" className="h-[3rem]" />;
    } else if (fileType.toLowerCase() == "xlsx") {
      return <img src={xlsx} alt="xlsx" className="h-[3rem]" />;
    } else if (fileType.toLowerCase() == "ppt") {
      return <img src={ppt} alt="ppt" className="h-[3rem]" />;
    } else if (fileType.toLowerCase() == "pptx") {
      return <img src={pptx} alt="pptx" className="h-[3rem]" />;
    } else if (fileType.toLowerCase() == "jpg") {
      return <img src={photo} alt="photo" className="h-[3rem]" />;
    } else if (fileType.toLowerCase() == "png") {
      return <img src={photo} alt="photo" className="h-[3rem]" />;
    } else if (fileType.toLowerCase() == "jpeg") {
      return <img src={photo} alt="photo" className="h-[3rem]" />;
    } else {
      return <InsertDriveFile style={{ color: "#443f3f", fontSize: "3rem" }} />;
    }
  };

  const handleDownloadFile = (fileName, message_id) => {
    if (fileName === "") {
      toast.error("File name is empty");
      return;
    }

    axios
      .get(
        `${URL}/student/${downloadApi}?chat_id=${chatIds}&message_id=${message_id}&file_name=${fileName}`
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

  const getFileExtension = (fileName) => {
    return fileName.split(".").pop().toUpperCase();
  };

  const [isClickedOutside, setIsClickedOutside] = useState(false);
  const [discardOpen, setDiscardOpen] = useState(false);
  const dialogOpen = isClickedOutside || discardOpen;
  const mediaRef = useRef(null);

  const handleCancelMedia = () => {
    setIsClickedOutside(false);
    mediaRef.current.value = null;
    setDiscardOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mediaRef.current && !mediaRef.current.contains(event.target)) {
        setIsClickedOutside(true);
      } else {
        setIsClickedOutside(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleCancelMedia]);

  //search bar for messages
  const [search, setSearch] = useState(null);
  const [searchOption, setSearchOption] = useState(false);
  const [matchedIds, setMatchedIds] = useState([]);

  const handleSearchIconClick = () => {
    setSearchOption((prev) => !prev);
  };

  useEffect(() => {
    const filteredSearch =
      Array.isArray(newMessage) &&
      newMessage
        ?.filter((item) => item !== "")
        ?.filter((item) => item?.message && item?.message_id)
        ?.filter((item) =>
          item?.message
            .toLowerCase()
            .trim()
            .includes(search?.toLowerCase().trim())
        )
        ?.map((item) => item?.message_id)
        ?.sort((a, b) => a - b);

    setMatchedIds(filteredSearch || []);
  }, [search, newMessage]);

  const initialSearchCount = matchedIds?.length > 0 ? 1 : 0;
  const [searchCount, setSearchCount] = React.useState(initialSearchCount);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const navToPrevMessage = (e) => {
    e.preventDefault();
    if (matchedIds.length > 0) {
      const newSearchCount =
        searchCount === 1 ? matchedIds.length : searchCount - 1;
      setSearchCount(newSearchCount);
      const matchedMessageId = matchedIds[newSearchCount - 1];
      setTimeout(() => {
        const targetElement = document.getElementById(
          `message-${matchedMessageId}`
        );
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  const navToNextMessage = (e) => {
    e.preventDefault();
    if (matchedIds.length > 0) {
      const newSearchCount = (searchCount % matchedIds.length) + 1;
      setSearchCount(newSearchCount);
      const matchedMessageId = matchedIds[newSearchCount - 1];

      setTimeout(() => {
        const targetElement = document.getElementById(
          `message-${matchedMessageId}`
        );
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  //for deleting message in laptop or desktop view

  const [hoveredMessageIndex, setHoveredMessageIndex] = useState(null);

  //for deleting message in mobile view

  const [longPressedMessageIndex, setLongPressedMessageIndex] = useState(null);
  const [longPressedMessageId, setLongPressedMessageId] = useState(null);

  const [selectedText, setSelectedText] = useState({
    type: null,
    text: null,
  });

  const [readDetails, setReadDetails] = useState(null);
  const [deliveredDetails, setDeliveredDetails] = useState(null);

  const handleMouseEnter = (index, message_id) => {
    setHoveredMessageIndex(index);
    setMessageId(message_id);
  };

  const handleMouseLeave = () => {
    setHoveredMessageIndex(null);
  };

  const handleLongPress = (
    e,
    index,
    message_Id,
    readDetails,
    deliveredDetails,
    message,
    message_type
  ) => {
    e.preventDefault();

    setSelectedText((prev) => ({ ...prev, type: message_type, text: message }));

    setLongPressedMessageIndex(index);
    setLongPressedMessageId(message_Id);

    if (readDetails !== null) {
      if (Array.isArray(readDetails)) {
        setReadDetails(readDetails);
      } else {
        setReadDetails([readDetails]);
      }
    }

    if (deliveredDetails !== null) {
      if (Array.isArray(deliveredDetails)) {
        setDeliveredDetails(deliveredDetails);
      } else {
        setDeliveredDetails([deliveredDetails]);
      }
    }
  };

  const [showMenuOptions, setShowMenuOptions] = useState(false);

  const handleIsOpen = () => {
    setShowMenuOptions(true);
  };

  const handleIsClose = () => {
    setShowMenuOptions(false);
    setSelectedItemIndex(null);
  };

  const handleRightClick = (
    index,
    message_id,
    readDetails,
    deliveredDetails,
    message,
    message_type
  ) => {
    handleIsOpen();
    setMessageId(message_id);
    setSelectedItemIndex(index);
    setSelectedText((prev) => ({ ...prev, type: message_type, text: message }));

    if (readDetails !== null) {
      if (Array.isArray(readDetails)) {
        setReadDetails(readDetails);
      } else {
        setReadDetails([readDetails]);
      }
    }

    if (deliveredDetails !== null) {
      if (Array.isArray(deliveredDetails)) {
        setDeliveredDetails(deliveredDetails);
      } else {
        setDeliveredDetails([deliveredDetails]);
      }
    }
  };

  //copytext

  function copyText() {
    navigator.clipboard.writeText(selectedText.text);

    if (selectedText.text) toast.success("Text Copied");
  }

  const handleMessageDelete = () => {
    const data = {
      message_id: longPressedMessageId ? longPressedMessageId : messageId,
      student_id: auth?.id,
    };
    axios
      .post(`${URL}/student/${deletedApi}`, data)
      .then((res) => {
        console.log(res);
        getMessages();
        setMessageId(null);
        setLongPressedMessageId(null);
        setLongPressedMessageIndex(null);
      })
      .catch((err) => console.log(err));
  };

  const unreadMessagesIds = useMemo(() => {
    if (!Array.isArray(newMessage)) {
      return [];
    }

    const filteredMessagesIds = newMessage?.filter(
      (item) =>
        item !== "" &&
        ((item?.read === null && item?.sent_by_id !== auth?.id) ||
          (Array.isArray(item?.read) &&
            item?.sent_by_id !== auth?.id &&
            item?.read?.every((ele) => ele?.read_to !== auth?.id)))
    );

    return filteredMessagesIds?.map((item) => item?.message_id);
  }, [newMessage, auth?.id]);

  console.log(unreadMessagesIds);

  const [isLatestMessageInView, setIsLatestMessageInView] = useState(false);

  //intersection observer for observing if message is in the view or not
  useEffect(() => {
    const options = {
      root: null,  
      rootMargin: "0px",
      threshold: 0,
    };
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { 
          if (entry.target === latestMessageRef.current) {
            setIsLatestMessageInView(true);
          } else {
            setIsLatestMessageInView(false);
          }
        } else {
          setIsLatestMessageInView(false);
        }
      });
    }, options);
  
    if (latestMessageRef.current) {
      observer.observe(latestMessageRef.current);
    }
  
    return () => {
      if (latestMessageRef.current) {
        observer.unobserve(latestMessageRef.current);
      }
    };
  }, [newMessage, auth?.id]);
  
  const readMessages = (id) => {
    let data = {
      message_id: id,
      student_id: auth?.id,
    };

    axios
      .post(`${URL}/student/${readApi}`, data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (newMessage && newMessage.length > 0 && unreadMessagesIds.length > 0) {
      if (
        (isLatestMessageInView  ) &&
        (loggedInUserId == auth?.id ||
          (Array.isArray(loggedInUserId) &&
            loggedInUserId?.some((ids) => ids?.id == auth?.id)))
      ) { 
        unreadMessagesIds.forEach((element) => {
          readMessages(element);
        });
      }
    }
  }, [newMessage, auth?.id, isLatestMessageInView]);
  
  //scroll to unread message

  const scrollToUnreadMessage = () => {
    if (!messageContainerRef.current) return;

    const unreadMessage = newMessage.find(
      (item) =>
        !item?.deleted && item?.read === null && item?.sent_by_id !== auth?.id
    );

    const readMessage = newMessage
      ?.slice()
      ?.reverse()
      ?.find(
        (item) => !item?.deleted && item?.read && item?.sent_by_id !== auth?.id
      );

    if (unreadMessage !== null || unreadMessage !== undefined) {
      if (messageScrolling) {
        const messageId = unreadMessage?.message_id;
        const targetElement = document.getElementById(`message-${messageId}`);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
        setMessageScrolling(false);
      }
    } 
    // else {
    //   // if (messageScrolling) {
    //     const messageId = readMessage?.message_id;
    //     const targetElement = document.getElementById(`message-${messageId}`);
    //     if (targetElement) {
    //       targetElement.scrollIntoView({ behavior: "smooth" });
    //     }
    //   //   setMessageScrolling(false);
    //   // }
    // }
  };

  useEffect(() => {
    // if(unreadMessagesIds.length>0){
    scrollToUnreadMessage();
    // }
  }, [newMessage]);

  const handleScrollInsideContainer = () => {
    const messageContainer = document.getElementById("message-container");
    if (messageContainer) {
      if (
        messageContainer.scrollTop + messageContainer.clientHeight <
        messageContainer.scrollHeight
      ) {
        setMessageScrolling(false);
      } else {
        setMessageScrolling(true);
      }
    }
  };

  useEffect(() => {
    const messageContainer = document.getElementById("message-container");

    const handleScroll = () => {
      handleScrollInsideContainer();
    };

    if (messageContainer) {
      messageContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (messageContainer) {
        messageContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);
 

  useEffect(() => {
    if (messageScrolling) {
      scroll.current?.scrollIntoView({ behavior: "smooth"  ,block: "nearest", inline: "nearest"});
    }
  }, [newMessage, messageScrolling]);

 

  const scrollToBottom = () => {
    setMessageScrolling(true);
    scroll.current.scrollIntoView({ behavior: "smooth"  ,block: "nearest", inline: "nearest"});
  };

  // READ AND DELIVERED MODAL

  const [infoOpen, setInfoOpen] = useState(false);

  const handleInfoOpen = () => {
    setInfoOpen(true);
  };

  const handleInfoClose = () => {
    setInfoOpen(false);
  };

  return (
    <>
      <div
        className="flex bg-[#6EC9F1] bg-opacity-50 backdrop-blur-2xl shadow-xl
         flex-col  h-[100%]  items-center  md:items-start lg:items-start fixed"
        style={{ width: "inherit" }}
      >
        {currentUser && (
          <ChatHeader
            currentUser={currentUser}
            Logo={Logo}
            currentAssignmentDetails={assignmentDetails}
            chattypes={chattypes}
            members={allMembers}
            searchOption={searchOption}
            setSearchOption={setSearchOption}
            setSearch={setSearch}
            setSearchCount={setSearchCount}
            setMatchedIds={setMatchedIds}
            longPressedMessageIndex={longPressedMessageIndex}
            handleSearchIconClick={handleSearchIconClick}
            setDeleteOption={setDeleteOption}
            messageId={messageId}
            longPressedMessageId={longPressedMessageId}
            handleInfoOpen={handleInfoOpen}
            copyText={copyText}
            selectedText={selectedText}
          />
        )}
        {searchOption && (
          <SearchBar
            search={search}
            handleSearch={handleSearch}
            searchCount={searchCount}
            matchedIds={matchedIds}
            navToPrevMessage={navToPrevMessage}
            navToNextMessage={navToNextMessage}
          />
        )}
        <div
          className="p-0 md:p-2   mid-section overflow-auto flex-1  "
          style={{ width: "100%" }}
          id="message-container"
        >
          {existingMembersIds && unreadMessagesIds?.length > 0 && (
            <div className="flex  px-5  w-[100%] rounded-2xl   items-center justify-center fixed z-50">
              <span className="flex bg-gray-800 px-5 py-1 rounded-2xl   items-center justify-center mb-1 text-white gap-2">
                {" "}
                <b>{unreadMessagesIds?.length}</b> unread messages
              </span>
            </div>
          )}
          {loading ? (
            <div className="flex items-center m-auto justify-center">
              <CircularProgress />
              {/* <MessageSkeleton /> */}
            </div>
          ) : currentUser ? (
            <ScrollableFeed>
              {Array.isArray(newMessage) &&
                newMessage?.map((item, index) => (
                  <>
                    {getRangeDate(item, newMessage[index - 1])}
                    {!item?.deleted ? (
                      <>
                        <div
                          className={`flex items-start ${
                            longPressedMessageIndex === index
                              ? "backdrop-blur-2xl shadow-xl"
                              : ""
                          } ${
                            auth?.id === item?.sent_by_id
                              ? "flex-row-reverse justify-start "
                              : " flex-row  justify-start"
                          } p-2 mt-2 m-[10px] md:m-[0px] md:mt-2 `}
                          key={item.message_id}
                          onMouseEnter={() =>
                            handleMouseEnter(index, item?.message_id)
                          }
                          ref={(ref) => {
                            messageRefs.current[index] = ref; //for right click options
                            scroll.current = ref; //for scroll
                            messageContainerRef.current = ref; //for scrolling and disabling container
                            index === newMessage?.length - 1 // for latest message scroll getting message value
                              ? (latestMessageRef.current = ref)
                              : null;
                          }}
                          onMouseLeave={() => handleMouseLeave()}
                          onContextMenu={(e) => {
                            if (
                              loggedInUserId == item?.sent_by_id ||
                              (Array.isArray(loggedInUserId) &&
                                loggedInUserId?.every(
                                  (elx) =>
                                    elx?.id == item?.sent_by_id &&
                                    elx?.name == item?.sent_by_name
                                ))
                            ) {
                              handleLongPress(
                                e,
                                index,
                                item?.message_id,
                                item?.read,
                                item?.delivered,
                                item?.message,
                                item?.type
                              );
                              if (window.innerWidth > 768) {
                                handleRightClick(
                                  index,
                                  item?.message_id,
                                  item?.read,
                                  item?.delivered,
                                  item?.message,
                                  item?.type
                                );
                              }
                            }
                          }}
                          onClick={() => {
                            setLongPressedMessageIndex(null);
                            setLongPressedMessageId(null);
                          }}
                          id={`message-${item.message_id}`}
                        >
                          {item?.sent_by_name === "Admin" ? (
                            <img
                              className={`rounded-full bg-gray-800 object-contain p-2  items-center justify-center h-12 w-12 hidden md:flex`}
                              src={Logo}
                              alt="logo"
                            />
                          ) : item?.sent_by_id !== auth.id ? (
                            <span
                              className={`inline-block rounded-full bg-gray-500 text-black999 font-bold p-5  hidden md:flex items-center justify-center h-12 w-12`}
                            >
                              {item?.sent_by_name ? item?.sent_by_name[0] : ""}
                            </span>
                          ) : null}

                          <div
                            className={`flex flex-col hidden md:flex   max-w-[70%] md:max-w-[50%]  bg-opacity-20 backdrop-blur-2xl shadow-xl rounded-xl px-3 py-2  ${
                              auth?.id === item?.sent_by_id
                                ? "rounded-tr-none  ml-4 mr-4  rightText"
                                : "rounded-tl-none mr-4 ml-4  leftText"
                            } `}
                          >
                            <div className="flex items-center justify-between  gap-4">
                              {colorArray ? (
                                <span
                                  className={`font-bold text-lg ${
                                    colorArray.find(
                                      (colorItem) =>
                                        colorItem.name === item?.sent_by_name
                                    )?.color || "text-indigo-500"
                                  }`}
                                >
                                  {item?.sent_by_id === auth?.id
                                    ? null
                                    : item?.sent_by_name}
                                </span>
                              ) : (
                                <span
                                  className={`font-bold text-lg  ${
                                    currentUser === item?.sent_by_name
                                      ? "text-red-500"
                                      : "text-blue141"
                                  } `}
                                >
                                  {item?.sent_by_id === auth?.id
                                    ? null
                                    : item?.sent_by_name}
                                </span>
                              )}
                            </div>

                            <span
                              className={`flex gap-2 items-end justify-between ${
                                item?.type === "Text Message"
                                  ? "flex-row"
                                  : "flex-col"
                              }`}
                            >
                              {item?.type === "Text Message" ? (
                                <span
                                  className=" text-gray-900 flex gap-2 items-center justify-between"
                                  style={{ wordBreak: "break-all" }}
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      search?.length > 0
                                        ? item?.message
                                            .split(
                                              new RegExp(`(${search})`, "gi")
                                            )
                                            .map((text, index) =>
                                              text?.toLowerCase().trim() ===
                                              search?.toLowerCase().trim()
                                                ? `<span key=${index} class="text-red-500 font-bold">${text}</span>`
                                                : text
                                            )
                                            .join("")
                                        : item?.message,
                                  }}
                                />
                              ) : (
                                item?.message
                                  ?.split("_$_")
                                  ?.filter((filterFiles) => filterFiles !== "")
                                  ?.map((files, index) => (
                                    <div key={index}>
                                      {renderMessageFilePreview(
                                        files,
                                        item?.sent_by_id,
                                        item?.message_id
                                      )}
                                    </div>
                                  ))
                              )}
                              <span className="flex gap-2">
                                <span className="text-[12px] text-gray-800">
                                  {item?.sent_on && item?.sent_by_name
                                    ? getTime(item?.sent_on)
                                    : null}
                                </span>
                                {auth?.id === item?.sent_by_id && (
                                  <>
                                    {item?.delivered?.delivered_to ==
                                      existingMembersIds ||
                                    (item?.delivered &&
                                      Array.isArray(existingMembersIds) &&
                                      Array.isArray(item?.delivered) &&
                                      existingMembersIds?.every((ele) =>
                                        item?.delivered?.some(
                                          (deli) =>
                                            deli?.delivered_to === ele?.id ||
                                            deli?.delivered_name === ele?.name
                                        )
                                      )) ? (
                                      <span>
                                        <LucideCheckCheck
                                          size="16"
                                          style={{
                                            color:
                                              item?.read?.read_to ==
                                                existingMembersIds ||
                                              (Array.isArray(item?.read) &&
                                                Array.isArray(
                                                  existingMembersIds
                                                ) &&
                                                existingMembersIds?.every(
                                                  (user) =>
                                                    item?.read?.some(
                                                      (ele) =>
                                                        user?.id ===
                                                        ele?.read_to
                                                    )
                                                ))
                                                ? "blue"
                                                : "none",
                                          }}
                                        />
                                      </span>
                                    ) : (
                                      <span>
                                        <LucideCheck size="16" />
                                      </span>
                                    )}
                                  </>
                                )}
                              </span>
                            </span>
                          </div>

                          {hoveredMessageIndex === index &&
                            (loggedInUserId == item?.sent_by_id ||
                              (Array.isArray(loggedInUserId) &&
                                loggedInUserId?.every(
                                  (elx) =>
                                    elx?.id == item?.sent_by_id &&
                                    elx?.name == item?.sent_by_name
                                ))) && (
                              <span
                                className=" cursor-pointer flex gap-2 items-center justify-between   md:hidden lg:flex hidden"
                                onClick={() => {
                                  handleRightClick(
                                    index,
                                    item?.message_id,
                                    item?.read,
                                    item?.delivered,
                                    item?.message,
                                    item?.type
                                  );
                                }}
                              >
                                <MoreVertIcon size="large" />
                              </span>
                            )}
                          <div
                            className={`flex flex-col  md:hidden  max-w-[80%]   bg-[#6EC9F1] bg-opacity-20 backdrop-blur-2xl shadow-xl rounded-xl px-3 py-2  ${
                              auth?.id === item?.sent_by_id
                                ? "rounded-tr-none   rightText"
                                : "rounded-tl-none   leftText"
                            } `}
                          >
                            <div className="flex items-center  justify-between gap-4">
                              {colorArray ? (
                                <span
                                  className={`font-bold text-lg ${
                                    colorArray.find(
                                      (colorItem) =>
                                        colorItem.name === item?.sent_by_name
                                    )?.color || "text-indigo-500"
                                  }`}
                                >
                                  {item?.sent_by_id === auth?.id
                                    ? null
                                    : item?.sent_by_name}
                                </span>
                              ) : (
                                <span
                                  className={`font-bold text-lg  ${
                                    currentUser === item?.sent_by_name
                                      ? "text-red-500"
                                      : "text-blue141"
                                  } `}
                                >
                                  {item?.sent_by_id === auth?.id
                                    ? null
                                    : item?.sent_by_name}
                                </span>
                              )}
                            </div>
                            <span
                              className={`flex gap-2 items-end justify-between ${
                                item?.type === "Text Message"
                                  ? "flex-row"
                                  : "flex-col"
                              }`}
                            >
                              {item?.type === "Text Message" ? (
                                <span
                                  className="text-gray-900 flex gap-2 items-center justify-between"
                                  style={{ wordBreak: "break-all" }}
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      search?.length > 0
                                        ? item?.message
                                            .split(
                                              new RegExp(`(${search})`, "gi")
                                            )
                                            .map((text, index) =>
                                              text?.toLowerCase().trim() ===
                                              search?.toLowerCase().trim()
                                                ? `<span key=${index} class="text-red-500 font-bold">${text}</span>`
                                                : text
                                            )
                                            .join("")
                                        : item?.message,
                                  }}
                                />
                              ) : (
                                item?.message
                                  ?.split("_$_")
                                  ?.filter((filterFiles) => filterFiles !== "")
                                  ?.map((files, index) => (
                                    <div key={index}>
                                      {renderMessageFilePreview(
                                        files,
                                        item?.sent_by_id,
                                        item?.message_id
                                      )}
                                    </div>
                                  ))
                              )}
                              <span className="flex gap-2">
                                <span className="text-[12px] text-gray-800">
                                  {item?.sent_on && item?.sent_by_name
                                    ? getTime(item?.sent_on)
                                    : null}
                                </span>
                                {auth?.id === item?.sent_by_id && (
                                  <>
                                    {item?.delivered?.delivered_to ==
                                      existingMembersIds ||
                                    (item?.delivered &&
                                      Array.isArray(existingMembersIds) &&
                                      Array.isArray(item?.delivered) &&
                                      existingMembersIds?.every((ele) =>
                                        item?.delivered?.some(
                                          (deli) =>
                                            deli?.delivered_to === ele?.id ||
                                            deli?.delivered_name === ele?.name
                                        )
                                      )) ? (
                                      <span>
                                        <LucideCheckCheck
                                          size="16"
                                          style={{
                                            color:
                                              item?.read?.read_to ==
                                                existingMembersIds ||
                                              (Array.isArray(item?.read) &&
                                                Array.isArray(
                                                  existingMembersIds
                                                ) &&
                                                existingMembersIds?.every(
                                                  (user) =>
                                                    item?.read?.some(
                                                      (ele) =>
                                                        user?.id ===
                                                        ele?.read_to
                                                    )
                                                ))
                                                ? "blue"
                                                : "none",
                                          }}
                                        />
                                      </span>
                                    ) : (
                                      <span>
                                        <LucideCheck size="16" />
                                      </span>
                                    )}
                                  </>
                                )}
                              </span>
                            </span>
                          </div>
                        </div>
                      </>
                    ) : null}
                  </>
                ))}
            </ScrollableFeed>
          ) : (
            <div className="flex items-center justify-center mb-5 ml-[0%] mt-[0%]  md:mt-[7%]">
              <img
                className="text-center p-4 m-[50%] md:m-[0%] rounded-xl text-[25px] h-[20rem] md:h-[25rem] w-[20rem] md:w-[25rem] object-cover"
                src={Bluepen}
                alt="altimg"
              />
            </div>
          )}
        </div>

        {existingMembersIds &&
          // newMessage?.length > 8 &&
          (!isLatestMessageInView ? (
            <div
              className="absolute bottom-0 mb-[150px]  md:mb-[140px] left-1 rounded-full p-2   z-10 rightText cursor-pointer"
              onClick={scrollToBottom}
            >
              <LucideChevronDown />
            </div>
          ) : null)}

        {uploadedFiles.length > 0 ? (
          <FileUpload
            fileLoading={fileLoading}
            fileSelect={fileSelect}
            setFileSelect={setFileSelect}
            uploadedFiles={uploadedFiles}
            mediaRef={mediaRef}
            handleMouseWheel={handleMouseWheel}
            outerContainerRef={outerContainerRef}
            innerContainerRef={innerContainerRef}
            fileInputRef={fileInputRef}
            handleFileSend={handleFileSend}
          />
        ) : null}

        {enabled_status === "Enabled"
          ? currentUser && (
              <MessageSend
                fileInputRef={fileInputRef}
                uploadedFiles={uploadedFiles}
                handleUploadFiles={handleUploadFiles}
                getMessages={getMessages}
                chatIds={chatIds}
                sendMessageApi={sendMessageApi}
                setMessageScrolling={setMessageScrolling}
              />
            )
          : currentUser && (
              <div className=" bottom-0 mb-[100px] w-[100%] text-center">
                You can't reply to this conversation
              </div>
            )}
      </div>
      <Dialog open={deleteOption} onClose={() => setDeleteOption(false)}>
        <DialogContent component="form">
          <DialogContentText>
            Are You Sure You want to delete. Message Will be deleted Now
          </DialogContentText>
        </DialogContent>
        <DialogActions className="flex items-center justify-center">
          <Button
            className="w-[100%] rightText"
            style={{ color: "black" }}
            onClick={() => {
              setDeleteOption(false);
              handleMessageDelete();
            }}
          >
            Delete
          </Button>

          <Button
            variant="contained"
            color="secondary"
            style={{ color: "black" }}
            className="w-[100%] leftText"
            onClick={() => {
              setDeleteOption(false);
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={dialogOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCancelMedia}
        className="p-[1rem]"
      >
        <DialogTitle>Discard unsent message?</DialogTitle>
        <DialogContent component="form">
          <DialogContentText>
            Your message ,including attached media will not be sent if you leave
            this screen
          </DialogContentText>
        </DialogContent>
        <DialogActions className="flex items-center justify-center">
          <Button
            className="w-[40%] rightText"
            style={{ color: "black" }}
            onClick={() => {
              setUploadedFiles([]);
              fileInputRef.current.value = null;
              setIsClickedOutside(false);
            }}
          >
            Discard
          </Button>
        </DialogActions>
      </Dialog>

      <Menu
        anchorEl={
          selectedItemIndex !== null
            ? messageRefs.current[selectedItemIndex]
            : null
        }
        onClose={handleIsClose}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={showMenuOptions}
        PaperProps={{
          style: {
            maxHeight: 40 * 4,
            width: "20ch",
            borderRadius: "10px",
            background: "#b5dbf100",
            backdropFilter: "blur(23px)",
          },
        }}
      >
        <MenuItem
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
          onClick={() => {
            handleIsClose();
            // handleRightClick(index, item?.message_id)
            setDeleteOption(true);
          }}
        >
          Delete <DeleteForever className="h-6 w-6" />
        </MenuItem>
        {selectedText.type === "Text Message" && (
          <MenuItem
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
            }}
            onClick={() => {
              if (!messageId || !longPressedMessageId) {
                toast.error("Please Select Message For Copy");
                return;
              }
              copyText();
              handleIsClose();
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
            handleInfoOpen();
          }}
        >
          Info <LucideInfo className="h-6 w-6" />
        </MenuItem>
      </Menu>

      <Menu
        anchorEl={
          selectedItemIndex !== null
            ? messageRefs?.current[selectedItemIndex]
            : null
        }
        onClose={() => {
          handleInfoClose();
          handleIsClose();
        }}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={infoOpen}
        PaperProps={{
          style: {
            // maxHeight: 50 * 6,
            width: "40ch",
            borderRadius: "10px",
            background: "#b5dbf100",
            backdropFilter: "blur(23px)", 
          },
        }}
      >
        <Box className="flex flex-col gap-4 px-2 py-2 ">
          <Box className="flex justify-between ">
            <Typography variant="h7" color="primary">
              Read By
            </Typography>
            <LucideCheckCheck size="16" style={{ color: "blue" }} />
          </Box>
          {Array.isArray(readDetails) &&
            readDetails?.length > 0 &&
            readDetails?.map((item, index) => (
              <Box
                className="flex justify-between items-center gap-4"
                key={item?.read_to_id}
              >
                <Typography className="inline-block rounded-full bg-gray-900   text-white font-bold p-5 text-center flex items-center justify-center h-6 w-6">
                  {item?.read_to_name
                    ?.split(" ")
                    ?.map((word) => word[0])
                    ?.join("")}
                </Typography>
                <Typography sx={{ fontWeight: "900" }}>
                  {item?.read_to_name}
                </Typography>
                <Typography>{getSpecifiedTime(item?.read_on)} </Typography>
              </Box>
            ))}

          <Divider />
          <Box className="flex justify-between ">
            <Typography variant="h7" color="secondary">
              Delivered To
            </Typography>
            <LucideCheckCheck size="16" />
          </Box>
          {Array.isArray(deliveredDetails) &&
            deliveredDetails?.length > 0 &&
            deliveredDetails?.map((item, index) => (
              <Box
                className="flex justify-between items-center gap-4"
                key={item?.delivered_to_id}
              >
                <Typography className="inline-block rounded-full bg-gray-900   text-white font-bold p-5 text-center flex items-center justify-center h-6 w-6">
                  {item?.delivered_to_name
                    ?.split(" ")
                    ?.map((word) => word[0])
                    ?.join("")}
                </Typography>
                <Typography sx={{ fontWeight: "900" }}>
                  {item?.delivered_to_name}
                </Typography>
                <Typography>{getSpecifiedTime(item?.delivered_on)} </Typography>
              </Box>
            ))}
        </Box>
        {/* </>
          ))} */}
      </Menu>
    </>
  );
};

ChatBox.propTypes = {
  currentUser: PropTypes.string.isRequired,
  personalChat: PropTypes.array.isRequired,
  chatIds: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  getMessageApi: PropTypes.string.isRequired,
  sendMessageApi: PropTypes.string.isRequired,
  colorArray: PropTypes.array.isRequired,
  existingMembersIds: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  readApi: PropTypes.string.isRequired,
  deletedApi: PropTypes.string.isRequired,
  loggedInUserId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  fileUploadApi: PropTypes.string.isRequired,
  downloadApi: PropTypes.string.isRequired,
};

export default ChatBox;
