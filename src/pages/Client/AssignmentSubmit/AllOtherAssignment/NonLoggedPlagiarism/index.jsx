/* eslint-disable no-undef */
import React, { useState,useLayoutEffect, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { setAllNonLoggedPlagiarismDetails } from "~/features/student/studentSlice";
import { useFormik } from "formik";
import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import {
  LucideLoader2,
  LucideTrash,
  LucideArrowRightCircle,
} from "lucide-react";
import { URL } from "~/utils/BaseURL";
import { selectAuth } from "~/features/auth/authSlice";

//Upload Files Imports
import axios from "axios";
import LoadingButton from "@mui/lab/LoadingButton";
import { Helmet } from "react-helmet-async";

import RPI from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const PhoneInput = RPI.default ? RPI.default : RPI;
const MAX_COUNT = 10;
const MAX_SIZE = 10242880;

const formSchema = Yup.object({
  name: Yup.string().required("Please enter your  name"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Your email address is required"),
});

export default function NonLoggedPlagiarism() {
  const auth = useSelector(selectAuth);

  const dispatch = useDispatch();
  const studentData = useSelector(
    (state) => state.student.allNonLoggedPlagiarismDetails
  );
  const [country, setCountry] = useState("India");
  const [countryCode, setCountryCode] = useState("91");
  const [number, setNumber] = useState("");

  //Upload Files
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadedFilesName, setUploadedFilesName] = useState([]);
  const [uniqueId, setUniqueId] = useState(null);
  const [fileLimit, setFileLimit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleUploadFiles = async (files) => {
    let uploaded = [...uploadedFiles];
    let limitExceeded = false;
    setLoading(true);
    files.forEach((file) => {
      if (uploaded.length < MAX_COUNT) {
        if (file.size > MAX_SIZE) {
          toast.error("File size is too large");
          setLoading(false);
          return;
        }

        uploaded.push(file);
      } else {
        limitExceeded = true;
        toast.error("You can upload maximum 10 files");
        setLoading(false);
      }
    });
    setUploadedFiles(uploaded);
    const newFilesName = uploaded.map((item) => item.name);

    // Check for duplicate names
    const uniqueFilesName = Array.from(
      new Set([...uploadedFilesName, ...newFilesName])
    );

    setUploadedFilesName(uniqueFilesName);
    
    //file upload issue fixed
    let uniqueIdLocal = JSON.parse(
      localStorage.getItem("assignment_files_random_number")
        ? localStorage.getItem("assignment_files_random_number")
        : uniqueId
    );

    let data = {
      plagiarism_assignment: uploaded,
      submit: "submit",
      random_number: uniqueIdLocal ? uniqueIdLocal : uniqueId,
    };

    await axios
      .post(`${URL}/student/fileuploadsubmitassignmentplagcheck.php`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setUniqueId(res?.data?.random_number);
        console.log(res);
        localStorage.setItem(
          "assignment_files_random_number",
          res?.data?.random_number
        );
        dispatch(
          setAllNonLoggedPlagiarismDetails({
            assignment_files: res?.data?.file_name_string,
            assignment_files_random_number: res?.data?.random_number,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);

    if (limitExceeded) {
      setFileLimit(true);
    } else {
      setFileLimit(false);
    }
  };

  const handleDeleteFile = (file) => {
    let uniqueIdLocal = JSON.parse(
      localStorage.getItem("assignment_files_random_number")
        ? localStorage.getItem("assignment_files_random_number")
        : uniqueId
    );

    let filename = file.split(`${uniqueIdLocal}`)[1];

    let files = [...uploadedFiles];
    let index = files.findIndex((item) => item === filename);
    if (index === -1) {
      let previousFiles = studentData?.assignment_files
        ?.split("_$_")
        ?.filter((item) => item !== "")
        ?.filter((item) => item !== file)
        ?.join("_$_");

      dispatch(
        setAllNonLoggedPlagiarismDetails({
          assignment_files: previousFiles,
        })
      );
    }
    files.splice(index, 1);

    let previousFiles = studentData?.assignment_files
      ?.split("_$_")
      ?.filter((item) => item !== "")
      ?.filter((item) => item !== file)
      ?.join("_$_");

    const filterPrev = previousFiles
      .split("_$_")
      .filter((item) => item !== "")
      .map((item) => item.replace(/^\d+/, ""))
      .join("_$_");

    const newArray = [].concat(filterPrev);

    setUploadedFilesName(newArray);

    dispatch(
      setAllNonLoggedPlagiarismDetails({
        assignment_files: previousFiles,
      })
    );
    fileInputRef.current.value = null;

    setUploadedFiles(files);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      email: "",
      number: "",
      country_name: country,
      country_code: countryCode,
    },
    onSubmit: async (values) => {
      if (!studentData.assignment_files) {
        toast.error("Please Upload A File Also");
        return;
      }

      setLoadingSubmit(true);

      const data = {
        ...values,
        name: values?.name,
        email: values?.email,
        country_name: country,
        country_code: countryCode,
        number: values?.phone?.replace(countryCode, ""),
        assignment_files: studentData?.assignment_files,
        assignment_files_random_number:
          studentData?.assignment_files_random_number,
        domain: "Plag Check",
        submit: "submit",
      };

      await axios
        .post(`${URL}/student/submitassignmentplagcheck.php`, data)
        .then((res) => {
          dispatch(
            setAllNonLoggedPlagiarismDetails({
              ...studentData,
              assignment_array: uploadedFilesName,
              name: res?.data.data.name,
              assignment_id: res.data.id,
              assignment_files: null,
              assignment_files_random_number: null,
              number_of_files: res.data.number_of_files,
              price: res.data.price,
              amount: res.data.amount,
            })
          );

          navigate("/submit/checkplagiarism/checkout");
          setLoadingSubmit(false);
          //   navigate("/");
        })
        .catch((err) => {
          console.log(err);
          setLoadingSubmit(false);
          toast.error("Something went wrong");
        });
    },
    validationSchema: formSchema,
  });

  const handleFormBlur = (fieldName) => {
    if (formik.errors[fieldName]) {
      toast.error(formik.errors[fieldName]);
      return;
    }

    formik.setFieldValue(fieldName, formik.values[fieldName]);
  };

  console.log(number);

  useEffect(() => {
    if (auth?.id) {
      navigate("/submit/plagiarism-check", { replace: true });
    }
  }, []);

  return (
    <>
      {" "}
      <Helmet>
        <title>Check Plagiarism</title>
      </Helmet>
      <form onSubmit={formik.handleSubmit}>
        <div className=" backdrop-blur-2xl drop-shadow shadow-2xl rounded-xl py-8 md:my-5 flex-col bg-white bg-opacity-20  max-w-[70rem] mt-8 mb-6 mx-auto flex   px-5 md:px-0  items-center">
          <div className="flex flex-col items-center justify-center gap-2 md:flex-row">
            <div className=" py-5 max-w-[100rem] mx-auto flex md:flex-row flex-col px-5 md:px-0 justify-between items-center">
              <button className="flex-col max-w-sm px-10 bg-white border border-gray-200 rounded-lg shadow-2xl  backdrop-blur-3xl">
                <div className="p-5">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                    Check Plagiarism
                  </h5>
                </div>
              </button>
            </div>
          </div>

          <section id="generalothers">
            <label className=" mt-4 mb-5 text-xl font-medium flex text-center items-center justify-center">
              Note : We Will Use Turnitin to Check Plagiarism Each File Will
              Cost ₹ 200
            </label>
            <div className="flex flex-col md:w-[45rem] w-full mt-5">
              <br />
              <div className="flex flex-col items-center">
                {/* FirstName && LastName */}
                <div className="flex flex-col items-center md:flex-row w-[100%]">
                  <FormControl
                    sx={{ m: 1, width: "100%" }}
                    variant="outlined"
                    required
                  >
                    <InputLabel htmlFor="outlined-adornment-name">
                      Name
                    </InputLabel>
                    <OutlinedInput
                      required
                      id="name"
                      sx={{ borderRadius: "20px" }}
                      value={formik.values.name}
                      onChange={formik.handleChange("name")}
                      onBlur={() => handleFormBlur("name")}
                      type="text"
                      label="Name"
                    />
                  </FormControl>
                </div>
                <br />
                <div className="flex flex-col items-center md:flex-row w-[100%]">
                  <FormControl
                    sx={{ m: 1, width: "100%" }}
                    variant="outlined"
                    required
                  >
                    <InputLabel htmlFor="outlined-adornment-email">
                      Email
                    </InputLabel>
                    <OutlinedInput
                      required
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="on"
                      label="Email"
                      sx={{ borderRadius: "20px" }}
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
                      width: "100%",
                    }}
                  >
                    <PhoneInput
                      country={"in"}
                      inputStyle={{
                        width: "100%",
                        height: "9  0%",
                        background: "none",
                        borderRadius: "20px",
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
                      onChange={(p) => {
                        formik.setFieldValue("phone", p);

                        setNumber(p);
                      }}
                      onBlur={formik.handleBlur("phone")}
                      error={Boolean(formik.errors.phone)}
                    />
                  </FormControl>
                </div>
              </div>
            </div>
          </section>
          <section id="plagerismcheck">
            <label className=" mt-4 mb-2 text-xl font-medium flex items-center justify-center">
              Upload assignment guidelines
            </label>
            <div className="flex flex-col gap-2 md:w-[45rem] w-[20rem] items-center justify-center mt-4 mb-2">
              {uploadedFiles?.length > MAX_COUNT ? null : (
                <div className="flex items-center justify-center w-full pb-2 ">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed  cursor-pointer  dark:hover:bg-bray-800 hover:bg-gray-100 bg-white rounded-xl shadow-lg  bg-opacity-20 backdrop-blur-lg drop-shadow-lg"
                  >
                    <>
                      {loading ? (
                        <div
                          role="status"
                          className="flex items-center justify-center gap-2"
                        >
                          <LucideLoader2 size={20} className="animate-spin" />
                          <span className="capitalize">Please wait...</span>
                        </div>
                      ) : (
                        <>
                          <svg
                            aria-hidden="true"
                            className="w-10 h-10 mb-3 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            ></path>
                          </svg>
                          <p className="mb-2 text-md text-gray-500 ">
                            <p className="font-semibold text-center px-5 md:px-2">
                              Upload assignment guidelines and other related
                              files (Can upload max 10 files)
                            </p>
                          </p>
                          <p className="text-sm text-gray-500 ">
                            DOC, DOCX, etc up to 10MB each
                          </p>
                        </>
                      )}
                    </>
                    <input
                      multiple
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      accept=".doc, .docx"
                      ref={fileInputRef}
                      onChange={(e) => {
                        let files = [...e.target.files];
                        if (files?.length > MAX_COUNT) {
                          // console.log('files :>> ', files);
                          toast.error(`You can upload only ${MAX_COUNT} files`);
                          return;
                        }
                        if (files?.length + uploadedFiles?.length > MAX_COUNT) {
                          toast.error(`You can upload only ${MAX_COUNT} files`);
                          return;
                        }

                        const unsupportedFiles = files.filter(
                          (file) => !file.name.match(/\.(doc|docx)$/i)
                        );
                        if (unsupportedFiles.length > 0) {
                          toast.error(
                            `Unsupported file type(s): ${unsupportedFiles
                              .map((file) => file.name)
                              .join(", ")}`
                          );
                          return;
                        }
                        handleUploadFiles(files);
                      }}
                    />
                  </label>
                </div>
              )}
              {studentData?.assignment_files
                ?.split("_$_")
                ?.filter((item) => item !== "")
                ?.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center  justify-between w-full bg-gray-200 text-gray-800 px-2 rounded-lg my-0.5"
                  >
                    <span className="p-1 rounded-lg ">
                      {index + 1}.{" "}
                      {file?.replace(
                        studentData?.assignment_files_random_number,
                        ""
                      )}
                    </span>
                    <button
                      onClick={() => {
                        handleDeleteFile(file);
                      }}
                      className="m-1 leading-none text-white  rounded-full hover:text-gray-100"
                    >
                      <LucideTrash color="red" size={20} />
                    </button>
                  </div>
                ))}
            </div>
          </section>

          <LoadingButton
            loading={loadingSubmit}
            onClick={formik.handleSubmit}
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading || formik.errors.email}
            endIcon={<LucideArrowRightCircle />}
            sx={{
              bgcolor: "#2956A8",
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
            Assign
          </LoadingButton>
        </div>
      </form>
    </>
  );
}
