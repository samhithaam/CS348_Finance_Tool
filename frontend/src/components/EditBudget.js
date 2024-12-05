import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const EditBudget = () => {
    const { user } = useContext(UserContext); // Get user from context
    const userId = user ? user.user_id : ""; // Get the user ID
    const location = useLocation();
    const { budgets } = location.state || { budgets: [] }; // Access budgets from state
    const [selectedBudget, setSelectedBudget] = useState(null);
    const [newCategory, setNewCategory] = useState('');
    const [newAmount, setNewAmount] = useState(0);
    const navigate = useNavigate();

    const handleAddBudget = async () => {
        try {
            const response = await fetch('http://localhost:3030/api/budgets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    category: newCategory,
                    amount: newAmount,
                    user_id: userId, // Use the user ID from context
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to add budget');
            }
            const data = await response.json();
            console.log('Added budget:', data);
            navigate('/dashboard'); // Navigate back to dashboard after adding
        } catch (error) {
            console.error('Error adding budget:', error);
        }
    };

    const handleEditBudget = (budget) => {
        setSelectedBudget(budget);
        setNewCategory(budget.category);
        setNewAmount(budget.amount);
    };

    const handleDeleteBudget = async (budgetId) => {
        try {
            const response = await fetch(`http://localhost:3030/api/budgets/${budgetId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete budget');
            }
            console.log('Deleted budget with ID:', budgetId);
            navigate('/dashboard'); // Navigate back to dashboard after deletion
        } catch (error) {
            console.error('Error deleting budget:', error);
        }
    };

    const handleUpdateBudget = async () => {
        if (!selectedBudget) return;

        try {
            const response = await fetch(`http://localhost:3030/api/budgets/${selectedBudget._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    category: newCategory,
                    amount: newAmount,
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to update budget');
            }
            const updatedBudget = await response.json();
            console.log('Updated budget:', updatedBudget);
            navigate('/dashboard'); // Navigate back to dashboard after updating
        } catch (error) {
            console.error('Error updating budget:', error);
        }
    };

    return (
        <div style={{ color: 'white', padding: '20px' }}>
            <h2>Edit Budget</h2>
            <h3>Your Budgets:</h3>
            {budgets.length > 0 ? (
                <ul>
                    {budgets.map(budget => (
                        <li key={budget._id}>
                            {budget.category}: ${budget.amount}
                            <button onClick={() => handleEditBudget(budget)} style={{ marginLeft: '10px' }}>Edit</button>
                            <button onClick={() => handleDeleteBudget(budget._id)} style={{ marginLeft: '10px' }}>Delete</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No budgets to edit.</p>
            )}

            {selectedBudget ? (
                <div style={{ marginTop: '20px' }}>
                    <h3>Editing Budget: {selectedBudget.category}</h3>
                    <input
                        type="text"
                        placeholder="New Category"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        style={{ marginBottom: '10px', padding: '10px', borderRadius: '5px', border: '1px solid white' }}
                    />
                    <input
                        type="number"
                        placeholder="New Amount"
                        value={newAmount}
                        onChange={(e) => setNewAmount(Number(e.target.value))}
                        style={{ marginBottom: '10px', padding: '10px', borderRadius: '5px', border: '1px solid white' }}
                    />
                    <button onClick={handleUpdateBudget} style={{ marginTop: '10px' }}>Update Budget</button>
                </div>
            ) : (
                <>
                    <h3>Add a New Budget</h3>
                    <input
                        type="text"
                        placeholder="Category"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        style={{ marginBottom: '10px', padding: '10px', borderRadius: '5px', border: '1px solid white' }}
                    />
                    <input
                        type="number"
                        placeholder="Amount"
                        value={newAmount}
                        onChange={(e) => setNewAmount(Number(e.target.value))}
                        style={{ marginBottom: '10px', padding: '10px', borderRadius: '5px', border: '1px solid white' }}
                    />
                    <button onClick={handleAddBudget} style={{ marginTop: '10px' }}>Add Budget</button>
                </>
            )}
        </div>
    );
};

export default EditBudget;
