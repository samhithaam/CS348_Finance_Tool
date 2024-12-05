// routes/userRoutes.js
const express = require('express');
const User = require('../models/User'); // Ensure this path is correct
const router = express.Router();

// Sign up a new user
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const newUser = new User({ name, email, password }); // Store plain password
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Sign in a user
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || user.password !== password) { // Compare plain text password
            return res.status(400).json({ message: 'Invalid email or password.' });
        }
        res.json({ name: user.name, email: user.email, user_id: user._id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
