import { BrowserRouter, Route, Routes } from "react-router-dom";
import FlightSearch from "./components/FlightSearch";
import HomePage from "./components/pages/HomePage";
import Layout from "./components/pages/Layout";
import { FlightProvider } from "./components/context/FlightContext";
import FlightResults from "./components/FlightResults";
import FlightDetailsPage from "./components/pages/FlightDetailsPage";

function App() {
  return (
    <FlightProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <>
                  <FlightSearch />
                  <HomePage />
                </>
              }
            />
            <Route
              path="flights"
              element={
                <>
                  <FlightSearch />
                </>
              }
            />
            <Route path="flights/:id" element={<FlightDetailsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </FlightProvider>
  );
}

export default App;
