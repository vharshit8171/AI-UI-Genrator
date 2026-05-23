export default function SocialButton({ provider, onClick }) {
  return (
    <button onClick={onClick}
      className="w-full flex items-center justify-center gap-3.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/80 hover:text-white text-md font-medium py-3 rounded-xl transition-all duration-200 cursor-pointer">
      {provider.icon}
      Continue with {provider.name}
    </button>
  );
}
