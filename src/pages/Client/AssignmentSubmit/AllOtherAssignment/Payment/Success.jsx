import { LoadingButton } from "@mui/lab";
import { LucideCheckCircle, LucideFlag, LucideLogOut } from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { clearAllPlagiarismDetails } from "~/features/student/studentSlice";

const Success = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const queryParams = new URLSearchParams(location.search);
  const order_id = queryParams.get("order_id");

  useEffect(() => {
    dispatch(clearAllPlagiarismDetails());
  }, []);

  const handleNavigate = () => {
    dispatch(clearAllPlagiarismDetails());
    navigate("/plagreport");
  };

  return (
    <div className="flex flex-col  items-center justify-center  backdrop-blur-2xl drop-shadow shadow-2xl rounded-xl py-8 md:my-5 flex-col bg-white bg-opacity-20  max-w-[70rem] mt-8 mb-6 mx-auto flex gap-5  px-5 md:px-0  items-center m-5">
      <div>
        <LucideCheckCircle color="green" size="100" />
      </div>
      <div className="font-bold text-center text-[30px]">
        Transaction Completed Successfully
      </div>
      <div className="text-[25px]">Thank you for your Order</div>
      <LoadingButton
        onClick={handleNavigate}
        variant="contained"
        color="primary"
        type="submit"
        endIcon={<LucideFlag />}
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
      Check All Plagiarism Report
      </LoadingButton>
    </div>
  );
};

export default Success;
