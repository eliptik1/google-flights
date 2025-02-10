import { MapPin } from "lucide-react";
import { Globe } from "lucide-react";
import { Banknote } from "lucide-react";
import { ChevronDown } from "lucide-react";

function Footer() {
  return (
    <div className="font-roboto">
      <div className="mt-12 flex flex-wrap gap-4 justify-center text-sm text-[#1a73e8] ">
        <button className="flex items-center gap-2 hover:text-[#174ea6] px-3 py-1 border border-gray-300 rounded-full">
          <span className="">
            <Globe size={18} />
          </span>
          <span>Language · English (United States)</span>
        </button>
        <button className="flex items-center gap-2 hover:text-[#174ea6] px-3 py-1 border border-gray-300 rounded-full">
          <span className="">
            <MapPin size={18} />
          </span>
          <span>Location · Türkiye</span>
        </button>
        <button className="flex items-center gap-2 hover:text-[#174ea6] px-3 py-1 border border-gray-300 rounded-full">
          <span className="">
            <Banknote size={18} />
          </span>
          <span>Currency · USD</span>
        </button>
      </div>

      <p className="mt-6 text-sm text-gray-500 text-center">
        Current language and currency options applied: English (United States) -
        Türkiye - USD
      </p>

      <p className=" text-sm text-gray-500 text-center">
        Displayed currencies may differ from the currencies used to purchase
        flights. <span className="text-blue-500">Learn more</span>
      </p>

      <p className="mt-4 text-sm text-gray-500 text-center">
        Prices are final prices and include all taxes and fees, including
        payment fees for the cheapest common payment method (which may differ
        depending on the provider). Additional charges may apply for other types
        of payment, luggage, meals, WLAN or other additional services. Prices,
        availability and travel details are provided based on the latest
        information received from our partners. This information is reflected in
        the results within a period of less than 24 hours. Additional conditions
        may also be applied by our partners. You should then check prices and
        conditions with the services providers before booking.
      </p>
      <div className="mt-8 pb-6 flex justify-center gap-6 text-sm text-blue-500 border-b border-gray-300">
        <a href="#" className="hover:underline">
          About
        </a>
        <a href="" className="hover:underline">
          Privacy
        </a>
        <a href="" className="hover:underline">
          Terms
        </a>
        <a href="" className="hover:underline">
          Join user studies
        </a>
        <a href="" className="hover:underline">
          Feedback
        </a>
        <a href="" className="hover:underline">
          Help Center
        </a>
      </div>
      <div className="mt-8 flex justify-center gap-6 text-sm text-blue-500">
        <button className="flex items-center gap-1">
          International sites
          <ChevronDown className="w-4 h-4" />
        </button>
        <button className="flex items-center gap-1">
          Explore flights
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
export default Footer;
