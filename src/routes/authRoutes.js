const express = require("express");
const { register } = require("../controllers/authController");
const router = express.Router();


/**
 * @description routes for register
 * @route POST/api/auth/register
 * @method POST
 * @access Public
 * @body {username, email, password}
 * @returns {message, user} on success
 * @returns {error} on failure
 }
 */

 router.post("/register", register)

 //http method
 // GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD

module.exports = router;