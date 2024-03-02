import { LoadingButton } from "@mui/lab";
import { LucideRepeat, LucideXCircle } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Failure = () => {
  const navigate = useNavigate();
  const studentData = useSelector(
    (state) => state.student.allNonLoggedPlagiarismDetails
  );

  const handleNavigate = () => {
    // window.location.href = studentData.link;
    window.location.href = "https://bluepen.co.in/submit/checkplagiarism";
  };

  return (
    <div className="flex flex-col  items-center justify-center  backdrop-blur-2xl drop-shadow shadow-2xl rounded-xl py-8 md:my-5 flex-col bg-white bg-opacity-20  max-w-[70rem] mt-8 mb-6 mx-auto flex gap-5  px-5 md:px-0  items-center">
      <div>
        <LucideXCircle color="red" size="100" />
      </div>
      <div className="font-bold  text-center  text-[30px]">
        Transaction Failed
      </div>
      <div className="text-[25px]">Please Try Again</div>
      <LoadingButton
        onClick={handleNavigate}
        variant="contained"
        color="primary"
        type="submit"
        endIcon={<LucideRepeat />}
        sx={{
          bgcolor: "#141B41",
          color: "#fff",
          borderRadius: "1000px",
          mt: 2,
          height: "50px",

          "&:hover": {
            backgroundColor: "#fff",
            color: "#000",
          },
        }}
      >
        Try Again
      </LoadingButton>
    </div>
  );
};

export default Failure;
