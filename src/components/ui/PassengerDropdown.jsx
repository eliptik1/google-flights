import React, { useState, useRef, useEffect } from "react";
import { Users, Plus, Minus } from "lucide-react";
import { AiFillCaretDown } from "react-icons/ai";

const PassengerDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const defaultPassengers = {
    Adults: 1,
    Children: 0,
    Infants: 0,
    "Infants on lap": 0,
  };

  const [passengers, setPassengers] = useState(defaultPassengers);
  const [tempPassengers, setTempPassengers] = useState(defaultPassengers);

  const descriptions = {
    Children: "Aged 2-11",
    Infants: "In seat",
    "Infants on lap": "On lap",
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setPassengers(tempPassengers); // Cancel effect
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [tempPassengers]);

  const handleIncrement = (type) => {
    setTempPassengers((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
    }));
  };

  const handleDecrement = (type) => {
    setTempPassengers((prev) => ({
      ...prev,
      [type]: type === "Adults" && prev[type] === 1 ? 1 : prev[type] - 1,
    }));
  };

  const handleCancel = () => {
    setTempPassengers(passengers);
    setIsOpen(false);
  };

  const handleDone = () => {
    setPassengers(tempPassengers);
    setIsOpen(false);
  };

  const totalPassengers = Object.values(passengers).reduce((a, b) => a + b, 0);

  return (
    <div className="relative z-20 select-none" ref={dropdownRef}>
      <div className="relative">
        <button
          onClick={() => {
            setTempPassengers(passengers);
            setIsOpen(!isOpen);
          }}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
            isOpen ? "bg-[#e8f0fe]" : "bg-white"
          } group`}
        >
          <Users className="w-4 h-4" />
          <span>{totalPassengers}</span>
          <AiFillCaretDown
            size={12}
            className={`transition-transform duration-[400ms] ${
              isOpen
                ? "rotate-180 text-[#1a73e7]"
                : "text-[#70757a] group-hover:text-black"
            }`}
          />
        </button>

        <div
          className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#1760c3] transform transition-all duration-200 ${
            isOpen ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
          }`}
        />
      </div>

      {isOpen && (
        <div className="absolute max-sm:left-1/2 max-sm:-translate-x-1/2 sm:left-0 w-72 mt-1 bg-white rounded-lg shadow-lg [box-shadow:0_1px_3px_0_rgba(60,64,67,.3),0_4px_8px_3px_rgba(60,64,67,.15)]">
          <div className="p-4 space-y-4">
            {Object.entries(tempPassengers).map(([type, count]) => (
              <div key={type} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-500">{type}</p>
                  {descriptions[type] && (
                    <p className="text-sm text-gray-500 text-left">
                      {descriptions[type]}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleDecrement(type)}
                    className={`p-2 rounded-md text-blue-600 ${
                      count === 0 || (type === "Adults" && count === 1)
                        ? "text-[#bcbdbe] bg-[#e7e8e8] cursor-not-allowed"
                        : "text-[#3378d8] hover:text-[#3062b1] hover:bg-[#e0ecfd] bg-[#e8f0fe] active:bg-[#c8ddfa]"
                    }`}
                    disabled={count === 0 || (type === "Adults" && count === 1)}
                  >
                    <Minus
                      className={`${
                        count === 0 || (type === "Adults" && count === 1)
                          ? "text-[#a6a8a9] "
                          : ""
                      }`}
                      size={16}
                    />
                  </button>
                  <span className="w-4 text-center">{count}</span>
                  <button
                    onClick={() => handleIncrement(type)}
                    className="p-2 rounded-md text-[#3378d8] hover:text-[#3062b1] hover:bg-[#e0ecfd] bg-[#e8f0fe] active:bg-[#c8ddfa]"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-3 p-4 border-t">
            <button
              onClick={handleCancel}
              className="px-4 py-2 font-semibold text-[#3378d8] hover:text-[#3062b1] hover:bg-blue-50 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleDone}
              className="px-4 py-2 font-semibold text-[#3378d8] hover:text-[#3062b1] hover:bg-blue-50 rounded"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PassengerDropdown;
