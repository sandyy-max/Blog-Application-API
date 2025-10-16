const Like = require("../models/likeModel");
const Post = require("../models/postModel");

// Like post
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const like = await Like.findOne({ user: req.user._id, post: post._id });
    if (like) return res.status(400).json({ message: "You already liked this post" });

    await Like.create({ user: req.user._id, post: post._id });
    res.status(200).json({ message: "Post liked" });
  } catch (error) {
    res.status(500).json({ message: "Error liking post", error });
  }
};

// Unlike post
exports.unlikePost = async (req, res) => {
  try {
    const like = await Like.findOneAndDelete({
      user: req.user._id,
      post: req.params.id,
    });

    if (!like) return res.status(404).json({ message: "Like not found" });

    res.status(200).json({ message: "Post unliked" });
  } catch (error) {
    res.status(500).json({ message: "Error unliking post", error });
  }
};
