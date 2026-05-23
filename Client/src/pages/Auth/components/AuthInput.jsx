import { useState } from "react";

export default function AuthInput({ label, type = "text", placeholder, value, onChange, id, name, disabled }) {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-white/80 text-sm font-medium tracking-wide uppercase">
        {label}
      </label>
      <div className={`relative flex items-center bg-white/4 border rounded-sm transition-all duration-200 ${
        focused ? "border-orange-500/60 shadow-[0_0_0_3px_rgba(249,115,22,0.1)]" : "border-white/10"
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}>
        <input
          id={id}
          name={name}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={disabled}
          className="w-full bg-transparent px-4 py-3 text-sm text-white placeholder-white/25 outline-none disabled:cursor-not-allowed"
        />
        {isPassword && (
          <button type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="pr-4 text-white/30 hover:text-white/60 transition-colors cursor-pointer bg-transparent border-none text-xs"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        )}
      </div>
    </div>
  );
}