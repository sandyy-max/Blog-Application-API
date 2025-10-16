const Comment = require("../models/commentModel");
const Post = require("../models/postModel");

// Add comment
exports.addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const { postId } = req.params;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = await Comment.create({
      post: postId,
      user: req.user._id,
      content,
    });

    res.status(201).json({ message: "Comment added", comment });
  } catch (error) {
    res.status(500).json({ message: "Error adding comment", error });
  }
};

// Update comment
exports.updateComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) return res.status(404).json({ message: "Comment not found" });
    if (comment.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Access denied" });

    comment.content = req.body.content || comment.content;
    await comment.save();

    res.status(200).json({ message: "Comment updated", comment });
  } catch (error) {
    res.status(500).json({ message: "Error updating comment", error });
  }
};

// Delete comment
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) return res.status(404).json({ message: "Comment not found" });
    if (comment.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Access denied" });

    await comment.remove();
    res.status(200).json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting comment", error });
  }
};
