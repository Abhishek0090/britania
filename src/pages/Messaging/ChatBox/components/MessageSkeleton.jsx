import React from "react";

const MessageSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 p-2   m-auto justify-center w-[100%]">
      <>
        <div className="flex  justify-start gap-4">
          <button
            className={`flex gap-4 items-center justify-start w-[50%] md:w-[40%] p-[5px] rounded-md h-24 rounded-tl-none  skeleton-loader-front mb-2`}
          ></button>
        </div>
        <div className="flex  justify-end gap-4">
          <button
            className={`flex gap-4 items-center justify-end w-[50%] md:w-[40%] p-[5px] rounded-md h-24 rounded-tr-none  skeleton-loader-front mb-2`}
          ></button>
        </div>
        <div className="flex justify-start gap-4">
          <button
            className={`flex gap-4 items-center justify-between w-[50%] md:w-[40%] p-[5px] rounded-md h-24 rounded-tl-none  skeleton-loader-front mb-2`}
          ></button>
        </div>
        <div  className="flex justify-end gap-4">
          <button
            className={`flex gap-4 items-center justify-between w-[50%] md:w-[40%] p-[5px] rounded-md h-24 rounded-tr-none  skeleton-loader-front mb-2`}
          ></button>
        </div>
      </>
    </div>
  );
};

export default MessageSkeleton;
