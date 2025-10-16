const express = require("express");
const {
  addComment,
  updateComment,
  deleteComment,
} = require("../controllers/commentController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @route POST /api/comments/:postId
 * @desc Add comment to a post
 * @access Private
 */
router.post("/:postId", authMiddleware, addComment);

/**
 * @route PUT /api/comments/:id
 * @desc Update comment
 * @access Private (only owner)
 */
router.put("/:id", authMiddleware, updateComment);

/**
 * @route DELETE /api/comments/:id
 * @desc Delete comment
 * @access Private (only owner)
 */
router.delete("/:id", authMiddleware, deleteComment);

module.exports = router;
