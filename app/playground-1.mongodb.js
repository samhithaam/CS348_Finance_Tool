/* global use, db */

// Select the database to use.
use('personal_finance_db'); // Change to your desired database name

// Insert a few documents into the users collection.
const userResult = db.getCollection('users').insertMany([
  { 'name': 'John Doe', 'email': 'john@example.com', 'password': 'securepassword' },
  { 'name': 'Jane Smith', 'email': 'jane@example.com', 'password': 'anotherpassword' },
]);

// Insert a few documents into the accounts collection.
const accountResult = db.getCollection('accounts').insertMany([
  { 'user_id': userResult.insertedIds[0], 'account_name': 'Checking Account', 'balance': 1000, 'account_type': 'checking' },
  { 'user_id': userResult.insertedIds[0], 'account_name': 'Savings Account', 'balance': 5000, 'account_type': 'savings' },
]);

// Insert a few documents into the transactions collection.
const transactionResult = db.getCollection('transactions').insertMany([
  { 'account_id': accountResult.insertedIds[0], 'date': new Date('2024-01-01T10:00:00Z'), 'amount': -50, 'category': 'groceries', 'description': 'Grocery shopping' },
  { 'account_id': accountResult.insertedIds[0], 'date': new Date('2024-01-05T12:00:00Z'), 'amount': 200, 'category': 'salary', 'description': 'Monthly salary' },
  { 'account_id': accountResult.insertedIds[0], 'date': new Date('2024-01-10T14:00:00Z'), 'amount': -25, 'category': 'entertainment', 'description': 'Dinner out' },
]);

// Log the number of inserted documents.
console.log(`${userResult.insertedCount} users have been added to the database.`);
console.log(`${accountResult.insertedCount} accounts have been added to the database.`);
console.log(`${transactionResult.insertedCount} transactions have been added to the database.`);
