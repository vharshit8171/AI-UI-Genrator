import jwt from "jsonwebtoken";
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
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || "7d" }
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
    throw new ApiError(409, "Email already registered", {
      error: "Email already registered",
    });
  }

  let user = await User.create({
    name,
    email,
    password,
    contactNumber,
    authProvider: "local",
    providers: [],
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
    throw new ApiError(400, "Email and password are required", {
      error: "Email and password are required",
    });
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError(401, "Invalid email or password", {
      error: "Invalid email or password",
    });
  }

  if (!user.password) {
    throw new ApiError(401, "Please login with your social account", {
      error: "Please login with your social account",
    });
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid email or password", {
      error: "Incorrect email or password",
    });
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
  // console.log("data",payload);
  const { sub: providerId, email, name, picture, email_verified, firebase: { sign_in_provider }, } = payload;

  if (!email) {
    throw new ApiError(400, "Email not available. Please make your GitHub email public.");
  }

  if (sign_in_provider === "google.com" && !email_verified) {
    throw new ApiError(400, "Google email not verified");
  }

  const providerType = sign_in_provider === "github.com" ? "github" : "google";
  const safeName = name || email.split("@")[0];

  let user = await User.findOne({
    $or: [{ "providers.providerId": providerId }, { email }],
  });

  if (!user) {
    user = await User.create({
      name: safeName,
      email,
      password: null,
      authProvider: providerType,
      providers: [
        {
          type: providerType,
          providerId,
        },
      ],
      avatar: {
        url: picture,
        fileId: null,
      },
    });
  }
  // console.log("user",user); 
  const alreadyLinked = user.providers.some((p) => p.providerId === providerId);

  if (!alreadyLinked) {
    user.providers.push({
      type: providerType,
      providerId,
    });
  }

  user.authProvider = providerType;
  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);

  user.refreshToken = refreshToken;
  await user.save();

  return { user, accessToken, refreshToken };
};

export const getCurrentUserService = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
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

  await User.findByIdAndDelete(userId);
  return true;
};
