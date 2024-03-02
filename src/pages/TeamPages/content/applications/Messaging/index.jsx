import React, { useState, useReducer } from "react";
import ChatInfo from "./ChatInfo";
import ChatBox from "./ChatBox";
import { useEffect } from "react"; 
import axios from "axios";
import { URL } from "~/utils/BaseURL";
import { Helmet } from "react-helmet-async";
import { useContext } from "react";
import { TeamChatContext } from "../../../contexts/TeamChatContext"; 
import { useSearchParams } from "react-router-dom"; 

const initialState = {
  getMessageApi: null,
  sendMessageApi: null,
  deliveredApi: null,
  existingMembersIds: null,
  readApi: null,
  deletedApi: null,
  loggedInUserId: null,
  downloadApi: null,
  fileUploadApi: null,
  chat_type: null,
  assignmentDetails: {},
};

function chatReducer(state, action) {
  switch (action.type) {
    case "SET_CHAT_INFO":
      return { ...state, ...action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}

const Messaging = () => {
  const { teamAllChats, chatLoading, deliveredDetails } =
    useContext(TeamChatContext); 
  
  const [searchParams] = useSearchParams();
  const chatIds = searchParams.get("chat_id");
  const chat_type = searchParams.get("type");

  const [state, dispatch] = useReducer(chatReducer, initialState);
  const [currentUser, setCurrentUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [tempArray, setTempArray] = useState(null);
  const [colorArray, setColorArray] = useState([]);
  const [personalChat, setPersonalChat] = useState(null);
  const [messageScrolling, setMessageScrolling] = useState(true);
  const [enabled_status, setEnablingStatus] = useState("");

  const handleChat = (
    chat_id,
    subname,
    chattypes,
    teamNames,
    existingMembersIds,
    loggedInUserId,
    assignment_title,
    enabled_status
  ) => {
    setCurrentUser(subname);
    setLoading(true);
    setEnablingStatus(enabled_status);
    dispatch({
      type: "SET_CHAT_INFO",
      payload: {
        existingMembersIds,
        loggedInUserId,
      },
    });

    if (teamNames) {
      setTempArray(teamNames);
    } else {
      setTempArray(null);
      setColorArray(null);
    }

    // if (chattypes === "Team Personal") {
    //   dispatch({
    //     type: "SET_CHAT_INFO",
    //     payload: {
    //       getMessageApi: "getpersonalmessageteam.php",
    //       chat_type: chattypes,
    //       sendMessageApi: "sendpersonalmessagetoteam.php",
    //       deliveredApi: "messagedeliveredteampersonal.php",
    //       readApi: "messagereadteampersonal.php",
    //       deletedApi: "messagedeleteteampersonal.php",
    //       fileUploadApi: "fileuploadchatteampersonal.php",
    //       downloadApi: "downloadpersonalmessageteamfiles.php",
    //       assignmentDetails: {
    //         assignment_id: "",
    //         assignment_title: "",
    //       },
    //     },
    //   });
    // } else if (chattypes === "Team and Freelancer Personal") {
    //   dispatch({
    //     type: "SET_CHAT_INFO",
    //     payload: {
    //       getMessageApi: "getpersonalmessagefreelancer.php",
    //       chat_type: chattypes,
    //       sendMessageApi: "sendpersonalmessagetofreelancer.php",
    //       deliveredApi: "messagedeliveredfreelancerpersonal.php",
    //       readApi: "messagereadfreelancerpersonal.php",
    //       deletedApi: "messagedeletedfreelancerpersonal.php",
    //       fileUploadApi: "fileuploadchatfreelancerpersonal.php",
    //       downloadApi: "downloadpersonalmessagefreelancerfiles.php",
    //       assignmentDetails: {
    //         assignment_id: "",
    //         assignment_title: "",
    //       },
    //     },
    //   });
    // } else if (chattypes === "Team and Student Personal") {
    //   dispatch({
    //     type: "SET_CHAT_INFO",
    //     payload: {
    //       getMessageApi: "getpersonalmessagestudent.php",
    //       chat_type: chattypes,
    //       sendMessageApi: "sendpersonalmessagetostudent.php",
    //       deliveredApi: "messagedeliveredstudentpersonal.php",
    //       readApi: "messagereadstudentpersonal.php",
    //       deletedApi: "messagedeletedstudentpersonal.php",
    //       fileUploadApi: "fileuploadchatstudentpersonal.php",
    //       downloadApi: "downloadpersonalmessagestudentfiles.php",
    //       assignmentDetails: {
    //         assignment_id: "",
    //         assignment_title: "",
    //       },
    //     },
    //   });
    // } else if (chattypes === "Team Assignment") {
    //   dispatch({
    //     type: "SET_CHAT_INFO",
    //     payload: {
    //       getMessageApi: "getassignmentmessageteam.php",
    //       chat_type: chattypes,
    //       sendMessageApi: "sendassignmentmessagetoteam.php",
    //       deliveredApi: "messagedeliveredteamassignment.php",
    //       readApi: "messagereadteamassignment.php",
    //       deletedApi: "messagedeletedteamassignment.php",
    //       fileUploadApi: "fileuploadchatteamassignment.php",
    //       downloadApi: "downloadassignmentmessageteamfiles.php",
    //       assignmentDetails: {
    //         assignment_id: subname,
    //         assignment_title: assignment_title,
    //       },
    //     },
    //   });
    // } else if (chattypes === "Team and Freelancer Assignment") {
    //   dispatch({
    //     type: "SET_CHAT_INFO",
    //     payload: {
    //       getMessageApi: "getassignmentmessagefreelancer.php",
    //       chat_type: chattypes,
    //       sendMessageApi: "sendassignmentmessagetofreelancer.php",
    //       deliveredApi: "messagedeliveredfreelancerassignment.php",
    //       readApi: "messagereadfreelancerassignment.php",
    //       deletedApi: "messagedeletedfreelancerassignment.php",
    //       fileUploadApi: "fileuploadchatfreelancerassignment.php",
    //       downloadApi: "downloadassignmentmessagefreelancerfiles.php",
    //       assignmentDetails: {
    //         assignment_id: subname,
    //         assignment_title: assignment_title,
    //       },
    //     },
    //   });
    // } else if (chattypes === "Team and Student Assignment") {
    //   dispatch({
    //     type: "SET_CHAT_INFO",
    //     payload: {
    //       getMessageApi: "getassignmentmessagestudent.php",
    //       chat_type: chattypes,
    //       sendMessageApi: "sendassignmentmessagetostudent.php",
    //       deliveredApi: "messagedeliveredstudentassignment.php",
    //       readApi: "messagereadstudentassignment.php",
    //       deletedApi: "messagedeletedstudentassignment.php",
    //       fileUploadApi: "fileuploadchatstudentassignment.php",
    //       downloadApi: "downloadassignmentmessagestudentfiles.php",
    //       assignmentDetails: {
    //         assignment_id: subname,
    //         assignment_title: assignment_title,
    //       },
    //     },
    //   });
    // } else if (chattypes === "Assignment Group") {
      dispatch({
        type: "SET_CHAT_INFO",
        payload: {
          getMessageApi: "getassignmentmessagegroup.php",
          chat_type: chattypes,
          sendMessageApi: "sendassignmentmessagetogroup.php",
          deliveredApi: "messagedeliveredgroupassignment.php",
          readApi: "messagereadgroupassignment.php",
          deletedApi: "messagedeletedgroupassignment.php",
          fileUploadApi: "fileuploadchatassignmentgroup.php",
          downloadApi: "downloadassignmentmessagegroupfiles.php",
          assignmentDetails: {
            assignment_id: subname,
            assignment_title: assignment_title,
          },
        },
      });
    // }

    axios
      .post(`${URL}/team/${state.getMessageApi}`, { chat_id: chat_id })
      .then((res) => {
        setPersonalChat(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  };

  //colors of group users
  useEffect(() => {
    if (tempArray) {
      const color = [
        "text-green-400",
        "text-red-400",
        "text-blue-400",
        "text-gray-400",
        "text-orange-400",
        "text-indigo-400",
        "text-emerald-400",
        "text-cyan-400",
        
      ];

      const newArray = tempArray.map((item, index) => ({
        name: item.name,
        color: color[index],
      }));

      setColorArray(newArray);
    }
  }, [tempArray]);
 
 
  const [totalUnReadMessages, setTotalUnReadMessages] = useState(null);

  useEffect(() => {
    const totalUnReadMessages = teamAllChats?.reduce((acc, item) => {
      return acc + item.unread_messages;
    }, 0);
    setTotalUnReadMessages(totalUnReadMessages);
  }, [teamAllChats]); 

  return (
    <>
      <Helmet>
        <title>Chats</title>
      </Helmet>
      <div className=" hidden md:flex fixed w-full h-[100%] ">
        <div className="w-[15%] md:w-[25%] lg:w-[25%] flex items-center justify-center">
          <ChatInfo
            handleChat={handleChat}
            chatInfos={teamAllChats}
            chatLoading={chatLoading}
            setMessageScrolling={setMessageScrolling}
            totalUnReadMessages={totalUnReadMessages}
            existingMembersIds={state.existingMembersIds}
            members={state.existingMembersIds}
          />
        </div>
        <div className="w-[90%]  md:w-[85%] lg:w-[85%]  ">
          <ChatBox
            currentUser={currentUser}
            personalChat={personalChat}
            chatIds={chatIds}
            loading={loading}
            getMessageApi={state.getMessageApi}
            sendMessageApi={state.sendMessageApi}
            colorArray={colorArray}
            deliveredApi={state.deliveredApi}
            existingMembersIds={state.existingMembersIds}
            readApi={state.readApi}
            deletedApi={state.deletedApi}
            loggedInUserId={state.loggedInUserId}
            fileUploadApi={state.fileUploadApi}
            downloadApi={state.downloadApi}
            chat_type={state.chat_type}
            members={state.existingMembersIds}
            assignmentDetails={state.assignmentDetails}
            messageScrolling={messageScrolling}
            setMessageScrolling={setMessageScrolling}
            enabled_status={enabled_status}
            setEnablingStatus={setEnablingStatus}
            allMembers={tempArray}
          />
        </div>
      </div>
      <div className="flex w-full fixed md:hidden  ">
        {chatIds && currentUser ? (
          <div className="w-[90%]  md:w-[85%] lg:w-[85%] ">
            <ChatBox
              currentUser={currentUser}
              personalChat={personalChat}
              chatIds={chatIds}
              loading={loading}
              getMessageApi={state.getMessageApi}
              sendMessageApi={state.sendMessageApi}
              colorArray={colorArray}
              deliveredApi={state.deliveredApi}
              existingMembersIds={state.existingMembersIds}
              readApi={state.readApi}
              deletedApi={state.deletedApi}
              loggedInUserId={state.loggedInUserId}
              fileUploadApi={state.fileUploadApi}
              downloadApi={state.downloadApi}
              chat_type={state.chat_type}
              members={state.existingMembersIds}
              assignmentDetails={state.assignmentDetails}
              messageScrolling={messageScrolling}
              setMessageScrolling={setMessageScrolling}
              enabled_status={enabled_status}
              setEnablingStatus={setEnablingStatus}
              allMembers={tempArray}
            />
          </div>
        ) : (
          <div className="w-[100%] flex items-center justify-center">
            <ChatInfo
              handleChat={handleChat}
              chatInfos={teamAllChats}
              chatLoading={chatLoading}
              setMessageScrolling={setMessageScrolling}
              totalUnReadMessages={totalUnReadMessages}
              existingMembersIds={state.existingMembersIds}

            />
          </div>
        )}
      </div>
    </>
  );
};

export default Messaging;
