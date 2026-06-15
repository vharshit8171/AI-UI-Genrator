import User from "../models/user.model.js";
import Page from "../models/page.model.js";
import Component from "../models/component.model.js";
import { ApiError } from "../utils/ApiError.js";
import { generateWebsiteWithAI } from "../config/openRouter.js";

export const generateWebsiteService = async ({ userId, prompt, aiModel, }) => {
    const messages = [{
        role: "user",
        content: prompt,
    },];

    const aiResponse = await generateWebsiteWithAI(prompt, aiModel);
    console.log("aiRes",aiResponse);

    messages.push({
        role: "ai",
        content: `✅ Your page "${aiResponse.title}" has been generated successfully!`,
    });

    const page = await Page.create({
        owner: userId,
        title: aiResponse.title,
        description: aiResponse.description || "",
        theme: aiResponse.theme,
        path: aiResponse.path,
        prompts: messages,
        aiModel: aiModel || "llama-3.3-70b-versatile",
    });

    const sortedComponents = aiResponse.components.sort((a, b) => a.order - b.order);

    for (const componentData of sortedComponents) {
        await Component.create({
            page: page._id,
            type: componentData.type,
            props: componentData.props || {},
            styles: componentData.styles || {},
            order: componentData.order,
        });
    }

    return { page, components: sortedComponents, theme: aiResponse.theme };
};


export const getUserWebsitesService = async (userId) => {
    const pages = await Page.find({ owner: userId })
        .sort({ createdAt: -1 });

    return pages;
};


export const getWebsiteByIdService = async (id, userId) => {
    const page = await Page.findOne({
        _id: id,
        owner: userId,
    }).lean();

    if (!page) {
        throw new ApiError(404, "Page not found or unauthorized");
    }

    const components = await Component
        .find({ page: id })
        .sort({ order: 1 })
        .lean();

    const finalResult = {
        ...page,
        components
    }
    return finalResult;
};


export const deletePageService = async (pageId, userId) => {
    const page = await Page.findOne({ _id: pageId, owner: userId });
    if (!page) {
        throw new ApiError(404, "Page not found or unauthorized");
    }

    await Component.deleteMany({ page: pageId, });
    await Page.findByIdAndDelete(pageId);

    await User.findByIdAndUpdate(userId, { $pull: { pages: pageId, } }
    );
    return true;
};