import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {registerLimiter,loginLimiter} from "../middlewares/rateLimiter.js";
import { validate } from "../middlewares/validate.middleware.js";
import { registerUserSchema, loginUserSchema } from "../schema/user.schema.js";
import {
  registerUser,
  loginUser,
  socialLoginUser,
  getCurrentUser,
  refreshAccessToken,
  logoutUser,
  deleteUserAccount,
} from "../controllers/user.controller.js";

const router = express.Router();

/**
 * @route POST /api/v1/user/register
 * @description Register a new user
 * @access public
 */
router.route("/register").post(
  upload.single("avatar"),
  validate(registerUserSchema),
  registerLimiter,
  registerUser
);

/**
 * @route POST /api/v1/user/login
 * @description Login a user
 * @access public
 */
router.route("/login").post(
  validate(loginUserSchema),
  loginLimiter,
  loginUser
);

/**
 * @route POST /api/v1/user/social-login
 * @description Social login for a user
 * @access public
 */
router.route("/social-login").post(
  loginLimiter,
  socialLoginUser
);

/**
 * @route GET /api/v1/user/me
 * @description Get current user information
 * @access private
 */
router.route("/me").get(
  verifyJWT,
  getCurrentUser
);

/**
 * @route POST /api/v1/user/refresh-token
 * @description Refresh access token
 * @access private
 */
router.route("/refresh-token").post(refreshAccessToken);

/**
 * @route POST /api/v1/user/logout
 * @description Logout a user
 * @access private
 */
router.route("/logout").post(
  verifyJWT,
  logoutUser
);

/**
 * @route DELETE /api/v1/user/delete-account
 * @description Delete user account
 * @access private
 */
router.route("/delete-account").delete(
  verifyJWT,
  deleteUserAccount
);

export default router;
