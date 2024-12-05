// scripts/addSampleData.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User'); // Ensure this path is correct
const Account = require('../models/Accounts'); // Ensure this path is correct
const Transaction = require('../models/Transaction'); // Ensure this path is correct
const Budget = require('../models/Budget'); // Ensure this path is correct

dotenv.config(); // Load environment variables

async function addSampleData() {
    await mongoose.connect(process.env.MONGODB_URI); // Connect to the database

    // Sample Users
    const user1 = new User({
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'securepassword', // Remember to hash passwords in production
    });

    const user2 = new User({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'anotherpassword', // Remember to hash passwords in production
    });

    await user1.save();
    await user2.save();

    console.log('Users added');

    // Sample Accounts
    const account1 = new Account({
        user_id: user1._id,
        account_name: 'Checking Account',
        balance: 1000,
        account_type: 'checking',
    });

    const account2 = new Account({
        user_id: user1._id,
        account_name: 'Savings Account',
        balance: 5000,
        account_type: 'savings',
    });

    const account3 = new Account({
        user_id: user2._id,
        account_name: 'Credit Card',
        balance: -200, // This could represent a credit card balance
        account_type: 'credit',
    });

    await account1.save();
    await account2.save();
    await account3.save();

    console.log('Accounts added');

    // Sample Transactions
    const transaction1 = new Transaction({
        account_id: account1._id,
        date: new Date('2024-10-01'),
        amount: -50, // Expense
        category: 'Groceries',
        description: 'Weekly grocery shopping',
    });

    const transaction2 = new Transaction({
        account_id: account2._id,
        date: new Date('2024-10-05'),
        amount: 500, // Income
        category: 'Salary',
        description: 'Monthly salary',
    });

    await transaction1.save();
    await transaction2.save();

    console.log('Transactions added');

    // Sample Budgets
    const budget1 = new Budget({
        user_id: user1._id,
        category: 'Food',
        amount: 300, // Monthly budget for food
    });

    const budget2 = new Budget({
        user_id: user2._id,
        category: 'Entertainment',
        amount: 200, // Monthly budget for entertainment
    });

    await budget1.save();
    await budget2.save();

    console.log('Budgets added');

    mongoose.connection.close();
}

addSampleData().catch(err => {
    console.error(err);
    mongoose.connection.close();
});
