import Logo from "../../components/layout/Logo";
import LoginForm from "../../components/auth/LoginForm";
import { Bike, Pizza, Utensils, Clock, Star, MapPin } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-white">
      {/* Left — form */}
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Logo links to home on its own — no wrapping <Link> needed */}
          <div className="mb-8">
            <Logo size="md" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            Welcome back
          </h1>
          <p className="text-gray-500 mb-8">
            Sign in to continue ordering your favorites.
          </p>

          <LoginForm />
        </div>
      </div>

      {/* Right — decorative panel */}
     <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-100 p-12 relative overflow-hidden select-none">
      {/* Dynamic Animated Background Glows */}
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-yellow-300/40 blur-3xl animate-pulse" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-orange-400/30 blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-amber-200/20 blur-2xl" />

      {/* Decorative Background Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* FLOATING DECORATIVE ELEMENTS */}

      {/* Top Left: Delivery Scooter */}
      <div className="absolute top-10 left-10 bg-white/80 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-white/60 flex items-center gap-3 animate-bounce [animation-duration:4s]">
        <div className="bg-gradient-to-tr from-orange-500 to-amber-400 p-2.5 rounded-xl text-white shadow-md">
          <Bike className="w-6 h-6 animate-pulse" />
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-800">Fast Delivery</p>
          <p className="text-[10px] text-orange-600 font-medium flex items-center gap-1">
            <Clock className="w-3 h-3" /> ~20 mins
          </p>
        </div>
      </div>

      {/* Top Right: Hot Pizza Card */}
      <div className="absolute top-16 right-12 bg-white/80 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-white/60 flex items-center gap-3 animate-bounce [animation-duration:5s] [animation-delay:1s]">
        <div className="bg-gradient-to-tr from-red-500 to-orange-400 p-2.5 rounded-xl text-white shadow-md">
          <Pizza className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-800">Hot Pizza</p>
          <div className="flex items-center gap-1 text-[10px] text-amber-500 font-bold">
            <Star className="w-3 h-3 fill-amber-400 stroke-amber-400" /> 4.9 (1.2k)
          </div>
        </div>
      </div>

      {/* Bottom Left: Burger / Food Card */}
      <div className="absolute bottom-12 left-14 bg-white/80 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-white/60 flex items-center gap-3 animate-bounce [animation-duration:4.5s] [animation-delay:0.5s]">
        <div className="bg-gradient-to-tr from-amber-500 to-yellow-400 p-2.5 rounded-xl text-white shadow-md">
          <Utensils className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-800">Juicy Burgers</p>
          <p className="text-[10px] text-gray-500 font-medium">Free Shipping</p>
        </div>
      </div>

      {/* Bottom Right: Live Tracking */}
      <div className="absolute bottom-16 right-10 bg-white/80 backdrop-blur-md px-4 py-2.5 rounded-full shadow-lg border border-white/60 flex items-center gap-2 animate-pulse">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
        </span>
        <MapPin className="w-3.5 h-3.5 text-orange-500" />
        <span className="text-xs font-semibold text-gray-700">Live Courier Tracking</span>
      </div>

      {/* MAIN CONTENT CENTER */}
      <div className="relative max-w-md text-center z-10 my-8">
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100/80 border border-orange-200 text-orange-700 text-xs font-semibold mb-6 shadow-sm backdrop-blur-sm">
          <span>🛵</span> Express Food Delivery
        </div>

        {/* Logo Container */}
        <div className="flex justify-center mb-6 transform transition-transform hover:scale-105 duration-300">
          <Logo size="lg" />
        </div>

        {/* Heading */}
        <h2 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight leading-tight">
          Delicious food, <br />
          <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
            delivered fast
          </span>
        </h2>

        {/* Paragraph */}
        <p className="text-gray-600 text-sm leading-relaxed max-w-sm mx-auto">
          Order from your favorite local restaurants and track your delivery live every step of the way.
        </p>
      </div>
    </div>
    </div>
  );
}