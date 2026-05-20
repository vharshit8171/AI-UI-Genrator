import admin from "../config/Oauth.js";
import { ApiError } from "./ApiError.js";

export const verifyFirebaseToken = async (idToken) => {
  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    return decoded;
  } catch (error) {
    throw new ApiError(401, "Invalid social login token", {
      error: error.message,
    });
  }
};
