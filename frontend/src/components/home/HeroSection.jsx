import { useNavigate } from "react-router-dom";
import { Search, ArrowRight, MapPin } from "lucide-react";
import { useState } from "react";
import Button from "../ui/Button";

const HERO_IMAGE =
  import.meta.env.VITE_HERO_IMAGE_URL || "/hero-food.jpg";

export default function HeroSection() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const q = query.trim();
    navigate(
      q ? `/restaurants?search=${encodeURIComponent(q)}` : "/restaurants"
    );
  };

  return (
    <section className="relative min-h-[600px] lg:min-h-[680px] flex items-center justify-center overflow-hidden">
      {/* ── Background image ── */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="Delicious food spread"
          className="w-full h-full object-cover"
          loading="eager"
        />
        {/* Dark overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/55 to-black/70" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        
    

        {/* Headline */}
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white leading-tight mb-6 drop-shadow-lg">
          Your favorite dishes from{" "}
          <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
            hundreds of local spots
          </span>
          , delivered in minutes.
        </h1>

        {/* Search bar */}
        <form
          onSubmit={handleSearch}
          className="flex items-center gap-2 bg-white rounded-full shadow-2xl p-2 max-w-2xl mx-auto mb-6 border border-white/20"
        >
          <div className="flex items-center pl-4 pr-2 flex-1">
            <Search className="w-5 h-5 text-gray-400 shrink-0" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search restaurants or dishes..."
              className="bg-transparent outline-none text-sm w-full ml-3 placeholder:text-gray-400"
            />
          </div>
          <Button type="submit" size="md">
            Find food
          </Button>
        </form>

        
     
      </div>
    </section>
  );
}