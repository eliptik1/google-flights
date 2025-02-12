import { PlaneTakeoff } from "lucide-react";
import DropdownSelect from "./DropdownSelect";
import PassengerDropdown from "./PassengerDropdown";
import { ArrowLeftRight } from "lucide-react";
import { MapPin } from "lucide-react";
import DatePicker from "./DatePicker";
import { Search } from "lucide-react";

const SearchField = ({
  from,
  setFrom,
  to,
  setTo,
  handleSearch,
  testSearch,
  setDate,
  loading,
}) => {
  return (
    <div className="mx-auto mb-16">
      <div className="relative bg-white rounded-xl [box-shadow:0_1px_3px_0_rgba(60,64,67,.3),0_4px_8px_3px_rgba(60,64,67,.15)] max-md:p-2 p-6 pb-12 max-md:pb-8">
        <div className="flex flex-nowrap gap-4 mb-6 z-50 relative">
          {/* Trip Type Selector */}
          <DropdownSelect type={"trip"} />

          {/* Passenger Count */}
          <PassengerDropdown />

          {/* Class Selector */}
          <DropdownSelect type={"class"} />
        </div>

        <div className="flex w-full gap-4 max-sm:flex-wrap">
          <div className="flex w-full gap-3 relative">
            {/* From Input */}
            <div className="h-12 bg-white w-3 absolute left-1/2 -translate-x-1/2 bottom-0 z-10 "></div>
            <div className="relative w-full ">
              <div className="flex w-full lg:max-w-[270px] items-center border border-[#cfcfcf] rounded-md p-3 group hover:border-[#9aa0a6]">
                <PlaneTakeoff className="w-5 h-5 text-gray-500 mr-2" />
                <input
                  type="text"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  placeholder="Where from?"
                  className="w-full outline-none placeholder-gray-500 "
                />
                <div className="absolute -right-5 top-1/2 -translate-y-1/2 bg-white border border-[#cfcfcf] group-hover:border-[#9aa0a6]  rounded-full p-4 "></div>
              </div>
            </div>

            {/* Swap Button */}
            <div className="absolute flex items-center right-1/2 top-1/2 translate-x-1/2 z-20 -translate-y-1/2">
              <button className="bg-white rounded-full p-[6px] ">
                <ArrowLeftRight className="w-5 h-5 text-gray-700" />
              </button>
            </div>
            {/* To Input */}
            <div className="relative w-full">
              <div className="flex w-full lg:max-w-[270px]  items-center border border-[#cfcfcf] rounded-md p-3 group hover:border-[#9aa0a6] ">
                <MapPin className="w-5 h-5 text-gray-500 mr-2" />
                <input
                  type="text"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  placeholder="Where to?"
                  className="w-full outline-none placeholder-gray-500 "
                />
                <div className="absolute -left-5 top-1/2 -translate-y-1/2 bg-white border border-[#cfcfcf] group-hover:border-[#9aa0a6] rounded-full p-4 "></div>
              </div>
            </div>
          </div>

          {/* Date Selector */}
          <div className="lg:relative w-full">
            <DatePicker setDate={setDate} />
          </div>
        </div>

        {/* Search Button */}
        <div>
          <div className="w-full flex justify-center mt-8 absolute bottom-0 left-1/2 -translate-x-1/2  translate-y-1/2 ">
            <button
              onClick={handleSearch}
              disabled={loading}
              className={`font-semibold px-4 py-2 rounded-full flex items-center gap-2 transition-colors [box-shadow:0_1px_3px_0_rgba(60,64,67,.3),0_4px_8px_3px_rgba(60,64,67,.15)]
    ${
      loading
        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
        : "bg-[#1a73e8] text-white hover:bg-[#1b66c9]"
    }`}
            >
              <Search className="w-5 h-5" />
              Search
            </button>
            <button onClick={testSearch} className="bg-blue-500 p-2">
              Test Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SearchField;
