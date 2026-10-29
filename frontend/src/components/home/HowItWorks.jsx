import { Link } from "react-router-dom";

const steps = [
  {
    title: "Order in minutes",
    desc: "Browse hundreds of local restaurants and order your favorite dishes with a few taps. Pay with cash, eSewa, or Khalti.",
    linkText: "Start ordering",
    linkTo: "/restaurants",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
    alt: "Person ordering food on phone",
  },
  {
    title: "Become a partner",
    desc: "List your restaurant on FoodSewa and reach thousands of hungry customers. Set up your menu in minutes — no setup fees.",
    linkText: "Register your restaurant",
    linkTo: "/auth/register",
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80",
    alt: "Restaurant storefront",
  },
  {
    title: "Track your order",
    desc: "Watch your food being prepared and follow it every step of the way — from the kitchen to your door, in real time.",
    linkText: "View your orders",
    linkTo: "/orders",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=80",
    alt: "Order tracking on phone",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-3">
            How FoodSewa works
          </h2>
          <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto">
            Order from local favorites, track every step, and enjoy fresh
            food at your door.
          </p>
        </div>

        {/* Three columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="flex flex-col items-center text-center group"
            >
              {/* Image with soft gradient blob */}
              <div className="relative mb-8 w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center">
                <div className="absolute inset-0  rounded-full blur-sm transform group-hover:scale-105 transition-transform duration-300 opacity-70" />

                {/* Step number badge */}
                <div className="absolute -top-1 -right-1 z-20 w-9 h-9 rounded-full bg-gradient-to-br from-red-600 to-orange-500 text-white text-sm font-bold flex items-center justify-center shadow-lg ring-4 ring-white">
                  {index + 1}
                </div>

                <img
                  src={step.image}
                  alt={step.alt}
                  loading="lazy"
                  className="relative z-10 w-36 h-36 sm:w-44 sm:h-44 object-cover rounded-2xl shadow-md"
                />
              </div>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4 max-w-xs">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 max-w-xs">
                {step.desc}
              </p>

              {/* CTA link */}
              <Link
                to={step.linkTo}
                className="inline-flex items-center gap-1 font-bold text-base text-orange-500 hover:text-orange-600 transition-colors duration-200 mt-auto"
              >
                <span>{step.linkText}</span>
                <span className="text-lg leading-none transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
            </div>
          ))}
        </div>

        
      </div>
    </section>
  );
}