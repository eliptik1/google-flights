export const getNearByAirports = async (
  lat = 19.242218017578125,
  lon = 72.85846156046128
) => {
  const url = `https://sky-scrapper.p.rapidapi.com/api/v1/flights/getNearByAirports?lat=${lat}&lng=${lon}&locale=en-US`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "e13fbb5e43mshb7150b927d6815dp1df171jsn8af8c79e182e",
      "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log("getNearByAirports", result);
  } catch (error) {
    console.error("getNearByAirportsError:", error);
  }
};

export const searchAirport = async (query) => {
  const url = `https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport?query=${query}&locale=en-US`;
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
    console.error("searchAirportError:", error);
    throw error;
  }
};
