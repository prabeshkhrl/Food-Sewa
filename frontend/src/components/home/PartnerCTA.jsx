import React from "react";
import { Link } from "react-router-dom";

export default function PartnerCTA() {
  return (
    <section className="bg-[#FFF5F3] py-12 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Column: Image */}
        <div className="relative w-full overflow-hidden rounded-lg shadow-sm order-2 lg:order-1">
          <img
            src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80"
            alt="Restaurant staff handing over a delivery order"
            className="w-full h-[350px] sm:h-[450px] lg:h-[480px] object-cover"
          />
        </div>

        {/* Right Column: Content */}
        <div className="max-w-xl order-1 lg:order-2">
          {/* Headline */}
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight leading-[1.1] mb-6">
            Grow your business <br className="hidden sm:inline" />
            with us
          </h2>

          {/* Description */}
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-8 max-w-md">
            Businesses large and small partner with us to reach new customers,
            increase order volume, and drive more sales.
          </p>

          {/* CTA Button */}
          <Link
            to="/auth/register"
            className="inline-block bg-[#FF3008] hover:bg-[#E02B07] text-white font-bold text-sm sm:text-base px-6 py-3 rounded-full transition-colors duration-200 shadow-sm"
          >
            Become a Partner
          </Link>
        </div>
      </div>
    </section>
  );
}