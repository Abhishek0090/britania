import React, { useState, useEffect, useRef, Suspense, lazy } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  setAllProfessionalDetails,
  clearAllProfessionalDetails,
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
import {
  LucideChevronRight,
  LucideCheckCircle,
  LucideCircle,
  LucideLoader2,
  LucideTrash,
  LucideArrowRightCircle,
} from "lucide-react";
import { URL } from "~/utils/BaseURL";
import { format } from "date-fns";

//Deadline Imports
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";

//Upload Files Imports
import axios from "axios";
import LoadingButton from "@mui/lab/LoadingButton";
import { Helmet } from "react-helmet-async";

const relevantType = [
  "Letter of Recommendation",
  "Statement of Purpose",
  "Resume / CV",
  "Cover Letter",
];

const MAX_COUNT = 10;
const MAX_SIZE = 5242880;

export default function Professional() {
  const dispatch = useDispatch();
  const studentData = useSelector(
    (state) => state.student.allProfessionalDetails
  );
  const [roles, setRoles] = useState([]);
  const [checkBoxes, setCheckBoxes] = useState(
    studentData?.assignment_type?.map((item) => item) || []
  );
  useEffect(() => {
    if (localStorage.getItem("Assignform")) {
      let form = JSON.parse(localStorage.getItem("Assignform"));
      setRoles(form[0].Step1);
    } else {
      console.log("no form found");
      navigate("/freelance");
    }
  }, [localStorage.getItem("Assignform")]);

  const [date, setDate] = useState(studentData?.deadline || null);

  //Upload Files
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uniqueId, setUniqueId] = useState(null);
  const [fileLimit, setFileLimit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const relevantLevelOther = ["Diploma", "Bachelors", "Masters", "PhD", "Job"];

  const relevantArray = relevantLevelOther;

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
      professional_assignment: uploaded,
      submit: "submit",
      random_number: uniqueIdLocal ? uniqueIdLocal : uniqueId,
    };

    await axios
      .post(
        `${URL}/student/fileuploadsubmitassignmentprofessionalwriting.php`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        setUniqueId(res?.data?.random_number);
        localStorage.setItem(
          "assignment_files_random_number",
          res?.data?.random_number
        );
        dispatch(
          setAllProfessionalDetails({
            assignment_files: res?.data?.file_name_string,
            assignment_files_random_number: res?.data?.random_number,
          })
        );
        console.log(res);
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
        setAllProfessionalDetails({
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
      setAllProfessionalDetails({
        assignment_files: previousFiles,
      })
    );
    fileInputRef.current.value = null;

    setUploadedFiles(files);
  };

  const [level, setLevel] = useState("");

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      assignment_type: [],
      description: "",
      deadline: "",
      budget: "",
    },
    onSubmit: async (values) => {
      let isError = false;

      if (values.assignment_type.length === 0) {
        toast.error("Please Select Assignment type");
        isError = true;
      }

      if (!values.description) {
        toast.error("Please Enter Assignment description");
        isError = true;
      }

      if (!values.deadline) {
        toast.error("Please Enter Deadline");
        isError = true;
      }

      if (!level) {
        toast.error("Please Select assignment level");
        isError = true;
      }

      if (!values.budget) {
        toast.error("Please Enter Assignment Budget");
        isError = true;
      }

      if (isError) {
        return;
      }

      setLoadingSubmit(true);

      let data = {
        ...values,
        level: level,
        user_id: JSON.parse(localStorage.getItem("id")) || 5,
        assignment_files: studentData?.assignment_files,
        assignment_files_random_number:
          studentData?.assignment_files_random_number,
        domain: "Freelancer Professional Writing",
        stream: "Professional Writing",
        submit: "submit",
      };

      await axios
        .post(`${URL}/student/submitassignmentprofessionalwriting.php`, data)
        .then((res) => {
          console.log(res);
          dispatch(clearAllProfessionalDetails());
          toast.success("Assignment Posted Successfully");
          setLoadingSubmit(false);
          navigate("/dashboard");
        })
        .catch((err) => {
          console.log(err);
          setLoadingSubmit(false);
          toast.error("Something went wrong");
        });
    },
  });

  useEffect(() => {
    formik.setFieldValue("assignment_type", checkBoxes);
  }, [checkBoxes]);

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
        <title>Professional Writing</title>
      </Helmet>
      <div className="backdrop-blur-2xl  drop-shadow shadow-2xl rounded-xl py-8 md:my-5 flex-col bg-white bg-opacity-20  max-w-[70rem] mt-8 mb-6 mx-auto flex   px-5 md:px-0  items-center">
        <div className="flex flex-col items-center justify-center gap-2 md:flex-row">
          <div className=" py-5 max-w-[100rem] mx-auto flex md:flex-row flex-col px-5 md:px-0 justify-between items-center">
            <button className="flex-col max-w-sm px-10 bg-white border border-gray-200 rounded-lg shadow-2xl  backdrop-blur-3xl">
              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                  {roles}
                </h5>
              </div>
            </button>
          </div>
        </div>

        <section id="generalothers">
          <label className="block mt-4 mb-2 text-center text-xl font-medium ">
            General Details Section
          </label>
          <div className="flex flex-col md:w-[45rem] w-[20rem]">
            <br />
            <span className="text-lg font-semibold text-gray-700">
              Assignment Type (Select Your Type)
            </span>
            <fieldset className="flex flex-wrap items-center justify-center w-full gap-3 py-8">
              {relevantType?.map((item, i) => {
                let isChecked = checkBoxes?.find((box) => box === item);
                let color = isChecked ? "blue141" : "gray-900";
                return (
                  <div key={i}>
                    <input
                      type="checkbox"
                      name={item}
                      value={item}
                      id={item}
                      className="peer hidden  "
                      onChange={(e) => {
                        if (e.target.checked) {
                          setCheckBoxes([...checkBoxes, e.target.value]);
                          formik.setFieldValue("assignment_type", [
                            ...checkBoxes,
                            e.target.value,
                          ]);
                        } else {
                          setCheckBoxes(
                            checkBoxes.filter((box) => box !== e.target.value)
                          );
                          formik.setFieldValue(
                            "assignment_type",
                            checkBoxes.filter((box) => box !== e.target.value)
                          );
                        }
                      }}
                    />

                    <label
                      htmlFor={item}
                      className={`flex items-center justify-center gap-2 px-3 py-2 text-${color} border border-gray-100 rounded-md cursor-pointer hover:border-gray-200 ${
                        isChecked
                          ? ` border-${color}  bg-${color}  text-white`
                          : ""
                      }`}
                    >
                      {isChecked ? (
                        <LucideCheckCircle size={20} />
                      ) : (
                        <LucideCircle size={20} />
                      )}
                      <p className="text-sm font-medium">{item}</p>
                    </label>
                  </div>
                );
              })}
            </fieldset>
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
                Assignment Description
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
                label="Assignment Description"
                placeholder=" Describe in more than 100 words about detailed requirements and what
            is to be done in the assignment."
              />
            </FormControl>
            <FormControl sx={{ mt: 5 }} variant="outlined" required>
              <span className="text-lg font-semibold text-gray-700">
                Level of Assignment
              </span>
              <RadioGroup
                row
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={level}
                label="Level of Assignment"
                onChange={(e) => setLevel(e.target.value)}
              >
                {relevantArray?.map((copy, id) => (
                  <label
                    key={id}
                    className="flex items-center justify-center gap-2 px-3 py-2 mx-1 my-1 text-gray-900 border rounded-md cursor-pointer hover:border-gray-200 "
                  >
                    <FormControlLabel
                      value={copy}
                      label={copy}
                      control={<Radio checked={level === copy} />}
                    />
                  </label>
                ))}
              </RadioGroup>
            </FormControl>
          </div>
        </section>
        <section id="deadlineothers">
          <label className="block mt-4 mb-2 text-xl text-center font-medium ">
            Deadline and Budget Section
          </label>

          <div className="flex flex-col md:w-[45rem] w-[20rem]">
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
                Assignment Budget
              </InputLabel>
              <OutlinedInput
                sx={{
                  borderRadius: "25px",
                }}
                value={formik?.values?.budget}
                onChange={formik.handleChange("budget")}
                onBlur={() => handleFormBlur("budget")}
                type="number"
                id="budget"
                name="budget"
                placeholder="Enter the budget of your Assignment in INR"
                label="Assignment Budget"
              />
            </FormControl>

            <LocalizationProvider dateAdapter={AdapterMoment}>
              <MobileDateTimePicker
                label="Deadline for the assignment"
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
                    required
                    sx={{
                      marginTop: "3rem",
                      width: "100%",
                    }}
                  >
                    {" "}
                    <InputLabel htmlFor="outlined-adornment-name">
                      Deadline for the assignment
                    </InputLabel>
                    <OutlinedInput
                      onBlur={() => handleFormBlur("deadline")}
                      sx={{
                        borderRadius: "25px",
                      }}
                      {...params}
                      placeholder="Select Deadline of Assignment"
                      label="Deadline for the assignment"
                    />
                  </FormControl>
                )}
              />
            </LocalizationProvider>
          </div>
        </section>
        <section id="uploadothers">
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
                            Upload assignment guidelines and other related files
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
          Submit
        </LoadingButton>
      </div>
    </>
  );
}
