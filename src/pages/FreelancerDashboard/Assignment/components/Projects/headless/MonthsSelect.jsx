import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { Check, ChevronUp } from "lucide-react";

const Months = [
  { month: 1, month_name: "January" },
  { month: 2, month_name: "February" },
  { month: 3, month_name: "March" },
  { month: 4, month_name: "April" },
  { month: 5, month_name: "May" },
  { month: 6, month_name: "June" },
  { month: 7, month_name: "July" },
  { month: 8, month_name: "August" },
  { month: 9, month_name: "September" },
  { month: 10, month_name: "October" },
  { month: 11, month_name: "November" },
  { month: 12, month_name: "December" },
];

export default function MonthsSelect({ dateFilters, setDateFilters }) {
  return (
    <div className=" w-52 z-40">
      <Listbox
        value={dateFilters.months}
        onChange={(selected) =>
          setDateFilters((prev) => ({ ...prev, months: selected }))
        }
      >
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-[#2C309D] py-3 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block text-gray-200">
              {Months.find((m) => m.month === dateFilters.months)?.month_name ||
                "Select a Month"}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
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
              {Months.map((month, monthIdx) => (
                <Listbox.Option
                  key={monthIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                    }`
                  }
                  value={month.month}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {month.month_name}
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
