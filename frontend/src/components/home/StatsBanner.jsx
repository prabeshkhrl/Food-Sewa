import React from "react";

export default function StatsBanner() {
  const stats = [
    { value: "500+", label: "Partner Restaurants", icon: "🍽️" },
    { value: "10K+", label: "Happy Customers", icon: "😊" },
    { value: "50K+", label: "Orders Delivered", icon: "🛵" },
    { value: "4.9/5", label: "Average App Rating", icon: "⭐" },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* Left Content */}
        <div>
          <span className="inline-flex items-center gap-2 text-orange-600 text-sm font-bold uppercase tracking-[0.2em] mb-5">
            <span className="w-8 h-[2px] bg-orange-500" />
            Our Impact
          </span>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.12] tracking-tight">
            Good food.
            <br />
            Great moments.
            <br />
            <span className="text-orange-500">Delivered.</span>
          </h2>

          <p className="mt-6 text-base sm:text-lg text-gray-500 leading-8 max-w-lg">
            Bringing your favorite meals closer to you. From local restaurants
            to your doorstep, we make every order a little more special.
          </p>

          {/* Statistics */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 mt-10 pt-8 border-t border-gray-200">
            {stats.map((stat) => (
              <div key={stat.label} className="group">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{stat.icon}</span>
                  <p className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 group-hover:text-orange-500 transition-colors duration-300">
                    {stat.value}
                  </p>
                </div>

                <p className="text-sm sm:text-base text-gray-500 font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Image */}
        <div className="relative max-w-xl mx-auto w-full">

          {/* Decorative Outline */}
          <div className="absolute -top-4 -right-4 w-28 h-28 border-2 border-orange-200 rounded-3xl" />

          <div className="relative rounded-3xl overflow-hidden border border-gray-200 shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=85"
              alt="A delicious selection of freshly prepared food"
              className="w-full h-[340px] sm:h-[440px] object-cover hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />

            {/* Image Caption */}
            <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 bg-gradient-to-t from-black/75 via-black/25 to-transparent">
              <p className="text-white text-xl sm:text-2xl font-bold">
                Your cravings, delivered.
              </p>
              <p className="text-white/80 text-sm mt-2">
                Fresh meals from restaurants you love.
              </p>
            </div>
          </div>

          {/* Floating Rating Card */}
          <div className="absolute -bottom-6 -left-3 sm:-left-6 bg-white border border-gray-100 rounded-2xl shadow-lg p-4 sm:p-5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center text-xl">
                ⭐
              </div>
              <div>
                <p className="text-lg font-extrabold text-gray-900">
                  4.9 out of 5
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Loved by our customers
                </p>
              </div>
            </div>
          </div>

          {/* Decorative Accent */}
          <div className="absolute -bottom-4 right-8 w-16 h-16 rounded-full border-[10px] border-orange-100 -z-10" />
        </div>
      </div>
    </section>
  );
}