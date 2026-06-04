import axios from "axios";
import { create } from "zustand";

const API_URL = "http://localhost:3000/api/v1/payment";

const usePaymentStore = create((set) => ({
    payments: [],
    deletingPayment: null,
    isLoading: false,
    isDeleting: false,

    fetchPayments: async () => {
        try {
            set({ isLoading: true });
            const res = await axios.get(`${API_URL}/payments-history`, {
                withCredentials: true,
            });
            set({ payments: res.data.data });
        } catch (error) {
            console.error(error);
        } finally {
            set({ isLoading: false, });
        }
    },

    buyCredits: async (pack) => {
        set({ isLoading: true });
        try {
            const { data } = await axios.post(
                `${API_URL}/create-session`,
                { pack },
                {
                    withCredentials: true,
                }
            );

            // Redirect to Stripe Checkout
            window.location.href = data.data;
        } catch (error) {
            console.error(error);
        } finally {
            set({ isLoading: false });
        }
    },

    verifyPayment: async (sessionId) => {
        set({ isLoading: true });
        try {
            const { data } = await axios.post(`${API_URL}/verify`,
                { sessionId },
                { withCredentials: true }
            );
            return data.data;
        } catch (error) {
            console.error(error);
        } finally {
            set({ isLoading: false });
        }
    },

    deletePayment: async (paymentId) => {
        try {
            set({ deletingPayment: paymentId, isDeleting: true });

            await axios.delete(`${API_URL}/payment-delete/${paymentId}`,
                { withCredentials: true }
            );
            set((state) => ({
                payments: state.payments.filter(
                    (payment) => payment._id !== paymentId
                ),
            }));

        } catch (error) {
            console.error(error);
        } finally {
            set({
                deletingPayment: null,
                isDeleting: false,
            });
        }
    },
}));

export default usePaymentStore;