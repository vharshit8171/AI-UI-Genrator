import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AuthInput from "./components/AuthInput.jsx";
import useAuthStore from "../../../store/AuthStore.js";
import SocialButton from "./components/SocialButton.jsx";
import AvatarUpload from "./components/AvatarUpload.jsx";
import AuthLeftPanel from "./components/AuthLeftPanel.jsx";
import { SOCIAL_PROVIDERS } from "../../constants/authData.jsx";

export default function SignupPage({ onNavigateToLogin }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    avatar: null,
    preview: null,
    agreed: false,
  });
  const [localError, setLocalError] = useState("");
  const navigate = useNavigate();
  const register = useAuthStore((s) => s.register);
  const isLoading = useAuthStore((s) => s.loading.register);
  const serverError = useAuthStore((s) => s.errors.register);
  const clearError = useAuthStore((s) => s.clearError);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (serverError) clearError("register");
    if (localError) setLocalError("");
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (file) => {
    if (formData.preview) URL.revokeObjectURL(formData.preview);
    if (!file) {
      setFormData((prev) => ({ ...prev, avatar: null, preview: null }));
      return;
    }
    setFormData((prev) => ({
      ...prev,
      avatar: file,
      preview: URL.createObjectURL(file),
    }));
  };

  const handleAgreed = () => {
    setFormData((prev) => ({ ...prev, agreed: !prev.agreed }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !formData.contact) {
      setLocalError("Please fill in all fields.");
      return;
    }
    if (!formData.agreed) {
      setLocalError("Please accept the terms to continue.");
      return;
    }
    if (formData.password.length < 8) {
      setLocalError("Password must be at least 8 characters.");
      return;
    }

    setLocalError("");

    const result = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      contact: formData.contact,
      avatar: formData.avatar,
    });

    if (result.success) {
      navigate("/dashboard");
      toast.success("Account created successfully!");
    }
  };

  const displayError = localError || serverError;
  return (
    <div className="min-h-screen bg-[#0a0907] flex">

      <AuthLeftPanel />

      <div className="flex-1 flex items-center justify-center px-6 py-5">
        <div className="w-full max-w-lg">

          <div className="flex items-center gap-2 mb-10 lg:hidden">
            <div className="w-7 h-7 rounded-lg bg-orange-500 flex items-center justify-center text-xs font-black text-[#0a0907]"
              style={{ fontFamily: "Syne, sans-serif" }}>
              B
            </div>
            <span className="text-white font-black text-base tracking-tight"
              style={{ fontFamily: "Syne, sans-serif" }}>
              Buildr
            </span>
          </div>

          <h1 className="text-white font-black tracking-tight"
            style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(24px, 3vw, 32px)" }}>
            Create account
          </h1>
          <p className="text-white/50 text-sm ml-1.5 mb-5">
            Free forever. No credit card required.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <AvatarUpload preview={formData.preview} onFileChange={handleAvatarChange} />

            <AuthInput
              id="name"
              label="Full Name"
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              disabled={isLoading}
            />
            <AuthInput
              id="email"
              label="Email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
            />
            <AuthInput
              id="password"
              label="Password"
              type="password"
              name="password"
              placeholder="Min. 8 characters"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
            />

            {formData.password.length > 0 && (
              <div className="flex gap-1.5 -mt-1">
                {[1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${formData.password.length >= level * 3
                        ? level <= 1
                          ? "bg-red-500"
                          : level === 2
                            ? "bg-amber-500"
                            : level === 3
                              ? "bg-yellow-400"
                              : "bg-orange-400"
                        : "bg-white/10"
                      }`}
                  />
                ))}
              </div>
            )}

            <AuthInput
              id="contact"
              label="Contact Number"
              type="text"
              name="contact"
              placeholder="Contact Number"
              value={formData.contact}
              onChange={handleChange}
              disabled={isLoading}
            />

            <label className="flex items-start gap-3 cursor-pointer mt-1">
              <div
                onClick={handleAgreed}
                className={`w-4 h-4 rounded shrink-0 mt-0.5 border transition-all duration-200 flex items-center justify-center cursor-pointer ${formData.agreed
                    ? "bg-orange-500 border-orange-500"
                    : "bg-transparent border-white/20"
                  }`}
              >
                {formData.agreed && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path
                      d="M1 4l3 3 5-6"
                      stroke="#0a0907"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <span className="text-white/40 text-xs leading-relaxed">
                I agree to the{" "}
                <a href="#" className="text-orange-400 hover:text-orange-300 transition-colors font-semibold">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-orange-400 hover:text-orange-300 transition-colors font-semibold">
                  Privacy Policy
                </a>
              </span>
            </label>

            {displayError && (
              <p className="text-red-400/80 text-sm font-semibold bg-red-500/10 border border-red-500/20 rounded-md px-3 py-2">
                {displayError}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-500 hover:bg-orange-400 disabled:opacity-50 disabled:cursor-not-allowed text-[#0a0907] font-bold text-sm py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(249,115,22,0.4)] cursor-pointer border-none mt-1"
            >
              {isLoading ? "Creating account..." : "Create Account →"}
            </button>
          </form>

          <p className="text-white/50 text-sm text-center mt-2.5">
            Already have an account?{" "}
            <button
              onClick={onNavigateToLogin}
              className="text-orange-400 hover:text-orange-300 transition-colors bg-transparent border-none cursor-pointer text-sm"
            >
              Sign in
            </button>
          </p>

        </div>
      </div>
    </div>
  );
}