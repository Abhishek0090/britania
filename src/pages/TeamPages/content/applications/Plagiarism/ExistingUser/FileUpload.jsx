import React, { useState, useEffect, useRef, Suspense, lazy } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  setAllPlagiarismDetails,
  clearAllPlagiarismDetails,
} from "~/features/student/studentSlice";
import {
  LucideLoader2,
  LucideTrash,
  LucideArrowRightCircle,
} from "lucide-react";
import { URL } from "~/utils/BaseURL";

//Upload Files Imports
import axios from "axios";
import LoadingButton from "@mui/lab/LoadingButton";
import { Helmet } from "react-helmet-async";
import { selectAuth } from "~/features/auth/authSlice";

const MAX_COUNT = 10;
const MAX_SIZE = 10242880;

const FileUpload = () => {
  const dispatch = useDispatch();
  const studentData = useSelector(
    (state) => state.student.allPlagiarismDetails
  );
  const auth = useSelector(selectAuth);

  console.log(auth.teamData.id);

  //Upload Files
  const [uploadedFiles, setUploadedFiles] = useState([]);
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

    //file upload issue fixed
    let uniqueIdLocal = JSON.parse(
      localStorage.getItem("assignment_files_random_number")
        ? localStorage.getItem("assignment_files_random_number")
        : uniqueId
    );

    let data = {
      plagiarism_assignment: uploaded,
      team_member_id: auth.teamData.id,
      submit: "submit",
      random_number: uniqueIdLocal ? uniqueIdLocal : uniqueId,
    };

    await axios
      .post(`${URL}/team/fileuploadplagiarismcheck.php`, data, {
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
          setAllPlagiarismDetails({
            assignment_files: res?.data?.file_name_string,
            assignment_files_random_number: res?.data?.random_number,
          })
        );
        toast.success("File Uploaded Successfully");
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
        setAllPlagiarismDetails({
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
      setAllPlagiarismDetails({
        assignment_files: previousFiles,
      })
    );
    fileInputRef.current.value = null;

    setUploadedFiles(files);
  };

  return (
    <section id="plagerismcheck">
      <label className=" mt-4 mb-2 text-xl font-medium flex items-center justify-center">
        Upload Plagiarism Files
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
                    <p className="mb-2 text-sm text-gray-500 ">
                      <p className="font-semibold text-center px-5 md:px-2">
                        Upload assignment guidelines and other related files
                        (Can upload max 10 files)
                      </p>
                    </p>
                    <p className="text-xs text-gray-500 ">
                      PDF, DOC, DOCX, etc up to 10MB each
                    </p>
                  </>
                )}
              </>
              <input
                multiple
                id="dropzone-file"
                type="file"
                className="hidden"
                accept=".pdf,.doc, .docx"
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
                {file?.replace(studentData?.assignment_files_random_number, "")}
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
  );
};

export default FileUpload;
