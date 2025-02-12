import React from "react";
import { ChevronDown } from "lucide-react"; // İkonlar için

const FlightCardContent = ({
  flight,
  selectedFlightId,
  toggleFlight,
  view,
}) => {
  return (
    <>
      {/* DESKTOP main card content */}
      {view === "desktop" && (
        <div
          className="card-content max-md:hidden py-4 pl-6 flex items-center cursor-pointer text-base text-[#202124] font-roboto border border-b-0 "
          onClick={() => toggleFlight(flight.id)}
        >
          {/* Logo - Fixed width */}
          <div className="w-[68px] flex-shrink-0 ">
            <img
              src={flight.legs[0].carriers?.marketing[0].logoUrl}
              alt={flight.legs[0].carriers?.marketing[0].name}
              className="h-9 max-w-full"
            />
          </div>
          {/* Departure-Arrival time and Carriers - Expandable */}
          <div className="flex flex-col flex-[0_0_calc(30%-32px)] items-start justify-start  min-w-[150px] px-2">
            <p className="font-medium whitespace-nowrap">
              {new Date(flight.legs[0].departure).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
              })}{" "}
              -{" "}
              {new Date(flight.legs[0].arrival).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
              })}
            </p>
            <p className=" whitespace-nowrap text-sm text-[#70757a]">
              {flight.legs[0].carriers?.marketing[0].name}
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
            <p className="font-semibold">{flight?.price?.formatted}</p>
          </div>
          <div className="px-8">
            <ChevronDown
              className={`w-6 h-6 transition-transform duration-300 ease-in-out ${
                selectedFlightId === flight.id ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>
      )}

      {/* MOBILE main card content */}
      {view === "mobile" && (
        <div
          className="card-content md:hidden p-3  pr-6 grid grid-cols-[auto_auto_auto_auto_1fr_auto] grid-rows-[auto_auto_auto] justify-items-start items-center cursor-pointer text-base text-[#202124] font-roboto border border-b-0 border-black"
          onClick={() => toggleFlight(flight.id)}
        >
          {/* 1. Logo */}
          <div className="flex items-center justify-center px-3">
            <img
              src={flight.legs[0].carriers.marketing[0].logoUrl}
              alt={flight.legs[0].carriers.marketing[0].name}
              className="min-h-6 min-w-6 max-w-8 max-h-8"
            />
          </div>
          {/* 2. Departure Time */}
          <div className="flex flex-col items-center text-center font-medium  overflow-hidden text-ellipsis">
            <p className="whitespace-nowrap">
              {new Date(flight.legs[0].departure).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
              })}
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
              {new Date(flight.legs[0].arrival).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
              })}
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
      )}
    </>
  );
};
export default FlightCardContent;
