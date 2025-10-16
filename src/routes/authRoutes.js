const express = require("express");
const { register, login, getAllUsers, deleteUser } = require("../controllers/authController");
const router = express.Router();

/**
 * @description routes for register
 * @route POST /api/auth/register
 * @method POST
 * @access Public
 * @body { username, email, password }
 * @returns { message, user } on success
 * @returns { error } on failure
 */
router.post("/register", register);

/**
 * @description routes for login
 * @route POST /api/auth/login
 * @method POST
 * @access Public
 * @body { email, password }
 * @returns { message, token, user } on success
 * @returns { error } on failure
 */
router.post("/login", login);

/**
 * @description routes for fetching all users
 * @route GET /api/auth/users
 * @method GET
 * @access Public (you can later protect it)
 */
router.get("/users", getAllUsers);

/**
 * @description route to delete a user by ID
 * @route DELETE /api/auth/delete/:userId
 * @method DELETE
 * @access Public (you can protect it later)
 */
router.delete("/delete/:userId", deleteUser);

module.exports = router;
