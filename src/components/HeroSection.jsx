const HeroSection = () => {
  return (
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
  );
};
export default HeroSection;
