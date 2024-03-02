import React from "react";

const TotalFilteredCard = ({ totalData }) => {
  const {
    total_marks_category,
    total_marks_obtained,
    total_marks_out_of_100,
    total_marks_out_of,
  } = totalData;
  return (
    <div className="flex md:flex-row flex-col items-center md:items-center  justify-between px-10 md:px-2 gap-1 md:gap-2 py-3 text-gray-200">
      {" "}
      <div className="flex gap-2 items-center">
        <span className="font-bold text-sm">Total Marks Category : </span>
        <span className="text-sm">{total_marks_category || "NA"}</span>
      </div>
      <div className="flex gap-2 items-center">
        <span className="font-bold text-sm">Average Marks : </span>
        <span className="text-sm">
          {total_marks_out_of_100.toFixed(2) || "NA"}
        </span>
      </div>
      <div className="flex gap-2 items-center">
        <span className="font-bold text-sm">Total Marks Obtained : </span>
        <span className="text-sm">
          {/* {total_marks_obtained}/{total_marks_out_of} */}

          {total_marks_obtained && total_marks_out_of ? (
            <>
              {total_marks_obtained} / {total_marks_out_of}
            </>
          ) : (
            "NA"
          )}
        </span>
      </div>
    </div>
  );
};

export default TotalFilteredCard;
