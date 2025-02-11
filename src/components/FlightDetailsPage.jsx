import React from "react";
import { MdAirlineSeatLegroomNormal, MdLuggage } from "react-icons/md";
import { FaArrowRightLong, FaEarthAfrica } from "react-icons/fa6";
import { IoWarningOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getFlightDetails } from "../api/flights";
import { useState } from "react";
import { MoveRight } from "lucide-react";
import { Users } from "lucide-react";
import FlightCardContent from "./FlightCardContent";
import FlightCardDetails from "./FlightCardDetails";
import { VscLoading } from "react-icons/vsc";

const FlightDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // flight ID in the URL
  const [selectedFlight, setSelectedFlight] = useState(null); // from searchFlights
  const [flightDetails, setFlightDetails] = useState(null); // from getFlightDetails
  const [loading, setLoading] = useState(true);
  const [selectedFlightId, setSelectedFlightId] = useState(null);

  const toggleFlight = (flightId) => {
    setSelectedFlightId((prevId) => (prevId === flightId ? null : flightId));
  };

  useEffect(() => {
    const fetchFlightDetails = async () => {
      const cachedDetails = localStorage.getItem("selectedFlightDetails");
      const savedFlight = localStorage.getItem("selectedFlight");

      if (savedFlight) {
        setSelectedFlight(JSON.parse(savedFlight));
      }

      if (cachedDetails) {
        try {
          setFlightDetails(JSON.parse(cachedDetails));
        } catch (error) {
          console.error("Error parsing flight details:", error);
          localStorage.removeItem("selectedFlightDetails"); // clear the bad data
        }
        setLoading(false);
        return;
      }

      setLoading(false);
    };

    fetchFlightDetails();
  }, [id]);

  if (!selectedFlight)
    return (
      <div className="flex justify-center text-gray-400 mt-12">
        <VscLoading size={48} className="animate-spin stroke-[0.4px]" />
      </div>
    );
  if (!flightDetails) return <div>Flight details not found.</div>;

  // since flightDetails is no longer null, we can use the data
  const itinerary = flightDetails.data.itinerary;
  const leg = itinerary.legs[0];
  const lowestPrice = Math.min(
    ...itinerary.pricingOptions.map((option) => option.totalPrice)
  );

  return (
    <>
      {loading ? (
        <div className="flex justify-center text-gray-400">
          <VscLoading size={48} className="animate-spin stroke-[0.4px]" />
        </div>
      ) : (
        ""
      )}
      <div className="max-w-5xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 font-roboto">
          <div>
            <div className="flex items-center gap-3 text-[32px] font-medium font-roboto">
              <span>{leg.origin.city}</span>

              <FaArrowRightLong className="text-[#9aa0a6]" size={20} />

              <span>{leg.destination.city}</span>
            </div>
            <div className="flex gap-4 text-sm text-gray-600 mt-1 font-roboto">
              <span>One way</span>
              <span>•</span>
              <span>Economy</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Users size={16} />
                <span>1 passenger</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[32px] font-bold">${lowestPrice}</div>
            <div className="text-sm text-gray-600">Lowest total price</div>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-left  pt-6 pb-3">
          Selected flights
        </h2>
        {/* Flight Details Card */}
        <div className="details-page-card">
          <FlightCardContent
            flight={selectedFlight}
            selectedFlightId={selectedFlightId}
            toggleFlight={toggleFlight}
            view={"desktop"}
          />
          {/* MOBILE main card content */}
          <FlightCardContent
            flight={selectedFlight}
            selectedFlightId={selectedFlight.id}
            toggleFlight={toggleFlight}
            view={"mobile"}
          />

          {/* Card details */}
          <div
            className={`border-[#dadce0] transition-all duration-[350ms] ease-in-out overflow-hidden ${
              selectedFlightId === selectedFlight.id
                ? "max-h-[500px] opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="flight-card-details p-4 bg-gray-50 border  mb-2 rounded-es-xl rounded-br-xl">
              <FlightCardDetails flight={selectedFlight} />
            </div>
          </div>
        </div>

        {/* Booking Options */}
        <div className="booking-options">
          <h2 className="text-xl font-semibold text-left  pt-6 pb-3">
            Booking options
          </h2>
          {itinerary.pricingOptions.map((option, index) => (
            <div
              key={index}
              className="booking-card flex justify-between items-center p-4 border border-[#dadce0] border-b-0"
            >
              <div className="flex items-center gap-4">
                <img
                  src={selectedFlight.legs[0].carriers?.marketing[0].logoUrl}
                  alt={option.agents[0].name}
                  className="w-8 h-8"
                />
                <div>
                  <div className="font-medium text-left">
                    Book with {option.agents[0].name}
                  </div>
                  <div className="text-sm text-gray-600">
                    Rating: {option.agents[0].rating.value}/5 (
                    {option.agents[0].rating.count} reviews)
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-right">
                  <div className="text-base font-semibold">
                    ${option.totalPrice}
                  </div>
                  <div className="text-sm text-gray-600">Total price</div>
                </div>
                <button
                  className={`font-semibold bg-white px-14 py-2 border border-gray-300 rounded-full flex items-center gap-2 transition-colors text-[#1a73e8]  hover:text-[#3b4ea6] text-sm`}
                >
                  Continue
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FlightDetailsPage;
