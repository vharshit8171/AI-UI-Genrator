import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { generateWebsite,getWebsiteById,deletePage,getUserWebsites } from "../controllers/website.controller.js";

const router = express.Router();

/**
 * @route POST /api/v1/website/generate
 * @description Generate a new website
 * @access private
 */
router.post("/generate", verifyJWT, generateWebsite);

/**
 * @route GET /api/v1/website/my
 * @description Get all websites of the current user
 * @access private
 */
router.get("/my", verifyJWT, getUserWebsites);

/**
 * @route GET /api/v1/website/id
 * @description Get website of the user by id
 * @access private
 */
router.get("/:id", verifyJWT, getWebsiteById);

/**
 * @route DELETE /api/v1/website/id/:pageId
 * @description Delete a page by ID
 * @access private
 */
router.delete("/id/:pageId", verifyJWT, deletePage);


export default router;