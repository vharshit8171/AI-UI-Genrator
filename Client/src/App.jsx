import Auth from "./pages/Auth";
import { useEffect } from "react";
import AppLoader from "./AppLoader.jsx";
import EditorPage from "./pages/Editor";
import PricingPage from "./pages/Pricing";
import PublicRoute from "./PublicRoute.jsx";
import FeaturesPage from "./pages/Features";
import DashboardPage from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import Profile from "./pages/Profile";
import { ToastContainer } from "react-toastify";
import useAuthStore from "../store/AuthStore.js";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./ProtectedRoute.jsx";
import PaymentSuccess from "./pages/Pricing/components/PaymentSuccess.jsx";
import PreviewPage from "./pages/Editor/components/PreviewPage.jsx";
import AppNavbar from "./pages/LandingPage/components/AppNavbar";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

function AppContent() {
  const location = useLocation();
  const isAuthRoute = location.pathname === "/auth";
  const isPreviewRoute = location.pathname.startsWith("/preview/");
  return (
    <>
      {!isAuthRoute && !isPreviewRoute && <AppNavbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/auth" element={
          <PublicRoute>
            <Auth />
          </PublicRoute>
        }/>

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<Profile />} />
          <Route path="/editor" element={<EditorPage />} />
          <Route path="/editor/:id" element={<EditorPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
        </Route>

        <Route path="/feature" element={<FeaturesPage />} />
        <Route path="/preview/:id/:page" element={<PreviewPage />} />
      </Routes>
    </>
  );
}

const App = () => {
  const isInitialized = useAuthStore((s) => s.isInitialized);
  const initializeAuth = useAuthStore((s) => s.initializeAuth);

   useEffect(() => {
    if (!isInitialized) {
      initializeAuth();
    }
  }, [isInitialized, initializeAuth]);

  if (!isInitialized) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        <AppLoader />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000}/>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;