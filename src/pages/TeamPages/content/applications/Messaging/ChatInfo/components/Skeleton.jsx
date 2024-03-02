import React from "react";

const Skeleton = () => {
  return (
    <div className="flex flex-col gap-2 items-center m-auto justify-center">
      <>
        <button
          className={`flex gap-4 items-center justify-between w-[90%] p-[5px] rounded-md h-12  skeleton-loader mb-2`}
        >
          <span className="inline-block rounded-full bg-gray-800 text-white font-bold p-5 text-center flex items-center justify-center h-6 w-6"></span>
        </button>
        <button
          className={`flex gap-4 items-center justify-between w-[90%] p-[5px] rounded-md h-12  skeleton-loader mb-2`}
        >
          {" "}
          <span className="inline-block rounded-full bg-gray-800 text-white font-bold p-5 text-center flex items-center justify-center h-6 w-6"></span>
        </button>
        <button
          className={`flex gap-4 items-center justify-between w-[90%] p-[5px] rounded-md h-12  skeleton-loader mb-2`}
        >
          {" "}
          <span className="inline-block rounded-full bg-gray-800 text-white font-bold p-5 text-center flex items-center justify-center h-6 w-6"></span>
        </button>
        <button
          className={`flex gap-4 items-center justify-between w-[90%] p-[5px] rounded-md h-12  skeleton-loader mb-2`}
        >
          <span className="inline-block rounded-full bg-gray-800 text-white font-bold p-5 text-center flex items-center justify-center h-6 w-6"></span>
        </button>
        <button
          className={`flex gap-4 items-center justify-between w-[90%] p-[5px] rounded-md h-12  skeleton-loader mb-2`}
        >
          {" "}
          <span className="inline-block rounded-full bg-gray-800 text-white font-bold p-5 text-center flex items-center justify-center h-6 w-6"></span>
        </button>
        <button
          className={`flex gap-4 items-center justify-between w-[90%] p-[5px] rounded-md h-12  skeleton-loader mb-2`}
        >
          {" "}
          <span className="inline-block rounded-full bg-gray-800 text-white font-bold p-5 text-center flex items-center justify-center h-6 w-6"></span>
        </button> 
      </>
    </div>
  );
};

export default Skeleton;
