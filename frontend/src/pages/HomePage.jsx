import HeroSection from "../components/home/HeroSection";
import CategoryChips from "../components/home/CategoryChips";
import FeaturedRestaurants from "../components/home/FeaturedRestaurants";
import HowItWorks from "../components/home/HowItWorks";
import StatsBanner from "../components/home/StatsBanner";
import PartnerCTA from "../components/home/PartnerCTA";
import EverythingYouCrave from "../components/home/EverythingYouCrave";
import AboutUs from "../components/home/AboutUs";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <CategoryChips />
      <EverythingYouCrave/>
      <PartnerCTA />
      <AboutUs/>
      <HowItWorks />
      <StatsBanner />
      <FeaturedRestaurants />
      
    </div>
  );
}