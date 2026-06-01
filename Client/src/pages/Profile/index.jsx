import { useEffect } from "react";
import AppLoader from "../../AppLoader.jsx";
import ParticleCanvas from "../LandingPage/components/ParticleCanvas.jsx";
import useAuthStore from "../../../store/AuthStore.js";
import UserInfoCard from "./components/UserInfoCard.jsx";
import ProfileHeader from "./components/ProfileHeader.jsx";
import UserSitesSection from "./components/UserSiteSection.jsx";

const ProfilePage = () => {
  const user = useAuthStore((s) => s.user);

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
        <div className="-mt-28 relative z-10 mb-8 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
          <UserInfoCard user={user} />
        </div>

        <div className="animate-fadeInUp" style={{ animationDelay: '400ms' }}>
          <UserSitesSection sites={user.pages} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;