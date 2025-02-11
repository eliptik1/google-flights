import { FaEarthAfrica } from "react-icons/fa6";
import { MdAirlineSeatLegroomNormal } from "react-icons/md";

const FlightCardDetails = ({ flight }) => {
  return (
    <div className="grid grid-cols-[68px_28px_minmax(0,_1fr)_minmax(0,_280px)] max-md:grid-cols-[auto_28px_minmax(0,_1fr)_minmax(0,_280px)] grid-rows-[auto_auto_auto_auto] gap-x-4">
      {/* departure */}
      <div className="flex gap-4 col-start-3 row-start-1 col-span-3">
        <p className="font-medium ">
          {new Date(flight.legs[0].departure).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
          })}
        </p>
        <p className="text-[#202124] ">
          {flight.legs[0].origin.name} ({flight.legs[0].origin.displayCode})
        </p>
      </div>
      {/* duration */}
      <p className="text-[#70757a] text-sm col-start-3 row-start-2 justify-self-start my-3 col-span-3">
        Travel time: {Math.floor(flight.legs[0].durationInMinutes / 60)}h{" "}
        {flight.legs[0].durationInMinutes % 60}m
      </p>

      <div className="flex flex-col items-center col-start-2 row-start-1 row-span-3">
        <div className="size-3  border-2 rounded-xl border-[#dadce0]" />
        <div className=" h-full  flex-1 border-l-4 border-dotted  w-1 border-[#dadce0]" />
        <div className="size-3 border-2 rounded-xl border-[#dadce0]" />
      </div>

      {/* arrival */}
      <div className="flex gap-4 col-start-3 row-start-3 col-span-3">
        <p className="font-medium ">
          {new Date(flight.legs[0].arrival).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
          })}
        </p>
        <p className="text-[#202124]">
          {flight.legs[0].destination.name} (
          {flight.legs[0].destination.displayCode})
        </p>
      </div>

      <div className="mt-4 text-sm text-[#70757a] col-start-3 row-start-4 col-span-4 justify-self-start">
        {flight.legs[0].carriers.marketing[0].name} · Economy · {""}
        {flight.legs[0].segments[0].flightNumber}
      </div>

      {/* Right Column - Features and Button */}
      <div className="flex flex-col items-end max-md:items-start space-y-4 col-start-5 row-start-1 row-span-4 max-md:col-start-3 max-md:row-start-5 max-md:col-span-3 max-md:pt-3">
        <button className="px-6 py-2 bg-[#1967d2] text-white rounded-lg hover:bg-blue-700 font-medium text-sm">
          Select flight
        </button>
        <div className="space-y-2">
          <p className="text-sm flex items-center gap-2 text-[#5f6368]">
            <MdAirlineSeatLegroomNormal />
            Below average legroom (29 in)
          </p>
          <p className="text-sm flex items-center gap-2 text-[#5f6368]">
            <FaEarthAfrica />
            Emissions estimate:{" "}
            {Math.round(flight.eco?.ecoContenderDelta) || "-"} kg CO₂e
          </p>
        </div>
      </div>
    </div>
  );
};
export default FlightCardDetails;
