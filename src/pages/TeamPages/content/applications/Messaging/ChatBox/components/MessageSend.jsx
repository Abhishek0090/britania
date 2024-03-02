import React, { useState } from "react";
import toast from "react-hot-toast";
import InputEmoji from "react-input-emoji";
import { Send } from "lucide-react";
import { AttachFile } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { selectAuth } from "~/features/auth/authSlice";
import axios from "axios";
import {URL } from "~/utils/BaseURL";

const MAX_COUNT = 10;
const MAX_SIZE = 10242880;

const MessageSend = ({
  fileInputRef,
  handleUploadFiles,
  currentUser,
  uploadedFiles, 
  chatIds,
  sendMessageApi,
  getMessages,
  setMessageScrolling
}) => {
  const auth = useSelector(selectAuth);
  const [message, setMessage] = useState("");

  const handleInputChange = (text) => {
    setMessage(text);
  };

  const handleKeyDown = (e) => {
    if (e.ctrlKey && (e.key === "i" || e.key === "I")) {
      e.preventDefault();

      // Replace ~ ~ with <em> tags
      const finalText = message.replace(/([^~]+)/g, "<em>$1</em>");

      setMessage(finalText);
    } else if (e.ctrlKey && (e.key === "b" || e.key === "B")) {
      e.preventDefault();

      const finalText = message.replace(/([^*]+)/g, "<strong>$1</strong>");

      setMessage(finalText);
    }
    if (e.key === "Enter") {
      handleSend();
    }
  }; 

  const handleSend = async () => {
    if (message.trim() === "") {
      return;
    }

    const newData = {
      chat_id: chatIds,
      sent_by_id: auth.teamData.id,
      type: "Text Message",
      message: message,
    };

    await axios
      .post(`${URL}/team/${sendMessageApi}`, newData)
      .then((res) => {
        console.log(res);

        getMessages(); 
        setMessageScrolling(true)
        setMessage("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      className=" bottom-0 mb-[82px] md:mb-[78px] p-[5px] md:p-2 left-0 right-0 z-10"
      style={{ width: "inherit" }}
    >
      {currentUser && (
        <div className="flex items-center gap-2 justify-between rounded-xl bg-gray-800">
          {uploadedFiles.length === 0 ? (
            <button
              onClick={() => fileInputRef.current.click()}
              className="ml-2"
            >
              <AttachFile style={{ color: "gray" }} />
            </button>
          ) : null}

          <input
            type="file"
            ref={fileInputRef}
            name="myfiles"
            onChange={(e) => {
              let files = [...e.target.files];
              if (files?.length > MAX_COUNT) {
                toast.error(`You can upload only ${MAX_COUNT} files`);
                return;
              }
              if (files?.length + uploadedFiles?.length > MAX_COUNT) {
                toast.error(`You can upload only ${MAX_COUNT} files`);
                return;
              }
              handleUploadFiles(files);
            }}
            style={{ display: "none" }}
            multiple
          />

          <InputEmoji
            className="rounded-2xl bg-transparent outline-none text-lg text-white p-2"
            onChange={handleInputChange}
            value={message}
            onKeyDown={handleKeyDown}
            cleanOnEnter
            placeholder="Type a message"
            shouldReturn
            keepOpened={true}
            onResize
            theme="auto"
            borderRadius={10}
          />
          {uploadedFiles.length === 0 ? (
            <button
              className="rounded-xl bg-blue-500 p-2 hover-bg-blue-800"
              onClick={handleSend}
            >
              <Send />
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default MessageSend;
