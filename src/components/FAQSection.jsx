import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQSection = () => {
  const [openItems, setOpenItems] = useState({});

  const faqItems = [
    {
      id: 1,
      question: "How can I find cheap flights to Anywhere?",
      answer:
        "Finding flights deals to Anywhere is easy on Google Flights. Get inspired by and select one of the recommendations at the top of the page. Or, if you already have a city in mind, just enter it in the destination field in the form above. Then, open the calendar to see the cheapest days to fly. If you don't yet have a destination in mind, don't worry! Just leave Anywhere in the destination field and select Explore to easily compare the cheapest flights across multiple destinations in Anywhere. </br> To find the cheapest fares, it’s usually best to book at least a few weeks in advance for domestic flights and a few months in advance for international travel.",
    },
    {
      id: 2,
      question:
        "Can I use Google Flights to find multi-city trips within Anywhere?",
      answer:
        "Absolutely. You can easily use Google Flights to plan multi-city trips within Anywhere. Select the Multi-city tab at the top of the page, enter the cities you want to visit within Anywhere, and adjust the dates accordingly. Google Flights will then display available flight options, so you can plan a seamless itinerary for your journey within Anywhere.",
    },
    {
      id: 3,
      question: "What are the cheapest days to fly to Anywhere?",
      answer:
        "When booking a flight to Anywhere, play around with flight options and dates in the map to identify the cheapest times to travel. Price history and real-time insights can also tell you if a fare is lower or higher than usual. If you already have a specific destination in mind, you can track prices and get notified if the fare drops. So, you don't have to worry about paying too much or missing out on the cheapest time to book. Off-peak travel is often more budget-friendly, so planning your trip during these times can lead to significant savings.",
    },
  ];

  const toggleItem = (id) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="mx-auto py-6">
      <h1 className="text-2xl text-left font-medium mb-8">
        Cheap flights to Anywhere
      </h1>

      <h2 className="text-xl text-left mb-2 font-semibold">
        Frequently asked questions
      </h2>

      <div className="">
        {faqItems.map((item) => (
          <div key={item.id} className="border-b border-gray-300">
            <button
              className="w-full py-3 flex justify-between items-center text-left"
              onClick={() => toggleItem(item.id)}
            >
              <span className="text-[15px] font-semibold">{item.question}</span>
              <ChevronDown
                className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                  openItems[item.id] ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-200 ${
                openItems[item.id]
                  ? "max-h-96 mb-4 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-[#3c4043] text-base text-left">
                {item.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
