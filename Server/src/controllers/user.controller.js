import {
  registerUserService,
  loginUserService,
  socialLoginService,
  getCurrentUserService,
  refreshTokenService,
  deleteUserAccountService,
} from "../services/user.service.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import tokenBlacklistModel from "../models/blacklist.model.js";
import jwt from "jsonwebtoken";

const accessCookieOptions = {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
};
const refreshCookieOptions = {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
};

const getTokenExpiryDate = (token) => {
  const decoded = jwt.decode(token);
  if (!decoded?.exp) {
    return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  }
  return new Date(decoded.exp * 1000);
};

const sanitizeUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  contactNumber: user.contactNumber,
  avatar: user.avatar,
  pages: user.pages,
  role: user.role,
  authProvider: user.authProvider,
  credits: user.credits,
});

const registerUser = async (req, res) => {
  try {
    const { user, accessToken, refreshToken } = await registerUserService({
      ...req.body,
      avatar: req.file || null,
    });
    return res.status(201)
      .cookie("accessToken", accessToken, accessCookieOptions)
      .cookie("refreshToken", refreshToken, refreshCookieOptions)
      .json(new ApiResponse(201, "User registered successfully", sanitizeUser(user)));
  } catch (err) {
    if (err instanceof ApiError) {
      return res.status(err.statusCode).json({
        success: err.success,
        statusCode: err.statusCode,
        message: err.message,
        errors: err.errors,
      });
    }

    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      return res.status(400).json(new ApiError(400, `${field} already exists`));
    }

    return res.status(500)
      .json(new ApiError(500, "User registration failed"));
  }
};

const loginUser = async (req, res) => {
  try {
    const { user, accessToken, refreshToken } = await loginUserService(req.body);

    return res
      .status(200)
      .cookie("accessToken", accessToken, accessCookieOptions)
      .cookie("refreshToken", refreshToken, refreshCookieOptions)
      .json(new ApiResponse(200, "User logged in successfully", sanitizeUser(user)));
  } catch (err) {
    if (err instanceof ApiError) {
      return res.status(err.statusCode).json({
        success: err.success,
        statusCode: err.statusCode,
        message: err.message,
        errors: err.errors,
      });
    }

    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      return res.status(400).json(new ApiError(400, `${field} already exists`));
    }

    return res.status(500)
      .json(new ApiError(500, "User registration failed"));
  }
};

const socialLoginUser = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json(new ApiError(400, "Social login token is required"));
    }
    const { user, accessToken, refreshToken } = await socialLoginService(idToken);
    return res.status(200)
      .cookie("accessToken", accessToken, accessCookieOptions)
      .cookie("refreshToken", refreshToken, refreshCookieOptions)
      .json(new ApiResponse(200, "Social login successful", sanitizeUser(user)));
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json(new ApiError(error.statusCode || 500, error.message || "Social login failed"));
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await getCurrentUserService(req.user._id);
    return res
      .status(200)
      .json(new ApiResponse(200, "Current user fetched successfully", sanitizeUser(user)));
  } catch (error) {
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({
        success: error.success,
        statusCode: error.statusCode,
        message: error.message,
        errors: error.errors,
      });
    }

    return res
      .status(error.statusCode || 500)
      .json(new ApiError(error.statusCode || 500, error.message || "Failed to fetch current user"));
  }
};

const refreshAccessToken = async (req, res) => {
  try {
    const accessToken = await refreshTokenService(req);

    return res
      .cookie("accessToken",accessToken,accessCookieOptions)
      .status(200)
      .json({success: true});
  } catch (error) {
    return res
    .status(401)
    .json(new ApiError(401, "Invalid or expired refresh token", ["Invalid or expired refresh token"]));
  }
};

const logoutUser = async (req, res) => {
  try {
    const accessToken =
      req.cookies?.accessToken || req.headers.authorization?.replace("Bearer ", "");

    if (accessToken) {
      await tokenBlacklistModel.create({
        token: accessToken,
        expiresAt: getTokenExpiryDate(accessToken),
      });
    }

    await req.user.updateOne({ $unset: { refreshToken: 1 } });

    return res.status(200)
      .clearCookie("accessToken", accessCookieOptions)
      .clearCookie("refreshToken", refreshCookieOptions)
      .json(new ApiResponse(200, "User logged out successfully", {}));
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json(new ApiError(error.statusCode || 500, error.message || "User logout failed"));
  }
};

const deleteUserAccount = async (req, res) => {
  try {
    const accessToken =
      req.cookies?.accessToken || req.headers.authorization?.replace("Bearer ", "");

    if (accessToken) {
      await tokenBlacklistModel.create({
        token: accessToken,
        expiresAt: getTokenExpiryDate(accessToken),
      });
    }

    await deleteUserAccountService(req.user._id);

    return res
      .status(200)
      .clearCookie("accessToken", accessCookieOptions)
      .clearCookie("refreshToken", refreshCookieOptions)
      .json(new ApiResponse(200, "User account deleted successfully", null));
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json(new ApiError(error.statusCode || 500, error.message || "Failed to delete user account"));
  }
};

export {
  registerUser,
  loginUser,
  socialLoginUser,
  getCurrentUser,
  refreshAccessToken,
  logoutUser,
  deleteUserAccount,
};
