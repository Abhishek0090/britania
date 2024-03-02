import { LucideCheck, LucideCheckCheck } from 'lucide-react';
import React from 'react';

const ChatItem = ({
  item,
  auth,
  active,
  handleChat,
  handleActive,
  setMessageScrolling,
  navigate,
  existingMembersIds,
  chatRef,
  index,
  chat_id,
  urlChatType,
  members,
  newChat,
}) => { 

    const unReadMessages = item?.unread_messages || 0;

  const handleChatInfo = () => { 
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
      `/team/dashboards/chats?chat_id=${item?.chat_id}&type=${item?.chat_type?.replace(/ /g, "")}`
    );
  };

  return (
    <div
      className={`flex gap-2 items-start flex-col mb-[1rem] mr-[1rem]`}
    >
      <button
        id={item?.chat_id}
        ref={(ref) => {
          chatRef.current[index] = ref;
        }}
        className={`flex gap-4 items-center justify-between w-[100%] p-[5px] rounded-md  ${
          active.includes(item?.chat_id) ||
          (chat_id === item?.chat_id &&
            urlChatType === item?.chat_type.replace(/ /g, ""))
            ? "bg-[#2e2565] text-gray-100 font-bold"
            : "bg-none text-white"
        } hover:bg-[#2e2565] hover:text-white hover:fond-bold`}
        onClick={handleChatInfo}
      >
        <span className="flex gap-2 items-center">
          <span className="inline-block rounded-full bg-gray-800 text-white font-bold p-5 text-center flex items-center justify-center h-6 w-6">
            {item.chat_type === "Assignment Group"
              ? item?.assignment_id
              : null}
          </span>
          <span
            className="flex flex-col items-start"
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
                {item?.message_data?.sent_by_id !== null ? (
                  <span className="text-gray-400 font-semibold mt-1">
                    <b>
                      {item?.message_data?.sent_by_id === auth?.id ? "You" : item?.message_data?.sent_by_name}
                    </b> :{' '}
                    {item?.message_data?.message?.length > 20
                      ? item?.message_data?.message?.slice(0, 20) + '..'
                      : item?.message_data?.message}
                  </span>
                ) : null}
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
                      Array.isArray(item?.message_data?.read) &&
                      Array.isArray(existingMembersIds) &&
                      existingMembersIds?.every((user) =>
                        item?.message_data?.read?.some(
                          (ele) => user?.id === ele?.read_to
                        )
                      )
                        ? 'blue'
                        : 'none',
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

        {unReadMessages > 0 ? (
          <span className="inline-block rounded-full bg-none border-2 border-blue141 text-white font-bold p-4 text-center flex items-center justify-center h-4 w-4">
            <b className="text-[#8C7CF0]">{unReadMessages}</b>
          </span>
        ) : null}

        {newChat && item?.chat_id === chat_id ? (
          <span id={`new_chat`}>New</span>
        ) : null}
      </button>
    </div>
  );
};

export default ChatItem;
