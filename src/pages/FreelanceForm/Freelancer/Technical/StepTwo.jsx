import { useState, useEffect, Suspense, lazy } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { CheckBoxes } from "./Checkboxes";
import { useDispatch } from "react-redux";
import { setTechnicalFreelancerFormData } from "~/features/freelancer/freelancerSlice";
import PersonalDetails from "./PersonalDetails";
import { URL } from "~/utils/BaseURL";
const Speciality = lazy(() =>
  import("~/pages/FreelanceForm/Freelancer/Speciality")
);
const Experience = lazy(() =>
  import("~/pages/FreelanceForm/Freelancer/Experience")
);
const Resume = lazy(() => import("~/pages/FreelanceForm/Freelancer/Resume"));
const MAX_COUNT = 5;
const MAX_COUNT_RESUME = 1;

export default function StepTwo() {
  const dispatch = useDispatch();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [resumeFiles, setResumeFiles] = useState([]);
  const [fileLimit, setFileLimit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState("Technical");
  const [step, setStep] = useState(2);
  const [uniqueId, setUniqueId] = useState(null);
  const [uniqueIdResume, setUniqueIdResume] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("form")) {
      let form = JSON.parse(localStorage.getItem("form"));
      setRoles([...form[1].Step2.split(",")]);
      dispatch(
        setTechnicalFreelancerFormData({
          domains: form[1].Step2.split(",").toString(),
        })
      );
    } else {
      window.alert("Please fill the form from the beginning");
      navigate("/freelance/step2");
    }
  }, []);

  const handleUploadFiles = async (files) => {
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
    let uniqueIdLocal = JSON.parse(
      localStorage.getItem("random_number_past_work")
        ? localStorage.getItem("random_number_past_work")
        : uniqueId
    );

    let data = {
      past_work_files: uploaded,
      submit: "submit",
      random_number: uniqueIdLocal ? uniqueIdLocal : uniqueId,
    };
    await axios
      .post(`${URL}/freelancer/fileuploadpastworkfiles.php`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setUniqueId(res?.data?.random_number);
        localStorage.setItem(
          "random_number_past_work",
          res?.data?.random_number
        );
        dispatch(
          setTechnicalFreelancerFormData({
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
  const handleUploadResume = async (files) => {
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
    let uniqueIdLocal = JSON.parse(
      localStorage.getItem("random_number_resume")
        ? localStorage.getItem("random_number_resume")
        : uniqueIdResume
    );
    let data = {
      resume: uploaded,
      submit: "submit",
      random_number: uniqueIdLocal ? uniqueIdLocal : uniqueIdResume,
    };
    await axios
      .post(`${URL}/freelancer/fileuploadresume.php`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setUniqueIdResume(res?.data?.random_number);
        localStorage.setItem("random_number_resume", res?.data?.random_number);
        dispatch(
          setTechnicalFreelancerFormData({
            resume: res?.data?.file_name_string,
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

  //   console.log('resume', resumeFiles);

  const relevantCheckboxes = [];
  roles.forEach((role) => {
    let index = CheckBoxes.findIndex((item) => item.name === role);
    CheckBoxes[index]?.checkboxes.forEach((checkbox) => {
      if (!relevantCheckboxes.includes(checkbox.name)) {
        relevantCheckboxes.push(checkbox.name);
      }
    });
  });
  const nextStepHandler = () => {
    if (step === 1) {
      navigate("/freelance/freelancer/technical/step2");
    }
    if (step === 2) {
      navigate("/freelance/freelancer/technical/step3");
    }
  };

  const prevStepHandler = () => {
    if (step === 2) {
      navigate("/freelance/freelancer/technical/step1");
    }
    if (step === 3) {
      navigate("/freelance/freelancer/technical/step2");
    }
  };

  return (
    <>
      {step === 4 ? (
        <Suspense fallback={<div></div>}>
          <PersonalDetails />
        </Suspense>
      ) : (
        <div className=" backdrop-blur-2xl  drop-shadow shadow-2xl rounded-xl py-10 md:my-10 flex-col bg-white bg-opacity-20  max-w-[70rem] mt-8 mb-6 mx-auto flex   px-5 md:px-0  items-center">
          {" "}
          <div className=" flex flex-col items-center justify-center gap-x-1 gap-y-1 md:flex-row flex-wrap">
            {roles
              ?.filter((role) =>
                CheckBoxes.map((item) => item.name).includes(role)
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
              <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:font-light after:text-gray-200 dark:after:text-gray-500">
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
                <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:font-light after:text-gray-200 dark:after:text-gray-500">
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
              <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:font-light after:text-gray-200 dark:after:text-gray-500">
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
                role={role}
              />
            </Suspense>
          )}
          {step === 2 && (
            <Suspense fallback={<div></div>}>
              <Experience
                prevStepHandler={prevStepHandler}
                nextStepHandler={nextStepHandler}
                role={role}
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
                loading={loading}
                setLoading={setLoading}
                role={role}
              />
            </Suspense>
          )}
        </div>
      )}
    </>
  );
}
