import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react"; // İkonlar için
import DropdownSelect from "./ui/DropdownSelect";
import { FaEarthAfrica } from "react-icons/fa6";
import { MdAirlineSeatLegroomNormal } from "react-icons/md";

const FlightResults = ({ flights }) => {
  const [selectedFlightId, setSelectedFlightId] = useState(null);

  const toggleFlight = (flightId) => {
    setSelectedFlightId(selectedFlightId === flightId ? null : flightId);
  };

  return (
    <div className=" bg-white rounded-lg max-md:px-2">
      <div className="flex text-xl font-roboto font-semibold">All Flights</div>
      <div className="flex items-center justify-between text-[#70757a] text-xs font-roboto">
        <p className="text-left">
          Prices include required taxes + fees for 1 adult. Optional charges and
          bag fees may apply. Passenger assistance info.
        </p>
        <DropdownSelect type={"sortBy"} />
      </div>
      <div className="flight-cards">
        {flights.map((flight) => (
          <div key={flight.id} className={`   [&>div]:last:border-b  `}>
            {/* MOBILE main card content */}
            <div
              className="md:hidden p-3  pr-6 grid grid-cols-[auto_auto_auto_auto_1fr_auto] grid-rows-[auto_auto_auto] justify-items-start items-center cursor-pointer text-base text-[#202124] font-roboto border border-b-0 border-black"
              onClick={() => toggleFlight(flight.id)}
            >
              {/* 1. Logo */}
              <div className="flex items-center justify-center px-3">
                <img
                  src={flight.legs[0].carriers.marketing[0].logoUrl}
                  alt={flight.legs[0].carriers.marketing[0].name}
                  className="min-h-6 min-w-6"
                />
              </div>

              {/* 2. Departure Time */}
              <div className="flex flex-col items-center text-center font-medium  overflow-hidden text-ellipsis">
                <p className="whitespace-nowrap">
                  {new Date(flight.legs[0].departure).toLocaleTimeString(
                    "en-US",
                    {
                      hour: "numeric",
                      minute: "2-digit",
                    }
                  )}
                </p>
              </div>

              {/* origin airport Code */}
              <p className="text-[#70757a] text-sm col-start-2 row-start-2">
                {flight.legs[0].origin.displayCode}
              </p>

              {/* 3. Arrow Icon */}
              <div className="flex justify-center flex-shrink-0">
                <img
                  className="w-8 m-[2px]"
                  src="https://www.gstatic.com/flights/app/2x/arrow_0.png"
                  alt=""
                />
              </div>

              {/* 4. Arrival Time */}
              <div className="flex flex-col items-center">
                <p className="font-medium whitespace-nowrap overflow-hidden text-ellipsis max-w-[100px]">
                  {new Date(flight.legs[0].arrival).toLocaleTimeString(
                    "en-US",
                    {
                      hour: "numeric",
                      minute: "2-digit",
                    }
                  )}
                </p>
              </div>

              {/* destination airport Code */}
              <p className="text-[#70757a] text-sm col-start-4 row-start-2">
                {flight.legs[0].destination.displayCode}
              </p>

              {/* 5. Flight Details */}
              <div className="flex w-full justify-between col-start-2 row-start-3 col-end-7 text-xs text-[#70757a]">
                <div className="flex max-w-full gap-6 flex-1  overflow-hidden">
                  <p className="whitespace-nowrap">
                    {flight.legs[0].stopCount === 0
                      ? "Nonstop"
                      : `${flight.legs[0].stopCount} Stop${
                          flight.legs[0].stopCount > 1 ? "s" : ""
                        }`}
                  </p>

                  <p className="whitespace-nowrap flex-shrink-0 overflow-hidden text-ellipsis">
                    {Math.floor(flight.legs[0].durationInMinutes / 60)} hr{" "}
                    {flight.legs[0].durationInMinutes % 60} min
                  </p>

                  <p className="whitespace-nowrap overflow-hidden text-ellipsis">
                    {flight.legs[0].carriers.marketing[0].name}
                  </p>
                </div>

                {/* emissions */}
                {flight.eco?.ecoContenderDelta && (
                  <p className="flex-shrink-0 text-[#0d652d] text-xs bg-[#e6f4ea] w-fit p-1 whitespace-nowrap">
                    {Math.round((flight.eco.ecoContenderDelta / 100) * -30)}%
                    emissions
                  </p>
                )}
              </div>

              {/* 6. Price */}
              <div className="text-right font-semibold col-start-6 row-start-1 whitespace-nowrap flex-shrink-0">
                {flight.price.formatted}
              </div>

              {/* 7. Dropdown Icon */}
              <div className="pl-2 col-start-7 row-start-2">
                <ChevronDown
                  className={`w-6 h-6 transition-transform duration-300 ease-in-out ${
                    selectedFlightId === flight.id ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>

            {/* DESKTOP main card content */}
            <div
              className="max-md:hidden py-4 pl-6 flex items-center cursor-pointer text-base text-[#202124] font-roboto border border-b-0 border-black "
              onClick={() => toggleFlight(flight.id)}
            >
              {/* Logo - Fixed width */}
              <div className="w-[68px] flex-shrink-0 ">
                <img
                  src={flight.legs[0].carriers.marketing[0].logoUrl}
                  alt={flight.legs[0].carriers.marketing[0].name}
                  className="h-9 max-w-full"
                />
              </div>
              {/* Departure-Arrival time and Carriers - Expandable */}
              <div className="flex flex-col flex-[0_0_calc(30%-32px)] items-start justify-start  min-w-[150px] px-2">
                <p className="font-medium whitespace-nowrap">
                  {new Date(flight.legs[0].departure).toLocaleTimeString(
                    "en-US",
                    {
                      hour: "numeric",
                      minute: "2-digit",
                    }
                  )}{" "}
                  -{" "}
                  {new Date(flight.legs[0].arrival).toLocaleTimeString(
                    "en-US",
                    {
                      hour: "numeric",
                      minute: "2-digit",
                    }
                  )}
                </p>
                <p className=" whitespace-nowrap text-sm text-[#70757a]">
                  {flight.legs[0].carriers.marketing[0].name}
                </p>
              </div>
              {/* Flight duration and airports */}
              <div className="w-[120px] text-center px-2 flex-[4]">
                <p className="text whitespace-nowrap">
                  {Math.floor(flight.legs[0].durationInMinutes / 60)} hr{" "}
                  {flight.legs[0].durationInMinutes % 60} min
                </p>
                <p className="text-[#70757a] text-sm whitespace-nowrap">
                  {flight.legs[0].origin.displayCode} -{" "}
                  {flight.legs[0].destination.displayCode}
                </p>
              </div>
              {/* Stops */}
              <div className="w-[100px] text-center px-2 flex-[4]">
                <p className="">
                  {flight.legs[0].stopCount === 0
                    ? "Nonstop"
                    : `${flight.legs[0].stopCount} Stop${
                        flight.legs[0].stopCount > 1 ? "s" : ""
                      }`}
                </p>
              </div>
              {/* Emission */}
              <div className="w-[120px] text-center px-2 flex justify-center flex-col items-center flex-[5]">
                <p className="">
                  {flight.eco?.ecoContenderDelta
                    ? `${Math.round(flight.eco.ecoContenderDelta)} kg CO₂e`
                    : "-"}
                </p>
                {flight.eco?.ecoContenderDelta && (
                  <p className="text-[#0d652d] text-xs bg-[#e6f4ea] w-fit p-1 text-nowrap ">
                    {Math.round((flight.eco.ecoContenderDelta / 100) * -30)}%{" "}
                    emissions
                  </p>
                )}
              </div>
              {/* Price */}
              <div className="w-[100px] flex items-center justify-end space-x-2 px-2 flex-[4]">
                <p className="font-semibold">{flight.price.formatted}</p>
              </div>
              <div className="px-8">
                <ChevronDown
                  className={`w-6 h-6 transition-transform duration-300 ease-in-out ${
                    selectedFlightId === flight.id ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>

            {/* Card details */}
            <div
              className={`transition-all duration-[350ms] ease-in-out overflow-hidden ${
                selectedFlightId === flight.id
                  ? "max-h-[500px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="flight-card-details p-4 bg-gray-50 border border-black mb-2 rounded-es-xl rounded-br-xl">
                <div className="grid grid-cols-[68px_28px_minmax(0,_1fr)_minmax(0,_280px)] max-md:grid-cols-[auto_28px_minmax(0,_1fr)_minmax(0,_280px)] grid-rows-[auto_auto_auto_auto] gap-x-4">
                  {/* departure */}
                  <div className="flex gap-4 col-start-3 row-start-1 col-span-3">
                    <p className="font-medium ">
                      {new Date(flight.legs[0].departure).toLocaleTimeString(
                        "en-US",
                        {
                          hour: "numeric",
                          minute: "2-digit",
                        }
                      )}
                    </p>
                    <p className="text-[#202124] ">
                      {flight.legs[0].origin.name} (
                      {flight.legs[0].origin.displayCode})
                    </p>
                  </div>
                  {/* duration */}
                  <p className="text-[#70757a] text-sm col-start-3 row-start-2 justify-self-start my-3 col-span-3">
                    Travel time:{" "}
                    {Math.floor(flight.legs[0].durationInMinutes / 60)}h{" "}
                    {flight.legs[0].durationInMinutes % 60}m
                  </p>

                  <div className="flex flex-col items-center col-start-2 row-start-1 row-span-3">
                    <div className="size-3  border-2 rounded-xl border-[#dadce0]" />
                    <div className=" h-full  flex-1 border-l-4 border-dotted  w-1 border-[#dadce0]" />
                    <div className="size-3 border-2 rounded-xl border-[#dadce0]" />
                  </div>

                  {/* arrival */}
                  <div className="flex gap-4 col-start-3 row-start-3 col-span-3">
                    <p className="font-medium ">
                      {new Date(flight.legs[0].arrival).toLocaleTimeString(
                        "en-US",
                        {
                          hour: "numeric",
                          minute: "2-digit",
                        }
                      )}
                    </p>
                    <p className="text-[#202124]">
                      {flight.legs[0].destination.name} (
                      {flight.legs[0].destination.displayCode})
                    </p>
                  </div>

                  <div className="mt-4 text-sm text-[#70757a] col-start-3 row-start-4 col-span-4 justify-self-start">
                    {flight.legs[0].carriers.marketing[0].name} · Economy · {""}
                    {flight.legs[0].segments[0].flightNumber}
                  </div>

                  {/* Right Column - Features and Button */}
                  <div className="flex flex-col items-end max-md:items-start space-y-4 col-start-5 row-start-1 row-span-4 max-md:col-start-3 max-md:row-start-5 max-md:col-span-3 max-md:pt-3">
                    <button className="px-6 py-2 bg-[#1967d2] text-white rounded-lg hover:bg-blue-700 font-medium text-sm">
                      Select flight
                    </button>
                    <div className="space-y-2">
                      <p className="text-sm flex items-center gap-2 text-[#5f6368]">
                        <MdAirlineSeatLegroomNormal />
                        Below average legroom (29 in)
                      </p>
                      <p className="text-sm flex items-center gap-2 text-[#5f6368]">
                        <FaEarthAfrica />
                        Emissions estimate:{" "}
                        {Math.round(flight.eco?.ecoContenderDelta) || "-"} kg
                        CO₂e
                      </p>
                      {/* Bottom Row - Flight Details */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightResults;
