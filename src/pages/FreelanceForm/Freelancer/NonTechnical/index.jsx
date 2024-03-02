import { useState, useEffect, Suspense, lazy } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setNonTechnicalFreelancerFormData } from "~/features/freelancer/freelancerSlice";
import PersonalDetails from "./PersonalDetails";
import { URL } from "~/utils/BaseURL";

const MAX_COUNT = 5;
const MAX_COUNT_RESUME = 1;
const Speciality = lazy(() =>
  import("~/pages/FreelanceForm/Freelancer/Speciality")
);
const Experience = lazy(() =>
  import("~/pages/FreelanceForm/Freelancer/Experience")
);
const Resume = lazy(() => import("~/pages/FreelanceForm/Freelancer/Resume"));

const nonTechnicalRoles = [
  {
    id: 1,
    name: "Psychology & Sociology",
  },
  {
    id: 2,
    name: "Law",
  },
  {
    id: 3,
    name: "Finance & Accounts",
  },
  {
    id: 4,
    name: "Management",
  },
  {
    id: 5,
    name: "Marketing",
  },
  {
    id: 6,
    name: "Business Studies",
  },
  {
    id: 7,
    name: "English & Literature",
  },
  {
    id: 8,
    name: "Economics",
  },
];
const relevantCheckboxes = [
  "essay writing",
  "report writing",
  "literature review",
  "blackbook",
  "research paper",
  "primary/secondary data analysis",
  "review article",
  "thesis writing",
  "dissertation writing",
  "programming / coding",
  "ppt",
  "case studies",
  "Question & Answer ",
  "sop",
];

export default function NonTechnical() {
  const dispatch = useDispatch();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [resumeFiles, setResumeFiles] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [fileLimit, setFileLimit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  const [checkBoxes, setCheckBoxes] = useState([]);
  const [step, setStep] = useState(1);
  const [uniqueId, setUniqueId] = useState(null);
  const [savedFileName, setSavedFileName] = useState([]);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Step1: "none",
    Step2: "none",
    Step3: "none",
  });

  useEffect(() => {
    if (localStorage.getItem("form")) {
      let form = JSON.parse(localStorage.getItem("form"));
      setFormData(
        form.reduce((acc, item) => {
          return {
            ...acc,
            [Object.keys(item)[0]]: Object.values(item)[0],
          };
        }, {})
      );
      setRoles([...form[2].Step3.split(",")]);
      dispatch(
        setNonTechnicalFreelancerFormData({
          domains: form[2].Step3.split(",").toString(),
        })
      );
    } else {
      console.log("no form found");
      navigate("/freelance");
    }
  }, [localStorage.getItem("form")]);

  const handleUploadFiles = (files) => {
    let uploaded = [...uploadedFiles];
    let limitExceeded = false;
    setLoading(true);
    files.forEach((file) => {
      if (uploaded.length < MAX_COUNT) {
        uploaded.push(file);
      } else {
        limitExceeded = true;
      }
    });
    setUploadedFiles(uploaded);
    let data = {
      past_work_files: uploaded,
      submit: "submit",
      random_number: uniqueId,
    };

    axios
      .post(`${URL}/freelancer/fileuploadpastworkfiles.php`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setUniqueId(res?.data?.random_number);
        setSavedFileName(res?.data?.file_name);
        window.localStorage.setItem("saved_files", savedFileName);
        dispatch(
          setNonTechnicalFreelancerFormData({
            past_work_files: res?.data?.file_name_string,
          })
        );
        // console.log(res);
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

  const handleUploadResume = (files) => {
    let uploaded = [...resumeFiles];
    let limitExceeded = false;
    setLoading(true);
    files.forEach((file) => {
      if (uploaded.length < MAX_COUNT_RESUME) {
        uploaded.push(file);
      } else {
        limitExceeded = true;
      }
    });

    setResumeFiles(uploaded);

    setLoading(false);

    if (limitExceeded) {
      setFileLimit(true);
    } else {
      setFileLimit(false);
    }
  };

  const nextHandler = () => {
    console.log("uploadedFiles :>>", uploadedFiles);
    console.log("roles :>>", roles);
    console.log("selectedTags :>> ", selectedTags);
    if (roles.length === uploadedFiles.length - 1) {
      let form = JSON.parse(localStorage.getItem("form"));
      let step3 = {
        Step3: {
          NonTechnical: uploadedFiles.filter((item) => item.role !== "none"),
        },
      };
      form.push(step3);
      // set form to local storage
      localStorage.setItem("form", JSON.stringify(form));

      navigate("/freelance/form/personalDetails");
    } else {
      toast.error("Please upload all the files");
    }
  };
  const nextStepHandler = () => {
    if (step === 1) {
      navigate("/freelance/freelancer/nontechnical/step2");
    }
    if (step === 2) {
      navigate("/freelance/freelancer/nontechnical/step3");
    }
  };

  const prevStepHandler = () => {
    if (step === 2) {
      navigate("/freelance/freelancer/nontechnical/step1");
    }
    if (step === 3) {
      navigate("/freelance/freelancer/nontechnical/step2");
    }
  };

  console.log("formData :>> ", roles);

  return (
    <>
      {step === 4 ? (
        <Suspense fallback={<div></div>}>
          <PersonalDetails
            uploadedFiles={uploadedFiles}
            resumeFiles={resumeFiles}
          />
        </Suspense>
      ) : (
        <div className="backdrop-blur-2xl  drop-shadow shadow-2xl rounded-xl py-10 md:my-10 flex-col bg-white bg-opacity-20  max-w-[70rem] mt-8 mb-6 mx-auto flex   px-5 md:px-0  items-center">
          {" "}
          <div className="flex flex-col items-center justify-center gap-2 md:flex-row">
            {roles
              ?.filter((role) =>
                nonTechnicalRoles.map((item) => item.name).includes(role)
              )
              .map((r, i) => (
                <div
                  key={i}
                  className=" max-w-[65rem] mx-auto flex md:flex-row flex-col px-2 md:px-0 justify-between items-center"
                >
                  <button className="flex-col max-w-sm px-10 bg-white border border-gray-200 rounded-lg shadow-2xl  backdrop-blur-3xl">
                    <h5 className="py-1 text-xl font-bold tracking-tight text-gray-900">
                      {r}
                    </h5>
                  </button>
                </div>
              ))}
          </div>
          <ol className="mt-10 flex items-center md:w-[50rem] w-[20rem] text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
            <li
              style={{
                color: step === 1 ? "#2956A8" : "#9CA3AF",
              }}
              className="flex md:w-full items-center   sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700"
            >
              <span
                onClick={() => {
                  navigate("/freelance/freelancer/nontechnical/step1");
                }}
                className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:font-light after:text-gray-200 dark:after:text-gray-500"
              >
                {step === 1 ? (
                  <svg
                    aria-hidden="true"
                    className="w-4 h-4 mr-2 sm:w-5 sm:h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                ) : (
                  <span className="mr-2">1</span>
                )}
                Speciality
              </span>
            </li>
            <li
              style={{
                color: step === 2 ? "#2956A8" : "#9CA3AF",
              }}
              className="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700"
            >
              <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:font-light after:text-gray-200 dark:after:text-gray-500">
                <span
                  onClick={() => {
                    navigate("/freelance/freelancer/nontechnical/step2");
                  }}
                  className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:font-light after:text-gray-200 dark:after:text-gray-500"
                >
                  {step === 2 ? (
                    <svg
                      aria-hidden="true"
                      className="w-4 h-4 mr-2 sm:w-5 sm:h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  ) : (
                    <span className="mr-2">2</span>
                  )}
                  Experience
                </span>
              </span>
            </li>
            <li
              style={{
                color: step === 3 ? "#2956A8" : "#9CA3AF",
              }}
              className="flex items-center"
            >
              <span
                onClick={() => {
                  navigate("/freelance/freelancer/nontechnical/step3");
                }}
                className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:font-light after:text-gray-200 dark:after:text-gray-500"
              >
                {step === 3 ? (
                  <svg
                    aria-hidden="true"
                    className="w-4 h-4 mr-2 sm:w-5 sm:h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                ) : (
                  <span className="mr-2">3</span>
                )}
                Resume
              </span>
            </li>
          </ol>
          {step === 1 && (
            <Suspense fallback={<div></div>}>
              <Speciality
                nextStepHandler={nextStepHandler}
                loading={loading}
                setLoading={setLoading}
                uploadedFiles={uploadedFiles}
                handleUploadFiles={handleUploadFiles}
                setUploadedFiles={setUploadedFiles}
                relevantCheckboxes={relevantCheckboxes}
                checkBoxes={checkBoxes}
                setCheckBoxes={setCheckBoxes}
              />
            </Suspense>
          )}
          {step === 2 && (
            <Suspense fallback={<div></div>}>
              <Experience
                prevStepHandler={prevStepHandler}
                nextStepHandler={nextStepHandler}
              />
            </Suspense>
          )}
          {step === 3 && (
            <Suspense fallback={<div></div>}>
              <Resume
                handleUploadResume={handleUploadResume}
                resumeFiles={resumeFiles}
                setResumeFiles={setResumeFiles}
                prevStepHandler={prevStepHandler}
                nextHandler={nextHandler}
                step={step}
                setStep={setStep}
              />
            </Suspense>
          )}
        </div>
      )}
    </>
  );
}
