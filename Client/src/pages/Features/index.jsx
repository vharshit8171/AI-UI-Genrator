import { STATS } from "../../constants/featureData.jsx"
import { FEATURES } from "../../constants/featureData.jsx"
import FeatureCard from "./components/FeatureCard.jsx";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../store/AuthStore.js";
import ParticleCanvas from "../LandingPage/components/ParticleCanvas.jsx"

export default function FeaturesPage() {
    const navigate = useNavigate();

    const user = useAuthStore((s)=> s.user);
    const isAuthenticated = useAuthStore((s)=> s.isAuthenticated);

    return (
        <div className="relative min-h-screen w-full overflow-x-hidden"
            style={{ background: "#0a0907" }}>
            <ParticleCanvas />

            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-175 h-80 pointer-events-none z-0"
                style={{ background: "radial-gradient(ellipse, rgba(249,115,22,0.07) 0%, transparent 70%)" }} />
            <div className="fixed bottom-0 right-0 w-100 h-100 pointer-events-none z-0"
                style={{ background: "radial-gradient(ellipse, rgba(245,158,11,0.05) 0%, transparent 70%)" }} />

            <div className="relative z-10 pt-24 pb-28 px-6">
                <div className="max-w-5xl mx-auto">

                    <div className="text-center mb-20">
                        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-orange-500/25 bg-orange-500/8 mb-5"
                            style={{ fontFamily: "Syne, sans-serif" }}>
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                            <span className="text-amber-400 text-xs font-semibold tracking-widest uppercase">
                                Everything You Need
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight leading-tight mb-1.5"
                            style={{ fontFamily: "Syne, sans-serif" }}>
                            Built for creators who{" "}
                            <span className="bg-clip-text text-transparent"
                                style={{ backgroundImage: "linear-gradient(90deg, #f97316, #f59e0b)" }}>
                                move fast.
                            </span>
                        </h1>

                        <p className="text-white/45 text-md max-w-2xl mx-auto leading-relaxed"
                            style={{ fontFamily: "Syne, sans-serif" }}>
                            Buildr packs powerful AI generation, a seamless editor, and a smooth export workflow
                            into one focused tool — so you spend less time wrestling with tools and more time
                            building things that matter.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden mb-20 border border-white/5"
                        style={{ background: "rgba(255,255,255,0.03)" }}>
                        {STATS.map(({ value, label }) => (
                            <div
                                key={label}
                                className="flex flex-col items-center justify-center py-7 px-4 gap-1"
                                style={{ background: "rgba(10,9,7,0.6)" }}>
                                <span className="text-3xl font-black bg-clip-text text-transparent"
                                    style={{
                                        fontFamily: "Syne, sans-serif",
                                        backgroundImage: "linear-gradient(90deg, #f97316, #f59e0b)",
                                    }}>
                                    {value}
                                </span>
                                <span className="text-white/40 text-xs font-semibold tracking-wider uppercase"
                                    style={{ fontFamily: "Syne, sans-serif" }}>
                                    {label}
                                </span>
                            </div>
                        ))}
                    </div>

                    {FEATURES.map(({ category, items }) => (
                        <div key={category} className="mb-16">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="h-px flex-1 bg-linear-to-r from-transparent via-orange-500/20 to-transparent" />
                                <span
                                    className="text-md font-bold tracking-widest uppercase text-orange-500/60 px-3"
                                    style={{ fontFamily: "Syne, sans-serif" }}
                                >
                                    {category}
                                </span>
                                <div className="h-px flex-1 bg-linear-to-r from-transparent via-orange-500/20 to-transparent" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {items.map((feature, i) => (
                                    <FeatureCard key={feature.title} {...feature} index={i} />
                                ))}
                            </div>
                        </div>
                    ))}

                    <div className="mt-20 text-center">
                        <div className="inline-flex flex-col items-center gap-6 px-12 py-10 rounded-lg border border-orange-500/15 relative overflow-hidden"
                            style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.06), rgba(10,9,7,0.95))" }}>
                            <div className="absolute inset-0 pointer-events-none"
                                style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(249,115,22,0.1), transparent 65%)" }} />

                            <h2 className="text-5xl font-black text-white relative z-10"
                                style={{ fontFamily: "Syne, sans-serif" }}>
                                Ready to start building?
                            </h2>
                            <p className="text-white/45 text-sm max-w-md text-center relative z-10"
                                style={{ fontFamily: "Syne, sans-serif" }}>
                                Join thousands of creators using Buildr to write smarter, ship faster, and
                                do more with every credit.
                            </p>
                            <div className="flex items-center gap-3 relative z-10">
                               {(!user && !isAuthenticated) && (
                                 <button onClick={()=>{navigate("/auth")}}
                                 className="bg-linear-to-br from-orange-500 to-amber-500 text-[#0a0907] font-bold px-6 py-3 rounded-lg shadow-[0_0_20px_rgba(249,115,22,0.35)] hover:-translate-y-px hover:shadow-[0_0_32px_rgba(249,115,22,0.6)] transition-all duration-200 border-none cursor-pointer"
                                    style={{ fontFamily: "Syne, sans-serif" }}>
                                    Get Started Free
                                </button>
                               )}
                                <button onClick={()=>{navigate("/pricing")}}
                                className="text-white/50 px-6 py-3 rounded-lg border border-white/8 hover:border-white/20 hover:text-white/80 transition-all duration-200 cursor-pointer bg-transparent"
                                    style={{ fontFamily: "Syne, sans-serif" }}>
                                    View Pricing →
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
