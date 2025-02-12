import React, { createContext, useContext, useState, useEffect } from "react";

const FlightContext = createContext();

export const useFlightContext = () => useContext(FlightContext);

export const FlightProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useState(null);

  const [flightResults, setFlightResults] = useState(() => {
    const savedResults = localStorage.getItem("flightResults");
    return savedResults ? JSON.parse(savedResults) : [];
  });

  const [selectedFlight, setSelectedFlight] = useState(() => {
    const savedFlight = localStorage.getItem("selectedFlight");
    return savedFlight ? JSON.parse(savedFlight) : null;
  });

  useEffect(() => {
    localStorage.setItem("flightResults", JSON.stringify(flightResults));
  }, [flightResults]);

  useEffect(() => {
    localStorage.setItem("selectedFlight", JSON.stringify(selectedFlight));
  }, [selectedFlight]);

  return (
    <FlightContext.Provider
      value={{
        searchParams,
        setSearchParams,
        flightResults,
        setFlightResults,
        selectedFlight,
        setSelectedFlight,
      }}
    >
      {children}
    </FlightContext.Provider>
  );
};
