import { useState, useEffect, useRef } from "react";
import {
  useSendEmailOTPMutation,
  useVerifyEmailOTPMutation,
  useSendEmailOTPForFreelancerMutation,
  useVerifyEmailOTPForFreelancerMutation,
} from "~/features/auth/authApiSlice";
import { LucideLoader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import ReactCodeInput from "react-code-input";
import Button from "@mui/material/Button";
import toast from "react-hot-toast";
import { setTechnicalFreelancerFormData } from "~/features/freelancer/freelancerSlice";
import { setNonTechnicalFreelancerFormData } from "~/features/freelancer/freelancerSlice";
import { setOtpVerified } from "~/features/auth/authSlice";
import { selectAuth } from "~/features/auth/authSlice";
export default function OTPEmail({ validEmail, category }) {
  const dispatch = useDispatch();
  const Ref = useRef(null);
  const auth = useSelector(selectAuth);
  const [loading, setLoading] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [timer, setTimer] = useState("00:00:00");
  const [emailOTP, setEmailOTP] = useState("");
  const [emailOTPValid, setEmailOTPValid] = useState(false);
  const [sendEmailOTP] = useSendEmailOTPMutation();
  const [verifyEmailOTP] = useVerifyEmailOTPMutation();
  const [sendEmailOTPForFreelancer] = useSendEmailOTPForFreelancerMutation();
  const [verifyEmailOTPForFreelancer] =
    useVerifyEmailOTPForFreelancerMutation();

  // update otp
  useEffect(() => {
    if (emailOTP?.length === 4) {
      handleVerifyEmailOTP();
    }

    if (auth?.email_otp_verified?.email_otp_verified !== 1) {
      setHidden(false);
      setEmailOTP("");
    }
  }, [emailOTP, auth?.email_otp_verified?.email_otp_verified]);

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

  const handleVerifyEmailOTP = () => {
    const data = {
      email: validEmail,
      otp: emailOTP,
    };
    {
      category
        ? verifyEmailOTPForFreelancer(data).then((res) => {
            if (res.data.status == 200) {
              setEmailOTPValid(true);

              if (category == "technical") {
                setTimer("00:00:00");
                dispatch(
                  setTechnicalFreelancerFormData({
                    email_verified: 1,
                  })
                );
              } else if (category == "non_technical") {
                setTimer("00:00:00");
                dispatch(
                  setNonTechnicalFreelancerFormData({
                    email_verified: 1,
                  })
                );
              }
              toast.success(res.data.message);
              setHidden(true);
            } else {
              setEmailOTPValid(false);
              toast.error(res.data.message);
              setHidden(false);
            }
            // console.log(res);
          })
        : verifyEmailOTP(data).then((res) => {
            if (res.data.status == 200) {
              setTimer("00:00:00");
              dispatch(
                setOtpVerified({
                  email_otp_verified: 1,
                })
              );
              toast.success(res.data.message);
              setHidden(true);
            } else {
              toast.error(res.data.message);
              setHidden(false);
            }
            // console.log(res);
          });
    }
  };
  return (
    
    <div
      className={`flex flex-row items-center justify-between max-w-lg mx-auto py-2 ${
        hidden ? "hidden" : ""
      }`}
    >
      <div className="flex flex-col items-center ">
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
                email: validEmail,
                category: category,
              };
              {
                category
                  ? await sendEmailOTPForFreelancer(data).then((res) => {
                      console.log(res);
                      onClickReset();
                      toast.success("OTP sent to your email address");
                      setLoading(false);
                    })
                  : await sendEmailOTP(validEmail).then((res) => {
                      console.log(res);
                      onClickReset();
                      toast.success("OTP sent to your email address");
                      setLoading(false);
                    });
              }
            }}
            disabled={!validEmail || timer !== "00:00:00" ? true : false}
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mx-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
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
            disabled={!validEmail ? true : false}
            isValid={emailOTPValid ? true : false}
            onChange={(value) => {
              setEmailOTP(value);
              // if (value?.length === 4) {
              //   handleVerifyEmailOTP();
              // }
            }}
          />
        </span>
      </div>
    </div>
  );
}
