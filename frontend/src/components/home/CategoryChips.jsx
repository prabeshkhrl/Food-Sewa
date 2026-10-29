import { Link } from "react-router-dom";

const categories = [
  {
    label: "Pizza",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=300&q=80",
  },
  {
    label: "Burgers",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=80",
  },
  {
    label: "Rice",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=300&q=80",
  },
  {
    label: "Curry",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=300&q=80",
  },
  {
    label: "Sides",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=300&q=80",
  },
  {
    label: "Desserts",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=300&q=80",
  },
  {
    label: "Beverages",
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=300&q=80",
  },
  {
    label: "Salads",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&q=80",
  },
];

export default function CategoryChips() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            What are you craving?
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Pick a category to explore.
          </p>
        </div>
        <Link
          to="/restaurants"
          className="text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors"
        >
          View all →
        </Link>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
        {categories.map((cat) => (
          <Link
            key={cat.label}
            to={`/restaurants?category=${encodeURIComponent(cat.label)}`}
            className="group flex flex-col items-center gap-2.5 p-3 rounded-2xl bg-white border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
          >
            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-100 relative shadow-inner">
              <img
                src={cat.image}
                alt={cat.label}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <span className="text-xs font-semibold text-gray-700 group-hover:text-orange-600 transition-colors text-center truncate w-full">
              {cat.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}