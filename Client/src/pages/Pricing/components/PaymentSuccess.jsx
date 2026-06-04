import { toast } from "react-toastify";
import { useEffect, useState, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle, ArrowRight, Zap, Loader2, } from "lucide-react";

import useAuthStore from "../../../../store/AuthStore.js";
import usePaymentStore from "../../../../store/PaymentStore.js";

export default function PaymentSuccess() {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const hasVerified = useRef(false);

    const user = useAuthStore((state) => state.user);
    const initializeAuth = useAuthStore((state) => state.initializeAuth);
    const verifyPayment = usePaymentStore((state) => state.verifyPayment);

    const [loading, setLoading] = useState(true);
    const [paymentData, setPaymentData] = useState(null);

    useEffect(() => {
        const verify = async () => {
            if (hasVerified.current) return;
            hasVerified.current = true;
            try {
                if (!sessionId) return;
                const response = await verifyPayment(sessionId);
                toast.success("Credits are added into your account!");
                if (response) {
                    setPaymentData(response);
                }
                await initializeAuth();
            } catch (error) {
                console.error("Payment verification failed", error);
            } finally {
                setLoading(false);
            }
        };
        verify();
    }, [sessionId, verifyPayment, initializeAuth,]
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0907] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />

                    <p className="text-white/70">
                        Verifying payment...
                    </p>
                </div>
            </div>
        );
    }

    if (!paymentData) {
        return (
            <div className="min-h-screen bg-[#0a0907] flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-white text-3xl font-black mb-3"
                        style={{ fontFamily: "Syne, sans-serif", }}>
                        Verification Failed
                    </h1>

                    <p className="text-white/40">
                        We couldn't verify your payment.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0907] flex items-center justify-center px-4 pt-22">
            <div className="w-full max-w-md">
                <div className="relative flex flex-col items-center rounded-lg px-8 py-3 border border-white/[0.07] bg-white/3 text-center">

                    <div className="absolute inset-0 rounded-2xl bg-orange-500/4 pointer-events-none" />

                    <div className="relative mb-2">
                        <div className="w-20 h-20 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                            <CheckCircle className="w-10 h-10 text-orange-500" />
                        </div>

                        <div className="absolute inset-0 rounded-full bg-orange-500/10 animate-ping" />
                    </div>

                    <h1 className="text-white font-black text-3xl mb-1"
                        style={{ fontFamily: "Syne, sans-serif", }}>
                        Payment Successful!
                    </h1>

                    <p className="text-white/60 text-sm font-semibold leading-relaxed mb-4">
                        Your credits have been added successfully in your account and are ready to use.
                    </p>

                    <div className="w-full bg-white/3 border border-white/8 rounded-sm px-6 py-4 mb-4 text-left">

                        <p className="text-white/65 text-[10px] font-semibold uppercase text-center tracking-widest mb-4">
                            Purchase Summary
                        </p>

                        <div className="flex flex-col gap-3">

                            <SummaryRow label="Pack" value={paymentData.pack} />
                            <SummaryRow label="Amount Paid" value={`₹${paymentData.amount}`} />
                            <SummaryRow label="Session" value={sessionId?.slice(-8)} />

                            <div className="border-t border-white/6 pt-3 mt-1">
                                <div className="flex items-center justify-between">
                                    <span className="text-white/40 text-sm">
                                        Credits Added
                                    </span>

                                    <div className="flex items-center gap-1.5">
                                        <Zap className="w-4 h-4 text-orange-500" />
                                        <span className="text-orange-400 font-black text-lg"
                                            style={{ fontFamily: "Syne, sans-serif", }}
                                        >
                                            +
                                            {
                                                paymentData.creditsPurchased
                                            }
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-white/6 pt-3">

                                <div className="flex items-center justify-between">
                                    <span className="text-white/40 text-sm">
                                        Current Credits
                                    </span>

                                    <span
                                        className="text-white font-bold"
                                    >
                                        {user?.credits ??
                                            0}
                                    </span>
                                </div>

                            </div>
                        </div>
                    </div>

                    <Link to="/dashboard"
                        className="w-full py-3 rounded-xl text-sm font-bold bg-orange-500 hover:bg-orange-400 text-[#0a0907] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(249,115,22,0.4)] flex items-center justify-center gap-2"
                        style={{
                            fontFamily:
                                "Syne, sans-serif",
                        }}
                    >
                        Start Building
                        <ArrowRight className="w-4 h-4" />
                    </Link>

                    <p className="text-white/60 font-semibold text-[11px] mt-5">
                        Thank you for supporting
                        Buildr 🚀
                    </p>
                </div>
            </div>
        </div>
    );
}

function SummaryRow({ label, value, }) {
    return (
        <div className="flex items-center justify-between">
            <span className="text-white/40 text-sm">
                {label}
            </span>
            <span className="text-white/70 text-sm font-medium">
                {value}
            </span>
        </div>
    );
}