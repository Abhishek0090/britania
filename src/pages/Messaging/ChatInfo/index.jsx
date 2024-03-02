import {
  LucideCheck,
  LucideCheckCheck,
  LucideChevronDown,
  LucideChevronRight,
  SearchIcon,
} from "lucide-react";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectAuth } from "~/features/auth/authSlice";
import User from "~/assets/logo/user.png";
import { URL } from "~/utils/BaseURL";
import axios from "axios";
import PropTypes from "prop-types";
import moment from "moment";
import { useEffect } from "react";
import Skeleton from "./components/Skeleton";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  styled,
  ListItem,
  Badge,
  useTheme,
} from "@mui/material";
import AllMessages from "./components/AllMessages";
import UnReadMessages from "./components/UnReadMessages";
import Completed from "./components/Completed";

const TabsContainerWrapper = styled(Box)(
  ({ theme }) => `
        .MuiTabs-indicator {
            min-height: 4px;
            height: 4px;
            box-shadow: none;
            border: 0;
            min-width : 2px;
            background-color: #2956A8;
        }

        .MuiTab-root {
          font-family: 'League Spartan';
            &.MuiButtonBase-root {
                padding: 0;
                margin-right: 10px;
                color: #2956A8;

                .MuiTouchRipple-root {
                    display: none;
                }
            }

            &.Mui-selected:hover,
            &.Mui-selected {
                color: black; 
                background-color : #74caf0;
                border-radius : 10px;
            }
        }
  `
);

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -9,
    top: 0,
    padding: "0 2px",
  },
}));

const ChatInfo = ({
  handleChat,
  chatInfos,
  chatLoading,
  setMessageScrolling,
  totalUnReadMessages,
  existingMembersIds,
}) => {
  const [active, setActive] = useState([]);
  const navigate = useNavigate();

  const auth = useSelector(selectAuth);

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    axios
      .get(`${URL}/student/getpersonaldetails.php?id=${auth?.id}`)
      .then((res) => setUserData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleActive = (value) => {
    setActive([value]);
  };

  //sort according to date

  function compareMessages(a, b) {
    const firstValue =
      a?.last_message.sent_on !== null
        ? a?.last_message.sent_on
        : a?.created_on;

    const secondValue =
      b?.last_message.sent_on !== null
        ? b?.last_message.sent_on
        : b?.created_on;

    const sentOnA = moment(firstValue, "DD-MM-YYYY HH:mm:ss");
    const sentOnB = moment(secondValue, "DD-MM-YYYY HH:mm:ss");

    const currentTime = moment();
    const timeDiffA = Math.abs(currentTime.diff(sentOnA));
    const timeDiffB = Math.abs(currentTime.diff(sentOnB));

    return timeDiffA - timeDiffB;
  }
  chatInfos?.sort(compareMessages);

  const unReadMessages = chatInfos?.filter((item) => item?.unread_messages > 0);

  const CompletedMessages = chatInfos?.filter(
    (item) => item?.enabled_status === "Disabled"
  );

  //searchbar
  const [search, setSearch] = useState(null);
  const [filteredData, setFilteredData] = useState(chatInfos);

  const handleSearch = (e) => {
    const searchValue = e.target.value.trim().toLowerCase();
    setSearch(searchValue);

    const filteredResults = filteredData?.filter((item) =>
      item?.member_name?.toLowerCase().trim().includes(searchValue)
    );
 
    setFilteredData(filteredResults);
  };

  const [currentTab, setCurrentTab] = useState("all");
 

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  return (
    <>
      <div
        className="flex flex-col bg-[#6EC9F1] bg-opacity-50 backdrop-blur-2xl shadow-xl  items-center fixed  min-h-screen rounded-none md:rounded-none  overflow-auto"
        style={{ width: "inherit" }}
      >
        <div className="bg-[#6EC9F1]  w-full   bg-opacity-50 backdrop-blur-2xl shadow-xl flex p-2 justify-between px-5 items-center gap-4 flex">
          <img
            className="  rounded-full object-cover h-12 w-12 text-sm"
            src={User}
            alt="image"
          />

          <span className="font-bold text-[1rem]">
            {userData?.firstname} {userData?.lastname}
          </span>
        </div>

        <div className="flex flex-col items-center justify-around gap-2 py-2 px-2  rounded-xl m-[12px] w-[100%] ">
          <Typography
            sx={{
              mb: 1,
              fontWeight: "bold",
              fontFamily: "League Spartan",
            }}
            variant="h5"
          >
            Chats
          </Typography>
          {/* <TextField
            sx={{
              mt: 1,
              mb: 2,
            }}
            type="text"
            placeholder="Search.."
            className="outline-none rounded-xl bg-transparent text-white placeholder-white"
            onChange={handleSearch}
            value={search}
            name="search"
            size="small"
            fullWidth
            inputprops={{
              startAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }} 
          /> */}

          <TabsContainerWrapper>
            <Tabs
              onChange={handleTabsChange}
              value={currentTab}
              variant="scrollable"
              scrollButtons="auto"
              textColor="primary"
              indicatorColor="primary"
              className="font-league"
            >
              <Tab key="all" value="all" label="All" />
              <Tab
                key="unread"
                value="unread"
                label={
                  <StyledBadge
                    badgeContent={
                      totalUnReadMessages > 99 ? "99+" : totalUnReadMessages
                    }
                    color="info"
                  >
                    Unread
                  </StyledBadge>
                }
              />
              <Tab
                key="completed"
                value="completed"
                label={
                  <StyledBadge
                    badgeContent={
                      CompletedMessages?.length > 99
                        ? "99+"
                        : CompletedMessages?.length
                    }
                    color="success"
                  >
                    Completed
                  </StyledBadge>
                }
              />
            </Tabs>
          </TabsContainerWrapper>

          {currentTab === "all" && (
            <div
              className="flex flex-col gap-4 overflow-auto max-h-[60vh] md:max-h-[70vh] w-[100%]  p-2 md:p-2 lg:p-1 mt-2 "
              style={{ scrollBarWidth: "none" }}
            >
              {" "}
              {chatLoading ? (
                <Skeleton />
              ) : (
                chatInfos?.map((item) => (
                  <div className="flex flex-col gap-2" key={item?.chat_id}>
                    <AllMessages
                      item={item}
                      auth={auth}
                      active={active}
                      handleChat={handleChat}
                      handleActive={handleActive}
                      setMessageScrolling={setMessageScrolling}
                      navigate={navigate}
                      existingMembersIds={existingMembersIds}
                    />
                  </div>
                ))
              )}
            </div>
          )}
          {currentTab === "unread" && (
            <div
              className="flex flex-col gap-6 justify-start   p-2 md:p-2 lg:p-1 mt-2  overflow-auto w-[100%] max-h-[60vh] md:max-h-[70vh]"
              style={{ scrollBarWidth: "none" }}
            >
              {chatLoading ? (
                <Skeleton />
              ) : (
                unReadMessages.length > 0 &&
                unReadMessages?.map((item) => (
                  <div className="flex flex-col gap-2" key={item?.chat_id}>
                    <UnReadMessages
                      item={item}
                      auth={auth}
                      active={active}
                      handleChat={handleChat}
                      handleActive={handleActive}
                      setMessageScrolling={setMessageScrolling}
                      navigate={navigate}
                    />
                  </div>
                ))
              )}
            </div>
          )}
          {currentTab === "completed" && (
            <div
              className="flex flex-col gap-6 justify-start   p-2 md:p-2 lg:p-1 mt-2  overflow-auto w-[100%] max-h-[60vh] md:max-h-[70vh]"
              style={{ scrollBarWidth: "none" }}
            >
              {chatLoading ? (
                <Skeleton />
              ) : (
                CompletedMessages.length > 0 &&
                CompletedMessages?.map((item) => (
                  <div className="flex flex-col gap-2" key={item?.chat_id}> 
                  <Completed 
                     item={item}
                     auth={auth}
                     active={active}
                     handleChat={handleChat}
                     handleActive={handleActive}
                     setMessageScrolling={setMessageScrolling}
                     navigate={navigate}
                  />
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

ChatInfo.propTypes = {
  handleChat: PropTypes.func.isRequired,
  chatInfos: PropTypes.array.isRequired,
  chatLoading: PropTypes.bool.isRequired,
};

export default ChatInfo;
