import User from "../models/user.model.js";
import Website from "../models/website.model.js";
import Page from "../models/page.model.js";
import Component from "../models/component.model.js";
import { ApiError } from "../utils/ApiError.js";
import { generateWebsiteWithAI } from "../config/openRouter.js";

export const generateWebsiteService = async ({ userId, prompt, aiModel, }) => {
    const message = [
        { role: "user", content: prompt }
    ]
    const aiResponse = await generateWebsiteWithAI(message, aiModel);
    console.log("aiResponse", aiResponse)
    message.push({
        role: "ai",
        content: `✅ Your website "${aiResponse.website.title}" has been created successfully!
        You can now preview and edit it.
        Do you want to make any changes or add new features?`
    });
    const uniqueSlug = `${aiResponse.website.slug}-${Date.now()}`;

    const website = await Website.create({
        owner: userId,
        title: aiResponse.website.title,
        description: aiResponse.website.description,
        slug: uniqueSlug,
        prompts: message,
        aiResponse: aiResponse,
        aiModel: aiModel || "gpt-4"
    });

    for (let i = 0; i < aiResponse.pages.length; i++) {
        const pageData = aiResponse.pages[i];

        const page = await Page.create({
            website: website._id,
            name: pageData.name,
            path: pageData.path,
            order: i,
            isHomePage: pageData.path === "/",
        });

        for (let j = 0; j < pageData.components.length; j++) {
            const componentData = pageData.components[j];

            await Component.create({
                page: page._id,
                type: componentData.type,
                name: componentData.name,
                props: componentData.props || {},
                styles: componentData.styles || {},
                order: j,
            });
        }
    }

    return website;
};

export const getWebsiteBySlugService = async (slug) => {
    const website = await Website.findOne({ _id: slug });

    if (!website) {
        throw new ApiError(404, "Website not found");
    }
    console.log("webs",website)
    const pages = await Page.find({ website: website._id })
        .sort({ order: 1 })
        .lean();
    for (let page of pages) {
        const components = await Component.find({ page: page._id })
            .sort({ order: 1 })
            .lean();

        page.components = components;
    }
    console.log("pages",pages)
    return {
        website: {
            id: website._id,
            title: website.title,
            description: website.description,
            slug: website.slug,
            prompts: website.prompts,
            pages,
        },
    };
};

export const getUserWebsitesService = async (userId) => {
    const websites = await Website.find({ owner: userId })
    .select("title description slug status version createdAt updatedAt")
    .sort({ createdAt: -1 });

    return websites;
};

export const updateWebsiteStatusService = async (websiteId, userId, status) => {
    const website = await Website.findOne({
        _id: websiteId,
        owner: userId,
    });

    if (!website) {
        throw new ApiError(404, "Website not found or unauthorized");
    }

    const updatedWebsite = await Website.findOneAndUpdate(
        { _id: websiteId, owner: userId },
        {
            status,
            deploymentUrl:
                status === "published"
                    ? `https://${website.slug}.yourdomain.com`
                    : undefined,
        },
        { new: true }
    );

    return updatedWebsite;
};

export const getPublishedWebsitesService = async () => {
    const websites = await Website.find({ status: "published" })
        .select("title slug description deploymentUrl createdAt owner")
        .populate("owner", "name" + "avatar.url")
        .sort({ createdAt: -1 })
        .lean();

    const total = await Website.countDocuments({ status: "published" });
    return { websites, total, };
};

export const deleteWebsiteService = async (websiteId, userId) => {
    const website = await Website.findOne({
        _id: websiteId,
        owner: userId,
    });

    if (!website) {
        throw new ApiError(404, "Website not found or unauthorized");
    }

    const pages = await Page.find({ website: websiteId }).select("_id");

    const pageIds = pages.map(page => page._id);

    await Component.deleteMany({ page: { $in: pageIds } });
    await Page.deleteMany({ website: websiteId });
    await Website.findByIdAndDelete(websiteId);

    const user = await User.findOne({_id: userId});
    user.websites = user.websites.filter(id => id.toString() !== websiteId);
    await user.save();

    return true;
};