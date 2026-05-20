import { Navigate } from "react-router-dom";
import useAuthStore from "../store/AuthStore.js";

export default function PublicRoute({ children }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
