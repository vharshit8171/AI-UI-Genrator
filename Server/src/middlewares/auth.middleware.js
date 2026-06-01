import User from "../models/user.model.js";
import tokenBlacklistModel from "../models/blacklist.model.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";

const verifyJWT = async (req, res, next) => {
  const initialToken =
    req.cookies?.accessToken || req.headers.authorization?.replace("Bearer ", "");

  if (!initialToken) {
    return res
    .status(401)
    .json(new ApiError(401, "Access token is missing", ["Access token is missing"]));
  }
  const isTokenBlacklisted = await tokenBlacklistModel.findOne({ token: initialToken });
  if (isTokenBlacklisted) {
    return res.status(401).json(new ApiError(401, "Token is invalid"));
  }

  try {
    const decodedToken = jwt.verify(initialToken, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken._id);
    if (!user) {
      throw new ApiError(401, "Invalid access token");
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json(new ApiError(401, "Invalid token"));
  }
};

export { verifyJWT };
