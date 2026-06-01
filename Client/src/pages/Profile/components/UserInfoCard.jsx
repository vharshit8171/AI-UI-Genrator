import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../../store/AuthStore.js";
import { Mail, Phone, CreditCard, Shield, LogOutIcon } from "lucide-react";

const UserInfoCard = ({ user }) => {
  const infoItems = [
    {
      icon: Mail,
      label: "Email",
      value: user.email,
      show: true,
    },
    {
      icon: Phone,
      label: "Contact",
      value: user.contactNumber || "Not provided",
      show: user.contactNumber,
    },
    {
      icon: Shield,
      label: "Role",
      value: user.role?.toUpperCase() || "USER",
      show: true,
    },
    {
      icon: CreditCard,
      label: "Credits",
      value: user.credits || 0,
      show: true,
    },
  ];

  const navigate = useNavigate();

  const logout = useAuthStore((state) => state.logout);
  const deleteAccount = useAuthStore((state) => state.deleteAccount);

  const handleSignout = async()=>{
    await logout();
    navigate("/auth");
    toast.success("SignOut Successfully!");
  }

  const handleDeleteAccount = async()=>{
    await deleteAccount();
    navigate("/auth");
    toast.success("Account Deleted!");
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-md overflow-hidden shadow-2xl">
      <div className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-4">
          <div className="relative group">
            {user.avatar ? (
              <img src={user.avatar}
                alt={user.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-orange-500 shadow-lg shadow-orange-500/20 transition-transform group-hover:scale-105"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-linear-to-br from-orange-500 to-orange-600 flex items-center justify-center border-4 border-orange-500 shadow-lg shadow-orange-500/20 transition-transform group-hover:scale-105">
                <span className="text-5xl font-bold text-white">
                  {user.name?.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            
            <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-4 border-zinc-900 rounded-full animate-pulse" />
          </div>

          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-3xl font-bold text-white mb-2">{user.name}</h2>
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
              <span className="text-sm text-zinc-300 font-semibold">Signed in with</span>
              <span className="px-5 py-1 text-center font-semibold capitalize bg-orange-500/10 text-orange-400 rounded-full text-xs border border-orange-500/20">
                {user.authProvider || "Email"}
              </span>
            </div>
            
            <div className="flex items-center justify-center sm:justify-start gap-6 text-sm">
              <div>
                <span className="text-zinc-300 font-semibold">Sites: </span>
                <span className="text-white font-semibold">{user.pages?.length || 0}</span>
              </div>
              <div>
                <span className="text-zinc-300 font-semibold">Credits: </span>
                <span className="text-orange-400 font-semibold">{user.credits || 0}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {infoItems.map((item, index) => {
            if (!item.show) return null;
  
            const Icon = item.icon;
            return (
              <div key={item.label}
                className="bg-black/50 border border-zinc-800 rounded-lg p-4 hover:border-orange-500/30 transition-all duration-300 animate-fadeInUp"
                style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-orange-500/10 rounded-lg">
                    <Icon className="w-5 h-5 text-orange-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">
                      {item.label}
                    </p>
                    <p className="text-white font-medium truncate">
                      {item.value}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-5 flex flex-col sm:flex-row gap-4">
          <button  onClick={handleSignout}
          className="flex-1 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-md cursor-pointer transition-all duration-300 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98]">
            <LogOutIcon className="w-5 h-5 mr-2 inline-block" />
            Logout
          </button>
          <button onClick={handleDeleteAccount}
          className="flex-1 px-6 py-3 bg-zinc-800 hover:bg-zinc-800 text-red-500 font-medium rounded-md cursor-pointer transition-all duration-300 border border-zinc-700 hover:scale-[1.02] active:scale-[0.98]">
            <Shield className="w-5 h-5 mr-2 inline-block" />
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInfoCard;