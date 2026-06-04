import { ApiError } from "../utils/ApiError.js";
import Payment from "../models/payment.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { createCheckoutSession, verifyPayment } from "../services/payment.service.js";

export const createSession = async (req, res) => {
    const session = await createCheckoutSession(
        req.user._id,
        req.body.pack
    );
    return res
        .status(201)
        .json(new ApiResponse(201, "Checkout session created", session.url))
};

export const verify = async (req, res) => {
    const payment = await verifyPayment(
        req.body.sessionId
    );

    return res
        .status(200)
        .json(new ApiResponse(200, "Payment verified", payment))
};

export const getUserPayments = async (req, res) => {
    try {
        const payments = await Payment.find({ user: req.user._id, }).sort({ createdAt: -1, });

        return res.status(200)
            .json(new ApiResponse(200, "Payments fetched successfully", payments));
    } catch (error) {
        console.log(error);
        return res.status(500)
            .json(new ApiError(500, "Failed to fetch payments", ["Error in payment fetching"]));
    }
};

export const deletePayment = async (req, res) => {
    try {
        const { paymentId } = req.params;
        const payment = await Payment.findOne({
            _id: paymentId,
            user: req.user._id,
        });

        if (!payment) {
            return res.status(404)
                .json(new ApiError(404, "Payment not found", ["No payment found with the given ID for this user"])
                );
        }

        await Payment.findByIdAndDelete(paymentId);
        return res.status(200)
            .json(new ApiResponse(200, "Payment deleted successfully", null));
    } catch (error) {
        console.log(error);

        return res.status(500)
            .json(new ApiError(500, "Failed to delete payment", ["Error in payment deletion"]));
    }
};