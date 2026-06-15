import { createContext, useContext } from "react";

const defaultTheme = {
  accent: "#f97316",
  bg: "#0f172a",
  surface: "rgba(255,255,255,0.04)",
  text: "#ffffff",
  mutedText: "rgba(255,255,255,0.6)",
  radius: "rounded",
  fontStyle: "modern",
  mood: "dark",
};

export const ThemeContext = createContext(defaultTheme);
export const useTheme = () => useContext(ThemeContext);