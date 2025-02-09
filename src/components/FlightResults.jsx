import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react"; // İkonlar için

const FlightResults = ({ flights }) => {
  const [selectedFlightId, setSelectedFlightId] = useState(null);

  const toggleFlight = (flightId) => {
    setSelectedFlightId(selectedFlightId === flightId ? null : flightId);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
      {flights.map((flight) => (
        <div key={flight.id} className="border-b">
          {/* main card content */}
          <div
            className="py-4 flex justify-between items-center cursor-pointer"
            onClick={() => toggleFlight(flight.id)}
          >
            <div className="flex items-center space-x-4">
              <img
                src={flight.legs[0].carriers.marketing[0].logoUrl}
                alt={flight.legs[0].carriers.marketing[0].name}
                className="h-6"
              />
              <div>
                <p className="font-semibold">
                  {flight.legs[0].carriers.marketing[0].name}
                </p>
                <p className="text-gray-500 text-sm">
                  {flight.legs[0].origin.displayCode} -{" "}
                  {flight.legs[0].destination.displayCode}
                </p>
              </div>
            </div>
            <div className="text-center">
              <p className="font-medium">
                {new Date(flight.legs[0].departure).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                -{" "}
                {new Date(flight.legs[0].arrival).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <p className="text-gray-500 text-sm">
                {Math.floor(flight.legs[0].durationInMinutes / 60)}h{" "}
                {flight.legs[0].durationInMinutes % 60}m
              </p>
            </div>
            <div className="text-center">
              <p className="font-medium">
                {flight.legs[0].stopCount === 0
                  ? "Nonstop"
                  : `${flight.legs[0].stopCount} Stop${
                      flight.legs[0].stopCount > 1 ? "s" : ""
                    }`}
              </p>
            </div>
            <div className="text-center">
              <p className="font-medium">
                {flight.eco?.ecoContenderDelta
                  ? `${Math.round(flight.eco.ecoContenderDelta)} kg CO₂e`
                  : "-"}
              </p>
              {flight.eco?.ecoContenderDelta && (
                <p className="text-green-600 text-sm">
                  {Math.round((flight.eco.ecoContenderDelta / 100) * -30)}%{" "}
                  emissions
                </p>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <p className="text-green-600 font-semibold">
                {flight.price.formatted}
              </p>
              {selectedFlightId === flight.id ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </div>
          </div>

          {/* Card details */}
          {selectedFlightId === flight.id && (
            <div className="p-4 bg-gray-50">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className=" flex items-center gap-4">
                      <p className="font-medium">
                        {new Date(flight.legs[0].departure).toLocaleTimeString(
                          [],
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </p>
                      <p>
                        {flight.legs[0].origin.name} (
                        {flight.legs[0].origin.displayCode})
                      </p>
                    </div>
                    <div className="">
                      <p>
                        Travel time:{" "}
                        {Math.floor(flight.legs[0].durationInMinutes / 60)}h{" "}
                        {flight.legs[0].durationInMinutes % 60}m
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="font-medium">
                        {new Date(flight.legs[0].arrival).toLocaleTimeString(
                          [],
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </p>
                      <p>
                        {flight.legs[0].destination.name} (
                        {flight.legs[0].destination.displayCode})
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      Select flight
                    </button>
                    <div className="space-y-1">
                      <p className="text-sm flex items-center">
                        <span className="mr-2">⚡</span>
                        Below average legroom
                      </p>
                      <p className="text-sm flex items-center">
                        <span className="mr-2">📱</span>
                        Stream media to your device
                      </p>
                      <p className="text-sm flex items-center">
                        <span className="mr-2">🌱</span>
                        Emissions estimate:{" "}
                        {Math.round(flight.eco?.ecoContenderDelta) || "-"} kg
                        CO₂e
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  {flight.legs[0].carriers.marketing[0].name} · Economy ·{" "}
                  {flight.legs[0].segments[0].flightNumber}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FlightResults;
