import React from 'react'; 
import { 
    LucideChevronUp,
    LucideChevronDown, 
  } from "lucide-react";

function SearchBar({
  search,
  handleSearch,
  searchCount,
  matchedIds,
  navToPrevMessage,
  navToNextMessage,
}) {
  return (
    <div
      className="flex items-center justify-end md:justify-between gap-2 relative h-[3rem] shadow-xl px-2 py-1 z-50 absolute bottom-0 left-0 right-0"
      style={{ width: 'inherit' }}
    >
      <input
        type="text"
        placeholder="Search..."
        className= " text-center md:text-start appearance:none outline-none rounded-sm bg-transparent text-white"
        style={{ width: '80%' }}
        value={search}
        onChange={handleSearch}
        autoFocus
      />
      <span className="flex gap-4 items-center w-auto md:w-[10rem]">
        {matchedIds.length !== 0 ? (
          <p className='text-gray-300'>
            {searchCount} of {matchedIds.length}
          </p>
        ) : null}
        {searchCount !== 0 && matchedIds.length && (
          <LucideChevronUp
            className="rounded-xl bg-blue141 text-white cursor-pointer"
            onClick={(e) => {
              navToPrevMessage(e);
            }}
          />
        )}
        {matchedIds.length ? (
          <LucideChevronDown
            className="rounded-xl bg-blue141 text-white cursor-pointer"
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
