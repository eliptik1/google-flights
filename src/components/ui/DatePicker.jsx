import React, { useState, useRef, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
} from "lucide-react";
import { ArrowLeft } from "lucide-react";

const DatePicker = ({ setDate }) => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState(today);
  const [isOpen, setIsOpen] = useState(false);
  const calendarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const formattedDate = formatDateToYYYYMMDD(selectedDate);
    setDate(formattedDate);
  }, [selectedDate]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysOfWeek = [
    { key: "mon", label: "M" },
    { key: "tue", label: "T" },
    { key: "wed", label: "W" },
    { key: "thu", label: "T" },
    { key: "fri", label: "F" },
    { key: "sat", label: "S" },
    { key: "sun", label: "S" },
  ];

  const formatDateToYYYYMMDD = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const maxDate = new Date(
    today.getFullYear() + 1,
    today.getMonth(),
    today.getDate()
  );

  const isDateDisabled = (date) => {
    const normalizedDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    const normalizedToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    return normalizedDate < normalizedToday || date > maxDate;
  };

  const canGoBack = () => {
    const previousMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );
    return (
      previousMonth.getMonth() >= today.getMonth() &&
      previousMonth.getFullYear() >= today.getFullYear()
    );
  };

  const canGoForward = () => {
    const nextMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 2,
      1
    );
    return nextMonth <= maxDate;
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1;
  };

  const generateCalendarDays = (date) => {
    const daysInMonth = getDaysInMonth(date);
    const firstDay = getFirstDayOfMonth(date);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push({ day: null, key: `empty-${i}` });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const currentDay = new Date(date.getFullYear(), date.getMonth(), i);
      days.push({
        day: i,
        key: `day-${i}`,
        disabled: isDateDisabled(currentDay),
      });
    }

    return days;
  };

  const nextMonth = () => {
    if (canGoForward()) {
      setCurrentDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
      );
    }
  };

  const prevMonth = () => {
    if (canGoBack()) {
      setCurrentDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
      );
    }
  };

  const isToday = (day, monthDate) => {
    if (!day) return false;
    const checkDate = new Date(
      monthDate.getFullYear(),
      monthDate.getMonth(),
      day
    );
    return checkDate.toDateString() === today.toDateString();
  };

  const isSelected = (day, monthDate) => {
    if (!day) return false;
    const checkDate = new Date(
      monthDate.getFullYear(),
      monthDate.getMonth(),
      day
    );
    return checkDate.toDateString() === selectedDate.toDateString();
  };

  const handleDateClick = (day, monthDate) => {
    if (day) {
      const newDate = new Date(
        monthDate.getFullYear(),
        monthDate.getMonth(),
        day
      );
      if (!isDateDisabled(newDate)) {
        setSelectedDate(newDate);
      }
    }
  };

  const formatDate = (date) => {
    const currentYear = new Date().getFullYear();
    return date.toLocaleDateString("en-US", {
      weekday: "short", // "Mon"
      month: "short", // "Feb"
      day: "numeric", // "10"
      ...(date.getFullYear() !== currentYear ? { year: "numeric" } : {}), //2026
    });
  };

  const handleNextDay = () => {
    const nextDay = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate() + 1
    );
    if (!isDateDisabled(nextDay)) {
      setSelectedDate(nextDay);
    }
  };

  const handlePrevDay = () => {
    const prevDay = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate() - 1
    );
    if (!isDateDisabled(prevDay)) {
      setSelectedDate(prevDay);
    }
  };

  const isNextDayDisabled = isDateDisabled(
    new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate() + 1
    )
  );

  const isPrevDayDisabled = isDateDisabled(
    new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate() - 1
    )
  );

  return (
    <div className="" ref={calendarRef}>
      {/* Date Input */}
      <div className="relative select-none">
        <input
          type="text"
          readOnly
          value={formatDate(selectedDate)}
          onClick={() => setIsOpen(!isOpen)}
          className="w-full pl-10 px-4 p-3 border border-[#cfcfcf] hover:border-[#9aa0a6] rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <CalendarIcon className="absolute pointer-events-none left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <div className="absolute right-3 flex top-1/2 -translate-y-1/2 items-center gap-1 h-full">
          <button
            onClick={handlePrevDay}
            disabled={isPrevDayDisabled}
            className={`w-full h-full text-gray-400 ${
              isPrevDayDisabled
                ? "opacity-50 cursor-not-allowed"
                : "active:bg-slate-200"
            }`}
          >
            <ChevronLeft />
          </button>
          <button
            onClick={handleNextDay}
            disabled={isNextDayDisabled}
            className={`w-full h-full text-gray-400 ${
              isNextDayDisabled
                ? "opacity-50 cursor-not-allowed"
                : "active:bg-slate-200"
            }`}
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      {/* Calendar Dropdown */}
      {isOpen && (
        <div className="fixed max-sm:inset-0 lg:absolute z-[100] max-lg:-right-8 max-md:left-0 md:right-0 select-none mt-1 bg-white rounded-lg [box-shadow:0_1px_3px_0_rgba(60,64,67,.3),0_4px_8px_3px_rgba(60,64,67,.15)]">
          <div className="sm:hidden flex items-center gap-4 pr-12 justify-center py-3 border-t border-gray-300 ">
            <button onClick={() => setIsOpen(!isOpen)}>
              <ArrowLeft />
            </button>
            <div className="relative">
              <input
                type="text"
                readOnly
                value={formatDate(selectedDate)}
                className="w-full pl-10 px-4 p-3 border rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>
          <div className="sm:p-8 w-[780px] max-lg:w-dvw ">
            {/* Desktop view: Two columns */}
            <div className="hidden sm:block">
              <div className="flex justify-between items-center mb-4 w-full">
                <button
                  onClick={prevMonth}
                  disabled={!canGoBack()}
                  className={`p-2 rounded-full ${
                    canGoBack()
                      ? "hover:bg-gray-100 text-gray-600"
                      : "text-gray-300 cursor-not-allowed"
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex gap-16">
                  <div>
                    <h2 className="text-lg font-medium text-center">
                      {months[currentDate.getMonth()]}
                    </h2>
                  </div>
                  <div>
                    <h2 className="text-lg font-medium text-center">
                      {months[(currentDate.getMonth() + 1) % 12]}
                    </h2>
                  </div>
                </div>

                <button
                  onClick={nextMonth}
                  disabled={!canGoForward()}
                  className={`p-2 rounded-full ${
                    canGoForward()
                      ? "hover:bg-gray-100 text-gray-600"
                      : "text-gray-300 cursor-not-allowed"
                  }`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-8">
                {[
                  currentDate,
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth() + 1
                  ),
                ].map((monthDate, monthIndex) => (
                  <div key={`month-${monthIndex}`}>
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {daysOfWeek.map(({ key, label }) => (
                        <div
                          key={`${monthIndex}-${key}`}
                          className="text-center text-sm text-gray-600"
                        >
                          {label}
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-7">
                      {generateCalendarDays(monthDate).map(
                        ({ day, key, disabled }) => (
                          <div
                            key={`${monthIndex}-${key}`}
                            className={`
                        aspect-square rounded-full flex items-center justify-center text-sm
                        ${
                          day && !disabled
                            ? "cursor-pointer hover:bg-gray-300"
                            : "cursor-default"
                        }
                        ${disabled ? "text-gray-300" : ""}
                        ${
                          isToday(day, monthDate)
                            ? " text-blue-600 font-medium"
                            : ""
                        }
                        ${
                          isSelected(day, monthDate)
                            ? "bg-[#1a73e8] text-white hover:!bg-[#1a73e8] rounded-full"
                            : ""
                        }
                      `}
                            onClick={() =>
                              !disabled && handleDateClick(day, monthDate)
                            }
                          >
                            {day}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile view: Single column with all months */}
            <div className="sm:hidden max-h-[80dvh] overflow-y-auto px-4">
              {Array.from({ length: 12 }, (_, i) => {
                const monthDate = new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth() + i
                );
                return (
                  <div key={`month-${i}`} className="mb-8">
                    <h2 className="text-lg font-medium text-center mb-4">
                      {months[monthDate.getMonth()]}
                    </h2>

                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {daysOfWeek.map(({ key, label }) => (
                        <div
                          key={key}
                          className="text-center text-sm text-gray-600"
                        >
                          {label}
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-7">
                      {generateCalendarDays(monthDate).map(
                        ({ day, key, disabled }) => (
                          <div
                            key={key}
                            className={`
                        aspect-square rounded-full flex items-center justify-center text-sm
                        ${
                          day && !disabled
                            ? "cursor-pointer hover:bg-gray-300"
                            : "cursor-default"
                        }
                        ${disabled ? "text-gray-300" : ""}
                        ${
                          isToday(day, monthDate)
                            ? " text-blue-600 font-medium"
                            : ""
                        }
                        ${
                          isSelected(day, monthDate)
                            ? "bg-[#1a73e8] text-white hover:!bg-[#1a73e8] rounded-full"
                            : ""
                        }
                      `}
                            onClick={() =>
                              !disabled && handleDateClick(day, monthDate)
                            }
                          >
                            {day}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex justify-center py-3 border-t border-gray-300">
            <button
              onClick={() => setIsOpen(false)}
              className="bg-[#1a73e8] text-white text-sm font-semibold px-4 py-2 rounded-full flex items-center gap-2 hover:bg-[#1b66c9] transition-colors [box-shadow:0_1px_3px_0_rgba(60,64,67,.3),0_4px_8px_3px_rgba(60,64,67,.15)]"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
