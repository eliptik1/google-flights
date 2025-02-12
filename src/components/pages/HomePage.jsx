import mapImage from "../../../public/staticmap.png";

const HomePage = () => {
  const cities = ["İstanbul", "Cairo", "Tokyo", "Sydney"];

  const flights = [
    {
      city: "Tokyo",
      price: 497,
      dates: "Mar 17 — Mar 24",
      duration: "1 stop · 15 hr 40 min",
      image:
        "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRLnIToEgwiM_jV3cbw5eQZoUAIg6XqdrJAiClDyyg0w-JBSRN5ZeOT-iFb3SvwkwP1uoBCmT-gKE5VcyCYf-xq4guL4NAFICSaNyOnYOA",
    },
    {
      city: "Paris",
      price: 137,
      dates: "May 19 — May 25",
      duration: "Nonstop · 3 hr 50 min",
      image:
        "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSyQJ-woNs0iO22mPSkmRUM5gcsTbbYeypQ6BBTeFxXr90mqTxZl57Fdq2CDuLn4w7cKZ8TT9_zZhOpF57rIpA7yWKQnqKvkKIf9Y-qJDo",
    },
    {
      city: "Rome",
      price: 109,
      dates: "Apr 17 — Apr 23",
      duration: "1 stop · 2 hr 45 min",
      image:
        "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRM_5snkSVZsnpG8dhW0NGx_Pdwk592nbBjmyqu-UxZDclvuBr6HXfXd0Fm7TYGVQpVCCr4RC6TGTmOgyP6KwpvZr0tGGnpZ7ukzP8RPLA",
    },
    {
      city: "Dubai",
      price: 145,
      dates: "May 11 — May 17",
      duration: "Nonstop · 4 hr 30 min",
      image:
        "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQDaD8FERvoI4iorjkWbED9zAq7S3m9hD1t5vGNU5Jznr1Kl1em9SIs9c9VkujJF5_EDvC5mKyqcQ9B8PApW9tiwfzhK_pC2qvRBND2Plo",
    },
  ];

  return (
    <div className="">
      <div className="mb-6">
        <h1 className="text-xl font-semibold mb-4 text-left">
          Find cheap flights from İstanbul to anywhere
        </h1>

        <div className="flex gap-2 mb-6">
          {cities.map((city) => (
            <button
              key={city}
              className="px-4 py-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
            >
              {city}
            </button>
          ))}
        </div>

        <div
          className="w-full h-64 rounded-2xl mb-6 relative bg-cover bg-center group cursor-pointer"
          style={{
            backgroundImage: `url(${mapImage})`,
          }}
        >
          {/* Overlay div */}
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-2xl" />

          <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-sm text-[#1a73e8] hover:text-[#21569c] font-semibold px-6 py-2 rounded-full [box-shadow:0_1px_3px_0_rgba(60,64,67,.3),0_4px_8px_3px_rgba(60,64,67,.15)] transition">
            Explore destinations
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {flights.map((flight) => (
            <div
              key={flight.city}
              className="overflow-hidden transition max-md:flex justify-start max-md:w-full"
            >
              <div
                className="max-md:w-2/5 h-[120px] rounded-2xl bg-cover bg-center"
                style={{
                  backgroundImage: `url(${flight.image})`,
                }}
              ></div>
              <div className="p-4 md:py-4 text-left flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className=" font-semibold">{flight.city}</h3>
                  <span className=" font-semibold">${flight.price}</span>
                </div>
                <p className="text-gray-600 text-sm mb-1">{flight.dates}</p>
                <p className="text-gray-500 text-sm">{flight.duration}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
