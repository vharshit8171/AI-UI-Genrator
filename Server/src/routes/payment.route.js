import express from "express";
import {verifyJWT} from "../middlewares/auth.middleware.js";
import { createSession, verify, getUserPayments, deletePayment } from "../controllers/payment.controller.js";

const router = express.Router();

/**
 * @route POST /api/v1/payment/create-session
 * @description Create a checkout session (purchase credits)
 * @access private
 */
router.post("/create-session", verifyJWT, createSession);

/**
 * @route POST /api/v1/payment/verify
 * @description Verify payment or webhook and update payment status
 * @access private
 */
router.post("/verify", verifyJWT, verify);

/**
 * @route GET /api/v1/payment/payments-history
 * @description Get authenticated user's payments history
 * @access private
 */
router.get("/payments-history", verifyJWT, getUserPayments);

/**
 * @route DELETE /api/v1/payment/payment-delete/:paymentId
 * @description Delete a specific payment by its ID
 * @access private
 */
router.delete("/payment-delete/:paymentId", verifyJWT, deletePayment);

export default router;