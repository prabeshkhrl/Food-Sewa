import React from "react";
import { Link } from "react-router-dom";

export default function EverythingYouCrave() {
  return (
    <section className="bg-white py-12 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Column: Text Content */}
        <div className="max-w-xl">
          {/* Main Heading */}
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight leading-[1.1] mb-6">
            Everything you <br />
            crave, delivered.
          </h2>

          {/* Subheading */}
          <h3 className="text-lg font-bold text-gray-900 mb-3">
            Your favorite local restaurants
          </h3>

          {/* Body Paragraph */}
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8">
            Get a slice of pizza or the whole pie delivered, or pick up house
            lo mein from the Chinese takeout spot you've been meaning to try.
          </p>

          {/* Action Button */}
          <Link
            to="/restaurants"
            className="inline-block bg-[#FF3008] hover:bg-[#E02B07] text-white font-bold text-sm sm:text-base px-6 py-3 rounded-full transition-colors duration-200 shadow-sm"
          >
            Find restaurants
          </Link>
        </div>

        {/* Right Column: Image */}
        <div className="relative w-full overflow-hidden rounded-lg shadow-sm">
          <img
            src="https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&w=1200&q=80"
            alt="Person enjoying takeaway food outdoors on a picnic blanket"
            className="w-full h-[350px] sm:h-[450px] lg:h-[500px] object-cover"
          />
        </div>
      </div>
    </section>
  );
}