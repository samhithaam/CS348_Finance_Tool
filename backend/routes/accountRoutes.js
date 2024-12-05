// routes/accountRoutes.js
const express = require('express');
const Account = require('../models/Accounts.js');
const { sanitizeString, sanitizeObjectId } = require('../utils/sanitization'); // Import sanitization functions
const router = express.Router();

// Create a new account
router.post('/', async (req, res) => {
    let { user_id, account_name, balance, account_type } = req.body;

    // Sanitize user input before using it
    user_id = sanitizeString(user_id);
    account_name = sanitizeString(account_name);
    account_type = sanitizeString(account_type);

    // Optionally sanitize balance if it's a number
    balance = parseFloat(balance);  // Convert balance to number, reject if invalid

    if (isNaN(balance)) {
        return res.status(400).json({ message: 'Invalid balance' });
    }

    try {
        const newAccount = new Account({ user_id, account_name, balance, account_type });
        await newAccount.save();
        res.status(201).json(newAccount);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get accounts by user ID
router.get('/user/:user_id', async (req, res) => {
    const sanitizedUserId = sanitizeString(req.params.user_id); // Sanitize user ID

    try {
        const accounts = await Account.find({ user_id: sanitizedUserId });
        res.json(accounts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get account by ID
router.get('/:id', async (req, res) => {
    const sanitizedId = sanitizeObjectId(req.params.id); // Sanitize and validate ObjectId

    if (!sanitizedId) {
        return res.status(400).json({ message: 'Invalid account ID' });
    }

    try {
        const account = await Account.findById(sanitizedId);
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }
        res.json(account);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update an account
router.put('/:id', async (req, res) => {
    const sanitizedId = sanitizeObjectId(req.params.id); // Sanitize and validate ObjectId

    if (!sanitizedId) {
        return res.status(400).json({ message: 'Invalid account ID' });
    }

    let { user_id, account_name, balance, account_type } = req.body;

    // Sanitize input fields
    user_id = sanitizeString(user_id);
    account_name = sanitizeString(account_name);
    account_type = sanitizeString(account_type);

    // Optionally sanitize balance if it's a number
    balance = parseFloat(balance);  // Convert balance to number, reject if invalid

    if (isNaN(balance)) {
        return res.status(400).json({ message: 'Invalid balance' });
    }

    try {
        const updatedAccount = await Account.findByIdAndUpdate(sanitizedId, { user_id, account_name, balance, account_type }, { new: true });
        if (!updatedAccount) {
            return res.status(404).json({ message: 'Account not found' });
        }
        res.json(updatedAccount);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete an account
router.delete('/:id', async (req, res) => {
    const sanitizedId = sanitizeObjectId(req.params.id); // Sanitize and validate ObjectId

    if (!sanitizedId) {
        return res.status(400).json({ message: 'Invalid account ID' });
    }

    try {
        const deletedAccount = await Account.findByIdAndDelete(sanitizedId);
        if (!deletedAccount) {
            return res.status(404).json({ message: 'Account not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
