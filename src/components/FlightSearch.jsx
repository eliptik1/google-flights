import { useState } from "react";
import { searchFlights, getFlightDetails } from "../api/flights";
import { searchAirport } from "../api/airports";
import { useEffect } from "react";
import {
  ArrowRight,
  Users,
  ChevronDown,
  Map,
  Calendar,
  ArrowLeftRight,
  ChevronLeft,
  ChevronRight,
  Search,
  PlaneTakeoff,
  MapPin,
} from "lucide-react";
import FlightResults from "./FlightResults";
import testData from "../data/testData.json";
import DropdownSelect from "./ui/DropdownSelect";
import PassengerDropdown from "./ui/PassengerDropdown";
import DatePicker from "./ui/DatePicker";

export const FlightSearch = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {}, []);

  const handleSearch = async () => {
    if (from == "" || to == "") return;
    setLoading(true);
    setError(null);

    try {
      // 1. step: find airport code for "where from"
      const fromAirports = await searchAirport(from);

      console.log("fromAirports:", fromAirports);

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
      console.log("originEntityId:", originEntityId);

      // 2. step: find airport code for "where to"
      const toAirports = await searchAirport(to);
      console.log("toAirports:", toAirports);

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
      console.log("destinationEntityId:", destinationEntityId);

      // 3.step search for flights
      const searchResult = await searchFlights(
        originSkyId,
        destinationSkyId,
        originEntityId,
        destinationEntityId,
        date
      );
      console.log("searchResult:", searchResult);
      setFlights(searchResult.data.itineraries || []);

      // 4.step: get flight details
      // const flightDetails = await getFlightDetails(searchResult.sessionId);
      // setFlights(flightDetails);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const testSearch = async () => {
    setFlights(testData.data.itineraries || []);
  };

  return (
    <>
      <div className="max-w-5xl mx-auto mb-16">
        <div className="relative bg-white rounded-xl [box-shadow:0_1px_3px_0_rgba(60,64,67,.3),0_4px_8px_3px_rgba(60,64,67,.15)] max-md:p-2 p-6 pb-12 max-md:pb-8">
          <div className="flex flex-nowrap gap-4 mb-6 z-50 relative">
            {/* Trip Type Selector */}
            <DropdownSelect type={"trip"} />

            {/* Passenger Count */}
            <PassengerDropdown />

            {/* Class Selector */}
            <DropdownSelect type={"class"} />
          </div>

          <div className="flex w-full gap-4 max-lg:flex-wrap">
            <div className="flex w-full gap-3 relative">
              {/* From Input */}
              <div className="h-12 bg-white w-3 absolute left-1/2 -translate-x-1/2 bottom-0 z-10 "></div>
              <div className="relative w-full ">
                <div className="flex w-full lg:max-w-[270px] items-center border border-[#cfcfcf] rounded-md p-3 group hover:border-[#9aa0a6]">
                  <PlaneTakeoff className="w-5 h-5 text-gray-500 mr-2" />
                  <input
                    type="text"
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
                    placeholder="Where to?"
                    className="w-full outline-none placeholder-gray-500 "
                  />
                  <div className="absolute -left-5 top-1/2 -translate-y-1/2 bg-white border border-[#cfcfcf] group-hover:border-[#9aa0a6] rounded-full p-4 "></div>
                </div>
              </div>
            </div>

            {/* Date Selector */}
            <div className="lg:relative w-full">
              <DatePicker />
            </div>
          </div>

          {/* Search Button */}
          <div>
            <div className="w-full flex justify-center mt-8 absolute bottom-0 left-1/2 -translate-x-1/2  translate-y-1/2 ">
              <button className="bg-[#1a73e8] text-white font-semibold px-4 py-2 rounded-full flex items-center gap-2 hover:bg-[#1b66c9] transition-colors [box-shadow:0_1px_3px_0_rgba(60,64,67,.3),0_4px_8px_3px_rgba(60,64,67,.15)]">
                <Search className="w-5 h-5 " />
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h1>Flight Search</h1>
        <div>
          <label>
            Where from?:
            <input
              type="text"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="border border-gray-400 p-2"
              placeholder="City or airport code"
            />
          </label>
        </div>
        <div>
          <label>
            Where to?:
            <input
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="border border-gray-400 p-2"
              placeholder="City or airport code"
            />
          </label>
        </div>
        <div>
          <label>
            Date:
            <input
              type="date"
              value={date}
              min={today}
              className="border border-gray-400"
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
        </div>
        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-blue-300 p-2"
        >
          {loading ? "Loading..." : "Search"}
        </button>

        <button onClick={testSearch} className="bg-blue-500 p-2">
          Test Search
        </button>

        {error && <div>Error: {error.message}</div>}

        <div>
          <FlightResults flights={flights} />
          <ul>
            {/* {flights.map((flight, index) => (
            <li key={index}>
              <p>Flight ID: {flight.id}</p>
              <p>
                Price: {flight.price.amount} {flight.price.currency}
              </p>
            </li>
          ))} */}
          </ul>
        </div>
      </div>
    </>
  );
};

export default FlightSearch;
