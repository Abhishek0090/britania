import { LoadingButton } from "@mui/lab";
import axios from "axios";
import {
  LucideFileEdit,
  LucidePaperclip,
  LucideShoppingCart,
  LucideUser,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useGetPersonalDetailsMutation } from "~/features/student/studentApiSlice";
import { selectAuth } from "~/features/auth/authSlice";
import { URL } from "~/utils/BaseURL";

const Checkout = () => {
  const navigate = useNavigate();
  const auth = useSelector(selectAuth);
  const studentData = useSelector(
    (state) => state.student.allPlagiarismDetails
  );
  const [loading, setLoading] = useState(false);

  const [sendData, { isLoading, isError, data: personalDetailsData, error }] =
    useGetPersonalDetailsMutation();

  useEffect(() => {
    sendData(auth?.id);
  }, []);

  const mapped = studentData?.assignment_array;

  const handleCheckout = async () => {
    setLoading(true);

    const data = {
      submit: "submit",
      assignment_id: studentData?.assignment_id,
    };

    try {
      const res = await axios.post(`${URL}/student/createorder.php`, data);

      console.log(res.data.link);

      if (res.data.status == 200) {
        window.location.href = res.data.link;
      } else {
        navigate("/submit/plagiarism-check/checkout/failure");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen">
    <Helmet>
      <title>Checkout</title>
    </Helmet>{" "}
    <div className="flex flex-col items-center justify-center gap-2 md:flex-row mt-5">
      <div className=" py-4 max-w-[100rem] mx-auto flex md:flex-row flex-col px-5 md:px-0 justify-between items-center">
        <button className="flex-col max-w-sm px-10 bg-white border border-gray-200 rounded-lg shadow-2xl  backdrop-blur-3xl">
          <div className="p-5">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
              Checkout
            </h5>
          </div>
        </button>
      </div>
    </div>
    <div className="flex  flex-col m-auto justify-center  md:flex-col items-center mt-[2rem] p-5 backdrop-blur-2xl drop-shadow shadow-2xl bg-white bg-opacity-20 w-auto md:w-fit">
      {" "}
      <div className="  rounded-xl py-8 md:my-5 flex-col-reverse gap-20 lg:flex-row md:flex-row w-[100%]  mt-8 mb-6  flex   px-2 md:px-0  items-center">
        <div className="flex flex-col items-start px-2 md:px-10 justify-start gap-5 w-[100%] md:w-[100%] lg:w-[50%]">
          <label className="block text-center  text-[2rem] font-bold ">
            Basic Information
          </label>
          {/* <hr className="border-2 border-blue141 " /> */}
          <div className="flex items-start justify-start   gap-10  w-[100%] ">
            <h3 className="font-bold flex gap-3 text-[18px]">
              <LucideUser /> User ID:
            </h3>
            <span>{studentData?.user_id || "2"}</span>
          </div>
          <div className="flex items-start justify-start   gap-10  w-[100%]">
            <h3 className="font-bold flex gap-3 text-[18px]">
              <LucideFileEdit /> Name:
            </h3>
            <span className="text-[17px]">
              {`${personalDetailsData?.firstname} ${personalDetailsData?.lastname}` ||
                "2"}
            </span>
          </div>
          <div className="flex items-start justify-start gap-5  w-[100%]">
            <h3 className="font-bold flex gap-3 text-[18px]">
              <LucidePaperclip /> Files:
            </h3>
            <span className="truncate">
              {mapped?.map((item, index) => (
                <>
                  <span key={index}>
                    {index + 1} : {item || "stratany2018_venue_image.jpg"}
                  </span>
                  <br />
                </>
              ))}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-start justify-start px-2 md:px-10  gap-[1rem] w-[100%] md:w-[100%] lg:w-[50%]">
          <label className="block text-center  text-[2rem] font-bold ">
            Order Summary
          </label>
          <div className="flex items-start justify-start gap-5  w-[100%]">
            <h3 className="font-bold text-[20px]">Total Price : </h3>
            <span className="text-[17px]">
              {studentData.number_of_files
                ? studentData.number_of_files
                : "2 "}
              {studentData.price
                ? " x ₹" + " " + studentData.price
                : "x ₹ 2500"}
            </span>
          </div>
          <div className="flex items-start justify-start gap-5 w-[100%] ">
            <h3 className="font-bold text-[20px]">Total Amount to Pay :</h3>
            <span className="text-[17px]">
              {studentData.amount ? "₹" + " " + studentData.amount : "₹ 5000"}
            </span>
          </div>
        </div>
      </div>
      <LoadingButton
        loading={loading}
        variant="contained"
        onClick={handleCheckout}
        color="primary"
        type="submit"
        endIcon={<LucideShoppingCart style={{ height: '32px', width: '32px' }} />}
        sx={{
          bgcolor: "#141B41",
          color: "#fff",
          borderRadius: "1000px",
          mt: 2,
          height: "50px",
          width : "30%",
          fontSize : "25px",
          fontWeight : "bold",

          "&:hover": {
            backgroundColor: "#fff",
            color: "#000",
          },
        }}
      >
        Pay Now
      </LoadingButton>
    </div>
  </div>
  );
};

export default Checkout;
