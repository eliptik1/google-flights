export const searchFlights = async (
  originSkyId,
  destinationSkyId,
  originEntityId,
  destinationEntityId,
  date
) => {
  const url = `https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchFlights?originSkyId=${originSkyId}&destinationSkyId=${destinationSkyId}&originEntityId=${originEntityId}&destinationEntityId=${destinationEntityId}&date=${date}&cabinClass=economy&adults=1&sortBy=best&currency=USD&market=en-US&countryCode=US`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
      "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("searchFlightsError:", error);
    throw error;
  }
};

export const getFlightDetails = async (flight, flightsSessionId) => {
  const legs = [
    {
      destination: flight.legs[0].destination.displayCode,
      origin: flight.legs[0].origin.displayCode,
      date: flight.legs[0].departure.split("T")[0],
    },
  ];

  const baseUrl =
    "https://sky-scrapper.p.rapidapi.com/api/v1/flights/getFlightDetails";
  const params = new URLSearchParams({
    itineraryId: flight.id,
    legs: JSON.stringify(legs),
    sessionId: flightsSessionId,
    adults: "1",
    currency: "USD",
    locale: "en-US",
    market: "en-US",
    cabinClass: "economy",
    countryCode: "US",
  });

  const url = `${baseUrl}?${params}`;

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
      "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching flight details:", error);
    throw error;
  }
};
