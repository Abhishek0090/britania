/* eslint-disable no-undef */
import React, { useState, forwardRef } from "react";
import { Helmet } from "react-helmet-async";
import jwtDecode from "jwt-decode";
import Marketing from "~/utils/Marketing";
import { useLoginMutation } from "~/features/auth/authApiSlice";
import { setCredentials } from "~/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";
import Divider from "@mui/material/Divider";
import { Dialog } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { LucideLock, LucideEye, LucideEyeOff, CloudCog } from "lucide-react";
import LoadingButton from "@mui/lab/LoadingButton";
import LoginIcon from "@mui/icons-material/Login";
import RPI from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { useGoogleCombineSignMutation } from "~/features/auth/authApiSlice";
import { GoogleLogin } from "react-oauth-google";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const PhoneInput = RPI.default ? RPI.default : RPI;
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

//Form schema
const formSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("You forgot to enter your password"),
});

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [loginIn] = useLoginMutation();
  const [googleCombineSign] = useGoogleCombineSignMutation();
  const [country, setCountry] = useState("India");
  const [countryCode, setCountryCode] = useState("91");
  const [googleData, setGoogleData] = useState(null);
  const [number, setNumber] = useState("");

  const [referral, setReferral] = useState("");
  const [referralError, setReferralError] = useState({
    errorMessage: "",
    status: false,
  });

  console.log(referral, "SFNKDSNK");

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
        email: values?.email,
        password: values?.password,
      };

      loginIn(data)
        .unwrap()
        .then((res) => {
          if (res?.status === 200) {
            toast.success(res?.message);
            dispatch(setCredentials(res));
            setLoading(false);
            navigate("/dashboard");
          } else {
            setLoading(false);
            toast.error(res?.message);
          }
        })
        .catch((err) => {
          setLoading(false);
          toast.error(err?.message);
        });
    },
    validationSchema: formSchema,
  });

  const handleGoogleLoginSuccess = async (res) => {
    let userObject = res?.credential;
    if (userObject) {
      try {
        const userData = jwtDecode(userObject);
        const data = {
          firstname: userData.given_name,
          lastname: userData.family_name || "",
          email: userData.email,
          number: number,
          country_name: country,
          country_code: countryCode,
          affiliate_code: referral,
        };
        setGoogleData(data);

        await googleCombineSign(data)
          .unwrap()
          .then((res) => {
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

  const handleGoogleSignUp = async () => {
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
          if (res?.status === 200) {
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

  const handleClickShowPassword = () => {
    formik.setFieldValue("showPassword", true);
  };
  const handleMouseDownPassword = () => {
    formik.setFieldValue("showPassword", false);
  };

  return (
    <>
      <Helmet>
        <title>Login Student | Bluepen</title>
      </Helmet>
      <Marketing pageName="Login" />
      <Container
        maxWidth="sm"
        className="py-10 shadow-2xl backdrop-blur-3xl drop-shadow-2xl rounded-xl md:my-20"
      >
        <div className="flex flex-col justify-center mx-4 text-center ">
          <div className="flex flex-wrap items-center -mx-4">
            <div className="w-full ">
              <Typography
                align="center"
                variant="h3"
                fontWeight="bold"
                gutterBottom
              >
                Login
              </Typography>
              <form onSubmit={formik.handleSubmit}>
                {/* display err */}

                <FormControl
                  sx={{ m: 1, width: "34ch" }}
                  variant="outlined"
                  required
                >
                  <InputLabel htmlFor="outlined-adornment-email">
                    Email
                  </InputLabel>
                  <OutlinedInput
                    error={Boolean(formik.errors.email)}
                    required
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="on"
                    label="Email"
                    sx={{ borderRadius: "1000px" }}
                    value={formik.values.email}
                    onChange={formik.handleChange("email")}
                    onBlur={formik.handleBlur("email")}
                  />
                </FormControl>
                <FormControl
                  sx={{ m: 1, width: "34ch" }}
                  variant="outlined"
                  required
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="password"
                    sx={{
                      borderRadius: "1000px",
                    }}
                    autoComplete="on"
                    error={Boolean(formik.errors.password)}
                    value={formik.values.password}
                    onChange={formik.handleChange("password")}
                    onBlur={formik.handleBlur("password")}
                    icon={<LucideLock />}
                    name="password"
                    type={formik.values.showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {formik.values.showPassword ? (
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
                <LoadingButton
                  loading={loading}
                  variant="contained"
                  color="primary"
                  type="submit"
                  startIcon={<LoginIcon />}
                  sx={{
                    bgcolor: "#2956A8",
                    color: "#fff",
                    mt: 2,
                    py: 2,
                    width: "38ch",
                    borderRadius: "1000px",

                    "&:hover": {
                      backgroundColor: "#fff",
                      color: "#000",
                    },
                  }}
                >
                  Login
                </LoadingButton>
              </form>
              <Divider
                sx={{
                  m: 3,
                }}
              >
                Or
              </Divider>
              <div className="flex flex-col items-center justify-center max-w-2xl mx-auto mb-3">
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

              <div className="p-2 font-medium">
                Don't have an account ?
                <Link
                  to="/auth/signup"
                  className="p-2 font-medium text-blue141 hover:text-blue111"
                >
                  Sign Up
                </Link>
              </div>

              <div className="p-2 mt-2">
                <Link
                  to="/auth/forgot-password-user"
                  className="font-medium text-blue141 hover:text-blue111"
                >
                  Forgot Password ?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
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

export default Login;
