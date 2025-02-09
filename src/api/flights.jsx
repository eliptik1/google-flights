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

export const getFlightDetails = async () => {
  const url =
    "https://sky-scrapper.p.rapidapi.com/api/v1/flights/getFlightDetails?legs=%22%5B%7B%5C%22destination%5C%22%3A%5C%22LOND%5C%22%2C%5C%22origin%5C%22%3A%5C%22LAXA%5C%22%2C%5C%22date%5C%22%3A%5C%222024-04-11%5C%22%7D%5D%22&adults=1&currency=USD&locale=en-US&market=en-US&cabinClass=economy&countryCode=US";
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
    console.log("result:", result);
    return result;
  } catch (error) {
    console.error("getFlightDetailError:", error);
    throw error;
  }
};
