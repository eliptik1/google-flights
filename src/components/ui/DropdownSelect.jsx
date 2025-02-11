import React, { useState, useRef, useEffect } from "react";
import { Check } from "lucide-react";
import { AiFillCaretDown } from "react-icons/ai";
import { Users } from "lucide-react";
import { ArrowLeftRight } from "lucide-react";
import { Waypoints } from "lucide-react";
import { MoveRight } from "lucide-react";
import { ArrowUpDown } from "lucide-react";

const DROPDOWN_OPTIONS = {
  trip: [
    { id: 1, name: "Round trip" },
    { id: 2, name: "One way" },
    { id: 3, name: "Multi-city" },
  ],

  class: [
    { id: 1, name: "Economy" },
    { id: 2, name: "Premium economy" },
    { id: 3, name: "Business" },
    { id: 4, name: "First" },
  ],

  sortBy: [
    { id: 1, name: "top flights" },
    { id: 2, name: "price" },
    { id: 3, name: "departure time" },
    { id: 4, name: "arrival time" },
    { id: 5, name: "duration" },
    { id: 6, name: "emissions" },
  ],
};

const DEFAULT_VALUES = {
  trip: "One way",
  class: "Economy",
  sortBy: "top flights",
};

const DropdownSelect = ({ type, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(DEFAULT_VALUES[type]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onChange(option.name);
    setSelectedClass(option.name);
    setIsOpen(false);
  };

  const options = DROPDOWN_OPTIONS[type] || [];

  return (
    <div className="relative select-none" ref={dropdownRef}>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2 text-base px-3 py-2 rounded-lg transition-colors duration-200 ${
            isOpen ? "bg-[#e8f0fe]" : "bg-white"
          } ${
            type === "sortBy"
              ? "text-[#1a73e8] hover:text-[#1750a8] text-sm font-semibold text-nowrap"
              : ""
          } group`}
        >
          {selectedClass === "Round trip" && (
            <ArrowLeftRight className="w-4 h-4" />
          )}
          {selectedClass === "One way" && <MoveRight className="w-4 h-4" />}
          {selectedClass === "Multi-city" && <Waypoints className="w-4 h-4" />}
          {type === "passenger" && <Users className="w-4 h-4" />}
          {type === "sortBy" && (
            <>
              <ArrowUpDown className="min-w-4 min-h-4" />
            </>
          )}
          <span>
            {type === "sortBy" && "Sorted by"} {selectedClass}
          </span>
          <AiFillCaretDown
            size={12}
            className={`transition-transform duration-[400ms] ${
              isOpen
                ? "rotate-180 text-[#1a73e7]"
                : "text-[#70757a] group-hover:text-black"
            }`}
          />
        </button>

        {/* blue line */}
        <div
          className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#1760c3] transform transition-all duration-200 ${
            isOpen ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
          }`}
        />
      </div>

      {isOpen && (
        <div
          className={`absolute ${type === "class" ? "max-sm:right-0" : ""} ${
            type === "sortBy" ? "text-black right-0 [&_span]:py-1" : ""
          }
          z-10 w-48 mt-1 bg-white rounded-lg text-base shadow-lg overflow-hidden [box-shadow:0_1px_3px_0_rgba(60,64,67,.3),0_4px_8px_3px_rgba(60,64,67,.15)]`}
        >
          {options.map((option) => (
            <div
              key={option.id}
              onClick={() => handleSelect(option)}
              className={`${
                option.name === selectedClass
                  ? "bg-[#cfe1fb]"
                  : "active:bg-[#d7d7d7] active:transition-all active:duration-300"
              } px-4 py-2 cursor-pointer flex items-center gap-2 text-nowrap `}
            >
              {option.name === selectedClass && (
                <span className="">
                  <Check size={18} />
                </span>
              )}
              <span className={"capitalize"}>{option.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownSelect;
