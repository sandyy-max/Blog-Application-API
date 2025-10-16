const express = require("express");
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} = require("../controllers/postController");
const { authMiddleware } = require("../middleware/authMiddleware"); // Assuming you'll use JWT
const { ownerMiddleware } = require("../middleware/ownerMiddleware"); // To restrict edits/deletes to post owner

const router = express.Router();

/**
 * @description Create a new post
 * @route POST /api/posts
 * @method POST
 * @access Private (only logged in users)
 * @body { title, content }
 */
router.post("/", authMiddleware, createPost);

/**
 * @description Get all posts
 * @route GET /api/posts
 * @method GET
 * @access Public
 */
router.get("/", getAllPosts);

/**
 * @description Get single post by ID
 * @route GET /api/posts/:id
 * @method GET
 * @access Public
 */
router.get("/:id", getPostById);

/**
 * @description Update a post
 * @route PUT /api/posts/:id
 * @method PUT
 * @access Private (only post owner)
 */
router.put("/:id", authMiddleware, ownerMiddleware("post"), updatePost);

/**
 * @description Delete a post
 * @route DELETE /api/posts/:id
 * @method DELETE
 * @access Private (only post owner)
 */
router.delete("/:id", authMiddleware, ownerMiddleware("post"), deletePost);

module.exports = router;
