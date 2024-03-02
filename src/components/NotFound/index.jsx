import React from 'react';

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center text-7xl font-league font-Bold h-screen w-full ">
      <h1>404 - Not Found</h1>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        type="button"
        onClick={() => {
          window.history.back();
        }}
      >
        Go Back
      </button>
    </div>
  );
}
