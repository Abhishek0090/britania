import moment from "moment";

//specific message time
export const getTime = (date) => {
  const inputDate = moment(date, "DD-MM-YYYY HH:mm:ss");

  let formattedOutput = inputDate.format("hh:mm A");

  return formattedOutput;
};

export const getSpecifiedTime = (date) => {
  const inputDate = moment(date, "DD-MM-YYYY HH:mm:ss");

  const today = moment().startOf("day");
  let formattedOutput = inputDate.format("hh:mm A");

  if (today) {
    formattedOutput = "Today at " + formattedOutput;
  }

  return formattedOutput;
};

//date range for message
export const getRangeDate = (item, previousItem) => {
  const retrievedDate = item.sent_on;
  const inputDate = moment(retrievedDate, "DD-MM-YYYY HH:mm:ss");

  let formattedOutput = "";

  // if (!item?.deleted) {
  if (previousItem) {
    const existingDate = moment(previousItem.sent_on, "DD-MM-YYYY HH:mm:ss");

    if (inputDate.isSame(existingDate, "day")) {
      formattedOutput = "";
    } else if (inputDate.isSame(moment(), "day")) {
      formattedOutput = "Today";
    } else {
      formattedOutput = inputDate.format("DD-MM-YYYY");
    }
  } else {
    if (inputDate.isSame(moment(), "day")) {
      formattedOutput = "Today";
    } else {
      formattedOutput = inputDate.format("DD-MM-YYYY");
    }
  }
  // }

  return formattedOutput ? (
    <div className="flex px-5 w-auto rounded-2xl items-center justify-center text-sm m-[2rem]">
      <span className="flex bg-[#29b2eb] font-semibold px-2 rounded-lg items-center justify-center mb-1 mt-1 text-black gap-2">
        {formattedOutput}
      </span>
    </div>
  ) : (
    <></>
  );
};
