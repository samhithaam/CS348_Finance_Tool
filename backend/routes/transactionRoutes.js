// routes/transactionRoutes.js
const express = require('express');
const Transaction = require('../models/Transaction');
const Account = require('../models/Accounts');
const router = express.Router();

// Get all transactions for a user's accounts
router.get('/user/:user_id', async (req, res) => {
    try {
        // Find all accounts for the user
        const accounts = await Account.find({ user_id: req.params.user_id });

        if (accounts.length === 0) {
            return res.json([]); // No accounts found, return an empty array
        }

        const accountIds = accounts.map(account => account._id); // Extract account IDs

        // Find transactions that belong to those accounts
        const transactions = await Transaction.find({ account_id: { $in: accountIds } });

        res.json(transactions); // Return transactions
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ message: error.message });
    }
});

// Add a new transaction
router.post('/', async (req, res) => {
    const { description, amount, category, account_id, user_id } = req.body;
    try {
        const newTransaction = new Transaction({ description, amount, category, account_id, user_id });
        await newTransaction.save();
        res.status(201).json(newTransaction);
    } catch (error) {
        console.error('Error adding transaction:', error);
        res.status(400).json({ message: error.message });
    }
});

// Update an existing transaction
router.put('/:id', async (req, res) => {
    try {
        const updatedTransaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTransaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.json(updatedTransaction);
    } catch (error) {
        console.error('Error updating transaction:', error);
        res.status(400).json({ message: error.message });
    }
});

// Delete a transaction
router.delete('/:id', async (req, res) => {
    try {
        const deletedTransaction = await Transaction.findByIdAndDelete(req.params.id);
        if (!deletedTransaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting transaction:', error);
        res.status(500).json({ message: error.message });
    }
});

// Get a transaction by ID
router.get('/:id', async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.json(transaction);
    } catch (error) {
        console.error('Error fetching transaction:', error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
