const express = require("express");
const db = require("./src/configs/db");
const config = require("./src/configs/config");
const postRoutes = require("./src/routes/postRoutes");
const commentRoutes = require("./src/routes/commentRoutes");
const likeRoutes = require("./src/routes/likeRoutes");


const app = express();

const port = config.PORT;
app.use(express.json());

// Connect to the database
db.connect();

// routes
const authRoutes = require("./src/routes/authRoutes");
app.use("/api/auth/v1", authRoutes);

// Post CRUD routes
app.use("/api/posts/v1", postRoutes);

// Comment routes
app.use("/api/comments/v1", commentRoutes);

// Like/unlike routes
app.use("/api/posts/v1", likeRoutes);



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

