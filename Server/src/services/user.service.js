import jwt from "jsonwebtoken";
import admin from "../config/Oauth.js";
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { verifyFirebaseToken } from "../utils/verifyFirebaseToken.js";
import { uploadAvatarToImageKit, deleteImageFromImageKit } from "../config/imageKit.js";

const signAccessToken = (user) =>
  jwt.sign(
    {
      _id: user._id,
      role: user.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || "1d" }
  );

const signRefreshToken = (user) =>
  jwt.sign(
    {
      _id: user._id,
      role: user.role,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "30d" }
  );

export const registerUserService = async (data) => {
  const { name, email, password, contactNumber, avatar } = data;

  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    throw new ApiError(409, "Email already registered", ["Email already registered"]);
  }
  let user = await User.create({
    name,
    email,
    password,
    contactNumber,
    authProvider: "local",
    pages: [],
  });
  if (avatar) {
    const uploaded = await uploadAvatarToImageKit(avatar, user._id);
    user.avatar = {
      url: uploaded.url,
      fileId: uploaded.fileId,
    };

    await user.save();
  }

  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);

  user.refreshToken = refreshToken;
  await user.save();

  return { user, accessToken, refreshToken };
};

export const loginUserService = async (data) => {
  const { email, password } = data;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required", ["Email and password are required"]);
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new ApiError(401, "Invalid email or password", ["Invalid email or password"]);
  }

  if (!user.password) {
    throw new ApiError(401, "Please login with your social account", ["Please login with your social account"]);
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid email or password", ["Invalid email or password"]);
  }

  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);

  user.refreshToken = refreshToken;
  await user.save();

  return {
    user,
    accessToken,
    refreshToken,
  };
};

export const socialLoginService = async (idToken) => {
  const payload = await verifyFirebaseToken(idToken);

  const { email, name, picture, uid: firebaseUid, email_verified, firebase: { sign_in_provider } } = payload;

  if (!email) {
    throw new ApiError(400, "Email not available. Please make your GitHub email public.", ["Email not available. Please make your GitHub email public."]);
  }

  if (sign_in_provider === "google.com" && !email_verified) {
    throw new ApiError(400, "Google email not verified", ["Google email not verified"]);
  }

  const providerType = sign_in_provider === "github.com" ? "github" : "google";

  const safeName = name || email.split("@")[0];
  let user = await User.findOne({ email, });

  if (!user) {
    user = await User.create({
      name: safeName,
      email,
      password: null,
      contactNumber: null,
      pages: [],
      authProvider: providerType,
      firebaseUid,
      avatar: {
        url: picture,
        fileId: null,
      },
    });

  } else {
    // PROVIDER MISMATCH
    if (user.authProvider !== providerType) {
      throw new ApiError(400, `This email is registered using ${user.authProvider}. Please login with ${user.authProvider}.`, [`This email is registered using ${user.authProvider}. Please login with ${user.authProvider}.`]
      );
    }
  }

  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);
  user.refreshToken = refreshToken;
  await user.save();
  return { user, accessToken, refreshToken };
};

export const getCurrentUserService = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found", ["User not found"]);
  }
  return user;
};

export const refreshTokenService = async (req) => {
  const incomingRefreshToken = req.cookies.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Refresh token missing", ["Refresh token missing"]);
  }

  const decoded = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
  const user = await User.findById(decoded._id);

  if (!user) {
    throw new ApiError(401, "User not found", ["User not found"]);
  }

  if (user.refreshToken !== incomingRefreshToken) {
    throw new ApiError(401, "Invalid refresh token", ["Invalid refresh token"]);
  }

  const newAccessToken = signAccessToken(user);
  return newAccessToken;
};

export const deleteUserAccountService = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user.avatar?.fileId) {
    try {
      await deleteImageFromImageKit(user.avatar.fileId);
    } catch (error) {
      console.log("Avatar deletion failed:", error.message);
    }
  }

  if (user.firebaseUid) {
    try {
      await admin.auth().deleteUser(user.firebaseUid);
    } catch (error) {
      console.log("Firebase deletion failed:", error.message);
    }
  }

  await User.findByIdAndDelete(userId);
  return true;
};
