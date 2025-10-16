const express = require("express");
const { likePost, unlikePost } = require("../controllers/likeController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @route POST /api/posts/:id/like
 * @desc Like a post
 * @access Private
 */
router.post("/:id/like", authMiddleware, likePost);

/**
 * @route DELETE /api/posts/:id/unlike
 * @desc Unlike a post
 * @access Private
 */
router.delete("/:id/unlike", authMiddleware, unlikePost);

module.exports = router;
