/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import LoadingButton from "@mui/lab/LoadingButton";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import {
  LucideLock,
  LucideEye,
  LucideEyeOff,
  LucideCheckCheck,
  LucideCheck,
  LucideTrash,
} from "lucide-react";
import styled from "@mui/material/styles/styled";

import { URL } from "~/utils/BaseURL";
import axios from "axios";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

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

//Form schema
const formSchema = Yup.object({
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
});

export default function ChangePassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const queryParams = new URLSearchParams(location.search);
  const et = queryParams.get("et");
  const item = queryParams.get("item");

  const [freelancerId, setFreelancerId] = useState(null);

  useEffect(() => {
    axios
      .post(`${URL}/freelancer/checksalt.php`, { et, item })
      .then((res) => {
        if (res.data.status === "success") {
          setFreelancerId(res.data.id);
        } else {
          console.log(res.data.message);
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //formik
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
      showPassword: false,
      showConfirmPassword: false,
    },
    onSubmit: async (values) => {
      // window.alert(JSON.stringify(values, null, 2));

      const data = {
        ...values,
        new_password: values.password,
        freelancer_id: freelancerId,
      };

      await axios
        .put(`${URL}/freelancer/updatepassword.php`, data)
        .then((res) => {
          console.log(res);
          if (res.data.status === "success") {
            toast.success(res.data.message);
            navigate("/");
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    validationSchema: formSchema,
  });

  console.log(formik.values);

  const handleClickShowPassword = (value) => {
    if (value === "showPassword") {
      formik.setFieldValue("showPassword", true);
    } else if (value === "showConfirmPassword") {
      formik.setFieldValue("showConfirmPassword", true);
    }
  };
  const handleMouseDownPassword = (value) => {
    if (value === "showPassword") {
      formik.setFieldValue("showPassword", false);
    } else if (value === "showConfirmPassword") {
      formik.setFieldValue("showConfirmPassword", false);
    }
  };

  const handleFormBlur = (fieldName) => {
    if (formik.errors[fieldName]) {
      toast.error(formik.errors[fieldName]);
      return;
    }
    formik.setFieldValue(fieldName, formik.values[fieldName]);
  };
  return (
    <>
      <div className="max-w-3xl py-10 mx-auto shadow-2xl backdrop-blur-2xl drop-shadow rounded-xl md:my-10">
        <div className="flex flex-col justify-center mx-auto text-center ">
          <div className="w-full ">
            <Typography
              align="center"
              variant="h3"
              fontWeight="bold"
              gutterBottom
            >
              Change Password
            </Typography>
            <div className="flex flex-col items-center">
              <form onSubmit={formik.handleSubmit}>
                {/* display err */}

                <div className="flex flex-col items-center md:flex-row ">
                  <div className="flex flex-col items-center ">
                    <LightTooltip
                      placement="left"
                      arrow
                      title={
                        formik.values.password ? (
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
                            <div className="w-64 text-base font-medium">
                              <span className="flex ">
                                <LucideCheckCheck className="mx-2 text-green-500" />
                                <span>Password is valid</span>
                              </span>
                            </div>
                          )
                        ) : null
                      }
                    >
                      <FormControl
                        sx={{ m: 1, width: "34ch" }}
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
                          type={
                            formik.values.showPassword ? "text" : "password"
                          }
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={() =>
                                  handleClickShowPassword("showPassword")
                                }
                                onMouseDown={() =>
                                  handleMouseDownPassword("showPassword")
                                }
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
                      sx={{ m: 1, width: "34ch" }}
                      variant="outlined"
                      required
                    >
                      <InputLabel htmlFor="outlined-adornment-password">
                        Confirm Password
                      </InputLabel>
                      <OutlinedInput
                        id="password"
                        sx={{
                          borderRadius: "1000px",
                        }}
                        autoComplete="on"
                        error={Boolean(formik.errors.confirmPassword)}
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange("confirmPassword")}
                        onBlur={() => handleFormBlur("confirmPassword")}
                        icon={<LucideLock />}
                        name="confirmPassword"
                        type={
                          formik.values.showConfirmPassword
                            ? "text"
                            : "password"
                        }
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() =>
                                handleClickShowPassword("showConfirmPassword")
                              }
                              onMouseDown={() =>
                                handleMouseDownPassword("showConfirmPassword")
                              }
                              edge="end"
                            >
                              {formik.values.showConfirmPassword ? (
                                <LucideEye />
                              ) : (
                                <LucideEyeOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Confirm Password"
                      />
                    </FormControl>
                  </div>
                </div>

                <LoadingButton
                  loading={loading}
                  disabled={
                    formik.errors.password || formik.errors.confirmPassword
                  }
                  onClick={formik.handleSubmit}
                  variant="contained"
                  color="primary"
                  type="submit"
                  startIcon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  }
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
                  Save
                </LoadingButton>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
