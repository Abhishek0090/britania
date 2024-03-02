import React, { useReducer, useState } from "react";
import ChatInfo from "./ChatInfo";
import ChatBox from "./ChatBox";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { URL } from "~/utils/BaseURL";
import { selectAuth } from "~/features/auth/authSlice";
import { Helmet } from "react-helmet-async";
import { useContext } from "react";
import { ChatContext } from "~/context/ChatContext";
import { useNavigate } from "react-router";
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
  chattypes: null,
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
  const { studentAllChats, chatLoading } = useContext(ChatContext);

  const [searchParams] = useSearchParams();
  const chatIds = searchParams.get("chat_id");

  const [state, dispatch] = useReducer(chatReducer, initialState);
  const [currentUser, setCurrentUser] = useState("");
  const [tempArray, setTempArray] = useState(null);
  const [colorArray, setColorArray] = useState([]);
  const [personalChat, setPersonalChat] = useState(null);
  const [loading, setLoading] = useState(false);
  const [messageScrolling, setMessageScrolling] = useState(false);
  const [enabled_status, setEnablingStatus] = useState("");

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

    dispatch({
      type: "SET_CHAT_INFO",
      payload: {
        getMessageApi: "getassignmentmessagegroup.php",
        chattypes,
        sendMessageApi: "sendassignmentmessagegroup.php",
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

    axios
      .post(`${URL}/student/${state.getMessageApi}`, {
        chat_id: chat_id,
      })
      .then((res) => {
        console.log(res.data);
        setPersonalChat(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Axios request error:", err);
        setLoading(false);
      });
  };
  
  const [totalUnReadMessages, setTotalUnReadMessages] = useState(null);

  useEffect(() => {
    const totalUnReadMessages = Array.isArray(studentAllChats) && studentAllChats?.reduce((acc, item) => {
      return acc + item.unread_messages;
    }, 0);
    setTotalUnReadMessages(totalUnReadMessages);
  }, [studentAllChats]);
  
  return (
    <>
      {" "}
      <Helmet>
        <title>Chats</title>
      </Helmet>
      <div className="hidden md:flex w-full min-h-screen p-2 mt-[4px] ml-[-9px] md:ml-[-8px]">
        <div className="w-[100%] md:w-[25%]">
          <ChatInfo
            handleChat={handleChat}
            chatInfos={studentAllChats}
            chatLoading={chatLoading}
            setMessageScrolling={setMessageScrolling}
            totalUnReadMessages={totalUnReadMessages}
            existingMembersIds={state.existingMembersIds}
          />
        </div>
        <div className="w-[100%] md:w-[75%]">
          <ChatBox
            currentUser={currentUser}
            personalChat={personalChat}
            chatIds={chatIds}
            loading={loading}
            getMessageApi={state.getMessageApi}
            sendMessageApi={state.sendMessageApi}
            colorArray={colorArray}
            existingMembersIds={state.existingMembersIds}
            deliveredApi={state.deliveredApi}
            readApi={state.readApi}
            deletedApi={state.deletedApi}
            loggedInUserId={state.loggedInUserId}
            fileUploadApi={state.fileUploadApi}
            downloadApi={state.downloadApi}
            assignmentDetails={state.assignmentDetails}
            messageScrolling={messageScrolling}
            setMessageScrolling={setMessageScrolling}
            members={state.existingMembersIds}
            chattypes={state.chattypes}
            enabled_status={enabled_status}
            allMembers={tempArray}
          />
        </div>
      </div>
      <div className="flex md:hidden min-h-screen w-full p-2 mt-[0px] ml-[-9px] md:ml-[-8px]">
        {chatIds && currentUser ? (
          <div className="w-[100%] md:w-[80%]">
            <ChatBox
              currentUser={currentUser}
              personalChat={personalChat}
              chatIds={chatIds}
              loading={loading}
              getMessageApi={state.getMessageApi}
              sendMessageApi={state.sendMessageApi}
              colorArray={colorArray}
              existingMembersIds={state.existingMembersIds}
              deliveredApi={state.deliveredApi}
              readApi={state.readApi}
              deletedApi={state.deletedApi}
              loggedInUserId={state.loggedInUserId}
              fileUploadApi={state.fileUploadApi}
              downloadApi={state.downloadApi}
              assignmentDetails={state.assignmentDetails}
              messageScrolling={messageScrolling}
              setMessageScrolling={setMessageScrolling}
              members={state.existingMembersIds}
              chattypes={state.chattypes}
              enabled_status={enabled_status}
              allMembers={tempArray}
            />
          </div>
        ) : (
          <div className="w-[100%] md:w-[20%]">
            <ChatInfo
              handleChat={handleChat}
              chatInfos={studentAllChats}
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
