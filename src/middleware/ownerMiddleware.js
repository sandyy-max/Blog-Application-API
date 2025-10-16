const Post = require("../models/postModel");
// If later you need ownership check for comments or others, you can expand here.

exports.ownerMiddleware = (type) => {
  return async (req, res, next) => {
    try {
      let resource;

      if (type === "post") {
        resource = await Post.findById(req.params.id);
      }

      if (!resource) {
        return res.status(404).json({ message: `${type} not found` });
      }

      // Check if current user owns the resource
      if (resource.author.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Access denied. Not the owner." });
      }

      next();
    } catch (error) {
      return res.status(500).json({ message: "Authorization error", error });
    }
  };
};
