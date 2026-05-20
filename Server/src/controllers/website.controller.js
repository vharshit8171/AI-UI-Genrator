import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { generateWebsiteService, getWebsiteBySlugService, getUserWebsitesService, updateWebsiteStatusService, getPublishedWebsitesService, deleteWebsiteService } from "../services/website.service.js";

export const generateWebsite = async (req, res) => {
    try {
        const { prompt, aiModel } = req.body;
        console.log("coming", prompt, aiModel);
        if (!prompt || typeof prompt !== 'string') {
            return res.status(400).json({ error: "prompt must be a non-empty string" });
        }

        const result = await generateWebsiteService({
            userId: req.user._id,
            prompt,
            aiModel,
        });
        console.log("sending result",result)

        const updatedUser = await User.findByIdAndUpdate(req.user._id, {
            $push: { websites: result._id },
            credits: req.user.credits - 10,
        }, { returnDocument: "after" });
        await updatedUser.save();

        return res
            .status(201)
            .json(new ApiResponse(201, result, "Website generated successfully"));
    } catch (error) {
        return res
            .status(error.statusCode || 500)
            .json({
                success: false,
                message: error.message || "An error occurred while generating the website",
            })
    }
};

export const getWebsiteBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        console.log("reached",slug);
        const data = await getWebsiteBySlugService(slug);

        return res.status(200)
            .json(new ApiResponse(200, data, "Website fetched successfully"));
    } catch (error) {
        return res
            .status(error.statusCode || 500)
            .json({
                success: false,
                message: error.message || "An error occurred while fetching the website",
            })
    }
};

export const getUserWebsites = async (req, res) => {
    const userId = req.user._id;
    const websites = await getUserWebsitesService(userId);

    return res
        .status(200)
        .json(new ApiResponse(200, websites, "User websites fetched successfully"));
};

export const updateWebsiteStatus = async (req, res) => {
    try {
        const { websiteId } = req.params;
        const { status } = req.body;
        const userId = req.user._id;

        const updatedWebsite = await updateWebsiteStatusService(
            websiteId,
            userId,
            status
        );

        return res
            .status(200)
            .json(
                new ApiResponse(200, updatedWebsite, `Website ${status} successfully`)
            );
    } catch (error) {
        return res
            .status(error.statusCode || 500)
            .json({
                success: false,
                message: error.message || "An error occurred while updating website status",
            })
    }
};

export const getPublishedWebsites = async (req, res) => {
    const result = await getPublishedWebsitesService();

    return res
        .status(200)
        .json(new ApiResponse(200, result, "Published websites fetched successfully"));
};

export const deleteWebsite = async (req, res) => {
    try {
        const { websiteId } = req.params;
        const userId = req.user._id;

        await deleteWebsiteService(websiteId, userId);

        return res.status(200)
            .json(new ApiResponse(200, null, "Website deleted successfully"));
    } catch (error) {
        return res
            .status(error.statusCode || 500)
            .json({
                success: false,
                message: error.message || "An error occurred while deleting the website",
            })
    }
};