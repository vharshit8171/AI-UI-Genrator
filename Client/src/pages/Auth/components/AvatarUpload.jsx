import { useState,useRef } from "react";

export default function AvatarUpload({ preview, onFileChange }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    onFileChange(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div className="flex flex-col items-center gap-3 mb-1">
      <div onClick={() => inputRef.current.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className="relative w-20 h-20 rounded-full cursor-pointer group"
        style={{
          background: preview
            ? "transparent"
            : dragging
              ? "rgba(249,115,22,0.12)"
              : "rgba(255,255,255,0.03)",
          border: dragging
            ? "2px dashed rgba(249,115,22,0.7)"
            : preview
              ? "2px solid rgba(249,115,22,0.4)"
              : "2px dashed rgba(255,255,255,0.12)",
          boxShadow: preview ? "0 0 20px rgba(249,115,22,0.2)" : "none",
          transition: "all 0.2s ease",
        }}>
        {preview ? (
          <img
            src={preview}
            alt="Profile preview"
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-1">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
        )}

        <div
          className="absolute inset-0 rounded-full flex items-center justify-center transition-opacity duration-200"
          style={{
            background: "rgba(10,9,7,0.55)",
            opacity: 0,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fb923c"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
        </div>

        {!preview && (
          <div
            className="absolute -bottom-0.5 -right-0.5 w-6 h-6 rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #f97316, #f59e0b)",
              boxShadow: "0 0 10px rgba(249,115,22,0.5)",
            }}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M5 1v8M1 5h8" stroke="#0a0907" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </div>
        )}

        {preview && (
          <div className="absolute -bottom-0.5 -right-0.5 w-6 h-6 rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #f97316, #f59e0b)",
              boxShadow: "0 0 10px rgba(249,115,22,0.5)",
            }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0a0907" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </div>
        )}
      </div>

      <p className="text-white/30 text-xs" style={{ fontFamily: "Syne, sans-serif" }}>
        {preview ? (
          <button type="button"
            onClick={() => onFileChange(null)}
            className="text-red-400/60 hover:text-red-400 transition-colors bg-transparent border-none cursor-pointer text-xs"
          >
            Remove photo
          </button>
        ) : (
          <>
            Profile photo{" "}
            <span className="text-orange-500/60 cursor-pointer hover:text-orange-400 transition-colors"
              onClick={() => inputRef.current.click()}
            >
              upload
            </span>{" "}
            · Optional
          </>
        )}
      </p>

      <input ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files[0])}
      />
    </div>
  );
}