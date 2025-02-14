import { useState } from "react";
import { searchFlights, getFlightDetails } from "../api/flights";
import { searchAirport } from "../api/airports";
import { useEffect } from "react";
import { ArrowLeftRight, Search, PlaneTakeoff, MapPin } from "lucide-react";
import FlightResults from "./FlightResults";
import testData from "../data/testData.json";
import DropdownSelect from "./ui/DropdownSelect";
import PassengerDropdown from "./ui/PassengerDropdown";
import DatePicker from "./ui/DatePicker";
import { VscLoading } from "react-icons/vsc";
import { useLocation, useNavigate } from "react-router-dom";
import { useFlightContext } from "./context/FlightContext";

export const FlightSearch = () => {
  const { searchParams, setSearchParams, flightResults, setFlightResults } =
    useFlightContext();
  const [from, setFrom] = useState(searchParams?.from || "");
  const [to, setTo] = useState(searchParams?.to || "");
  const [date, setDate] = useState(
    searchParams?.date || new Date().toISOString().split("T")[0]
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setFlightResults([]);
      setSearchParams(null);
      localStorage.removeItem("flightsSessionId");
    }
  }, [location.pathname]);

  const handleSearch = async () => {
    if (from == "" || to == "") return;

    setLoading(true);
    setError(null);
    setFlightResults([]);

    try {
      // 1. step: find airport code for "where from"
      const fromAirports = await searchAirport(from);
      console.log("fromAirports:", fromAirports);
      if (!fromAirports.data || fromAirports.data.length === 0) {
        throw new Error("No airports found for origin city");
      }

      let originSkyId;
      let originEntityId;
      if (
        fromAirports.data.some(
          (airport) => airport.navigation.entityType == "CITY"
        )
      ) {
        originSkyId = fromAirports.data.find(
          (airport) => airport.navigation.entityType === "CITY"
        ).skyId;
        originEntityId = fromAirports.data.find(
          (airport) => airport.navigation.entityType === "CITY"
        ).entityId;
      } else {
        originSkyId = fromAirports.data[0].skyId;
        originEntityId = fromAirports.data[0].entityId;
      }

      // 2. step: find airport code for "where to"
      const toAirports = await searchAirport(to);
      console.log("toAirports:", toAirports);
      if (!toAirports.data || toAirports.data.length === 0) {
        throw new Error("No airports found for destination city");
      }

      let destinationSkyId;
      let destinationEntityId;

      if (
        toAirports.data.some(
          (airport) => airport.navigation.entityType == "CITY"
        )
      ) {
        destinationSkyId = toAirports.data.find(
          (airport) => airport.navigation.entityType === "CITY"
        ).skyId;
        destinationEntityId = toAirports.data.find(
          (airport) => airport.navigation.entityType === "CITY"
        ).entityId;
      } else {
        destinationSkyId = toAirports.data[0].skyId;
        destinationEntityId = toAirports.data[0].entityId;
      }

      // 3.step search for flights
      const searchResult = await searchFlights(
        originSkyId,
        destinationSkyId,
        originEntityId,
        destinationEntityId,
        date
      );
      if (!searchResult.data?.itineraries) {
        throw new Error("No flights found");
      }
      console.log("searchResult:", searchResult);

      //first save the data to local storage
      localStorage.setItem(
        "flightResults",
        JSON.stringify(searchResult.data.itineraries)
      );
      localStorage.setItem("searchParams", JSON.stringify({ from, to, date }));
      localStorage.setItem("flightsSessionId", searchResult.sessionId);

      //then set the state
      setFlightResults(searchResult.data.itineraries);
      setSearchParams({ from, to, date });

      await new Promise((resolve) => setTimeout(resolve, 100)); //add a small delay for better UX
      navigate("/flights");
    } catch (err) {
      setError(err);
      setFlightResults([]);
      localStorage.removeItem("flightResults");
      localStorage.removeItem("searchParams");
      localStorage.removeItem("flightsSessionId");
    } finally {
      setLoading(false);
    }
  };

  const testSearch = async () => {
    setLoading(true);
    setError(null);
    setFlightResults([]);

    try {
      localStorage.setItem(
        "flightResults",
        JSON.stringify(testData.data.itineraries)
      );
      localStorage.setItem("searchParams", JSON.stringify({ from, to, date }));
      localStorage.setItem("flightsSessionId", testData.sessionId);

      setFlightResults(testData.data.itineraries);
      setSearchParams({ from, to, date });

      await new Promise((resolve) => setTimeout(resolve, 2000));

      setFlightResults(testData.data.itineraries);
      setSearchParams({ from, to, date });

      navigate("/flights");
    } catch (err) {
      setError(err);
      setFlightResults([]);
      localStorage.removeItem("flightResults");
      localStorage.removeItem("searchParams");
      localStorage.removeItem("flightsSessionId");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mb-16">
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
              {/* <button onClick={testSearch} className="bg-blue-500 p-2">
                Test Search
              </button> */}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {error && (
          <div className="my-6 font-semibold">Error: {error.message}</div>
        )}

        {loading ? (
          <div className="flex justify-center text-gray-400 my-16">
            <VscLoading size={48} className="animate-spin stroke-[0.4px]" />
          </div>
        ) : (
          ""
        )}
        {flightResults.length >= 1 && <FlightResults />}
      </div>
    </>
  );
};

export default FlightSearch;
