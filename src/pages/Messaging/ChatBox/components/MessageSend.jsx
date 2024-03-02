import React, { useRef, useState } from "react";
import { LucideSend } from "lucide-react";
import { AttachFile } from "@mui/icons-material";
import { useSelector } from "react-redux";
import axios from "axios";
import { selectAuth } from "~/features/auth/authSlice";
import toast from "react-hot-toast";
import InputEmoji from "react-input-emoji";
import { URL } from "~/utils/BaseURL";

const MAX_COUNT = 10;

const MessageSend = ({
  uploadedFiles,
  handleUploadFiles,
  getMessages,
  chatIds,
  sendMessageApi,
  setMessageScrolling,
  fileInputRef,
}) => {
  const auth = useSelector(selectAuth);
  const [message, setMessage] = useState("");

  const handleInputChange = (text) => {
    setMessage(text);
  };

  const handleSend = async () => {
    if (message.trim() === "") {
      return;
    }

    const newData = {
      chat_id: chatIds,
      sent_by_id: auth.id,
      type: "Text Message",
      message: message,
    };

    await axios
      .post(`${URL}/student/${sendMessageApi}`, newData)
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

  const handleKeyDown = (e) => {
    // if (e.ctrlKey && (e.key === "i" || e.key === "I")) {
    //   e.preventDefault();
    //   const finalText = message.replace(/([^~]+)/g, "<em>$1</em>");

    //   setOriginalMessage(finalText);
    // } else if (e.ctrlKey && (e.key === "b" || e.key === "B")) {
    //   e.preventDefault();
    //   const finalText = message.replace(/([^*]+)/g, "<strong>$1</strong>");
    //   setOriginalMessage(finalText);
    // }
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div
      className="   bottom-0 mb-[80px]  md:mb-[75px]  left-0 right-0 z-10   bg-gray-800 "
      style={{ width: "100%" }}
    >
      <div className="flex items-center  justify-between rounded-xl    ">
        {uploadedFiles.length === 0 ? (
          <button onClick={() => fileInputRef.current.click()} className="ml-2">
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
          value={message}
          className="rounded-2xl  bg-gray-800 outline-none text-lg text-white p-2"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          cleanOnEnter
          placeholder="Type a message"
          shouldReturn
          keepOpened={true}
          onResize
          theme="auto"
          borderRadius={10}
          autoFocus={true}
        />

        {!uploadedFiles.length && (
          <button
            className="rounded-xl bg-blue-500 p-2 hover:bg-blue-800"
            onClick={handleSend}
          >
            <LucideSend color="white" />
          </button>
        )}
      </div>
    </div>
  );
};

export default MessageSend;
