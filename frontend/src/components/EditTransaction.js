import React, { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const EditTransaction = () => {
    const { user } = useContext(UserContext); // Get user from context
    const userId = user ? user.user_id : ""; // Get the user ID
    const location = useLocation();
    const { transactions } = location.state || { transactions: [] }; // Access transactions from state
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [newDescription, setNewDescription] = useState('');
    const [newAmount, setNewAmount] = useState(0);
    const [newCategory, setNewCategory] = useState('');
    const [accounts, setAccounts] = useState([]); // State to hold user's accounts
    const navigate = useNavigate(); // For navigation

    useEffect(() => {
        const fetchAccounts = async () => {
            if (userId) {
                try {
                    const response = await fetch(`http://localhost:3030/api/accounts/user/${userId}`);
                    if (!response.ok) throw new Error('Failed to fetch user accounts');
                    const userAccounts = await response.json();
                    setAccounts(userAccounts);
                } catch (error) {
                    console.error('Error fetching accounts:', error);
                }
            }
        };

        fetchAccounts();
    }, [userId]); // Re-fetch accounts when userId changes

    // Function to add a new transaction
    const handleAddTransaction = async () => {
        if (!userId || accounts.length === 0) {
            console.error("User ID or account ID not found");
            return;
        }

        const accountId = accounts[0]._id; // Get the first account ID

        try {
            const response = await fetch('http://localhost:3030/api/transactions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    description: newDescription,
                    amount: newAmount,
                    category: newCategory,
                    account_id: accountId, // Use the first account ID
                    user_id: userId, // Use the user ID from context
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to add transaction');
            }
            const data = await response.json();
            console.log('Added transaction:', data);
            navigate('/dashboard'); // Navigate back to dashboard after adding
        } catch (error) {
            console.error('Error adding transaction:', error);
        }
    };

    // Function to set the selected transaction for editing
    const handleEditTransaction = (transaction) => {
        setSelectedTransaction(transaction);
        setNewDescription(transaction.description);
        setNewAmount(transaction.amount);
        setNewCategory(transaction.category);
    };

    // Function to delete a transaction
    const handleDeleteTransaction = async (transactionId) => {
        try {
            const response = await fetch(`http://localhost:3030/api/transactions/${transactionId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete transaction');
            }
            console.log('Deleted transaction with ID:', transactionId);
            navigate('/dashboard'); // Navigate back to dashboard after deletion
        } catch (error) {
            console.error('Error deleting transaction:', error);
        }
    };

    // Function to update a transaction
    const handleUpdateTransaction = async () => {
        if (!selectedTransaction) return;

        try {
            const response = await fetch(`http://localhost:3030/api/transactions/${selectedTransaction._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    description: newDescription,
                    amount: newAmount,
                    category: newCategory,
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to update transaction');
            }
            const updatedTransaction = await response.json();
            console.log('Updated transaction:', updatedTransaction);
            navigate('/dashboard'); // Navigate back to dashboard after updating
        } catch (error) {
            console.error('Error updating transaction:', error);
        }
    };

    return (
        <div style={{ color: 'white', padding: '20px' }}>
            <h2>Edit Transaction</h2>
            <h3>Your Transactions:</h3>
            {transactions.length > 0 ? (
                <ul>
                    {transactions.map(transaction => (
                        <li key={transaction._id}>
                            {transaction.description}: ${transaction.amount} ({transaction.category})
                            <button onClick={() => handleEditTransaction(transaction)} style={{ marginLeft: '10px' }}>Edit</button>
                            <button onClick={() => handleDeleteTransaction(transaction._id)} style={{ marginLeft: '10px' }}>Delete</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No transactions to edit.</p>
            )}

            {selectedTransaction ? (
                <div style={{ marginTop: '20px' }}>
                    <h3>Editing Transaction: {selectedTransaction.description}</h3>
                    <input
                        type="text"
                        placeholder="New Description"
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        style={{ marginBottom: '10px', padding: '10px', borderRadius: '5px', border: '1px solid white' }}
                    />
                    <input
                        type="number"
                        placeholder="New Amount"
                        value={newAmount}
                        onChange={(e) => setNewAmount(Number(e.target.value))}
                        style={{ marginBottom: '10px', padding: '10px', borderRadius: '5px', border: '1px solid white' }}
                    />
                    <input
                        type="text"
                        placeholder="New Category"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        style={{ marginBottom: '10px', padding: '10px', borderRadius: '5px', border: '1px solid white' }}
                    />
                    <button onClick={handleUpdateTransaction} style={{ marginTop: '10px' }}>Update Transaction</button>
                </div>
            ) : (
                <>
                    <h3>Add a New Transaction</h3>
                    <input
                        type="text"
                        placeholder="Description"
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        style={{ marginBottom: '10px', padding: '10px', borderRadius: '5px', border: '1px solid white' }}
                    />
                    <input
                        type="number"
                        placeholder="Amount"
                        value={newAmount}
                        onChange={(e) => setNewAmount(Number(e.target.value))}
                        style={{ marginBottom: '10px', padding: '10px', borderRadius: '5px', border: '1px solid white' }}
                    />
                    <input
                        type="text"
                        placeholder="Category"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        style={{ marginBottom: '10px', padding: '10px', borderRadius: '5px', border: '1px solid white' }}
                    />
                    <button onClick={handleAddTransaction} style={{ marginTop: '10px' }}>Add Transaction</button>
                </>
            )}
        </div>
    );
};

export default EditTransaction;
