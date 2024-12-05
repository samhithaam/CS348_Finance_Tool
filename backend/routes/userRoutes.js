// routes/userRoutes.js
const express = require('express');
const User = require('../models/User'); // Ensure this path is correct
const router = express.Router();

// Sign up a new user
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Create new user inside the transaction
        const newUser = new User({ name, email, password });
        await newUser.save({ session }); // Pass session to save the user

        // Commit the transaction if both operations succeed
        await session.commitTransaction();
        session.endSession();

        res.status(201).json(newUser);
    } catch (error) {
        // If an error occurs, roll back the transaction
        await session.abortTransaction();
        session.endSession();
        console.error('Error during user signup transaction:', error);
        res.status(400).json({ message: error.message });
    }
});

// Sign in a user
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        // Check if the user is already logged in
        if (user.locked) {
            return res.status(400).json({ message: 'This account is currently logged in elsewhere.' });
        }

        // Lock the account
        user.locked = true;
        await user.save();

        res.json({ name: user.name, email: user.email, user_id: user._id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Sign out a user
router.post('/signout', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Invalid email.' });
        }

        // Unlock the account
        user.locked = false;
        await user.save();

        res.json({ message: 'User logged out successfully.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
