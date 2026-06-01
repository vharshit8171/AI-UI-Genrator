import { User } from "lucide-react";

const ProfileHeader = ({ user }) => {
  return (
    <div className="relative h-30 sm:h-50 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-orange-600 via-orange-500 to-orange-700">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(255,255,255,.1) 10px,
              rgba(255,255,255,.1) 20px
            )`
          }} />
        </div>
      </div>

      <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/60" />
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-8">
        <div className="animate-fadeIn">
          <h1 className="text-4xl sm:text-5xl font-bold text-white">
            {user.name}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;