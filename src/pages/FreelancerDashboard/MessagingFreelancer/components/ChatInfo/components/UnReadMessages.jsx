import React from 'react';

const UnReadMessages = ({
  item,
  unReadMessages,
  active,
  auth,
  handleChat,
  handleActive,
  setMessageScrolling,
  navigate,
}) => {
  const handleClick = () => {
    const name = item?.assignment_id;

    const totalTeamNames = [].concat(
      item?.members?.team,
      item?.members?.freelancers,
      [item?.members?.user]
    );

    const membersIdss = totalTeamNames.map((member) => ({
      id: member.id,
      name: member.name,
    }));

    const filteredMapIds = membersIdss?.filter((member) => member.id !== auth?.id);

    const loggedInUserId = membersIdss?.filter((member) => member.id === auth?.id);

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
    navigate(`/dashboard/freelancer/chats?chat_id=${item?.chat_id}`);
  };

  return (
    <div className="flex gap-1 items-start flex-col">
      <button
        className={`flex gap-4 items-center w-[100%] p-[5px] rounded-md text-sm justify-between 
          ${active.includes(item?.chat_id) ? "bg-[#25227f] text-white font-bold" : "bg-none text-white"} hover:bg-gray-900 hover:text-white hover:fond-bold`}
        onClick={handleClick}
      >
        <span className="flex gap-2 items-center">
          <span className="inline-block rounded-full bg-gray-700 text-gray-800 font-bold p-4 text-center flex items-center justify-center h-2 w-2 text-sm">
            {item?.chat_type === "Assignment Group" ? item?.assignment_id : null}
          </span>

          <span className="flex flex-col items-start" style={{ width: "max-content" }}>
            {item?.chat_type === "Assignment Group" && (
              <>
                <span className="text-[1rem]">
                  {item?.chat_type === "Assignment Group"
                    ? item?.assignment_title !== "NULL"
                      ? item?.assignment_title
                      : `Assignment_id_${item?.assignment_id}`
                    : null}
                </span>
                {item?.message_data?.sent_by_id !== null ? (
                  <span className="text-gray-400 font-semibold mt-1">
                    <b>
                      {item?.message_data?.sent_by_id === auth?.id
                        ? "You"
                        : item?.message_data?.sent_by_name}
                    </b>{" "}
                    :{' '}
                    {item?.message_data?.message?.length > 10
                      ? item?.message_data?.message?.slice(0, 10) + '..'
                      : item?.message_data?.message}
                  </span>
                ) : null}
              </>
            )}
          </span>
        </span>
        {item?.unread_messages > 0 ? (
          <span className="inline-block rounded-full bg-blue141 text-white font-bold p-4 text-center flex items-center justify-center h-4 w-4">
            <b className="text-black">{item?.unread_messages}</b>
          </span>
        ) : null}
      </button>
    </div>
  );
};

export default UnReadMessages;
