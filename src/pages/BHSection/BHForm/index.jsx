import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  setAllBHFormDetails,
  clearAllBHFormDetails,
} from "~/features/student/studentSlice";
import { useFormik } from "formik";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { format } from "date-fns";

import {
  LucideCheckCircle,
  LucideCircle,
  LucideLoader2,
  LucideTrash,
  LucideArrowRightCircle,
} from "lucide-react";
import { URL } from "~/utils/BaseURL";

//Deadline Imports
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";

//Upload Files Imports
import axios from "axios";
import LoadingButton from "@mui/lab/LoadingButton";
import { Helmet } from "react-helmet-async";

const MAX_COUNT = 10;
const MAX_SIZE = 10242880;
// const MAX_COUNT = 10;
// const MAX_SIZE = 5242880;

export default function BHForm() {
  const dispatch = useDispatch();
  const studentData = useSelector((state) => state.student.allBHFormDetails);

  const [date, setDate] = useState(studentData?.deadline || null);

  //Upload Files
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uniqueId, setUniqueId] = useState(null);
  const [fileLimit, setFileLimit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const relevantArray = ["IT", "CS", "Other"];

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

    //file upload issue fixed
    let uniqueIdLocal = JSON.parse(
      localStorage.getItem("assignment_files_random_number")
        ? localStorage.getItem("assignment_files_random_number")
        : uniqueId
    );

    let data = {
      bh_assignment: uploaded,
      submit: "submit",
      random_number: uniqueIdLocal ? uniqueIdLocal : uniqueId,
    };

    await axios
      .post(`${URL}/student/fileuploadsubmitassignmentbrainheaters.php`, data, {
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
          setAllBHFormDetails({
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
    console.log(file);
    let files = [...uploadedFiles];
    let index = files.findIndex((item) => item === filename);
    if (index === -1) {
      let previousFiles = studentData?.assignment_files
        ?.split("_$_")
        ?.filter((item) => item !== "")
        ?.filter((item) => item !== file)
        ?.join("_$_");

      dispatch(
        setAllBHFormDetails({
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

    dispatch(
      setAllBHFormDetails({
        assignment_files: previousFiles,
      })
    );
    fileInputRef.current.value = null;

    setUploadedFiles(files);
  };

  const [course, setCourse] = useState("");
  const [compFocus, setCompFocus] = useState({
    name: false,
    number: false,
    title: false,
  });

  const [errorFocus, setErrorFocus] = useState({
    name: false,
    number: false,
    title: false,
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      number: "",
      college_name: "",
      title: "",
      description: "",
      deadline: "",
      budget: "",
    },
    onSubmit: async (values) => {
      let isError = false;

      if (!values.name) {
        toast.error("Please Enter Your Name");

        setErrorFocus((prev) => ({ ...prev, name: true }));
        scrollTo(0, 0);
        isError = true;
      }

      if (!values.number || formik.values.number.length < 10) {
        toast.error("Please Enter Your Number");

        setErrorFocus((prev) => ({ ...prev, number: true }));

        scrollTo(0, 0);
        isError = true;
      }

      if (!values.title) {
        toast.error("Please Enter Assignment title");

        // titleRef.current.focus();
        setErrorFocus((prev) => ({ ...prev, title: true }));

        scrollTo(0, 0);
        isError = true;
      }
  
      if (isError) {
        return;
      }

      setLoadingSubmit(true);

      setErrorFocus((prev) => ({
        ...prev,
        title: false,
        name: false,
        number: false,
      }));

      let data = {
        ...values,
        course: course,
        assignment_files: studentData?.assignment_files,
        assignment_files_random_number:
          studentData?.assignment_files_random_number,
        submit: "submit",
      };

      await axios
        .post(`${URL}/student/submitassignmentbrainheaters.php`, data)
        .then((res) => {
          console.log(res);
          dispatch(clearAllBHFormDetails());
          toast.success(res.data.message);
          setLoadingSubmit(false);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          setLoadingSubmit(false);
          toast.error("Something went wrong");
        });
    },
  });

  const handleFocus = (fieldName) => {
    if (!formik.values[fieldName]) {
      setCompFocus((prev) => ({ ...prev, [fieldName]: true }));
    } else {
      setCompFocus((prev) => ({ ...prev, [fieldName]: false }));
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
      {" "}
      <Helmet>
        <title>BH Projects by Bluepen</title>
      </Helmet>
      <div className=" backdrop-blur-2xl drop-shadow shadow-2xl rounded-xl py-8 md:my-5 flex-col bg-white bg-opacity-20  max-w-[70rem] mt-8 mb-6 mx-auto flex   px-5 md:px-0  items-center">
        <p className="flex gap-2 text-[1.8rem] font-bold">
          BH Projects By <p className="text-blue141 linear-swipe">Bluepen</p>
        </p>
        <div className="flex flex-col items-center justify-center gap-2 md:flex-row">
          <div className=" py-5 max-w-[100rem] mx-auto flex md:flex-row flex-col px-5 md:px-0 justify-between items-center">
            <button className="flex-col max-w-sm px-0 md:px-10   border border-gray-200 rounded-xl shadow-2xl  backdrop-blur-3xl">
              <div className="p-4">
                <h5 className="mb-1 flex flex-col text-2xl font-bold tracking-tight text-gray-900 ">
                  <p>Post Your Requirement</p>
                </h5>
              </div>
            </button>
          </div>
        </div>

        <section id="personaldetails">
          <div className="flex flex-col md:w-[45rem] w-[20rem] mt-2 md:mt-5">
            <div className="flex flex-col items-center">
              {/* FirstName && LastName */}
              <div className="flex flex-col gap-6 items-center md:flex-row w-[100%]">
                <FormControl sx={{ width: "100%" }} variant="outlined" required>
                  <InputLabel htmlFor="outlined-adornment-name">
                    Name
                  </InputLabel>
                  <OutlinedInput
                    required
                    id="name"
                    value={formik.values.name}
                    onChange={formik.handleChange("name")}
                    onBlur={() => handleFormBlur("name")}
                    type="text"
                    label="Name"
                    error={
                      !formik.values.name && (errorFocus.name || compFocus.name)
                    }
                    sx={{
                      borderRadius: "20px",
                      borderColor:
                        !formik.values.name &&
                        (errorFocus.name || compFocus.name)
                          ? "red"
                          : "initial",
                    }}
                    onFocus={() => handleFocus("name")}
                  />
                </FormControl>

                <FormControl sx={{ width: "100%" }} variant="outlined" required>
                  <InputLabel htmlFor="outlined-adornment-name">
                    Number
                  </InputLabel>
                  <OutlinedInput
                    required
                    id="number"
                    value={formik.values.number}
                    onChange={(event) => {
                      let inputValue = event.target.value;

                      inputValue = inputValue.replace(/\D/g, "").slice(0, 10);

                      formik.handleChange("number")(inputValue);
                    }}
                    onBlur={() => handleFormBlur("number")}
                    type="text"
                    label="Number"
                    error={
                      formik.values.number.length < 10 &&
                      (errorFocus.number || compFocus.number)
                    }
                    sx={{
                      borderRadius: "20px",
                      borderColor:
                        formik.values.number.length < 10 &&
                        (errorFocus.number || compFocus.number)
                          ? "red"
                          : formik.values.number.length === 10
                          ? "blue"
                          : "initial",
                    }}
                    onFocus={() => handleFocus("number")}
                  />
                </FormControl>
              </div>

              <div className="flex flex-col items-center md:flex-row w-[100%]">
                <FormControl sx={{ mt: 3, width: "100%" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-name">
                    College Name
                  </InputLabel>
                  <OutlinedInput
                    required
                    id="college_name"
                    sx={{ borderRadius: "20px" }}
                    value={formik.values.college_name}
                    onChange={formik.handleChange("college_name")}
                    onBlur={() => handleFormBlur("college_name")}
                    type="text"
                    label="College Name"
                  />
                </FormControl>
              </div>
              <br />
            </div>
          </div>
        </section>
        <section id="projectdetails">
          <div className="flex flex-col md:w-[45rem] w-[20rem] gap-2">
            <FormControl sx={{ mt: 0 }} variant="outlined" required>
              <span className="text-lg ml-[3px] font-semibold text-gray-700">
                Course
              </span>
              <RadioGroup
                row
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={course}
                label="course"
                onChange={(e) => setCourse(e.target.value)}
              >
                {relevantArray?.map((copy, id) => (
                  <label
                    key={id}
                    className="flex items-center justify-center gap-2 px-3 py-2 mx-1 my-1 text-gray-900 border rounded-md cursor-pointer hover:border-gray-200 "
                  >
                    <FormControlLabel
                      value={copy}
                      label={copy}
                      control={<Radio checked={course === copy} />}
                    />
                  </label>
                ))}
              </RadioGroup>
            </FormControl>
            <FormControl
              variant="outlined"
              required
              sx={{
                marginTop: "1rem",
                width: "100%",
              }}
            >
              {" "}
              <InputLabel htmlFor="outlined-adornment-name">
                Project Title
              </InputLabel>
              <OutlinedInput
                value={formik.values.title}
                onChange={formik.handleChange("title")}
                onBlur={() => handleFormBlur("title")}
                type="text"
                id="title"
                name="title"
                placeholder="Enter the title of your Project"
                label="Project Title"
                error={
                  !formik.values.title && (errorFocus.title || compFocus.title)
                }
                sx={{
                  borderRadius: "20px",
                  borderColor:
                    !formik.values.title &&
                    (errorFocus.title || compFocus.title)
                      ? "red"
                      : "initial",
                }}
                onFocus={() => handleFocus("title")}
              />
            </FormControl>
            <FormControl
              variant="outlined"
              sx={{
                marginTop: "1rem",
                width: "100%",
              }}
            >
              {" "}
              <InputLabel htmlFor="outlined-adornment-name">
                Project Description
              </InputLabel>
              <OutlinedInput
                sx={{
                  borderRadius: "25px",
                }}
                value={formik.values.description}
                onChange={formik.handleChange("description")}
                onBlur={() => handleFormBlur("description")}
                multiline
                type="text"
                rows={5}
                cols={33}
                id="description"
                name="description"
                label="Project Description"
                placeholder=" Describe in more than 100 words about detailed requirements and what
            is to be done in the assignment."
              />
            </FormControl>

            <FormControl
              variant="outlined"
              sx={{
                marginTop: "1rem",
                width: "100%",
              }}
            >
              {" "}
              <InputLabel htmlFor="outlined-adornment-name">
                Project Budget
              </InputLabel>
              <OutlinedInput
                sx={{
                  borderRadius: "25px",
                }}
                value={formik?.values?.budget}
                onChange={(event) => {
                  let inputValue = event.target.value;
                  if (parseInt(inputValue, 10) <= 0) {
                    toast.error("Budget must be greater than 0");
                    inputValue = "";
                  }
                  formik.handleChange("budget")(inputValue);
                }}
                onBlur={() => handleFormBlur("budget")}
                type="number"
                id="budget"
                name="budget"
                placeholder="Enter the budget of your Project in INR"
                label="Project Budget"
              />
            </FormControl>

            <LocalizationProvider dateAdapter={AdapterMoment}>
              <MobileDateTimePicker
                label="Deadline for the Project"
                value={date}
                minDate={new Date()}
                onChange={(newValue) => {
                  const formattedDate = format(
                    new Date(newValue),
                    "yyyy-MM-dd HH:mm"
                  );
                  setDate(formattedDate);
                  formik.setFieldValue("deadline", formattedDate);
                }}
                renderInput={(params) => (
                  <FormControl
                    variant="outlined"
                    sx={{
                      marginTop: "1rem",
                      width: "100%",
                    }}
                  >
                    {" "}
                    <InputLabel htmlFor="outlined-adornment-name">
                      Deadline for the Project
                    </InputLabel>
                    <OutlinedInput
                      onBlur={() => handleFormBlur("deadline")}
                      sx={{
                        borderRadius: "25px",
                      }}
                      {...params}
                      placeholder="Select The Deadline of Project"
                      label="Deadline for the Project"
                    />
                  </FormControl>
                )}
              />
            </LocalizationProvider>
          </div>
        </section>

        {/* Project Details*/}
        <section id="uploadothers">
          <label className=" mt-4 mb-2 text-xl font-medium flex items-center justify-center">
            Upload Project guidelines (if any)
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
                            Upload Project guidelines and other related files
                            (Can upload max 10 files)
                          </p>
                        </p>
                        <p className="text-sm text-gray-500 ">
                          PDF, DOC, DOCX, ZIP ,etc up to 5MB each
                        </p>
                      </>
                    )}
                  </>
                  <input
                    multiple
                    id="dropzone-file"
                    type="file"
                    className="hidden"
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
          disabled={loading}
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
    </>
  );
}
