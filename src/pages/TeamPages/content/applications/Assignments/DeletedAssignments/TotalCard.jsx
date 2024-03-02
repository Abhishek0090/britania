import React from "react";

const TotalCard = ({ totalData }) => {
  const {
    total_marks_category,
    total_marks_obtained,
    total_marks_out_of_100,
    total_marks_out_of,
  } = totalData;
  return (
    <div className="flex md:flex-row flex-col items-center md:items-center  justify-between px-10 md:px-20 gap-1 md:gap-2 py-3">
      {" "}
      <div className="flex gap-6 items-center">
        <span className="font-bold text-lg">Total Marks Category : </span>
        <span className="text-sm">{total_marks_category || "NA"}</span>
      </div>
      <div className="flex gap-6 items-center">
        <span className="font-bold text-lg">Average Marks : </span>
        <span className="text-sm">{total_marks_out_of_100 || "NA"}</span>
      </div>
      <div className="flex gap-6 items-center">
        <span className="font-bold text-lg">Total Marks Obtained : </span>
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

export default TotalCard;
