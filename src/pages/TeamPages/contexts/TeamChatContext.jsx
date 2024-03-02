import axios from "axios";
import React, { useContext } from "react";
import { useEffect } from "react";
import { useState, createContext } from "react";
import { useSelector } from "react-redux";
import { URL } from "~/utils/BaseURL";
import { selectAuth } from "~/features/auth/authslice";

export const TeamChatContext = createContext({});

export const TeamChatProvider = ({ children }) => {
  const auth = useSelector(selectAuth);
  //team
  const [teamAllChats, setAllTeamChats] = useState(null);
  const [chatLoading, setChatLoading] = useState(false);

  useEffect(() => {
    if (auth?.role === "team" && auth?.teamData?.id) {
      setChatLoading(true);
      // const intervalId = setInterval(() => {
        axios
          .post(`${URL}/team/allchats.php`, { team_id: auth?.teamData?.id })
          .then((res) => {
            
            setAllTeamChats(res?.data?.filter((item)=>item?.chat_type === "Assignment Group"));
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

  const [deliveredDetails, setDeliveredDetails] = useState(null);

  // useEffect(() => {
  //   if (auth?.role === "team" && auth?.teamData?.id) {
  //     const intervalId = setInterval(() => {
  //       axios
  //         .post(`${URL}/team/delivermessages.php`, {
  //           team_id: auth?.teamData?.id,
  //         })
  //         .then((res) => {
  //           setDeliveredDetails(res.data);
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //           setChatLoading(false);
  //         });
  //     }, 4000);

  //     return () => clearInterval(intervalId);
  //   }
  // }, [auth?.id]);
 
  return (
    <TeamChatContext.Provider
      value={{ teamAllChats, deliveredDetails, chatLoading }}
    >
      {children}
    </TeamChatContext.Provider>
  );
};

export const useTeamContext = () => useContext(TeamChatContext);
