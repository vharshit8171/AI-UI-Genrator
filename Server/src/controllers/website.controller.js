import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { generateWebsiteService, getUserWebsitesService, getWebsiteByIdService, deletePageService } from "../services/website.service.js";

export const generateWebsite = async (req, res) => {
    try {
        const { prompt,aiModel } = req.body;
        if (!prompt || typeof prompt !== 'string') {
            throw new ApiError(400, "prompt must be a non-empty string", ["prompt must be a non-empty string"])
        }

        const result = await generateWebsiteService({
            userId: req.user._id,
            prompt,
            aiModel,
        });

        const updatedUser = await User.findByIdAndUpdate(req.user._id, {
            $push: { pages: result.page._id },
            $inc: { credits: -10 },
        }, { returnDocument: "after" });

        return res
            .status(201)
            .json(new ApiResponse(201, "Website generated successfully", result));
    } catch (error) {
        return res
            .status(error.statusCode || 500)
            .json({
                success: false,
                message: error.message || "An error occurred while generating the website",
            })
    }
};

export const getUserWebsites = async (req, res) => {
    const userId = req.user._id;
    const pages = await getUserWebsitesService(userId);

    return res
        .status(200)
        .json(new ApiResponse(200, "User pages fetched successfully", pages));
};

export const getWebsiteById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const result = await getWebsiteByIdService(id, userId);
        return res.status(200)
            .json(new ApiResponse(200, "Page fetched successfully", result));
    } catch (error) {
        return res
            .status(error.statusCode || 500)
            .json({
                success: false,
                message: error.message || "An error occurred while deleting the website",
            })
    }
};

export const deletePage = async (req, res) => {
    try {
        const { pageId } = req.params;
        const userId = req.user._id;

        await deletePageService(pageId, userId);

        return res.status(200)
            .json(new ApiResponse(200, null, "Page deleted successfully"));
    } catch (error) {
        return res
            .status(error.statusCode || 500)
            .json({
                success: false,
                message: error.message || "An error occurred while deleting the page",
            })
    }
};