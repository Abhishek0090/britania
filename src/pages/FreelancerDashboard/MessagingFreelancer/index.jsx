import React, { useContext, useState, useReducer } from "react";
import ChatInfo from "./components/ChatInfo";
import ChatBox from "./components/ChatBox";
import { useEffect } from "react";
import axios from "axios";
import { URL } from "~/utils/BaseURL";
import DashboardLayout from "~/layout/LayoutContainers/DashboardLayout";
import { Helmet } from "react-helmet-async";
import DashboardNavbar from "~/layout/Navbars/DashboardNavbar";
import { ChatContext } from "~/context/ChatContext";
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
  const { freelancerAllChats, freelancerLoading } = useContext(ChatContext);
  const [currentUser, setCurrentUser] = useState("");
  const [searchParam] = useSearchParams();
  const chatIds = searchParam.get("chat_id");

  const [tempArray, setTempArray] = useState(null);
  const [colorArray, setColorArray] = useState([]);
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

  const [state, dispatch] = useReducer(chatReducer, initialState);

  const [personalChat, setPersonalChat] = useState(null);
  const [loading, setLoading] = useState(false);
  const [messageScrolling, setMessageScrolling] = useState(false);
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
 
      console.log(assignment_title);
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
      .post(`${URL}/freelancer/${state.getMessageApi}`, {
        chat_id: chat_id,
      })
      .then((res) => {
        console.log(res);
        setPersonalChat(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });

 
  }; 
 
 
  const [totalUnReadMessages, setTotalUnReadMessages] = useState(null);

  useEffect(() => {
    const totalUnReadMessages = Array.isArray(freelancerAllChats) && freelancerAllChats?.reduce((acc, item) => {
      return acc + item.unread_messages;
    }, 0);
    setTotalUnReadMessages(totalUnReadMessages);
  }, [freelancerAllChats]); 
  
  return (
    <DashboardLayout>
      <Helmet>
        <title>Chats</title>
      </Helmet>
      <DashboardNavbar light />
      <div className="hidden md:flex  h-screen  w-full">
        <div className="w-[15%] md:w-[20%] flex-1">
          <ChatInfo
            handleChat={handleChat}
            chatSection={freelancerAllChats}
            freelancerLoading={freelancerLoading}
            setMessageScrolling={setMessageScrolling}
            totalUnReadMessages={totalUnReadMessages}
            existingMembersIds={state.existingMembersIds}
          />
        </div>
        <div className="w-[93%] md:w-[75%] flex-2">
          <ChatBox
            currentUser={currentUser}
            personalChat={personalChat}
            chatIds={chatIds}
            loading={loading}
            sendMessageApi={state.sendMessageApi}
            getMessageApi={state.getMessageApi}
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
            setMessageScrolling = {setMessageScrolling}
            chattypes={state.chattypes}
            members={tempArray}
            enabled_status={enabled_status}
            allMembers = {tempArray}
          />
        </div>
      </div>
      <div className="flex  md:hidden h-screen ml-[-24px] w-full">
        {chatIds && currentUser ? (
          <div className="w-[93%] md:w-[90%] ">
            <ChatBox
              currentUser={currentUser}
              personalChat={personalChat}
              chatIds={chatIds}
              loading={loading}
              sendMessageApi={state.sendMessageApi}
              getMessageApi={state.getMessageApi}
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
              setMessageScrolling = {setMessageScrolling}
              chattypes={state.chattypes}
              members={tempArray}
              enabled_status={enabled_status}
              allMembers = {tempArray}
            />
          </div>
        ) : (
          <div className="w-[100%] ">
            <ChatInfo
              handleChat={handleChat}
              chatSection={freelancerAllChats}
              freelancerLoading={freelancerLoading}
              setMessageScrolling={setMessageScrolling}
              totalUnReadMessages={totalUnReadMessages} 
              existingMembersIds={state.existingMembersIds}
            />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Messaging;
