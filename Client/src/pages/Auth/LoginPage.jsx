import { useState } from "react";
import { toast } from "react-toastify";
import AuthInput from "./components/AuthInput.jsx";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../../store/AuthStore.js";
import SocialButton from "./components/SocialButton.jsx";
import AuthLeftPanel from "./components/AuthLeftPanel.jsx";
import { SOCIAL_PROVIDERS } from "../../constants/authData.jsx";

export default function LoginPage({ onNavigateToSignup }) {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [localError, setLocalError] = useState("");

  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const socialLogin = useAuthStore((s) => s.socialLogin);
  const isLoading = useAuthStore((s) => s.loading.socialLogin || s.loading.login);
  const serverError = useAuthStore((s) => s.errors.socialLogin || s.errors.login);
  const clearError = useAuthStore((s) => s.clearError);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (serverError) {
      clearError("login");
      clearError("socialLogin");
    }
    if (localError) setLocalError("");
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSocialLogin = async (provider) => {
    const result = await socialLogin(provider.type)
    if (result?.success) {
      navigate("/dashboard");
      toast.success("Logged in successfully!");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setLocalError("Please fill in all fields.");
      return;
    }
    setLocalError("");

    const result = await login({
      email: formData.email,
      password: formData.password,
    });
    if (result.success) {
      navigate("/dashboard");
      toast.success("Logged in successfully!");
    }
  };

  const displayError = localError || serverError;

  return (
    <div className="min-h-screen bg-[#0a0907] flex">

      <AuthLeftPanel />

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">

          <div className="flex items-center gap-2 mb-10 lg:hidden">
            <div
              className="w-7 h-7 rounded-lg bg-orange-500 flex items-center justify-center text-xs font-black text-[#0a0907]"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              B
            </div>
            <span
              className="text-white font-black text-base tracking-tight"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Buildr
            </span>
          </div>

          <h1
            className="text-white font-black tracking-tight mb-0.5"
            style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(24px, 3vw, 32px)" }}
          >
            Welcome back
          </h1>
          <p className="text-white/40 text-sm ml-2.5 mb-8">
            Sign in to continue building.
          </p>

          <div className="flex flex-col gap-3 mb-6">
            {SOCIAL_PROVIDERS.map((provider) => (
              <SocialButton key={provider.name} provider={provider} onClick={() => { handleSocialLogin(provider) }} />
            ))}
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-white/8" />
            <span className="text-white/25 text-xs">or continue with email</span>
            <div className="flex-1 h-px bg-white/8" />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <AuthInput
              id="email"
              name="email"
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
            />

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-white/50 text-xs font-medium tracking-wide uppercase">
                  Password
                </label>
                <Link
                  to=""
                  className="text-orange-400 text-xs hover:text-orange-300 transition-colors no-underline"
                >
                  Forgot password?
                </Link>
              </div>
              <AuthInput
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            {displayError && (
              <p className="text-red-400/80 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                {displayError}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-500 hover:bg-orange-400 disabled:opacity-50 disabled:cursor-not-allowed text-[#0a0907] font-bold text-sm py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(249,115,22,0.4)] cursor-pointer border-none mt-1"
            >
              {isLoading ? "Signing in..." : "Sign In →"}
            </button>
          </form>

          <p className="text-white/35 text-sm text-center mt-4">
            Don't have an account?{" "}
            <button
              onClick={onNavigateToSignup}
              className="text-orange-400 hover:text-orange-300 hover:underline transition-colors bg-transparent border-none cursor-pointer text-sm"
            >
              Sign up free
            </button>
          </p>

        </div>
      </div>
    </div>
  );
}