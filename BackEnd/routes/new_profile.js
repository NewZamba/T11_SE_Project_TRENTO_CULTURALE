var express = require('express');
var router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

JWT_SECRET = process.env.JWT_SECRET;

// Middleware
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }

    try {
        // Remove 'Bearer '
        const bearerToken = token.startsWith('Bearer ')
            ? token.slice(7)
            : token;

        // Verifica token
        const decoded = jwt.verify(bearerToken, JWT_SECRET);

        // Attach user information to the request
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};

// Example of a protected route
router.get('/', verifyToken, async (req, res) => {
    try {
        // Find user by ID from the decoded token
        const user = await User.findOne({ id_user: req.user.userId })
            .select('-pass_user'); // Exclude password

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ user });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});


module.exports = router;