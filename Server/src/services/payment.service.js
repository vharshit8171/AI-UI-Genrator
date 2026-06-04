import User from "../models/user.model.js";
import Payment from "../models/payment.model.js";
import { ApiError } from "../utils/ApiError.js";
import { stripe } from "../config/stripe.js";
import { CREDIT_PACKS } from "../config/creditPacks.js";

// This services have only one aim i.e to prepare payment. In simple words, at the very beginning of the payment process stripe doesnt know anything about who is paying, what they are paying for, how much they are paying etc. So this service is responsible to create a checkout session with all the necessary details and then return the session url to the client. After the payment is successful, stripe will redirect the user to the success url with the session id as a query parameter. Then we can use that session id to verify the payment and update the user's credits accordingly.

export const createCheckoutSession = async (userId, pack) => {
    const selectedPack = CREDIT_PACKS[pack];
    if (!selectedPack) {
        throw new ApiError(400, "Invalid Pack", ["Selected pack does not exist"]);
    }

    const user = await User.findById(userId);
    let customerId = user.stripeCustomerId;

    if (!customerId) {
        const customer = await stripe.customers.create({
            email: user.email,
            name: user.name,
        });

        customerId = customer.id;

        user.stripeCustomerId = customerId;
        await user.save();
    }

    const session = await stripe.checkout.sessions.create({
        customer: customerId,
        payment_method_types: ["card"],
        mode: "payment",
        line_items: [{
            price_data: {
                currency: "inr",
                product_data: {
                    name: selectedPack.name,
                },
                unit_amount: selectedPack.amount * 100, // Convert to paise
            },
            quantity: 1,
        },],
        success_url: `http://localhost:5173/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `http://localhost:5173/pricing`,
    });

    await Payment.create({
        user: user._id,
        stripeSessionId: session.id,
        pack,
        amount: selectedPack.amount,
        creditsPurchased: selectedPack.credits,
        status: "pending",
    });

    if(pack === "STARTER" || pack === "PRO"){
        user.role = "pro";
    } else{
        user.role = "premium";
    }
    await user.save();

    return session;
};

// This function is responsible to verify the payment after the user is redirected to the success url. It takes the session id as a parameter and retrieves the session details from stripe. If the payment is not completed, it throws an error. If the payment is completed, it updates the payment status in the database and increments the user's credits accordingly. Finally, it returns the payment details.

export const verifyPayment = async (sessionId) => {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
        throw new ApiError(400, "Payment not completed", ["Payment not completed"]);
    }

    const payment = await Payment.findOne({ stripeSessionId: sessionId, });
    if (!payment) {
        throw new ApiError(404, "Payment not found", ["Payment not found"]);
    }

    if (payment.status === "completed") {
        return payment;
    }

    payment.status = "completed";
    await payment.save();

    await User.findByIdAndUpdate(payment.user,
        {
            $inc: {
                credits:payment.creditsPurchased,
            },
        }
    );
    return payment;
};