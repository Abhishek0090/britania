/* eslint-disable no-undef */
import { useState, useEffect, forwardRef } from "react";
import jwtDecode from "jwt-decode";
import Marketing from "~/utils/Marketing";
import { Helmet } from "react-helmet-async";
import { selectAuth } from "~/features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useSignUpMutation } from "~/features/auth/authApiSlice";
import { setOtpVerified } from "~/features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import LoadingButton from "@mui/lab/LoadingButton";
import * as Yup from "yup";
import { setCredentials } from "~/features/auth/authSlice";
import Alert from "@mui/material/Alert";

import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import styled from "@mui/material/styles/styled";
import Divider from "@mui/material/Divider";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import InputAdornment from "@mui/material/InputAdornment";
import {
  LucideLock,
  LucideEye,
  LucideEyeOff,
  LucideCheckCheck,
  LucideCheck,
  LucideTrash,
} from "lucide-react";
import { useGoogleCombineSignMutation } from "~/features/auth/authApiSlice";
import { GoogleLogin } from "react-oauth-google";

import RPI from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import axios from "axios";
import { URL } from "~/utils/BaseURL";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const PhoneInput = RPI.default ? RPI.default : RPI;
const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    width: "500px",
    borderRadius: "10px",
    padding: "10px",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
//TODO:Form schema
// const regexName = / ^[a-zA-Z0-9, ]+$/;
const formSchema = Yup.object({
  firstname: Yup.string().required("Please enter your first name"),

  lastname: Yup.string().required("Please enter your last name"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Your email address is required"),
  password: Yup.string()
    .required("Password is required for security purposes")
    .min(6, "Password must be 6 minimum characters long")
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[A-Z]/, "Password requires an uppercase letter")
    .matches(/[^\w]/, "Password requires a symbol"),
  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),

  terms: Yup.boolean().oneOf([true], "Please accept our terms and conditions"),
});

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState("India");
  const [countryCode, setCountryCode] = useState("91");
  const [googleData, setGoogleData] = useState(null);
  const [number, setNumber] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [referral, setReferral] = useState("");
  const [referralError, setReferralError] = useState({
    errorMessage: "",
    status: false,
  });

  const handleReferralChange = async (value) => {
    setReferral(value);

    try {
      const data = {
        code: value,
      };
      const resData = await axios.post(
        `${URL}/student/verifyaffiliatecode.php`,
        data
      );

      const response = resData?.data;

      if (response?.status == "true") {
        setReferralError((prev) => ({
          ...prev,
          errorMessage: response?.message,
          status: false,
        }));

        // toast.success(resData?.message);
      } else if (response?.status == "false") {
        setReferralError((prev) => ({
          ...prev,
          errorMessage: response?.message,
          status: true,
        }));
        // toast.error(resData?.message);
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  console.log(referral);

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteValue = e.clipboardData.getData("text");
    setReferral("");
    handleReferralChange(pasteValue);
  };

  const [UTMParams, setUTMParams] = useState({});

  //TODO: Google Phone Model
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //TODO: Signup Mutation and Google Signup Mutation
  const [signUp] = useSignUpMutation();

  const [googleCombineSign] = useGoogleCombineSignMutation();

  // TODO: Url params for UTM tracking
  function getUTMParams() {
    let params = new URLSearchParams(window.location.search);

    let utm_source = params.get("utm_source");
    let utm_medium = params.get("utm_medium");
    let utm_campaign = params.get("utm_campaign");
    let utm_content = params.get("utm_content");
    let utm_term = params.get("utm_term");
    let utm_id = params.get("utm_id");
    let page_name = params.get("page_name");

    let page_url = window.location.href;

    return {
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      utm_term,
      utm_id,
      page_name,
      page_url,

      gclid: params.get("gclid"),
    };
  }

  //TODO: Formik validation and Schema validation and submit handler
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      googlePhone: "",
      password: "",
      confirmPassword: "",
      country_name: "",
      country_code: "",
      terms: false,
    },
    onSubmit: (values) => {
      setLoading(true);
      const data = {
        firstname: values?.firstname,
        lastname: values?.lastname,
        email: values?.email,
        country_name: country,
        country_code: countryCode,
        password: values?.password,
        number: values?.phone?.replace(countryCode, ""),
        googleNumber: values?.googlePhone?.replace(countryCode, ""),
        terms: values?.terms,
        utm_data: UTMParams,
        affiliate_code: referral,
      };

      signUp(data)
        .unwrap()
        .then((res) => {
          console.log("res", res);
          if (res?.status === "Success") {
            setLoading(false);
            toast.success(res?.message);
            navigate("/auth/login");
          }
          if (res?.status === "error") {
            setLoading(false);
            if (res?.message === "Email already registered") {
              formik.setFieldValue("email", "");
              dispatch(
                setOtpVerified({
                  number_verified: null,
                  email_otp_verified: null,
                })
              );
            }
            toast.error(res?.message);
          }
        })
        .catch((err) => {
          console.log("err", err);
          setLoading(false);
          toast.error("Account creation failed");
        });
    },
    validationSchema: formSchema,
  });

  //TODO: Hide/Show password

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleMouseDownPassword = () => {
    setShowPassword((prev) => !prev);
  };

  //TODO: Google Login function

  const handleGoogleLoginSuccess = async (res) => {
    let userObject = res?.credential;
    // console.log('userObject', userObject);
    if (userObject) {
      try {
        const userData = jwtDecode(userObject);
        // console.log('userData', userData);

        const data = {
          firstname: userData.given_name,
          lastname: userData.family_name || "",
          email: userData.email,
          number: number,
          country_name: country,
          country_code: countryCode,
          affiliate_code: referral,
        };
        // console.log('data', data);
        setGoogleData(data);

        await googleCombineSign(data)
          .unwrap()
          .then((res) => {
            console.log(res);
            if (res?.message === "Email not registered") {
              handleOpen();
              setLoading(false);
              toast.error(res?.message);
            } else if (
              res?.status === 400 ||
              res?.status === 404 ||
              res?.status === 401
            ) {
              setLoading(false);
              toast.error(res?.message);
            } else {
              setLoading(false);
              dispatch(setCredentials(res));
              navigate("/dashboard");
              toast.success(res?.message);
            }
          })
          .catch((err) => console.log(err));

        // if not all data is available
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("userObject is undefined");
    }
  };

  const handleGoogleLoginFailure = (error) => {
    console.error("Google Login Error:", error);
  };

  //TODO: Google login final function after entering number and other details

  const handleGoogleSignUp = async () => {
    console.log("formik", googleData);
    setLoading(true);
    if (
      !googleData?.firstname ||
      !googleData?.email ||
      !googleData?.country_name ||
      !googleData?.country_code ||
      !googleData?.number
    ) {
      setLoading(false);
      toast.error("Please provide all the required details");
    } else {
      // dispatch the action
      let newGoogleData = {
        ...googleData,
        utm_data: UTMParams,
        affiliate_code: referral,
      };
      await googleCombineSign(newGoogleData)
        .unwrap()
        .then((res) => {
          console.log("res", res);
          if (res?.status === 200 && res) {
            setLoading(false);
            dispatch(setCredentials(res.user_data));
            navigate("/dashboard");
            toast.success(res?.message);
            handleClose();
          } else if (
            res?.status === 400 ||
            res?.status === 404 ||
            res?.status === 401
          ) {
            setLoading(false);
            toast.error(res?.message);
          } else {
            setLoading(false);
            toast.error(res?.message);
          }
        })
        .catch((err) => {
          console.log("err", err);
          toast.error("Account creation failed");
        });
    }
  };
  const [OTP, setOTP] = useState(null);

  const getOTP = (data) => {
    setOTP(data);
  };

  //TODO: Formik Blur function to show error toast

  const handleFormBlur = (fieldName) => {
    if (formik.errors[fieldName]) {
      toast.error(formik.errors[fieldName]);
      return;
    }
    formik.setFieldValue(fieldName, formik.values[fieldName]);
  };

  //TODO: UTM Capture function initiator

  useEffect(() => {
    setUTMParams(getUTMParams());
  }, []);

  // TODO: Reload Prevent
  // useEffect(() => {
  //   if (
  //     (window.onbeforeunload = function () {
  //       return true;
  //     })
  //   )
  //     dispatch(
  //       setOtpVerified({
  //         number_verified: null,
  //         email_otp_verified: null,
  //       })
  //     );
  // }, []);

  return (
    <>
      <Helmet>
        <title>Signup Student | Bluepen</title>
      </Helmet>
      <Marketing pageName="SignUp" />
      <div className="max-w-2xl py-10 mx-auto shadow-2xl backdrop-blur-2xl drop-shadow rounded-xl md:my-10">
        <div className="flex flex-col px-10 rounded-lg ">
          {/* Progress Bar */}
          <div className="">
            <h5 className="mb-2 text-center text-4xl pb-10 font-bold tracking-tight  text-gray-900 ">
              Sign Up
            </h5>

            <div className="flex flex-col items-center">
              <form onSubmit={formik.handleSubmit} className="max-w-2xl ">
                <div className="flex flex-col items-center">
                  {/* FirstName && LastName */}
                  <div className="flex flex-col items-center md:flex-row">
                    <FormControl
                      sx={{ m: 1, width: "28ch" }}
                      variant="outlined"
                      required
                    >
                      <InputLabel htmlFor="outlined-adornment-name">
                        First Name
                      </InputLabel>
                      <OutlinedInput
                        required
                        id="name"
                        sx={{ borderRadius: "1000px" }}
                        value={formik.values.firstname}
                        onChange={formik.handleChange("firstname")}
                        onBlur={() => handleFormBlur("firstname")}
                        type="text"
                        label="First Name"
                      />
                    </FormControl>

                    <FormControl
                      sx={{ m: 1, width: "28ch" }}
                      variant="outlined"
                      required
                    >
                      <InputLabel htmlFor="outlined-adornment-name">
                        Last Name
                      </InputLabel>
                      <OutlinedInput
                        required
                        sx={{ borderRadius: "1000px" }}
                        value={formik.values.lastname}
                        onChange={formik.handleChange("lastname")}
                        onBlur={() => handleFormBlur("lastname")}
                        type="text"
                        label="Last Name"
                      />
                    </FormControl>
                  </div>
                  {/* Email && Number*/}
                  <div className="flex flex-col items-center md:flex-row">
                    <FormControl
                      sx={{ m: 1, width: "28ch" }}
                      variant="outlined"
                      required
                    >
                      <InputLabel htmlFor="outlined-adornment-email">
                        Email
                      </InputLabel>
                      <OutlinedInput
                        disabled={
                          auth?.email_otp_verified?.email_otp_verified === 1
                        }
                        required
                        type="email"
                        name="email"
                        id="email"
                        autoComplete="on"
                        label="Email"
                        sx={{ borderRadius: "1000px" }}
                        value={formik.values.email}
                        onChange={formik.handleChange("email")}
                        onBlur={() => handleFormBlur("email")}
                        error={Boolean(formik.errors.email)}
                      />
                    </FormControl>

                    {/* Number Number */}
                    <FormControl
                      sx={{
                        m: 1,
                        width: "28ch",
                      }}
                    >
                      <PhoneInput
                        country={"in"}
                        inputStyle={{
                          width: "100%",
                          height: "9  0%",
                          background: "none",
                          borderRadius: "1000px",
                          border: "1px solid #C4C4C4",
                        }}
                        isValid={(value, country) => {
                          setCountry(country?.name);
                          setCountryCode(country?.countryCode);
                          if (value.length < 12) {
                            return false;
                          } else if (value.match(/12345/)) {
                            return (
                              "Invalid value: " + value + ", " + country?.name
                            );
                          } else if (value.match(/1234/)) {
                            return false;
                          } else {
                            return true;
                          }
                        }}
                        copyNumbersOnly={true}
                        showDropdown={false}
                        value={formik.values.phone}
                        onChange={(p) => formik.setFieldValue("phone", p)}
                        onBlur={formik.handleBlur("phone")}
                        error={Boolean(formik.errors.phone)}
                      />
                    </FormControl>
                  </div>

                  {/* Password && ConfirmPassword */}
                  <div className="flex flex-col items-center md:flex-row ">
                    <LightTooltip
                      placement="left"
                      arrow
                      title={
                        formik.errors.password ? (
                          <div className="hidden lg:flex w-100 text-base font-medium flex flex-col gap-2 ">
                            {formik.values.password.length < 6 ? (
                              <span className="flex ">
                                <LucideTrash className="mx-2 text-red-500" />
                                <span>
                                  Password must be at least 6 characters
                                </span>
                              </span>
                            ) : (
                              <span className="flex ">
                                <LucideCheck className="mx-2 text-green-500" />
                                <span>
                                  Password must be at least 6 characters
                                </span>
                              </span>
                            )}
                            {!formik.values.password.match(/\d/) ? (
                              <span className="flex ">
                                <LucideTrash className="mx-2 text-red-500" />
                                <span>Password must contain a number</span>
                              </span>
                            ) : (
                              <span className="flex ">
                                <LucideCheck className="mx-2 text-green-500" />
                                <span>Password must contain a number</span>
                              </span>
                            )}
                            {!formik.values.password.match(/[a-z]/) ? (
                              <span className="flex ">
                                <LucideTrash className="mx-2 text-red-500" />
                                <span>Password must contain a lowercase</span>
                              </span>
                            ) : (
                              <span className="flex ">
                                <LucideCheck className="mx-2 text-green-500" />
                                <span>Password must contain a lowercase</span>
                              </span>
                            )}
                            {!formik.values.password.match(/[A-Z]/) ? (
                              <span className="flex ">
                                <LucideTrash className="mx-2 text-red-500" />
                                <span>Password must contain a uppercase</span>
                              </span>
                            ) : (
                              <span className="flex ">
                                <LucideCheck className="mx-2 text-green-500" />
                                <span>Password must contain a uppercase</span>
                              </span>
                            )}
                            {!formik.values.password.match(
                              /[!@#$%^&*(),.?":{}|<>]/g
                            ) ? (
                              <span className="flex ">
                                <LucideTrash className="mx-2 text-red-500" />
                                <span>Password must contain a special</span>
                              </span>
                            ) : (
                              <span className="flex ">
                                <LucideCheck className="mx-2 text-green-500" />
                                <span>Password must contain a special</span>
                              </span>
                            )}
                          </div>
                        ) : (
                          formik.values.password?.length > 0 && (
                            <div className="w-64 text-base font-medium">
                              <span className="flex ">
                                <LucideCheckCheck className="mx-2 text-green-500" />
                                <span>Password is valid</span>
                              </span>
                            </div>
                          )
                        )
                      }
                    >
                      <FormControl
                        sx={{ m: 1, width: "28ch" }}
                        variant="outlined"
                        required
                      >
                        <InputLabel htmlFor="outlined-adornment-password">
                          Password
                        </InputLabel>
                        <OutlinedInput
                          sx={{
                            borderRadius: "1000px",
                          }}
                          value={formik.values.password}
                          onChange={formik.handleChange("password")}
                          onBlur={() => handleFormBlur("password")}
                          icon={<LucideLock />}
                          name="password"
                          autoComplete="on"
                          type={showPassword ? "text" : "password"}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showPassword ? (
                                  <LucideEye />
                                ) : (
                                  <LucideEyeOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                          label="Password"
                        />
                      </FormControl>
                    </LightTooltip>
                    {formik.values.password ? (
                      formik.errors.password ? (
                        <div className="lg:hidden p-3 w-100 text-sm font-medium flex flex-col gap-2 ">
                          {formik.values.password.length < 6 ? (
                            <span className="flex ">
                              <LucideTrash className="mx-2 text-red-500" />
                              <span>
                                Password must be at least 6 characters
                              </span>
                            </span>
                          ) : (
                            <span className="flex ">
                              <LucideCheck className="mx-2 text-green-500" />
                              <span>
                                Password must be at least 6 characters
                              </span>
                            </span>
                          )}
                          {!formik.values.password.match(/\d/) ? (
                            <span className="flex ">
                              <LucideTrash className="mx-2 text-red-500" />
                              <span>Password must contain a number</span>
                            </span>
                          ) : (
                            <span className="flex ">
                              <LucideCheck className="mx-2 text-green-500" />
                              <span>Password must contain a number</span>
                            </span>
                          )}
                          {!formik.values.password.match(/[a-z]/) ? (
                            <span className="flex ">
                              <LucideTrash className="mx-2 text-red-500" />
                              <span>Password must contain a lowercase</span>
                            </span>
                          ) : (
                            <span className="flex ">
                              <LucideCheck className="mx-2 text-green-500" />
                              <span>Password must contain a lowercase</span>
                            </span>
                          )}
                          {!formik.values.password.match(/[A-Z]/) ? (
                            <span className="flex ">
                              <LucideTrash className="mx-2 text-red-500" />
                              <span>Password must contain a uppercase</span>
                            </span>
                          ) : (
                            <span className="flex ">
                              <LucideCheck className="mx-2 text-green-500" />
                              <span>Password must contain a uppercase</span>
                            </span>
                          )}
                          {!formik.values.password.match(
                            /[!@#$%^&*(),.?":{}|<>]/g
                          ) ? (
                            <span className="flex ">
                              <LucideTrash className="mx-2 text-red-500" />
                              <span>Password must contain a special</span>
                            </span>
                          ) : (
                            <span className="flex ">
                              <LucideCheck className="mx-2 text-green-500" />
                              <span>Password must contain a special</span>
                            </span>
                          )}
                        </div>
                      ) : (
                        <div className=" lg:hidden w-64 text-base font-medium">
                          <span className="flex ">
                            <LucideCheckCheck className="mx-2 text-green-500" />
                            <span>Password is valid</span>
                          </span>
                        </div>
                      )
                    ) : null}
                    <br />
                    <FormControl
                      sx={{ m: 1, width: "28ch" }}
                      variant="outlined"
                      required
                    >
                      <InputLabel htmlFor="outlined-adornment-password">
                        Confirm Password
                      </InputLabel>
                      <OutlinedInput
                        sx={{
                          borderRadius: "1000px",
                        }}
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange("confirmPassword")}
                        onBlur={() => handleFormBlur("confirmPassword")}
                        icon={<LucideLock />}
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                      />
                    </FormControl>
                  </div>

                  {/* Referral Options */}
                  <div className="flex flex-col items-center md:flex-col">
                    <FormControl
                      sx={{ m: 1, width: "28ch" }}
                      variant="outlined"
                      // required
                    >
                      <InputLabel htmlFor="outlined-adornment-name">
                      Affiliate (Optional)
                      </InputLabel>
                      <OutlinedInput
                        // required
                        id="referral"
                        sx={{ borderRadius: "1000px" }}
                        value={referral}
                        onChange={(e) => {
                          handleReferralChange(e.target.value);
                        }}
                        onPaste={handlePaste}
                        // onBlur={() => handleFormBlur("firstname")}
                        type="text"
                        label="Affiliate Code"
                      />
                    </FormControl>

                    <div className="mt-0">
                      {referral && referralError?.errorMessage && (
                        <div
                          className={` font-bold py-2 ${
                            referralError?.status === true
                              ? "text-red-500"
                              : "text-green-500"
                          }`}
                        >
                          {referralError?.errorMessage}
                        </div>
                      )}
                    </div>

                    {/* <FormControl
                      sx={{ m: 1, width: "28ch" }}
                      variant="outlined"
                      required
                    >
                      <InputLabel htmlFor="outlined-adornment-name">
                        Last Name
                      </InputLabel>
                      <OutlinedInput
                        required
                        sx={{ borderRadius: "1000px" }}
                        value={formik.values.lastname}
                        onChange={formik.handleChange("lastname")}
                        onBlur={() => handleFormBlur("lastname")}
                        type="text"
                        label="Last Name"
                      />
                    </FormControl> */}
                  </div>
                  {/* Terms and Conditions */}
                  <FormControlLabel
                    sx={{ mb: 1 }}
                    control={
                      <Checkbox
                        checked={formik.values.terms}
                        onChange={formik.handleChange("terms")}
                        onBlur={() => handleFormBlur("terms")}
                        name="terms"
                        sx={{
                          color: "#6F9CEB",
                          "&.Mui-checked": {
                            color: "#6F9CEB",
                          },
                        }}
                      />
                    }
                    label={
                      <span className="text-sm text-left text-gray-400 ">
                        I agree to the{" "}
                        <Link to="/terms" className="text-blue-500">
                          Terms and Conditions
                        </Link>
                      </span>
                    }
                  />
                  <div className="mb-2 text-red-400">
                    {formik.touched.terms && formik.errors.terms}
                  </div>

                  <div className="flex items-center justify-center">
                    <LoadingButton
                      onClick={formik.handleSubmit}
                      variant="contained"
                      color="primary"
                      type="submit"
                      startIcon={<HowToRegIcon />}
                      loading={loading}
                      disabled={
                        formik.errors.email ||
                        formik.errors.password ||
                        formik.errors.confirmPassword ||
                        formik.errors.terms ||
                        formik.errors.phone ||
                        formik.errors.firstname ||
                        formik.errors.lastname
                      }
                      sx={{
                        bgcolor: "#2956A8",
                        color: "#fff",
                        mt: 2,
                        mb: 2,
                        py: 2,
                        width: "38ch",
                        borderRadius: "1000px",

                        "&[disabled]": {
                          backgroundColor: "#141B41",
                          color: "#fff",
                          opacity: 0.5,
                          cursor: "not-allowed",
                        },

                        "&:hover": {
                          backgroundColor: "#fff",
                          color: "#000",
                        },
                      }}
                    >
                      Sign Up
                    </LoadingButton>
                  </div>
                </div>
              </form>
              <Divider
                sx={{
                  m: 2,
                  width: "38ch",
                }}
              >
                or
              </Divider>
              <div className="flex flex-col items-center justify-between md:flex-row ">
                <Helmet>
                  <meta
                    http-equiv="Cross-Origin-Opener-Policy"
                    content="same-origin-allow-popups"
                  />
                </Helmet>
                <GoogleLogin
                  onSuccess={handleGoogleLoginSuccess}
                  onError={handleGoogleLoginFailure}
                  shape="pill"
                  width={"300px"}
                  text={"signup_with"}
                  cookiePolicy="single_host_origin"
                />
              </div>

              <div className="pt-5 font-Medium">
                Already registered?{" "}
                <Link
                  to="/auth/login"
                  className="p-2 text-blue141 hover:text-blue111"
                >
                  Login Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog
        TransitionComponent={Transition}
        open={open}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle
          id="scroll-dialog-title"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
          }}
        >
          <span>Please enter your phone number</span>
          <svg
            onClick={handleClose}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </DialogTitle>
        <DialogContent
          dividers={true}
          sx={{
            height: "40vh",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          {" "}
          {/* Number  */}
          <FormControl
            sx={{
              m: 1,
            }}
          >
            <PhoneInput
              country={"in"}
              inputStyle={{
                background: "none",
                borderRadius: "1000px",
                border: "1px solid #C4C4C4",
              }}
              isValid={(value, country) => {
                setCountry(country?.name);
                setCountryCode(country?.countryCode);
                if (value.length < 12) {
                  return false;
                } else if (value.match(/12345/)) {
                  return "Invalid value: " + value + ", " + country?.name;
                } else if (value.match(/1234/)) {
                  return false;
                } else {
                  return true;
                }
              }}
              copyNumbersOnly={true}
              showDropdown={false}
              value={number}
              onChange={(value, country) => {
                setGoogleData({
                  ...googleData,
                  number: value?.replace(countryCode, ""),
                });
              }}
              onBlur={formik.handleBlur("phone")}
              error={Boolean(formik.errors.phone)}
            />
          </FormControl>
          {/* Referral Options */}
          <div className="flex flex-col items-center md:flex-col">
            <FormControl
              sx={{ m: 1, width: "28ch" }}
              variant="outlined"
              // required
            >
              <InputLabel htmlFor="outlined-adornment-name">
              Affiliate (Optional)
              </InputLabel>
              <OutlinedInput
                // required
                id="referral"
                sx={{ borderRadius: "1000px" }}
                value={referral}
                onChange={(e) => {
                  handleReferralChange(e.target.value);
                }}
                onPaste={handlePaste}
                // onBlur={() => handleFormBlur("firstname")}
                type="text"
                label="Affiliate Code"
              />
            </FormControl>

            <div className="mt-0">
              {referral && referralError?.errorMessage && (
                <div
                  className={` font-bold py-2 ${
                    referralError?.status === true
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {referralError?.errorMessage}
                </div>
              )}
            </div>

            {/* <FormControl
                      sx={{ m: 1, width: "28ch" }}
                      variant="outlined"
                      required
                    >
                      <InputLabel htmlFor="outlined-adornment-name">
                        Last Name
                      </InputLabel>
                      <OutlinedInput
                        required
                        sx={{ borderRadius: "1000px" }}
                        value={formik.values.lastname}
                        onChange={formik.handleChange("lastname")}
                        onBlur={() => handleFormBlur("lastname")}
                        type="text"
                        label="Last Name"
                      />
                    </FormControl> */}
          </div>
          {/* Terms and Conditions */}
          <FormControlLabel
            sx={{ mb: 1 }}
            control={
              <Checkbox
                checked={formik.values.terms}
                onChange={formik.handleChange("terms")}
                onBlur={() => handleFormBlur("terms")}
                name="terms"
                sx={{
                  color: "#6F9CEB",
                  "&.Mui-checked": {
                    color: "#6F9CEB",
                  },
                }}
              />
            }
            label={
              <span className="text-sm text-left text-gray-400 ">
                I agree to the{" "}
                <Link to="/terms" className="text-blue-500">
                  Terms and Conditions
                </Link>
              </span>
            }
          />
          <div className="mb-2 text-red-400">
            {formik.touched.terms && formik.errors.terms}
          </div>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 2,
          }}
        >
          <LoadingButton
            onClick={handleGoogleSignUp}
            variant="contained"
            color="primary"
            sx={{
              bgcolor: "#2956A8",
              color: "#fff",
              py: 2,
              width: "38ch",
              borderRadius: "1000px",

              "&[disabled]": {
                backgroundColor: "#141B41",
                color: "#fff",
                opacity: 0.5,
                cursor: "not-allowed",
              },

              "&:hover": {
                backgroundColor: "#fff",
                color: "#000",
              },
            }}
            disabled={
              googleData?.number?.length >= 10 && formik.values.terms
                ? false
                : true
            }
          >
            Sign Up
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Signup;
