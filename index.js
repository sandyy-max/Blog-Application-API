const express = require("express");
const db = require("./src/configs/db");
const config = require("./src/configs/config");


const app = express();

const port = config.PORT;
app.use(express.json());

// Connect to the database
db.connect();

// routes
const authRoutes = require("./src/routes/authRoutes");
app.use("/api/auth/v1", authRoutes);





app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

