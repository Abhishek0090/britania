import React from "react";
import { LucideChevronDown, LucideChevronUp } from "lucide-react";

const SearchBar = ({
  search,
  handleSearch,
  searchCount,
  matchedIds,
  navToPrevMessage,
  navToNextMessage,
}) => {
  return (
    <div
      className="flex items-center justify-end md:justify-between gap-2 relative h-[3rem] shadow-xl px-6 py-1 z-50 absolute bottom-0 left-0 right-0 bg-gray-800"
      style={{ width: "inherit" }}
    >
      <input
        type="text"
        placeholder="Search..."
        className="absolute md:static text-center md:text-start appearance-none outline-none rounded-sm bg-transparent mr-[4rem] md:mr-0 text-white w-[70%] md:w-[80%]"
        value={search}
        onChange={handleSearch}
        autoFocus
      />
      <span className="flex gap-4 items-center w-auto md:w-[10rem]">
        {matchedIds.length !== 0 ? (
          <p>
            {searchCount} of {matchedIds.length}
          </p>
        ) : null}
        {searchCount !== 0 && matchedIds.length ? (
          <LucideChevronUp
            className="rounded-xl text-gray-200 bg-gray-900 cursor-pointer"
            onClick={(e) => {
              navToPrevMessage(e);
            }}
          />
        ) : null}
        {matchedIds.length ? (
          <LucideChevronDown
            className="rounded-xl text-gray-200 bg-gray-900 cursor-pointer"
            onClick={(e) => {
              navToNextMessage(e);
            }}
          />
        ) : null}
      </span>
    </div>
  );
};

export default SearchBar;
