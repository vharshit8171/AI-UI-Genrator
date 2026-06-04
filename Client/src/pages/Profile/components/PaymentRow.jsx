import { Trash2, Coins, CalendarDays } from "lucide-react";
import { toast } from "react-toastify";

import useAuthStore from "../../../../store/AuthStore.js";
import usePaymentStore from "../../../../store/PaymentStore.js";

export const PaymentRow = ({ payment }) => {
    const user = useAuthStore((state) => state.user);

    const isDeleting = usePaymentStore((state) => state.isDeleting);
    const deletePayment = usePaymentStore((state) => state.deletePayment);

    const handleDeletePayment = async () => {
        if (isDeleting) return;
        await deletePayment(payment._id);
        toast.success("Payment deleted successfully");
    };

    return (
        <div className="border-b border-zinc-800 px-7 py-4 hover:bg-zinc-800/30 transition">
            <div className="flex items-center justify-between">

                <div className="flex items-center gap-4">

                    <img src={user?.avatar ||
                        `https://ui-avatars.com/api/?name=${user?.name}`
                    }
                        alt={user?.name}
                        className="w-14 h-14 rounded-full object-cover border border-zinc-700"
                    />

                    <div>
                        <h3 className="font-semibold text-white">
                            {user?.name}
                        </h3>
                        <p className="text-sm text-zinc-400">
                            {user?.email}
                        </p>
                    </div>
                </div>

                <button onClick={handleDeletePayment}
                    disabled={isDeleting}
                    className="text-red-400 hover:text-red-300 cursor-pointer transition">
                    <Trash2 size={18} />
                </button>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-4 md:gap-8 pl-16">

                <div>
                    <p className="text-xs font-semibold uppercase text-zinc-300">
                        Plan
                    </p>
                    <p className="font-semibold text-orange-400">
                        {payment.pack}
                    </p>
                </div>

                <div>
                    <p className="text-xs uppercase font-semibold text-zinc-300">
                        Credits
                    </p>
                    <div className="flex items-center gap-1 text-white">
                        <Coins size={15} />
                        {payment.creditsPurchased}
                    </div>
                </div>

                <div>
                    <p className="text-xs uppercase font-semibold text-zinc-300">
                        Amount
                    </p>
                    <p className="font-semibold text-white">
                        ₹{payment.amount}
                    </p>
                </div>

                <div>
                    <p className="text-xs uppercase font-semibold text-zinc-300">
                        Status
                    </p>
                    <span className="px-2 py-1 rounded-full text-xs bg-green-500/15 text-green-400 border border-green-500/20">
                        {payment.status}
                    </span>
                </div>

                <div>
                    <p className="text-xs uppercase font-semibold text-zinc-300">
                        Purchased
                    </p>
                    <div className="flex items-center gap-1 text-zinc-300">
                        <CalendarDays size={15} />
                        {new Date(payment.createdAt).toLocaleDateString()}
                    </div>
                </div>
            </div>
        </div>
    );
};