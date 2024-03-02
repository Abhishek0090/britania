import React, { useState, useEffect, useRef, Suspense, lazy } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  setAllProgrammingDetails,
  clearAllProgrammingDetails,
} from "~/features/student/studentSlice";
import { useFormik } from "formik";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import {
  LucideChevronRight,
  LucideCheckCircle,
  LucideCircle,
  LucideLoader2,
  LucideTrash,
  LucideArrowRightCircle,
} from "lucide-react";
import { selectAuth } from "~/features/auth/authSlice";
import { URL } from "~/utils/BaseURL";

//Deadline Imports
import moment from "moment";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";

//Upload Files Imports
import axios from "axios";
import LoadingButton from "@mui/lab/LoadingButton";
import { Helmet } from "react-helmet-async";

const MAX_COUNT = 10;
const MAX_SIZE = 5242880;

const relevantCheckboxes = ["Software", "Hardware"];

export default function Programming() {
  const dispatch = useDispatch();
  const studentData = useSelector(
    (state) => state.student.allProgrammingDetails
  );

  const auth = useSelector(selectAuth);
  const [roles, setRoles] = useState([]);
  const [checkBoxes, setCheckBoxes] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("Assignform")) {
      let form = JSON.parse(localStorage.getItem("Assignform"));
      setRoles(form[0].Step1);
      console.log(form[0].Step1);
    } else {
      console.log("no form found");
      navigate("/freelance");
    }
  }, [localStorage.getItem("Assignform")]);

  const [date, setDate] = useState(null);

  //Upload Files
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uniqueId, setUniqueId] = useState(null);
  const [fileLimit, setFileLimit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const relevantLevelOfAssignment = ["Diploma", "Bachelors", "Masters", "PhD"];

  const relevantArray = relevantLevelOfAssignment;

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

    let uniqueIdLocal = JSON.parse(
      localStorage.getItem("assignment_files_random_number")
        ? localStorage.getItem("assignment_files_random_number")
        : uniqueId
    );

    let data = {
      programming_assignment: uploaded,
      submit: "submit",
      random_number: uniqueIdLocal ? uniqueIdLocal : uniqueId,
    };

    await axios
      .post(`${URL}/student/fileuploadsubmitassignmentprgoramming.php`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setUniqueId(res?.data?.random_number);
        localStorage.setItem(
          "assignment_files_random_number",
          res?.data?.random_number
        );
        dispatch(
          setAllProgrammingDetails({
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
        setAllProgrammingDetails({
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
      setAllProgrammingDetails({
        assignment_files: previousFiles,
      })
    );
    fileInputRef.current.value = null;

    setUploadedFiles(files);
  };

  console.log(uploadedFiles);

  const [level, setLevel] = useState("");

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      student_user_id: "",
      title: "",
      assignment_type: [],
      description: "",
      deadline: "",
      budget: "",
    },
    onSubmit: async (values) => {
      let isError = false;

      if (!values.student_user_id) {
        toast.error("Please Select Student");
        isError = true;
      }

      if (!values.title) {
        toast.error("Please Enter Assignment title");
        isError = true;
      }

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
        toast.error("Please Select Assignment level");
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

      const data = {
        ...values,
        user_id: values.student_user_id,
        level: level,
        team_member_id: auth?.teamData.id,
        assignment_files: studentData?.assignment_files,
        assignment_files_random_number:
          studentData?.assignment_files_random_number,
        domain: "Freelancer Programming",
        stream: "Programming",
        submit: "submit",
      };

      console.log(data);

      await axios
        .post(`${URL}/team/submitassignmentprogramming.php`, data)
        .then((res) => {
          console.log(res);
          toast.success("Assignment Posted Successfully");
          dispatch(clearAllProgrammingDetails());
          setLoadingSubmit(false);
          navigate(-1);
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

  const [studentsDetails, setStudentDetails] = useState([]);

  useEffect(() => {
    axios
      .get(`${URL}/team/studentstable.php`)
      .then((res) => {
        setStudentDetails(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const getOptionLabel = (option) => {
    return option
      ? `id: ${option.id} name: ${option.firstname} ${option.lastname}`
      : "";
  };

  const selectedStudent = studentsDetails.find(
    (s) => s.id === formik.values.student_user_id
  );

  return (
    <>
      {" "}
      <Helmet>
        <title>Programming Assignment</title>
      </Helmet>
      <div className="  drop-shadow shadow-2xl rounded-xl py-8 md:my-5 flex-col bg-white bg-opacity-20  max-w-[70rem] mt-8 mb-6 mx-auto flex   px-5 md:px-0  items-center">
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
            <Autocomplete
              options={studentsDetails}
              getOptionLabel={getOptionLabel}
              filterOptions={(options, { inputValue }) => {
                const filterPattern = inputValue.toLowerCase();
                return options.filter(
                  (option) =>
                    option.id.toLowerCase().includes(filterPattern) ||
                    option.firstname.toLowerCase().includes(filterPattern) ||
                    option.lastname.toLowerCase().includes(filterPattern)
                );
              }}
              name="student_user_id"
              type="text"
              id="student_user_id"
              value={selectedStudent || null}
              onChange={(event, newValue) => {
                formik.setFieldValue(
                  "student_user_id",
                  newValue ? newValue.id : ""
                );
              }}
              onBlur={() => handleFormBlur("student_user_id")}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  required
                  sx={{
                    marginTop: "1rem",
                    marginBottom: "2rem",
                    width: "100%",
                    borderRadius: "25px",
                  }}
                  label="Student User Id"
                  placeholder="Enter the Student Id"
                />
              )}
            />
            <br />
            <span className="text-lg font-semibold text-white-700">
              Assignment Type (Select Your Type)
            </span>
            <fieldset className="flex flex-wrap items-center justify-start w-full gap-3 py-8">
              {relevantCheckboxes?.map((item, i) => {
                let isChecked = checkBoxes?.find((box) => box === item);
                let color = isChecked ? "blue141" : "white-900";
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
                Assignment Title
              </InputLabel>
              <OutlinedInput
                sx={{
                  borderRadius: "25px",
                }}
                value={formik.values.title}
                onChange={formik.handleChange("title")}
                onBlur={() => handleFormBlur("title")}
                type="text"
                id="title"
                name="title"
                placeholder="Enter the title of your Assignment"
                label="Assignment Title"
              />
            </FormControl>
            <FormControl
              variant="outlined"
              required
              sx={{
                marginTop: "2rem",
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
            <FormControl sx={{ mt: 4 }} variant="outlined" required>
              <span className="text-lg mb-2 font-semibold text-white-700">
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
                    className="flex items-center justify-center gap-2 px-3 py-2 mx-1 my-1 text-white-900 border rounded-md cursor-pointer hover:border-gray-200 "
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
                  setDate(moment(newValue).format("YYYY-MM-DD HH:mm"));
                  formik.setFieldValue(
                    "deadline",
                    moment(newValue).format("YYYY-MM-DD HH:mm")
                  );
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
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed  cursor-pointer  dark:hover:bg-bray-800 hover:bg-gray-500  bg-[#000] rounded-xl shadow-lg  bg-opacity-20 backdrop-blur-lg drop-shadow-lg"
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
                        <p className="mb-2 text-sm text-white ">
                          <p className="font-semibold text-center px-5 md:px-2">
                            Upload assignment guidelines and other related files
                            (Can upload max 10 files)
                          </p>
                        </p>
                        <p className="text-xs text-white ">
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
          type="submit"
          className="bg-[#141B41]"
          disabled={loading}
          endIcon={<LucideArrowRightCircle />}
          sx={{
            color: "#fff",
            borderRadius: "1000px",
            mt: 2,
            height: "50px",

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
          Submit
        </LoadingButton>
      </div>
    </>
  );
}
