import Footer from "./components/Footer";
import CTASection from "./components/CTASection";
import HeroSection from "./components/HeroSection";
import EditorMockup from "./components/EditorMockup";
import FeaturesSection from "./components/FeaturesSection";
import ParticleCanvas from "./components/ParticleCanvas";
import TestimonialsSection from "./components/TestimonialsSection";

export default function LandingPage() {
  return (
    <div className="bg-[#0a0907] min-h-screen relative">

      {/* ── Background Effects ── */}
      <ParticleCanvas />
      <div className="fixed top-[10%] left-1/2 -translate-x-1/2 w-[60vw] h-[40vh] rounded-full pointer-events-none z-0"
        style={{ background: "radial-gradient(ellipse, rgba(249,115,22,0.06) 0%, transparent 70%)" }}
      />
      <HeroSection />
      <EditorMockup />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
