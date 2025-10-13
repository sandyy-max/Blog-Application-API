const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../configs/config");

// Register a new user

const register = async (req, res) => {

  try {

    const { username, email, password } = req.body;

    // const username=req.body.username;

    // const email=req.body.email;

    // const password=req.body.password;

    if (!username || !email || !password) {

      return res.status(400).json({ error: "All fields are required" });

    }

    // list of status codes:

    // 200: OK

    // 201: Created

    // 400: Bad Request

    // 401: Unauthorized

    // 403: Forbidden

    // 404: Not Found

    // 500: Internal Server Error

    // Check if user already exists by email

    const existingUser = await User.findOne({ email:email });

    if (existingUser) {

      return res.status(400).json({ error: "User already exists" });

    }

    const user = new User({

      username,

      email,

      password,

    });

    await user.save();

    // Never send back password

    // const userData = {

    //   id: user._id,

    //   username: user.username,

    //   email: user.email,

    // };



    res.status(201).json({ message: "User registered successfully", user });

  } catch (error) {

    console.error("Error registering user:", error);

    res.status(500).json({ error: "Server error. Please try again later." });

  }

};
// export the controller functions

module.exports = { register };

