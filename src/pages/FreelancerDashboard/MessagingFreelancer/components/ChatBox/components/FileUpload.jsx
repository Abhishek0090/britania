import React from "react";
import { CircularProgress } from "@mui/material";
import { InsertDriveFile } from "@mui/icons-material";
import { LucidePlus, LucideSend } from "lucide-react";
import xls from "~/assets/fileTypes/xls.png";
import xlsx from "~/assets/fileTypes/xlsx.png";
import doc from "~/assets/fileTypes/doc.png";
import pdf from "~/assets/fileTypes/pdf.png";
import docx from "~/assets/fileTypes/docx.png";
import ppt from "~/assets/fileTypes/ppt.png";
import pptx from "~/assets/fileTypes/pptx.png";
import photo from "~/assets/fileTypes/photo.png";

function FileUpload({
  fileLoading,
  fileSelect,
  setFileSelect,
  mediaRef,
  outerContainerRef,
  innerContainerRef,
  uploadedFiles,
  handleMouseWheel,
  fileInputRef,
  handleFileSend,
}) {
  const renderFilePreview = (file) => {
    return (
      <div>
        {fileLoading ? (
          <CircularProgress color="secondary" className="text-center" />
        ) : fileSelect?.includes(file?.name) ? (
          <div className="flex flex-col items-center gap-2 p-8">
            <span className="text-gray-300 flex flex-col items-center justify-center font-Bold text-[1.5rem] gap-6">
              {displayFileType(file?.name?.split(".")[1])}
              {file?.name.length > 20
                ? file?.name?.slice(0, 20) + "..." + file?.name?.split(".")[1]
                : file?.name}
            </span>
            <span className="text-gray-400">
              {formatFileSize(file?.size)} ,{getFileExtension(file?.name)} File
            </span>
          </div>
        ) : null}
      </div>
    );
  };

  const renderSlider = (file) => {
    return (
      <div
        className={`flex items-center justify-center w-16 h-16 gap-2 backdrop-blur-2xl rounded-full  bg-white  cursor-pointer hover:bg-opacity-50   ${
          fileSelect?.includes(file?.name)
            ? "p-[.8rem] bg-opacity-50"
            : "p-[.5rem] bg-opacity-20  "
        }`}
        onClick={() => {
          handleFileSelect(file?.name);
        }}
      >
        {displaySliderFileType(file?.name?.split(".")[1])}
      </div>
    );
  };

  const handleFileSelect = (value) => {
    setFileSelect([value]);
  };

  const displaySliderFileType = (fileType) => {
    if (fileType.toLowerCase() == "doc") {
      return <img src={doc} alt="doc" className="h-[2rem]" />;
    } else if (fileType.toLowerCase() == "pdf") {
      return <img src={pdf} alt="pdf" className="h-[2rem]" />;
    } else if (fileType.toLowerCase() == "docx") {
      return <img src={docx} alt="docx" className="h-[2rem]" />;
    } else if (fileType.toLowerCase() == "xls") {
      return <img src={xls} alt="xls" className="h-[2rem]" />;
    } else if (fileType.toLowerCase() == "xlsx") {
      return <img src={xlsx} alt="xlsx" className="h-[2rem]" />;
    } else if (fileType.toLowerCase() == "ppt") {
      return <img src={ppt} alt="ppt" className="h-[2rem]" />;
    } else if (fileType.toLowerCase() == "pptx") {
      return <img src={pptx} alt="pptx" className="h-[2rem]" />;
    } else if (fileType.toLowerCase() == "jpg") {
      return <img src={photo} alt="photo" className="h-[2rem]" />;
    } else if (fileType.toLowerCase() == "png") {
      return <img src={photo} alt="photo" className="h-[2rem]" />;
    } else if (fileType.toLowerCase() == "jpeg") {
      return <img src={photo} alt="photo" className="h-[2rem]" />;
    } else {
      return <InsertDriveFile style={{ color: "#443f3f", fontSize: "2rem" }} />;
    }
  };

  const formatFileSize = (sizeInBytes) => {
    if (sizeInBytes >= 1048576) {
      return `${(sizeInBytes / 1048576).toFixed(2)} MB`;
    } else if (sizeInBytes >= 1024) {
      return `${(sizeInBytes / 1024).toFixed(2)} KB`;
    } else {
      return `${sizeInBytes} Bytes`;
    }
  };

  const displayFileType = (fileType) => {
    if (fileType.toLowerCase() == "doc") {
      return <img src={doc} alt="doc" className="h-[3rem]" />;
    } else if (fileType.toLowerCase() == "pdf") {
      return <img src={pdf} alt="pdf" className="h-[3rem]" />;
    } else if (fileType.toLowerCase() == "docx") {
      return <img src={docx} alt="docx" className="h-[3rem]" />;
    } else if (fileType.toLowerCase() == "xls") {
      return <img src={xls} alt="xls" className="h-[3rem]" />;
    } else if (fileType.toLowerCase() == "xlsx") {
      return <img src={xlsx} alt="xlsx" className="h-[3rem]" />;
    } else if (fileType.toLowerCase() == "ppt") {
      return <img src={ppt} alt="ppt" className="h-[3rem]" />;
    } else if (fileType.toLowerCase() == "pptx") {
      return <img src={pptx} alt="pptx" className="h-[3rem]" />;
    } else if (fileType.toLowerCase() == "jpg") {
      return <img src={photo} alt="photo" className="h-[3rem]" />;
    } else if (fileType.toLowerCase() == "png") {
      return <img src={photo} alt="photo" className="h-[3rem]" />;
    } else if (fileType.toLowerCase() == "jpeg") {
      return <img src={photo} alt="photo" className="h-[3rem]" />;
    } else {
      return <InsertDriveFile style={{ color: "#443f3f", fontSize: "3rem" }} />;
    }
  };

  const getFileExtension = (fileName) => {
    return fileName.split(".").pop().toUpperCase();
  };

  return (
    <div
      className="absolute flex flex-col bottom-0 mb-[160px] md:mb-[160px] rounded-xl p-2 left-2 z-50 bg-gray-800 w-[95%] md:w-[30rem]"
      id="media-files"
      ref={mediaRef}
    >
      <div className="flex flex-col">
        {uploadedFiles.map((file, index) => (
          <div key={index} className="text-center">
            {renderFilePreview(file)}
          </div>
        ))}
      </div>
      <div
        className="flex items-center justify-center gap-5"
        ref={outerContainerRef}
        onWheel={handleMouseWheel}
      >
        <div
          className="flex gap-4 overflow-x-auto w-auto"
          style={{
            overflowX: "auto",
            scrollbarWidth: "thin",
            "-webkit-scrollbar-width": "thin",
            scrollbarColor: "transparent transparent",
          }}
          ref={innerContainerRef}
        >
          {uploadedFiles.length > 1 &&
            uploadedFiles.map((file, index) => (
              <div key={index} className="flex gap-5 w-[100%]">
                {renderSlider(file)}
              </div>
            ))}
        </div>
        <div className="flex gap-3">
          <button
            className="rounded-xl bg-gray-500 text-gray-200 p-2 hover-bg-gray-800"
            onClick={() => fileInputRef.current.click()}
          >
            <LucidePlus color="white" />
          </button>

          <button
            className="rounded-xl bg-blue-500 p-2 hover-bg-blue-800"
            onClick={handleFileSend}
          >
            <LucideSend color="white" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default FileUpload;
