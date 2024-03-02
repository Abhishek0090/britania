import React from 'react';

const UnReadMessages = ({
  item,
  auth,
  active,
  handleChat,
  handleActive,
  setMessageScrolling,
  navigate
}) => {
  const unReadMessages = item?.unread_messages || 0;

  const handleChatInfo = () => {
    const name = item?.assignment_id;

    const totalTeamNames = [].concat(
      item?.members?.team,
      item?.members?.freelancers,
      [item?.members?.user]
    );

    const membersIdss = totalTeamNames.map((item) => ({
      id: item.id,
      name: item.name,
    }));

    const filteredMapIds = membersIdss?.filter((item) => item.id !== auth?.id);

    const loggedInUserId = membersIdss?.filter((item) => item.id === auth?.id);

    handleChat(
      item?.chat_id,
      name,
      item.chat_type,
      totalTeamNames,
      filteredMapIds,
      loggedInUserId,
      item?.assignment_title,
      item?.enabled_status
    );
    handleActive(item?.chat_id);

    setMessageScrolling(true);
    navigate(`/chats?chat_id=${item?.chat_id}`);
  };

  return (
    <div className="flex gap-1 items-start ml-2 flex-col">
      <button
        className={`flex gap-4 items-center font-bold ${
          unReadMessages > 0 ? "justify-between" : "justify-start"
        } w-[100%] p-[5px] rounded-md text-sm ${
          active?.includes(item?.chat_id)
            ? "rightText text-black font-bold"
            : "bg-none text-black"
        } hover:bg-blue111 hover:text-white hover:fond-bold`}
        onClick={handleChatInfo}
      >
        <span className="flex gap-2 items-center">
          <span className="inline-block rounded-full bg-gray-800 text-white font-bold p-5 text-center flex items-center justify-center h-6 w-6">
            {item?.chat_type === "Assignment Group"
              ? item?.assignment_id
              : null}
          </span>

          <span className="flex flex-col items-start " style={{ width: "max-content" }}>
            {item?.chat_type === "Assignment Group" && (
              <>
                <span className="text-[1rem]">
                  {item?.chat_type === "Assignment Group"
                    ? item?.assignment_title !== "NULL"
                      ? item?.assignment_title
                      : `Assignment_id_${item?.assignment_id}`
                    : null}
                </span>
                {item?.last_message?.sent_by_id !== null ? (
                  <span className="text-gray-700  font-semibold mt-1">
                    <b>
                      {item?.last_message?.sent_by_id ===
                      auth?.id
                        ? "You"
                        : item?.last_message?.sent_by_name}
                    </b>{" "}
                    :{" "}
                    {item?.last_message?.message?.length > 20
                      ? item?.last_message?.message?.slice(
                          0,
                          20
                        ) + ".."
                      : item?.last_message?.message}
                  </span>
                ) : null}
              </>
            )}
          </span>
        </span>

        {unReadMessages > 0 ? (
          <span className="inline-block rounded-full bg-none rightText text-white font-bold p-4 text-center flex items-center justify-center h-4 w-4">
            <b className="text-black">
              {unReadMessages}
            </b>
          </span>
        ) : null}
      </button>
    </div>
  );
};

export default UnReadMessages;
