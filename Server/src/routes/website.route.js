import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { generateWebsite,getPublishedWebsites,getWebsiteBySlug,deleteWebsite,getUserWebsites,updateWebsiteStatus } from "../controllers/website.controller.js";

const router = express.Router();

/**
 * @route POST /api/v1/website/generate
 * @description Generate a new website
 * @access private
 */
router.post("/generate", verifyJWT, generateWebsite);

/**
 * @route GET /api/v1/website/community
 * @description Get all published websites
 * @access public
 */
router.get("/community", getPublishedWebsites);

/**
 * @route GET /api/v1/website/my
 * @description Get all websites of the current user
 * @access private
 */
router.get("/my", verifyJWT, getUserWebsites);

/**
 * @route DELETE /api/v1/website/id/:websiteId
 * @description Delete a website by ID
 * @access private
 */
router.delete("/id/:websiteId", verifyJWT, deleteWebsite);

/**
 * @route GET /api/v1/website/:slug
 * @description Get a website by slug
 * @access public
 */
router.get("/:slug", getWebsiteBySlug);

/**
 * @route PATCH /api/v1/website/id/:websiteId/status
 * @description Update website status
 * @access private
 */
router.patch("/id/:websiteId/status", verifyJWT, updateWebsiteStatus);

export default router;