import React from "react";

const TotalFilteredCard = ({ totalData }) => {
  const { total_marks_obtained, total_marks_out_of_100, total_marks_out_of } =
    totalData;

  let average_marks_category = "";

  if (total_marks_out_of_100 >= 71) {
    average_marks_category = "Distinction";
  } else if (total_marks_out_of_100 >= 61 && total_marks_out_of_100 <= 70) {
    average_marks_category = "Merit";
  } else if (total_marks_out_of_100 >= 51 && total_marks_out_of_100 <= 60) {
    average_marks_category = "Passing";
  } else if (total_marks_out_of_100 >= 0 && total_marks_out_of_100 <= 50) {
    average_marks_category = "Resit";
  }

  return (
    <div className="flex md:flex-row flex-col items-center md:items-center  justify-between px-10 md:px-2 gap-3 md:gap-2 py-3">
      {" "}
      <div className="flex gap-2 items-center">
        <span className="font-bold text-sm">Total Marks Category : </span>
        <span className="text-sm">{average_marks_category || "NA"}</span>
      </div>
      <div className="flex gap-2 items-center">
        <span className="font-bold text-sm">Average Marks : </span>
        <span className="text-sm">
          {total_marks_out_of_100?.toFixed(2) || "NA"}
        </span>
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
    </div>
  );
};

export default TotalFilteredCard;
