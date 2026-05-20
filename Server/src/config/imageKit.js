import ImageKit from "imagekit";
import 'dotenv/config'

export const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

export const uploadAvatarToImageKit = async (file, userId) => {
  try {
    const response = await imagekit.upload({
      file: file.buffer, // buffer from multer
      fileName: `avatar_${userId}_${Date.now()}`,
      folder: "/avatars"
    });

    return {
      url: response.url,
      fileId: response.fileId
    };

  } catch (error) {
    throw new Error("Image upload failed: " + error.message);
  }
};

export const deleteImageFromImageKit = async (fileId) => {
  try {
    if (!fileId) return;

    await imagekit.deleteFile(fileId);

    return true;

  } catch (error) {
    throw new Error("Image delete failed: " + error.message);
  }
};