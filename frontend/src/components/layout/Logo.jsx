import { Link } from "react-router-dom";

export default function Logo({ to = "/", size = "md" }) {
    const heights = {
    sm: "h-8",
    md: "h-10",
    lg: "h-12",
  };
  return (
    <Link to={to} className="flex items-center gap-2 shrink-0">
     <img
        src="/logo.png"
        alt="FoodSewa"
        className={`${heights[size]} w-auto object-contain`}
      />
      <span className="text-red-500 text-xl font-bold tracking-tight">
        FoodSewa
      </span>
    </Link>
  );
}