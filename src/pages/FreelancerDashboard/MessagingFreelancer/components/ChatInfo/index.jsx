import {
  LucideCheck,
  LucideCheckCheck,
  LucideChevronDown,
  LucideChevronRight,
} from "lucide-react";
import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectAuth } from "~/features/auth/authSlice";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import User from "~/assets/logo/user.png";
import { URL } from "~/utils/BaseURL";
import PropTypes from "prop-types";
import moment from "moment";
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
import { useNavigate } from "react-router-dom";
import Skeleton from "./components/Skeleton";
import AllMessages from "./components/AllMessages";
import UnReadMessages from "./components/UnReadMessages";
import CompletedMessages from "./components/CompletedMessages";

const TabsContainerWrapper = styled(Box)(
  ({ theme }) => `
  .MuiBox-root {
    width : 100%;
  }
        .MuiTabs-indicator {
            min-height: 4px;
            
            height: 4px;
            box-shadow: none;
            border: 0;
        }
        .MuiTabs-root {
          background : none;
          min-width : 25px;
        }

        .MuiTab-root {
          min-width : 10px;
          &.MuiButtonBase-root {
              padding: 0;
              margin-right: 12px;
              color: #0075ff;

              .MuiTouchRipple-root {
                  display: none;
              }
          }

          &.Mui-selected:hover,
          &.Mui-selected {
              color: #0075ff; 
          }
      }
  `
);

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 0,
    top: -2,
    padding: "0 1px",
  },
}));

const ChatInfo = ({
  handleChat,
  chatSection,
  freelancerLoading,
  setMessageScrolling,
  totalUnReadMessages,
  existingMembersIds,
}) => {
  const auth = useSelector(selectAuth);
  const navigate = useNavigate();

  const [active, setActive] = useState([]);

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

  const [state, setState] = React.useState({
    left: false,
  });

  //sort according to date

  function compareMessages(a, b) {
    const firstValue =
      a?.message_data.sent_on !== null
        ? a?.message_data.sent_on
        : a?.created_on;

    const secondValue =
      b?.message_data.sent_on !== null
        ? b?.message_data.sent_on
        : b?.created_on;

    const sentOnA = moment(firstValue, "DD-MM-YYYY HH:mm:ss");
    const sentOnB = moment(secondValue, "DD-MM-YYYY HH:mm:ss");

    const currentTime = moment();
    const timeDiffA = Math.abs(currentTime.diff(sentOnA));
    const timeDiffB = Math.abs(currentTime.diff(sentOnB));

    return timeDiffA - timeDiffB;
  }
  chatSection?.sort(compareMessages);

  const unReadMessages = chatSection?.filter(
    (item) => item?.unread_messages > 0
  );

  const CompletedMessages = chatSection?.filter(
    (item) => item?.enabled_status === "Disabled"
  );

  //searchbar
  const [search, setSearch] = useState(null);
  const [filteredData, setFilteredData] = useState(null);

  const handleSearch = (e) => {
    const searchValue = e.target.value.trim().toLowerCase();
    setSearch(searchValue);

    const filteredResults = filteredData?.filter((item) =>
      item?.member_name?.toLowerCase().trim().includes(searchValue)
    );

    setFilteredData(filteredResults);
  };

  const [currentTab, setCurrentTab] = useState("all");

  const tabs = [
    { value: "all", label: "All" },
    { value: "unread", label: "Unread" },
    { value: "completed", label: "Completed" },
  ];

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  return (
    <>
      <div
        className="flex flex-col bg-[#111633] items-center fixed  min-h-screen   rounded-none md:rounded-2xl p-2 md:p-1 lg:p-1  "
        style={{ width: "inherit" }}
      >
        <div className="flex flex-col items-center justify-around gap-2 py-2  rounded-xl m-[12px] w-[95%]">
          <Typography
            sx={{
              mb: 1,
              mt: 1,
            }}
            variant="h3"
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
              TabIndicatorProps={{
                style: {
                  backgroundColor: "#0075ff",
                  // width: "50px",
                },
              }}
            >
              <Tab key="all" value="all" label="All" />
              <Tab
                key="unread"
                value="unread"
                label={
                  <div>
                    Unread
                    {totalUnReadMessages > 0 && (
                      <span
                        style={{ marginLeft: 8, fontSize: 14 }}
                        className="bg-blue141 px-[8px] py-[4px] font-bold rounded-full text-black999"
                      >
                        {totalUnReadMessages > 99 ? "99+" : totalUnReadMessages}
                      </span>
                    )}
                  </div>
                }
              />

              <Tab
                key="completed"
                value="completed"
                label={
                  <div>
                    Completed
                    {CompletedMessages?.length > 0 && (
                      <span
                        style={{ marginLeft: 8, fontSize: 14 }}
                        className="bg-blue141 px-[8px] py-[4px] font-bold rounded-full text-black999"
                      >
                        {CompletedMessages?.length > 99
                          ? "99+"
                          : CompletedMessages}
                      </span>
                    )}
                  </div>
                }
              />
            </Tabs>
          </TabsContainerWrapper>

          {currentTab === "all" && (
            <div
              className="flex flex-col gap-4    mt-[5px]  "
              style={{ width: "100%" }}
            >
              {freelancerLoading ? (
                <Skeleton />
              ) : (
                chatSection?.map((item) => (
                  <div className="flex flex-col gap-2" key={item.chat_id}>
                    <AllMessages
                      item={item}
                      unReadMessages={unReadMessages}
                      active={active}
                      auth={auth}
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
              className="flex flex-col gap-4    mt-[5px]  "
              style={{ width: "100%" }}
            >
              {freelancerLoading ? (
                <Skeleton />
              ) : (
                unReadMessages.length > 0 &&
                unReadMessages?.map((item) => (
                  <div className="flex flex-col gap-2" key={item.chat_id}>
                    <UnReadMessages
                      item={item}
                      unReadMessages={unReadMessages}
                      active={active}
                      auth={auth}
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
              className="flex flex-col gap-4    mt-[5px]  "
              style={{ width: "100%" }}
            >
              {freelancerLoading ? (
                <Skeleton />
              ) : (
                CompletedMessages?.length > 0 &&
                CompletedMessages?.map((item) => (
                  <div className="flex flex-col gap-2" key={item.chat_id}>
                    <CompletedMessages
                      item={item}
                      unReadMessages={unReadMessages}
                      active={active}
                      auth={auth}
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
        </div>
      </div>
    </>
  );
};

ChatInfo.propTypes = {
  handleChat: PropTypes.func.isRequired,
  chatSection: PropTypes.array.isRequired,
  freelancerLoading: PropTypes.bool.isRequired,
  setMessageScrolling: PropTypes.bool.isRequired,
};

export default ChatInfo;
