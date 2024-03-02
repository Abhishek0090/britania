import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  LucideArrowRightCircle,
  LucideChevronLeft,
  LucideLoader2,
  LucideTrash,
} from 'lucide-react';
const MAX_COUNT = 1;
export default function Resume({
  prevStepHandler,
  resumeFiles,
  fileInputRef,
  handleUploadResume,
  handleDeleteFile,
  loading,
  role,
}) {
  const navigate = useNavigate();
  let freelancerData = {};
  if (role === 'Technical') {
    freelancerData = useSelector(
      (state) => state.freelancer.technicalFreelancerFormData
    );
  } else if (role === 'Non Technical') {
    freelancerData = useSelector(
      (state) => state.freelancer.nonTechnicalFreelancerFormData
    );
  }
 
  const handleCheck = () => {
    if (role === 'Technical') {
      if (freelancerData?.domains === null) {
        toast.error('Please fill previous form first');
        navigate('/freelance/step3');
        return;
      } else if (freelancerData?.role === null) {
        toast.error('Please fill previous form first');
        navigate('/freelance/step2');
        return;
      } else if (freelancerData?.assignment_type === null) {
        toast.error('Please fill previous form first');
        navigate('/freelance/freelancer/technical/step1');
        return;
      } else if (freelancerData?.qualification === null) {
        toast.error('Please fill previous form first');
        navigate('/freelance/freelancer/technical/step1');
        return;
      } else if (freelancerData?.working_hours === null) {
        toast.error('Please fill previous form first');
        navigate('/freelance/freelancer/technical/step1');
        return;
      } else if (freelancerData?.subject_tags === null) {
        toast.error('Please fill previous form first');
        navigate('/freelance/freelancer/technical/step1');
        return;
      } else if (freelancerData?.past_work_files === null) {
        toast.error('Please fill previous form first');
        navigate('/freelance/freelancer/technical/step1');
        return;
      } else if (freelancerData?.past_experience === null) {
        toast.error('Please fill previous form first');
        navigate('/freelance/freelancer/technical/step2');
        return;
      } else if (freelancerData?.work_links === null) {
        toast.error('Please fill previous form first');
        navigate('/freelance/freelancer/technical/step2');
        return;
      } else if (freelancerData?.linkedin === null) {
        toast.error('Please fill previous form first');
        navigate('/freelance/freelancer/technical/step2');
        return;
      } else if (freelancerData?.resume === null) {
        toast.error('Please fill previous form first');
        navigate('/freelance/freelancer/technical/step3');
        return;
      } else {
        navigate('/freelance/freelancer/technical/personalDetails');
        return;
      }
    } else if (role === 'Non Technical') {
      if (freelancerData?.domains === null) {
        toast.error('Please fill previous form first');
        navigate('/freelance/step3');
        return;
      } else if (freelancerData?.role === null) {
        toast.error('Please fill previous form first');
        navigate('/freelance/step2');
        return;
      } else if (freelancerData?.assignment_type === null) {
        toast.error('Please fill previous form first');
        navigate('/freelance/freelancer/nontechnical/step1');
        return;
      } else if (freelancerData?.qualification === null) {
        toast.error('Please fill previous form first');
        navigate('/freelance/freelancer/nontechnical/step1');
        return;
      } else if (freelancerData?.working_hours === null) {
        toast.error('Please fill previous form first');
        navigate('/freelance/freelancer/nontechnical/step1');
        return;
      } else if (freelancerData?.subject_tags === null) {
        toast.error('Please fill previous form first');
        navigate('/freelance/freelancer/nontechnical/step1');
        return;
      } else if (freelancerData?.typing_speed === null) {
        toast.error('Please fill previous form first');
        navigate('/freelance/freelancer/nontechnical/step2');
        return;
      } else if (freelancerData?.past_work_files === null) {
        toast.error('Please fill previous form first');
        navigate('/freelance/freelancer/nontechnical/step1');
        return;
      } else if (freelancerData?.past_experience === null) {
        toast.error('Please fill previous form first');
        navigate('/freelance/freelancer/nontechnical/step2');
        return;
      } else if (freelancerData?.work_links === null) {
        toast.error('Please fill previous form first');
        navigate('/freelance/freelancer/nontechnical/step2');
        return;
      } else if (freelancerData?.linkedin === null) {
        toast.error('Please fill previous form first');
        navigate('/freelance/freelancer/nontechnical/step2');
        return;
      } else if (freelancerData?.resume === null) {
        toast.error('Please fill previous form first');
        navigate('/freelance/freelancer/nontechnical/step3');
        return;
      } else {
        navigate('/freelance/freelancer/nontechnical/personalDetails');
        return;
      }
    }
  };

  return (
    <>
      <label className="block mt-4 mb-2 text-xl font-medium ">
        Resume Section
      </label>
      <div className="flex flex-col gap-2 md:w-[50rem] w-[20rem] items-center justify-center mt-4 mb-2">
        {freelancerData?.resume === null || freelancerData?.resume === '' ? (
          <>
            {resumeFiles?.length > MAX_COUNT ? null : (
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 hover:text-gray-400"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {' '}
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
                    <span className="font-semibold">Upload your resume</span>{' '}
                  </p>
                  <p className="text-xs text-gray-500 ">
                    PDF, DOC, DOCX, ZIP ,etc up to 5MB
                  </p>
                </div>

                <input
                  multiple
                  id="dropzone-file"
                  type="file"
                  accept=".pdf,.doc,.docx,.zip"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={(e) => {
                    let files = [...e.target.files];
                    if (files.length > MAX_COUNT) {
                      toast.error(`You can upload only ${MAX_COUNT} files`);
                      return;
                    }
                    if (files.length + resumeFiles.length > MAX_COUNT) {
                      toast.error(`You can upload only ${MAX_COUNT} files`);
                      return;
                    }
                    handleUploadResume(files);
                  }}
                />
              </label>
            )}
          </>
        ) : null}

        <div className="flex items-center justify-center w-full pb-2 ">
          {loading ? (
            <div role="status" className="flex items-center justify-center">
              <LucideLoader2 size={20} className="animate-spin" />
              <span>Please Wait...</span>
            </div>
          ) : null}
        </div>
        {freelancerData?.resume
          ?.split('_$_')
          ?.filter((item) => item !== '')
          ?.map((file, index) => (
            <div
              key={index}
              className="flex items-center  justify-between w-full bg-gray-200 text-gray-800 px-2 rounded-lg my-0.5"
            >
              <span className="p-1 rounded-lg break-all">
                {index + 1}.{' '}
                {file?.replace(freelancerData?.resume_random_number, '')}
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
        {/* {loading ? (
          <div role="status">
            <LucideLoader2 size={20} className="animate-spin" />
            <span className="sr-only">Loading...</span>
          </div>
        ) : null} */}
      </div>
      <div className="flex flex-row gap-4 mt-5">
        <button
          onClick={() => {
            prevStepHandler();
          }}
          className="flex flex-row items-center justify-center w-32 py-1 mt-5 mb-10 text-lg rounded-full  right-10 md:font-SemiBold md:text-xl text-blue141 md:py-3 md:w-48"
        >
          <span className="items-center flex">
            <LucideChevronLeft className="w-5 h-5 " />
            <span className="ml-1 md:ml-2 mb-1">Prev</span>
          </span>
        </button>
        <button
          disabled={
            loading ||
            freelancerData?.resume === null ||
            freelancerData?.resume === ''
          }
          type="submit"
          onClick={() => handleCheck()}
          className="flex flex-row items-center justify-center w-32 py-1 mt-5 mb-10 text-lg rounded-full right-10 md:font-SemiBold md:text-xl text-blue141 md:py-3 md:w-48 disabled:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span className="items-center px-2 flex justify-center ">
            <span className="mr-1 md:mr-2 mb-1">Confirm</span>
            <LucideArrowRightCircle className="w-5 h-5 " />
          </span>
        </button>
      </div>
    </>
  );
}
