import React, { useState, useMemo } from "react";
import DropdownSelect from "./ui/DropdownSelect";
import FlightCardContent from "./FlightCardContent";
import FlightCardDetails from "./FlightCardDetails";
import { ChevronDown } from "lucide-react";

const FlightResults = ({ flights }) => {
  const [selectedFlightId, setSelectedFlightId] = useState(null);
  const [sortBy, setSortBy] = useState("price");
  const [showAllFlights, setShowAllFlights] = useState(false);

  const toggleFlight = (flightId) => {
    setSelectedFlightId(selectedFlightId === flightId ? null : flightId);
  };

  const sortedFlights = useMemo(() => {
    return [...flights].sort((a, b) => {
      switch (sortBy) {
        case "price":
          return a.price.raw - b.price.raw;
        case "departure time":
          return new Date(a.legs[0].departure) - new Date(b.legs[0].departure);
        case "arrival time":
          return new Date(a.legs[0].arrival) - new Date(b.legs[0].arrival);
        case "duration":
          return a.legs[0].durationInMinutes - b.legs[0].durationInMinutes;
        case "emissions":
          return (
            (a.eco?.ecoContenderDelta ?? Infinity) -
            (b.eco?.ecoContenderDelta ?? Infinity)
          );
        default:
          return 0;
      }
    });
  }, [flights, sortBy]);

  const handleSort = (value) => {
    setSortBy(value);
    setSelectedFlightId(null);
  };

  const visibleFlights = showAllFlights
    ? sortedFlights
    : sortedFlights.slice(0, 10);

  return (
    <div className="bg-white rounded-lg">
      <div className="flex text-xl font-roboto font-semibold">All Flights</div>
      <div className="flex items-start justify-between text-[#70757a] text-xs font-roboto gap-2 mb-4">
        <p className="text-left py-2">
          Prices include required taxes + fees for 1 adult. Optional charges and
          bag fees may apply. Passenger assistance info.
        </p>
        <DropdownSelect type={"sortBy"} onChange={handleSort} />
      </div>
      <div className="flight-cards">
        {visibleFlights.map((flight) => (
          <div key={flight.id}>
            {/* DESKTOP main card content */}
            <FlightCardContent
              flight={flight}
              selectedFlightId={selectedFlightId}
              toggleFlight={toggleFlight}
              view={"desktop"}
            />

            {/* MOBILE main card content */}
            <FlightCardContent
              flight={flight}
              selectedFlightId={selectedFlightId}
              toggleFlight={toggleFlight}
              view={"mobile"}
            />

            {/* Card details */}
            <div
              className={`transition-all duration-[350ms] ease-in-out overflow-hidden ${
                selectedFlightId === flight.id
                  ? "max-h-[500px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="flight-card-details p-4 bg-gray-50 border border-black mb-2 rounded-es-xl rounded-br-xl">
                <FlightCardDetails flight={flight} />
              </div>
            </div>
          </div>
        ))}

        {/* View More / View Fewer Button */}
        {sortedFlights.length > 10 && (
          <div className="view-more flex ">
            <button
              onClick={() => setShowAllFlights(!showAllFlights)}
              className="w-full px-6 py-6 transition flex items-center gap-4 text-sm font-semibold font-roboto text-[#202124]"
            >
              <ChevronDown
                className={`w-6 h-6 transition-transform duration-300 ease-in-out ${
                  showAllFlights ? "rotate-180" : ""
                }`}
              />
              {showAllFlights ? "View Fewer Flights" : "View More Flights"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightResults;
