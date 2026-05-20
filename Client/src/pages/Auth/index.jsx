import { useState } from "react";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";

export default function AuthPage() {
  const [view, setView] = useState("login");

  if (view === "signup") return <SignupPage onNavigateToLogin={() => setView("login")} />;
  return <LoginPage onNavigateToSignup={() => setView("signup")} />;
}
