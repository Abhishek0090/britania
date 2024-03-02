import { useState, useEffect } from "react";
import Virtualize from "~/utils/Virtualize";
import toast from "react-hot-toast";
import { FormControl, InputLabel, OutlinedInput, Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  setTechnicalFreelancerFormData,
  setNonTechnicalFreelancerFormData,
} from "~/features/freelancer/freelancerSlice";
import { LucideChevronRight } from "lucide-react";
import {
  LucideLoader2,
  LucideCheckCircle,
  LucideCircle,
  LucideTrash,
} from "lucide-react";
const MAX_COUNT = 5;
const fromSchema = Yup.object().shape({
  qualification: Yup.string().required("Qualification is required"),
  working_hours: Yup.string().required("Working Hours is required"),
});
export default function Speciality({
  nextStepHandler,
  relevantCheckboxes,
  setUploadedFiles,
  uploadedFiles,
  handleUploadFiles,
  handleDeleteFile,
  loading,
  fileInputRef,
  role,
}) {
   
  const dispatch = useDispatch();
  let freelancerData = {};
  if (role === "Technical") {
    freelancerData = useSelector(
      (state) => state.freelancer.technicalFreelancerFormData
    );
  } else if (role === "Non Technical") {
    freelancerData = useSelector(
      (state) => state.freelancer.nonTechnicalFreelancerFormData
    );
  }
  const [subject_tags, setSubjectTags] = useState(
    freelancerData?.subject_tags?.map((item) => item) || []
  );

  const [checkBoxes, setCheckBoxes] = useState(
    freelancerData?.assignment_type?.map((item) => item) || []
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      assignment_type: checkBoxes,
      qualification: freelancerData?.qualification || "",
      working_hours: freelancerData?.working_hours || "",
      subject_tags: subject_tags,
      uploadedFiles: [],
    },
    onSubmit: (values) => {
      if (freelancerData?.past_work_files?.length === 0) {
        return toast.error("Please Upload Files");
      }
      if (freelancerData?.subject_tags?.length === 0) {
        return toast.error("Please Select Subject Tags");
      }
      if (freelancerData?.assignment_type?.length === 0) {
        return toast.error("Please Select Assignment Type");
      }
      nextStepHandler();
    },
    validationSchema: fromSchema,
  });

  const handleRemoveSubjectTag = (tag) => {
    let subject_tags = formik.values.subject_tags.filter(
      (item) => item !== tag
    );
    setSubjectTags(subject_tags);
    if (role === "Technical") {
      dispatch(
        setTechnicalFreelancerFormData({
          ...freelancerData,
          assignment_type: checkBoxes,
          subject_tags: subject_tags,
        })
      );
    } else if (role === "Non Technical") {
      dispatch(
        setNonTechnicalFreelancerFormData({
          ...freelancerData,
          assignment_type: checkBoxes,
          subject_tags: subject_tags,
        })
      );
    }
  };

  useEffect(() => {
    formik.setFieldValue("subject_tags", subject_tags);
    formik.setFieldValue("uploadedFiles", uploadedFiles);
    formik.setFieldValue("assignment_type", checkBoxes);

    if (role === "Technical") {
      dispatch(
        setTechnicalFreelancerFormData({
          ...freelancerData,
          assignment_type: checkBoxes,
          subject_tags: subject_tags,
        })
      );
    } else if (role === "Non Technical") {
      dispatch(
        setNonTechnicalFreelancerFormData({
          ...freelancerData,
          assignment_type: checkBoxes,
          subject_tags: subject_tags,
        })
      );
    }
  }, [subject_tags, checkBoxes, uploadedFiles]);

  const handleFormBlur = (fieldName) => {
    if (formik.errors[fieldName]) {
      toast.error(formik.errors[fieldName]);
      return;
    }
    formik.setFieldValue(fieldName, formik.values[fieldName]);
    if (role === "Technical") {
      dispatch(
        setTechnicalFreelancerFormData({
          ...freelancerData,
          [fieldName]: formik.values[fieldName],
        })
      );
    } else if (role === "Non Technical") {
      dispatch(
        setNonTechnicalFreelancerFormData({
          ...freelancerData,
          [fieldName]: formik.values[fieldName],
        })
      );
    }
  };

  // console.log('freelancerData', freelancerData?.past_work_files);

  return (
    <>
      <label className="block mt-4 mb-2 text-xl font-medium ">
        Speciality Section
      </label>
      <div className="flex flex-col md:w-[50rem] w-[20rem] ">
        <div className="flex flex-col items-center justify-center">
          <fieldset className="flex flex-wrap items-center justify-center w-full max-w-2xl gap-3 py-8">
            {relevantCheckboxes?.map((item, i) => (
              <div key={i}>
                <input
                  type="checkbox"
                  name={item}
                  value={item}
                  id={item}
                  className="peer hidden [&:checked_+_label_svg]:block"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCheckBoxes([...checkBoxes, e.target.value]);
                    } else {
                      setCheckBoxes(
                        checkBoxes.filter((box) => box !== e.target.value)
                      );
                    }
                  }}
                />
                <label
                  htmlFor={item}
                  className={`flex items-center justify-center gap-2 px-3 py-2 text-gray-900 border border-gray-100 rounded-md cursor-pointer hover:border-gray-200 
                    ${
                      checkBoxes?.find((box) => box === item)
                        ? " peer-checked:border-blue141 peer-checked:bg-blue141 peer-checked:text-white"
                        : ""
                    }
                  `}
                >
                  {checkBoxes?.find((box) => box === item) ? (
                    <LucideCheckCircle size={20} />
                  ) : (
                    <LucideCircle size={20} />
                  )}
                  <p className="text-xs font-medium  md:text-sm">{item}</p>
                </label>
              </div>
            ))}
          </fieldset>
        </div>
        <FormControl
          variant="outlined"
          required
          sx={{
            marginTop: "1rem",
            width: "100%",
          }}
        >
          <InputLabel htmlFor="outlined-adornment-name">
            Qualification
          </InputLabel>
          <OutlinedInput
            sx={{
              borderRadius: "25px",
            }}
            value={formik.values.qualification}
            onChange={formik.handleChange("qualification")}
            onBlur={() => handleFormBlur("qualification")}
            error={
              formik.touched.qualification &&
              Boolean(formik.errors.qualification)
            }
            variant="outlined"
            type="text"
            id="qualification"
            name="qualification"
            label="Qualification"
            placeholder=" Qualification (e.g. BE, B.Tech, MBA, etc.)"
          />
        </FormControl>

        <div className="relative flex flex-row flex-shrink-0 pt-10 ">
          <FormControl
            variant="outlined"
            required
            sx={{
              marginBottom: "1rem",
              width: "100%",
            }}
          >
            <InputLabel htmlFor="outlined-adornment-name">
              Working Hours
            </InputLabel>
            <OutlinedInput
              sx={{
                borderRadius: "25px",
              }}
              value={formik.values.working_hours}
              onChange={formik.handleChange("working_hours")}
              onBlur={() => handleFormBlur("working_hours")}
              error={
                formik.touched.working_hours &&
                Boolean(formik.errors.working_hours)
              }
              type="text"
              id="working_hours"
              name="working_hours"
              label="Working Hours"
              placeholder=" Any specific working hours? (e.g. 9am to 5pm)"
            />
          </FormControl>
        </div>
        <br />
        {/* <label className="block mt-4 mb-2 text-sm font-medium">
          Subject Tags
        </label> */}
        <Virtualize
          setSubjectTags={setSubjectTags}
          handleFormBlur={handleFormBlur}
        />
        {/* // subject tags */}
        <br />
        {subject_tags?.length > 0 && (
          <span className="block mt-4 mb-2 text-sm font-medium">
            Your saved subject tags are:
          </span>
        )}
        <label className="block  mb-2 text-sm font-medium">
          {subject_tags?.map((tag, i) => (
            <span
              key={i}
              className="inline-flex items-center px-2.5 py-0.5 mr-2 mt-2 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
            >
              {tag}
              <button
                type="button"
                className="flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-blue-400 hover:bg-blue-200 hover:text-blue-500"
                onClick={() => {
                  handleRemoveSubjectTag(tag);
                }}
              >
                <span className="sr-only">Remove tag</span>
                <svg
                  className="h-2 w-2"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 8 8"
                >
                  <path
                    strokeLinecap="round"
                    strokeWidth={1.5}
                    d="M1 1l6 6m0-6L1 7"
                  />
                </svg>
              </button>
            </span>
          ))}
        </label>
        <div className="flex flex-col items-center justify-center pt-5 ">
          <div className="flex flex-col items-start justify-start w-full max-w-xl pt-1 pb-10">
            {uploadedFiles?.length > MAX_COUNT ? null : (
              <div className="flex items-center justify-center w-full pb-2 ">
                <label className="flex flex-col items-center w-full px-4 py-6 tracking-wide uppercase border rounded-lg shadow-lg cursor-pointer text-blue border-blue hover:bg-blue hover:text-gray-400">
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
                          className="w-8 h-8"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                        </svg>
                        <span className="mt-2 text-base leading-normal">
                          {" "}
                          Upload your past work samples
                        </span>
                        <span className="mt-2 text-base leading-normal">
                          {" "}
                          (Can upload max 5 files)
                        </span>
                        <p className="text-xs text-gray-500 ">
                          PDF, DOC, DOCX, ZIP ,etc up to 5MB each
                        </p>
                      </>
                    )}
                  </>

                  <input
                    type="file"
                    className="hidden"
                    ref={fileInputRef}
                    multiple
                    onChange={(e) => {
                      let files = [...e.target.files];
                      if (files.length > MAX_COUNT) {
                        toast.error(`You can upload only ${MAX_COUNT} files`);
                        return;
                      }
                      if (files.length + uploadedFiles.length > MAX_COUNT) {
                        toast.error(`You can upload only ${MAX_COUNT} files`);
                        return;
                      }
                      handleUploadFiles(files);
                    }}
                  />
                </label>
              </div>
            )}
            {freelancerData?.past_work_files
              ?.split("_$_")
              ?.filter((item) => item !== "")
              ?.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center  justify-between w-full bg-gray-200 text-gray-800 px-2 rounded-lg my-0.5"
                >
                  <span className="p-1 rounded-lg break-all">
                    {index + 1}.{" "}
                    {file?.replace(
                      freelancerData?.past_work_files_random_number,
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
        </div>
      </div>
      <button
        disabled={
          loading ||
          formik?.values?.working_hours === "" ||
          formik?.values?.subject_tags?.length === 0 ||
          freelancerData?.past_work_files === null ||
          formik?.values?.qualification === ""
        }
        type="submit"
        onClick={formik.handleSubmit}
        className="flex flex-row items-center justify-center w-32 py-1 mt-5 mb-10 text-lg rounded-full right-10 md:font-SemiBold md:text-xl text-blue141 md:py-3 md:w-48 disabled:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span className="items-center  flex justify-center flex-row ">
          <span className="mr-1 md:mr-2 mb-1">Next</span>
          <LucideChevronRight className="w-5 h-5 " />
        </span>
      </button>
    </>
  );
}
