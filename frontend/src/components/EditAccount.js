import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const EditAccount = () => {
    const { user } = useContext(UserContext); // Get user from context
    const userId = user ? user.user_id : ""; // Get the user ID
    const location = useLocation();
    const { accounts } = location.state || { accounts: [] };
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [newAccountName, setNewAccountName] = useState('');
    const [newAccountBalance, setNewAccountBalance] = useState(0);
    const [newAccountType, setNewAccountType] = useState('savings'); // Default type
    const navigate = useNavigate(); // For navigation

    const handleAddAccount = async () => {
        try {
            const response = await fetch('http://localhost:3030/api/accounts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    account_name: newAccountName,
                    balance: newAccountBalance,
                    account_type: newAccountType,
                    user_id: userId, // Use the user ID from context
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to add account');
            }
            const data = await response.json();
            console.log('Added account:', data);
            navigate('/dashboard'); // Navigate back to dashboard after adding
        } catch (error) {
            console.error('Error adding account:', error);
        }
    };

    const handleEditAccount = (account) => {
        setSelectedAccount(account);
        setNewAccountName(account.account_name);
        setNewAccountBalance(account.balance);
        setNewAccountType(account.account_type);
    };

    const handleDeleteAccount = async (accountId) => {
        try {
            const response = await fetch(`http://localhost:3030/api/accounts/${accountId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete account');
            }
            console.log('Deleted account with ID:', accountId);
            navigate('/dashboard'); // Navigate back to dashboard after deletion
        } catch (error) {
            console.error('Error deleting account:', error);
        }
    };

    const handleUpdateAccount = async () => {
        if (!selectedAccount) return;

        try {
            const response = await fetch(`http://localhost:3030/api/accounts/${selectedAccount._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    account_name: newAccountName,
                    balance: newAccountBalance,
                    account_type: newAccountType,
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to update account');
            }
            const updatedAccount = await response.json();
            console.log('Updated account:', updatedAccount);
            navigate('/dashboard'); // Navigate back to dashboard after updating
        } catch (error) {
            console.error('Error updating account:', error);
        }
    };

    return (
        <div style={{ color: 'white', padding: '20px' }}>
            <h2>Edit Account</h2>
            <h3>Your Accounts:</h3>
            {accounts.length > 0 ? (
                <ul>
                    {accounts.map(account => (
                        <li key={account._id}>
                            {account.account_name}: ${account.balance} ({account.account_type})
                            <button onClick={() => handleEditAccount(account)} style={{ marginLeft: '10px' }}>Edit</button>
                            <button onClick={() => handleDeleteAccount(account._id)} style={{ marginLeft: '10px' }}>Delete</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No accounts to edit.</p>
            )}

            {selectedAccount ? (
                <div style={{ marginTop: '20px' }}>
                    <h3>Editing Account: {selectedAccount.account_name}</h3>
                    <input
                        type="text"
                        placeholder="New Account Name"
                        value={newAccountName}
                        onChange={(e) => setNewAccountName(e.target.value)}
                        style={{ marginBottom: '10px', padding: '10px', borderRadius: '5px', border: '1px solid white' }}
                    />
                    <input
                        type="number"
                        placeholder="New Balance"
                        value={newAccountBalance}
                        onChange={(e) => setNewAccountBalance(Number(e.target.value))}
                        style={{ marginBottom: '10px', padding: '10px', borderRadius: '5px', border: '1px solid white' }}
                    />
                    <select
                        value={newAccountType}
                        onChange={(e) => setNewAccountType(e.target.value)}
                        style={{ marginBottom: '10px', padding: '10px', borderRadius: '5px', border: '1px solid white' }}
                    >
                        <option value="savings">Savings</option>
                        <option value="checking">Checking</option>
                        <option value="credit">Credit</option>
                        <option value="investment">Investment</option>
                    </select>
                    <button onClick={handleUpdateAccount} style={{ marginTop: '10px' }}>Update Account</button>
                </div>
            ) : (
                <>
                    <h3>Add a New Account</h3>
                    <input
                        type="text"
                        placeholder="Account Name"
                        value={newAccountName}
                        onChange={(e) => setNewAccountName(e.target.value)}
                        style={{ marginBottom: '10px', padding: '10px', borderRadius: '5px', border: '1px solid white' }}
                    />
                    <input
                        type="number"
                        placeholder="Balance"
                        value={newAccountBalance}
                        onChange={(e) => setNewAccountBalance(Number(e.target.value))}
                        style={{ marginBottom: '10px', padding: '10px', borderRadius: '5px', border: '1px solid white' }}
                    />
                    <select
                        value={newAccountType}
                        onChange={(e) => setNewAccountType(e.target.value)}
                        style={{ marginBottom: '10px', padding: '10px', borderRadius: '5px', border: '1px solid white' }}
                    >
                        <option value="savings">Savings</option>
                        <option value="checking">Checking</option>
                        <option value="credit">Credit</option>
                        <option value="investment">Investment</option>
                    </select>
                    <button onClick={handleAddAccount} style={{ marginTop: '10px' }}>Add Account</button>
                </>
            )}
        </div>
    );
};

export default EditAccount;
