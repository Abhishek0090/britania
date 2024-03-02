/* eslint-disable no-undef */
import { useState, useEffect, forwardRef, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { selectAuth } from "~/features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useCreateStudentMutation } from "~/features/auth/authApiSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import LoadingButton from "@mui/lab/LoadingButton";
import * as Yup from "yup";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import RPI from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import axios from "axios";
import { URL } from "~/utils/BaseURL";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const PhoneInput = RPI.default ? RPI.default : RPI;

//TODO:Form schema
// const regexName = / ^[a-zA-Z0-9, ]+$/;
const formSchema = Yup.object({
  firstname: Yup.string().required("Please enter your first name"),

  lastname: Yup.string().required("Please enter your last name"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Your email address is required"),
  university: Yup.string().required("Please enter your university"),
  course: Yup.string().required("Please enter your course"),
  creator: Yup.string().required("Please enter Creator name"),
});

function CreateStudent() {
  const auth = useSelector(selectAuth);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState("India");
  const [countryCode, setCountryCode] = useState("91");

  //TODO: Signup Mutation and Google Signup Mutation
  const [createStudent] = useCreateStudentMutation();

  //TODO: Formik validation and Schema validation and submit handler
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      university: "",
      course: "",
      country_name: "",
      creator: auth.teamData.id,
    },
    onSubmit: (values, action) => {
      setLoading(true);
      const data = {
        ...values,
        firstname: values?.firstname,
        lastname: values?.lastname,
        email: values?.email,
        university: values?.university,
        course: values?.course,
        country_name: country,
        country_code: countryCode,
        number: values?.phone?.replace(countryCode, ""),
      };

      axios
        .post(`${URL}/team/createuseraccount.php`, data)
        .then((res) => {
          console.log(res?.data);
          if (res?.data.status === "success") {
            toast.success(res?.message);
            action.resetForm();
            navigate("/team/management/student/assignment/assign-submit");
          }
          if (res?.data.status === "error") {
            if (res?.data.message === "Email already registered") {
              formik.setFieldValue("email", "");
            }
            toast.error(res?.data.message);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.log("err", err);
          setLoading(false);
          toast.error("Account creation failed");
        });
    },
    validationSchema: formSchema,
  });

  //TODO: Formik Blur function to show error toast

  const handleFormBlur = (fieldName) => {
    if (formik.errors[fieldName]) {
      toast.error(formik.errors[fieldName]);
      return;
    }
    formik.setFieldValue(fieldName, formik.values[fieldName]);
  };

  return (
    <>
      <Helmet>
        <title>Create User | Bluepen</title>
      </Helmet>
      <div className="max-w-2xl py-10 mx-auto shadow-2xl   bg-white bg-opacity-20 drop-shadow-2xl rounded-xl md:my-10 ">
        <div className="flex flex-col px-10 rounded-lg ">
          {/* Progress Bar */}
          {/* <StepperComp progress={progress} /> */}
          <div className="p-5">
            <h5 className="mb-2 text-center text-4xl pb-10 font-bold tracking-tight  text-white-500 ">
              Create User
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
                      <InputLabel
                        htmlFor="outlined-adornment-name"
                        className="text-white-900"
                      >
                        First Name
                      </InputLabel>
                      <OutlinedInput
                        required
                        id="name"
                        sx={{ borderRadius: "1000px" }}
                        className="text-white-900"
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
                      <InputLabel
                        htmlFor="outlined-adornment-name"
                        className="text-white-900"
                      >
                        Last Name
                      </InputLabel>
                      <OutlinedInput
                        required
                        sx={{ borderRadius: "1000px" }}
                        value={formik.values.lastname}
                        className="text-white-900"
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
                      <InputLabel
                        htmlFor="outlined-adornment-email"
                        className="text-white-900"
                      >
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
                        className="text-white-900"
                        value={formik.values.email}
                        onChange={formik.handleChange("email")}
                        onBlur={() => handleFormBlur("email")}
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
                          color: "#e5e7eb",
                        }}
                        isValid={(value, country) => {
                          setCountry(country?.name);
                          setCountryCode(country?.countryCode);
                          if (value.length < 10) {
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

                  <div className="flex flex-col items-center md:flex-row">
                    <FormControl
                      sx={{ m: 1, width: "28ch" }}
                      variant="outlined"
                      required
                    >
                      <InputLabel
                        htmlFor="outlined-adornment-name"
                        className="text-white-900"
                      >
                        University
                      </InputLabel>
                      <OutlinedInput
                        required
                        id="university"
                        sx={{ borderRadius: "1000px" }}
                        className="text-white-900"
                        value={formik.values.university}
                        onChange={formik.handleChange("university")}
                        onBlur={() => handleFormBlur("university")}
                        type="text"
                        label="First Name"
                      />
                    </FormControl>

                    <FormControl
                      sx={{ m: 1, width: "28ch" }}
                      variant="outlined"
                      required
                    >
                      <InputLabel
                        htmlFor="outlined-adornment-name"
                        className="text-white-900"
                      >
                        Course
                      </InputLabel>
                      <OutlinedInput
                        required
                        sx={{ borderRadius: "1000px" }}
                        value={formik.values.course}
                        className="text-white-900"
                        onChange={formik.handleChange("course")}
                        onBlur={() => handleFormBlur("course")}
                        type="text"
                        label="Course"
                      />
                    </FormControl>
                  </div>

                  <div className="flex flex-col items-center md:flex-row "></div>

                  <div className="flex items-center justify-center">
                    <LoadingButton
                      onClick={formik.handleSubmit}
                      variant="contained"
                      className="bg-[#141B41]"
                      type="submit"
                      startIcon={<HowToRegIcon />}
                      loading={loading}
                      disabled={
                        !formik.values.email ||
                        !formik.values.phone ||
                        !formik.values.firstname ||
                        !formik.values.university ||
                        !formik.values.course ||
                        !formik.values.lastname
                      }
                      sx={{
                        color: "#fff",
                        mt: 2,
                        mb: 2,
                        py: 2,
                        width: "38ch",
                        borderRadius: "1000px",

                        "&[disabled]": {
                          backgroundColor: "gray",
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
                      Create
                    </LoadingButton>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateStudent;
