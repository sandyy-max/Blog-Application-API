const Post = require("../models/postModel");

// Create Post
exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await Post.create({
      title,
      content,
      author: req.user._id,
    });
    res.status(201).json({ message: "Post created", post });
  } catch (error) {
    res.status(500).json({ message: "Error creating post", error });
  }
};

// Get All Posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "username email");
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error });
  }
};

// Get Single Post
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "username email");
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error fetching post", error });
  }
};

// Update Post
exports.updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.status(200).json({ message: "Post updated", post });
  } catch (error) {
    res.status(500).json({ message: "Error updating post", error });
  }
};

// Delete Post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting post", error });
  }
};
