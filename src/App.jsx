import FAQSection from "./components/FaqSection";
import FlightSearch from "./components/FlightSearch";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="">
      {/* Hero Section */}
      <div className="relative max-h-[280px] w-full bg-white">
        <img
          className="w-full h-full object-cover object-center min-h-[200px] max-w-[1200px] mx-auto"
          src="https://www.gstatic.com/travel-frontend/animation/hero/flights_nc_4.svg"
          alt="flights hero"
        />
        <h1 className="absolute left-1/2 -translate-x-1/2 bottom-0 text-[56px] max-md:text-[36px] font-roboto">
          Flights
        </h1>
      </div>

      {/* Content Section */}
      <div className="max-lg:max-w-[768px] mx-auto text-[#202124] p-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <FlightSearch />
          <FAQSection />
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
