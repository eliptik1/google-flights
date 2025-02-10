import FAQSection from "./components/FaqSection";
import FlightSearch from "./components/FlightSearch";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="max-lg:max-w-[768px] mx-auto text-[#202124]">
      <div className="relative mb-10">
        <img
          src="https://www.gstatic.com/travel-frontend/animation/hero/flights_nc_4.svg"
          alt="flights hero"
        />
        <h1 className="w-full absolute bottom-0 left-0  text-[56px] font-roboto ">
          Flights
        </h1>
      </div>
      <div className="max-w-5xl mx-auto">
        <FlightSearch />
        <FAQSection />
        <Footer />
      </div>
    </div>
  );
}

export default App;
