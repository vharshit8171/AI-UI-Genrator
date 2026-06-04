import { PaymentRow } from "./PaymentRow";
import { CreditCard, Trash2 } from "lucide-react";

export const PaymentHistorySection = ({ payments }) => {
    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-orange-500/10 rounded-lg">
                        <CreditCard className="w-6 h-6 text-orange-400" />
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-white">
                            Payment History
                        </h2>

                        <p className="text-zinc-400 text-sm font-semibold">
                            {payments?.length || 0}{" "}
                            {payments?.length === 1
                                ? "transaction"
                                : "transactions"}
                        </p>
                    </div>
                </div>
            </div>

            {payments?.length > 0 ? (
                <div className="bg-zinc-900 border border-zinc-800 rounded-xs overflow-hidden">
                    {payments.map((payment) => (
                        <PaymentRow key={payment._id} payment={payment} />
                    ))}
                </div>
            ) : (
                <div className="bg-zinc-900 border border-zinc-800 rounded-md p-12 text-center animate-fadeIn">
                    <div className="max-w-md mx-auto">
                        <div className="w-20 h-20 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-2">
                            <CreditCard className="w-10 h-10 text-orange-400" />
                        </div>

                        <h3 className="text-xl font-semibold text-white mb-0.5">
                            No payments yet
                        </h3>

                        <p className="text-zinc-400 mb-8 font-semibold">
                            Your transaction history will appear here once you purchase credits.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};