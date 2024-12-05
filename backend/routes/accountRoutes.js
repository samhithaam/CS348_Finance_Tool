// routes/accountRoutes.js
const express = require('express');
const Account = require('../models/Accounts.js'); // Ensure this model is correctly defined
const router = express.Router();

// Create a new account
router.post('/', async (req, res) => {
    const { user_id, account_name, balance, account_type } = req.body;
    try {
        const newAccount = new Account({ user_id, account_name, balance, account_type });
        await newAccount.save();
        res.status(201).json(newAccount);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get the account by ID
router.get('/user/:user_id', async (req, res) => {
    try {
        const accounts = await Account.find({ user_id: req.params.user_id });
        res.json(accounts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get account by ID
router.get('/:id', async (req, res) => { 
    try {
        const account = await Account.findById(req.params.id);
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
    try {
        const updatedAccount = await Account.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
    try {
        const deletedAccount = await Account.findByIdAndDelete(req.params.id);
        if (!deletedAccount) {
            return res.status(404).json({ message: 'Account not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
