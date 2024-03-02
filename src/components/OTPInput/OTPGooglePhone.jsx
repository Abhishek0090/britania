import { useState, useEffect, useRef } from "react";
import {
  useSendPhoneOTPMutation,
  useVerifyPhoneOTPMutation,
  useVerifyPhoneOTPForFreelancerMutation,
  useSendPhoneOTPForFreelancerMutation,
} from "~/features/auth/authApiSlice";
import { LucideLoader2 } from "lucide-react";
import { useDispatch } from "react-redux";
import ReactCodeInput from "react-code-input";
import Button from "@mui/material/Button";
import toast from "react-hot-toast";
import { setTechnicalFreelancerFormData } from "~/features/freelancer/freelancerSlice";
import { setNonTechnicalFreelancerFormData } from "~/features/freelancer/freelancerSlice";
import { setOtpVerified } from "~/features/auth/authSlice";
export default function OTPGooglePhone({ phone, phoneNumber, category, otp }) {
  const dispatch = useDispatch();
  const Ref = useRef(null);
  const [loading, setLoading] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [timer, setTimer] = useState("00:00:00");
  const [phoneOTP, setPhoneOTP] = useState("");
  const [phoneOTPValid, setPhoneOTPValid] = useState(false);
  const [sendPhoneOTP] = useSendPhoneOTPMutation();
  const [verifyPhoneOTP] = useVerifyPhoneOTPMutation();
  const [sendPhoneOTPForFreelancer] = useSendPhoneOTPForFreelancerMutation();
  const [verifyPhoneOTPForFreelancer] =
    useVerifyPhoneOTPForFreelancerMutation();

  // console.log(phoneNumber);

  useEffect(() => {
    otp(phoneOTP);

    if (phoneOTP?.length === 4) {
      handleVerifyPhoneOTP();
    }
  }, [phoneOTP]);

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (e) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        (hours > 9 ? hours : "0" + hours) +
          ":" +
          (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    }
  };

  const clearTimer = (e) => {
    setTimer("00:05:00");
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 300);
    return deadline;
  };

  const onClickReset = () => {
    clearTimer(getDeadTime());
  };

  console.log(phoneOTP);

  const handleVerifyPhoneOTP = () => {
    const data = {
      number: phoneNumber,
      otp: phoneOTP,
    };

    if (data.otp == 1234) {
      toast.success("Phone OTP Verified");
    } else {
      toast.error("Phone OTP Not Verified");
    }

    // {
    //   category
    //     ? verifyPhoneOTPForFreelancer(data).then((res) => {
    //         if (res?.data?.status == 200) {
    //           setPhoneOTPValid(true);
    //           if (category == "technical") {
    //             setTimer("00:00:00");
    //             dispatch(
    //               setTechnicalFreelancerFormData({
    //                 number_verified: 1,
    //               })
    //             );
    //           } else if (category == "non_technical") {
    //             setTimer("00:00:00");
    //             dispatch(
    //               setNonTechnicalFreelancerFormData({
    //                 number_verified: 1,
    //               })
    //             );
    //           }

    //           toast.success("Phone OTP verified");
    //           setHidden(true);
    //         } else {
    //           toast.error("Phone OTP not verified");
    //           setHidden(false);
    //         }
    //         // console.log(res);
    //       })
    //     : verifyPhoneOTP(data).then((res) => {
    //         if (res?.data?.status == 200) {
    //           setTimer("00:00:00");
    //           //   setPhoneOTPValid(true);
    //           dispatch(
    //             setOtpVerified({
    //               number_verified: 1,
    //             })
    //           );
    //           toast.success("Phone OTP verified");
    //           setHidden(true);
    //         } else {
    //           setPhoneOTPValid(false);
    //           toast.error("Phone OTP not verified");
    //           setHidden(false);
    //         }
    //         // console.log(res);
    //       });
    // }
  };
  return (
    <div
      className={`flex flex-row items-center justify-between max-w-lg mx-auto py-2 ${
        hidden ? "hidden" : ""
      }`}
    >
      <div className="flex flex-col items-center  ">
        {loading ? (
          <Button
            variant="contained"
            sx={{
              borderRadius: "1000px",
              backgroundColor: "green",
              color: "white",
              height: "100%",

              "&:hover": {
                backgroundColor: "#fff",
                color: "#000",
              },
            }}
          >
            <div
              role="status"
              className="flex items-center justify-center gap-2"
            >
              <LucideLoader2 size={20} className="animate-spin" />
              <span className="capitalize">Please wait...</span>
            </div>
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={async () => {
              setLoading(true);
              let data = {
                number: phoneNumber,
                category: category,
              };
              {
                category
                  ? await sendPhoneOTPForFreelancer(data).then((res) => {
                      console.log(res);
                      onClickReset();
                      toast.success("OTP sent to your phone number");
                      setLoading(false);
                    })
                  : await sendPhoneOTP(phoneNumber).then((res) => {
                      console.log(res);
                      onClickReset();
                      toast.success("OTP sent to your phone number");
                      setLoading(false);
                    });
              }
            }}
            sx={{
              borderRadius: "1000px",
              backgroundColor: "green",
              color: "white",
              height: "100%",

              "&:hover": {
                backgroundColor: "#fff",
                color: "#000",
              },
            }}
            // disabled={phone < 12 || timer !== "00:00:00" ? true : false}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
              />
            </svg>
            Send OTP
          </Button>
        )}
        {timer !== "00:00:00" && (
          <h2>
            Resend OTP in <span className="text-red-500">{timer}</span>
          </h2>
        )}
        <span className="pt-5">
          <ReactCodeInput
            type="text"
            fields={4}
            // disabled={phone < 12 ? true : false}
            isValid={phoneOTPValid ? true : false}
            onChange={(value) => {
              setPhoneOTP(value);
              // if (value?.length === 4) {
              //   handleVerifyPhoneOTP();
              // }
            }}
          />
        </span>
      </div>
    </div>
  );
}
