// routes/budgetRoutes.js
const express = require('express');
const Budget = require('../models/Budget'); // Ensure this path is correct
const router = express.Router();

// Create a new budget
router.post('/', async (req, res) => {
    const { user_id, category, amount } = req.body;
    try {
        const newBudget = new Budget({ user_id, category, amount });
        await newBudget.save();
        res.status(201).json(newBudget);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all budgets for a user
router.get('/user/:user_id', async (req, res) => {
    try {
        const budgets = await Budget.find({ user_id: req.params.user_id });
        res.json(budgets); // Return budgets
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update an existing budget
router.put('/:id', async (req, res) => {
    try {
        const updatedBudget = await Budget.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBudget) {
            return res.status(404).json({ message: 'Budget not found' });
        }
        res.json(updatedBudget);
    } catch (error) {
        console.error('Error updating budget:', error);
        res.status(400).json({ message: error.message });
    }
});

// Delete a budget
router.delete('/:id', async (req, res) => {
    try {
        const deletedBudget = await Budget.findByIdAndDelete(req.params.id);
        if (!deletedBudget) {
            return res.status(404).json({ message: 'Budget not found' });
        }
        res.status(204).send(); // No content to send back
    } catch (error) {
        console.error('Error deleting budget:', error);
        res.status(500).json({ message: error.message });
    }
});

// Get a budget by ID
router.get('/:id', async (req, res) => {
    try {
        const budget = await Budget.findById(req.params.id);
        if (!budget) {
            return res.status(404).json({ message: 'Budget not found' });
        }
        res.json(budget);
    } catch (error) {
        console.error('Error fetching budget:', error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
