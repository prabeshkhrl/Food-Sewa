import React from "react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";

const ABOUT_IMAGE =
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80";

export default function AboutUs() {
  return (
    <section className="relative overflow-hidden">
      {/* Background image + overlay */}
      <div className="absolute inset-0">
        <img
          src={ABOUT_IMAGE}
          alt="Nepal food background"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/75 to-black/90" />
      </div>

      {/* Content Container - Centered */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center flex flex-col items-center">
        {/* Badge */}
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-orange-300 mb-4 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 backdrop-blur-sm">
          About FoodSewa
        </span>

        {/* Main Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6">
          Bringing Nepal's{" "}
          <span className="bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-400 bg-clip-text text-transparent">
            best food
          </span>{" "}
          to your door.
        </h2>

        {/* Paragraphs - Centered text */}
        <div className="space-y-4 text-gray-200 leading-relaxed mb-8 max-w-2xl text-base sm:text-lg">
          <p>
            FoodSewa started with a simple idea: the food you love — the momo shop
            around the corner, the pizzeria your family has ordered from for years,
            the new café that just opened down the street — should be one tap away.
          </p>
          <p>
            We're a local team building a platform that puts neighborhood
            restaurants and home chefs first. No middlemen, no hidden fees, no
            compromises on the food you've grown up loving.
          </p>
          <p className="text-orange-300 font-semibold text-lg sm:text-xl pt-2">
            Because great food deserves to travel fast.
          </p>
        </div>
      </div>
    </section>
  );
}