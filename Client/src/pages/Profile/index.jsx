import { useState, useEffect } from "react";
import AppLoader from "../../AppLoader.jsx";
import ParticleCanvas from "../LandingPage/components/ParticleCanvas.jsx";
import useAuthStore from "../../../store/AuthStore.js";
import usePaymentStore from "../../../store/PaymentStore.js";
import UserInfoCard from "./components/UserInfoCard.jsx";
import ProfileHeader from "./components/ProfileHeader.jsx";
import UserSitesSection from "./components/UserSiteSection.jsx";
import { PaymentHistorySection } from "./components/PaymentHistorySection.jsx";

const ProfilePage = () => {
  const user = useAuthStore((s) => s.user);
  const payments = usePaymentStore((s) => s.payments);
  const fetchPayments = usePaymentStore((s) => s.fetchPayments);
  const [activeTab, setActiveTab] = useState("sites");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <AppLoader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <ProfileHeader user={user} />
      <ParticleCanvas />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="-mt-28 relative z-10 mb-3.5 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
          <UserInfoCard user={user} />
        </div>

        <div className="mb-2">
          <div className="inline-flex bg-zinc-900 border border-zinc-800 rounded-sm p-1.5">
            <button
              onClick={() => setActiveTab("sites")}
              className={`px-5 py-2 rounded-sm cursor-pointer transition-all ${activeTab === "sites"
                ? "bg-orange-500 text-white"
                : "text-zinc-400 hover:text-white"
                }`}
            >
              Sites ({user.pages?.length || 0})
            </button>

            <button
              onClick={() => {
                setActiveTab("payments")
                if (payments.length === 0) {
                  fetchPayments();
                }
              }}
              className={`px-5 py-2 rounded-sm cursor-pointer transition-all ${activeTab === "payments"
                ? "bg-orange-500 text-white"
                : "text-zinc-400 hover:text-white"
                }`}
            >
              Payments ({payments.length || 0})
            </button>
          </div>
        </div>

        {activeTab === "sites" ? (
          <UserSitesSection />
        ) : (
          <PaymentHistorySection payments={payments} />
        )}

      </div>
    </div>
  );
};

export default ProfilePage;