import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { selectAuth } from "~/features/auth/authSlice";
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
import { useSearchParams } from "react-router-dom";
import Skeleton from "./components/Skeleton";
import {
  LucideCheck,
  LucideCheckCheck,
  LucideChevronDown,
  Download,
  LucideInfo,
} from "lucide-react";
import AllMessages from "./components/AllMessages";
import UnReadMessages from "./components/UnReadMessages";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -10,
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
  members,
}) => {
  const theme = useTheme();
  const [searchParams] = useSearchParams();
  const chat_id = searchParams.get("chat_id");
  const urlChatType = searchParams.get("type");
  const newChat = searchParams.get("new_chat");

  const navigate = useNavigate();

  const auth = useSelector(selectAuth);
  const [active, setActive] = useState([]);

  const [currentTab, setCurrentTab] = useState("all");

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  const handleActive = (value) => {
    setActive([value]);
  };

  //sort according to date and unreadmessages and created chat date

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

  chatInfos?.sort(compareMessages);

  const unReadMessages = chatInfos?.filter((item) => item?.unread_messages > 0);

  const CompletedMessages = chatInfos?.filter(
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

  const chatRef = useRef([]);

  const location = useLocation().pathname;

  useEffect(() => {
    const buttonId = chatRef?.current;
    const convertToArray = Array.from(buttonId);
    const filteredIdx = convertToArray?.findIndex(
      (item) => item?.id === chat_id
    );

    chatRef?.current[filteredIdx]?.scrollIntoView({ behavior: "smooth" });
    chatRef?.current[filteredIdx]?.click();
  }, [chat_id, newChat, location]);

  return (
    <>
      <div className="flex flex-col bg-[#111633] items-center  md:pt-[1rem] lg:pt-[1rem] min-h-screen w-[100%] ">
        <div className="flex flex-col items-center justify-around gap-2 p-2  rounded-xl m-[12px] w-[100%]">
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

          {/* <TabsContainerWrapper> */}
          <Tabs
            onChange={handleTabsChange}
            value={currentTab}
            variant="scrollable"
            scrollButtons="auto"
            textColor="primary"
            indicatorColor="primary"
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
          {/* </TabsContainerWrapper> */}

          {currentTab === "all" && (
            <div
              className=" overflow-auto max-h-[65vh] w-[100%] message-overflow mt-2"
              style={{ scrollBarWidth: "none" }}
            >
              {" "}
              {chatLoading ? (
                <Skeleton />
              ) : (
                chatInfos?.map((item, index) => (
                  <div
                    className={`flex flex-col gap-2  rounded-xl `}
                    key={item?.chat_id}
                  >
                    <AllMessages
                      item={item}
                      auth={auth}
                      navigate={navigate}
                      chatRef={chatRef}
                      chat_id={chat_id}
                      urlChatType={urlChatType}
                      handleChat={handleChat}
                      setMessageScrolling={setMessageScrolling}
                      handleActive={handleActive}
                      newChat={newChat}
                      active={active}
                      members={members}
                      index={index}
                      existingMembersIds={existingMembersIds}
                    />
                  </div>
                ))
              )}
            </div>
          )}
          {currentTab === "unread" && (
            <div
              className=" overflow-auto max-h-[65vh] w-[100%] mt-2"
              style={{ scrollBarWidth: "none" }}
            >
              {" "}
              {unReadMessages.length > 0 ? (
                chatLoading ? (
                  <Skeleton />
                ) : (
                  unReadMessages?.map((item) => (
                    <div
                      className={`flex flex-col gap-2  rounded-xl `}
                      key={item?.chat_id}
                    >
                      <UnReadMessages
                        item={item}
                        auth={auth}
                        active={active}
                        handleChat={handleChat}
                        handleActive={handleActive}
                        setMessageScrolling={setMessageScrolling}
                        chat_id={chat_id}
                        urlChatType={urlChatType}
                        newChat={newChat}
                      />
                    </div>
                  ))
                )
              ) : (
                <h3 className="text-center mt-2">No Messages</h3>
              )}
            </div>
          )}
          {currentTab === "completed" && (
            <div
              className=" overflow-auto max-h-[65vh] w-[100%] mt-2"
              style={{ scrollBarWidth: "none" }}
            >
              {" "}
              {CompletedMessages.length > 0 ? (
                chatLoading ? (
                  <Skeleton />
                ) : (
                  CompletedMessages?.map((item) => (
                    <div
                      className={`flex flex-col gap-2  rounded-xl `}
                      key={item?.chat_id}
                    >
                      <div
                        className={`flex gap-2 items-start   flex-col mb-[1rem] mr-[1rem]`}
                      >
                        <button
                          className={`flex gap-4 items-center justify-between  w-[100%] p-[5px] rounded-md  ${
                            active.includes(item?.chat_id) ||
                            (chat_id === item?.chat_id &&
                              urlChatType === item?.chat_type.replace(/ /g, ""))
                              ? "bg-[#2e2565] text-gray-100 font-bold"
                              : "bg-none text-white"
                          } hover:bg-[#2e2565] hover:text-white hover:fond-bold`}
                          onClick={() => {
                            const totalTeamNames = [].concat(
                              item?.members?.team,
                              item?.members?.freelancers,
                              [item?.members?.user]
                            );

                            const membersIdss = totalTeamNames.map((ele) => ({
                              id: ele.id,
                              name: ele.name,
                            }));

                            const filteredMapIds = membersIdss?.filter(
                              (item) => item.id !== auth?.id
                            );

                            const loggedInUserId = membersIdss?.filter(
                              (item) => item.id === auth?.id
                            );

                            handleChat(
                              item?.chat_id,
                              item?.assignment_id,
                              item?.chat_type,
                              totalTeamNames,
                              filteredMapIds,
                              loggedInUserId,
                              item?.assignment_title,
                              item?.enabled_status
                            );
                            handleActive(item?.chat_id);
                            setMessageScrolling(true);
                            navigate(
                              `/team/dashboards/chats?chat_id=${
                                item?.chat_id
                              }&type=${item?.chat_type?.replace(/ /g, "")}`
                            );
                          }}
                        >
                          <span className="flex gap-2 items-center">
                            <span className="inline-block rounded-full bg-gray-800 text-white font-bold p-5 text-center flex items-center justify-center h-6 w-6">
                              {item.chat_type === "Assignment Group"
                                ? item?.assignment_id
                                : null}
                            </span>
                            <span
                              className="flex flex-col items-start "
                              style={{ width: "max-content" }}
                            >
                              {item.chat_type === "Assignment Group" && (
                                <>
                                  <span className="text-[1rem]">
                                    {item.chat_type === "Assignment Group"
                                      ? item?.assignment_title !== "NULL"
                                        ? item?.assignment_title
                                        : `Assignment_id_${item?.assignment_id}`
                                      : null}
                                  </span>
                                  <span className="text-gray-400">
                                    {item?.message_data?.sent_by_id !== null ? (
                                      <span className="text-gray-400  font-semibold mt-1">
                                        <b>
                                          {item?.message_data?.sent_by_id ===
                                          auth?.id
                                            ? "You"
                                            : item?.message_data?.sent_by_name}
                                        </b>{" "}
                                        :{" "}
                                        {item?.message_data?.message?.length >
                                        20
                                          ? item?.message_data?.message?.slice(
                                              0,
                                              20
                                            ) + ".."
                                          : item?.message_data?.message}
                                      </span>
                                    ) : null}
                                  </span>
                                </>
                              )}
                            </span>
                          </span>

                          {auth?.id === item?.message_data?.sent_by_id && (
                            <>
                              {item?.message_data?.delivered &&
                              Array.isArray(members) &&
                              Array.isArray(item?.message_data?.delivered) &&
                              existingMembersIds?.every((ele) =>
                                item?.message_data?.delivered?.some(
                                  (deli) =>
                                    deli?.delivered_to === ele?.id ||
                                    deli?.delivered_name === ele?.name
                                )
                              ) ? (
                                <span>
                                  <LucideCheckCheck
                                    size="16"
                                    style={{
                                      color:
                                        Array.isArray(
                                          item?.message_data?.read
                                        ) &&
                                        Array.isArray(existingMembersIds) &&
                                        existingMembersIds?.every((user) =>
                                          item?.message_data?.read?.some(
                                            (ele) => user?.id === ele?.read_to
                                          )
                                        )
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

                          {item?.unread_messages > 0 ? (
                            <span className="inline-block rounded-full bg-none border-2 border-blue141 text-white font-bold p-4 text-center flex items-center justify-center h-4 w-4">
                              <b className="text-[#8C7CF0]">
                                {item?.unread_messages}
                              </b>
                            </span>
                          ) : null}

                          {newChat && item?.chat_id === chat_id ? (
                            <span id={`new_chat`}>New</span>
                          ) : null}
                        </button>
                      </div>
{/* 
                      <CompletedMessages
                        item={item}
                        auth={auth}
                        active={active}
                        handleChat={handleChat}
                        handleActive={handleActive}
                        setMessageScrolling={setMessageScrolling}
                        navigate={navigate}
                        existingMembersIds={existingMembersIds}
                        chat_id={chat_id}
                        members={members}
                        newChat={newChat}
                      /> */}
                    </div>
                  ))
                )
              ) : (
                <h3 className="text-center mt-2">No Messages</h3>
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
};

export default ChatInfo;
