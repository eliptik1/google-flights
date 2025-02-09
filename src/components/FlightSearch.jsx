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
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import FlightResults from "./FlightResults";
import testData from "../data/testData.json";

export const FlightSearch = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

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

      <div className="max-w-5xl mx-auto p-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex flex-wrap gap-4 mb-6">
            {/* Trip Type Selector */}
            <div className="flex items-center gap-2 cursor-pointer">
              <ArrowRight className="w-4 h-4" />
              <span>One way</span>
              <ChevronDown className="w-4 h-4" />
            </div>

            {/* Passenger Count */}
            <div className="flex items-center gap-2 cursor-pointer">
              <Users className="w-4 h-4" />
              <span>1</span>
              <ChevronDown className="w-4 h-4" />
            </div>

            {/* Class Selector */}
            <div className="flex items-center gap-2 cursor-pointer">
              <span>Economy</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* From Input */}
            <div className="relative">
              <div className="flex items-center border rounded-lg p-3 hover:border-blue-500 cursor-pointer">
                <Map className="w-5 h-5 text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Where from?"
                  className="w-full outline-none placeholder-gray-500"
                />
              </div>
            </div>

            {/* Swap Button */}
            <div className="absolute left-1/2 top-1/2 md:relative md:left-auto md:top-auto z-10 -translate-x-1/2 -translate-y-1/2 md:translate-x-0 md:translate-y-0">
              <button className="bg-white rounded-full p-2 shadow-md hover:shadow-lg absolute md:relative left-0 top-0 md:top-1/2 md:-translate-y-1/2">
                <ArrowLeftRight className="w-5 h-5 text-blue-500" />
              </button>
            </div>

            {/* To Input */}
            <div className="relative">
              <div className="flex items-center border rounded-lg p-3 hover:border-blue-500 cursor-pointer">
                <Map className="w-5 h-5 text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Where to?"
                  className="w-full outline-none placeholder-gray-500"
                />
              </div>
            </div>

            {/* Date Selector */}
            <div className="relative">
              <div className="flex items-center justify-between border rounded-lg p-3 hover:border-blue-500 cursor-pointer">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-gray-400 mr-2" />
                  <span>Sun, Feb 9</span>
                </div>
                <div className="flex items-center gap-1">
                  <ChevronLeft className="w-5 h-5 text-gray-400" />
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Search Button */}
          <div className="flex justify-center mt-8">
            <button className="bg-blue-500 text-white px-8 py-3 rounded-full flex items-center gap-2 hover:bg-blue-600 transition-colors">
              <Search className="w-5 h-5" />
              Search
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FlightSearch;
