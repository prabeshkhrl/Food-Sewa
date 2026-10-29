import Logo from "../../components/layout/Logo";
import RegisterTabs from "../../components/auth/RegisterTabs";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Logo — the component already contains a <Link to="/"> */}
        <div className="mb-8">
          <Logo size="md" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-1">
          Create your account
        </h1>
        <p className="text-gray-500 mb-8">
          Join as a customer or start your own restaurant.
        </p>

        <RegisterTabs />
      </div>
    </div>
  );
}