'use strict'
const db = require('../model/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv/config')
const User = require('../model/login.model');



exports.registration = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({
                status: 400,
                response: "Failure: Username already exists.",
            });
        }

        // Encrypt the password
        const encryptedPassword = await bcrypt.hash(password, 12);

        // Create a new user
        const newUser = new User({
            username,
            password: encryptedPassword,
        });

        // Save to MongoDB
        await newUser.save();

        res.status(200).json({
            status: 200,
            response: "User registered successfully.",
        });
    } catch (error) {
        console.error("Error in registration:", error);
        res.status(500).json({
            status: 500,
            response: "Internal Server Error",
        });
    }
};


exports.verifyUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user by username
        const user = await User.findOne({ username, status: 'ACTIVE' });
        if (!user) {
            return res.status(404).json({
                status: 404,
                response: "Failure: User not found or inactive.",
            });
        }

        // Compare passwords
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                status: 401,
                response: "Failure: Incorrect password.",
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, userName: user.username },
            process.env.TOKEN_KEY,
            { expiresIn: "1h" }
        );

        // Successful response
        return res.status(200).json({
            status: 200,
            response: "Success",
            token: token,
        });

    } catch (error) {
        console.error("Error in verifyUser:", error);
        res.status(500).json({
            status: 500,
            response: "Internal Server Error",
        });
    }
};
