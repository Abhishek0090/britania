import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { Check, ChevronUp } from "lucide-react";

const Categories = [
  { label: "0-50", value: "Resit" },
  { label: "51-60", value: "Passing" },
  { label: "61-71", value: "Merit" },
  { label: "71-100", value: "Distinction" },
];

export default function CategorySelect({ dateFilters, setDateFilters }) {
  return (
    <div className="w-52 z-50">
      <Listbox
        value={dateFilters.category} // Changed here
        onChange={
          (selected) =>
            setDateFilters((prev) => ({ ...prev, category: selected })) // Changed here
        }
      >
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-[#2C309D] py-3 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block text-gray-200">
              {dateFilters.category
                ? dateFilters.category
                : "Select a Category"}{" "}
              {/* Changed here */}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              {/* Select a Category */}
              <ChevronUp className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {Categories.map((category, categoryIdx) => (
                <Listbox.Option
                  key={categoryIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                    }`
                  }
                  value={category.value}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {category.label} &nbsp;&nbsp; {category.value}{" "}
                        {/* Changed here */}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <Check className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
