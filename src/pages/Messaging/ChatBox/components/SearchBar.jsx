import React from "react";
import { 
    LucideChevronUp,
    LucideChevronDown, 
  } from "lucide-react";

function SearchBar({
  search,
  handleSearch,
  matchedIds,
  searchCount,
  navToPrevMessage,
  navToNextMessage,
}) {
  return (
    <div className="flex items-center justify-center gap-2 w-[100%] relative h-[3rem] shadow-xl px-2 py-1 z-50 absolute bottom-0 left-0 right-0">
      <input
        type="text"
        placeholder="Search..."
        className="absolute md:static text-center md:text-start appearance-none outline-none rounded-sm bg-transparent mr-[2rem] md:mr-[2rem] text-black flex-1 placeholder-black"
        value={search}
        onChange={handleSearch}
        autoFocus
      />

      <span className="flex gap-4 items-center justify-end flex-1">
        {matchedIds.length !== 0 ? (
          <p>
            {searchCount} of {matchedIds.length}
          </p>
        ) : null}
        {searchCount !== 0 && matchedIds.length && (
          <LucideChevronUp
            className="rounded-xl rightText cursor-pointer"
            onClick={(e) => {
              navToPrevMessage(e);
            }}
          />
        )}
        {matchedIds.length ? (
          <LucideChevronDown
            className="rounded-xl rightText cursor-pointer"
            onClick={(e) => {
              navToNextMessage(e);
            }}
          />
        ) : null}
      </span>
    </div>
  );
}

export default SearchBar;
