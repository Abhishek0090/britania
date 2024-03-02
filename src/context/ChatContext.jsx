import axios from "axios";
import React, { useEffect } from "react";
import { useState, createContext } from "react";
import { useSelector } from "react-redux";
import { URL } from "~/utils/BaseURL";
import { selectAuth } from "~/features/auth/authslice";

export const ChatContext = createContext({});

export const ChatProvider = ({ children }) => {
  const auth = useSelector(selectAuth);

  //student
  const [studentAllChats, setAllStudentChats] = useState(null);
  const [chatLoading, setChatLoading] = useState(false);
  const [freelancerLoading, setFreelancerLoading] = useState(false);

  useEffect(() => {
    if (auth.code && auth?.id) {
      setChatLoading(true);
      // const intervalId = setInterval(() => {
      axios
        .post(`${URL}/student/allchats.php`, { id: auth?.id })
        .then((res) => {
          setAllStudentChats(
            res?.data?.filter((item) => item?.chat_type === "Assignment Group")
          );
          setChatLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setChatLoading(false);
        });
      // }, 2000);

      // return () => clearInterval(intervalId);
    }
  }, [auth?.id]);

  //freelancer
  const [freelancerAllChats, setAllFreelancerChats] = useState(null);

  useEffect(() => {
    if (auth?.role === "freelancer" && auth?.id) {
      setFreelancerLoading(true);
      // const intervalId = setInterval(() => {
      axios
        .post(`${URL}/freelancer/allchats.php`, { freelancer_id: auth?.id })
        .then((res) => {
          setAllFreelancerChats(
            res?.data?.filter((item) => item?.chat_type === "Assignment Group")
          );
          setFreelancerLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setFreelancerLoading(false);
        });
      // }, 2000);

      // return () => clearInterval(intervalId);
    }
  }, [auth?.id]);

  return (
    <React.Fragment>
      <ChatContext.Provider
        value={{
          studentAllChats,
          chatLoading,
          freelancerLoading,
          freelancerAllChats,
        }}
      >
        {children}
      </ChatContext.Provider>
    </React.Fragment>
  );
};
