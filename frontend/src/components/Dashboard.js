// src/components/Dashboard.js
import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Dashboard = () => {
    const { user } = useContext(UserContext); // Access user from context
    const [userData, setUserData] = useState([]); // State for user accounts
    const [transactionsData, setTransactionsData] = useState([]); // State for transactions
    const [budgetsData, setBudgetsData] = useState([]); // State for budgets
    const [loading, setLoading] = useState(true);
    const userId = user ? user.user_id : ""; // Use user ID from context

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Start loading
            try {
                if (userId) {
                    // Fetch user accounts
                    const userResponse = await fetch(`http://localhost:3030/api/accounts/user/${userId}`);
                    if (!userResponse.ok) throw new Error('Failed to fetch user accounts');
                    const accounts = await userResponse.json();
                    setUserData(accounts);

                    // Fetch user transactions
                    const transactionsResponse = await fetch(`http://localhost:3030/api/transactions/user/${userId}`);
                    if (!transactionsResponse.ok) throw new Error('Failed to fetch transactions');
                    const transactions = await transactionsResponse.json();
                    setTransactionsData(transactions);

                    // Fetch user budgets
                    const budgetsResponse = await fetch(`http://localhost:3030/api/budgets/user/${userId}`);
                    if (!budgetsResponse.ok) throw new Error('Failed to fetch budgets');
                    const budgets = await budgetsResponse.json();
                    setBudgetsData(budgets);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchData();
    }, [userId]); // Re-fetch data when userId changes

    // Calculate totals
    const totalBalance = userData.reduce((acc, account) => acc + account.balance, 0);
    const totalTransactions = transactionsData.reduce((acc, transaction) => acc + transaction.amount, 0);
    const totalBudget = budgetsData.reduce((acc, budget) => acc + budget.amount, 0);

    // Breakdown data for rendering
    const transactionBreakdown = transactionsData.reduce((acc, transaction) => {
        acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
        return acc;
    }, {});

    const budgetBreakdown = budgetsData.reduce((acc, budget) => {
        acc[budget.category] = (acc[budget.category] || 0) + budget.amount;
        return acc;
    }, {});

    return (
        <div style={{ color: 'white', padding: '20px', minHeight: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
            <h1>Welcome{user ? `, ${user.name}` : '!'}</h1>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div style={{ marginBottom: '20px', padding: '20px', border: '1px solid white', borderRadius: '10px' }}>
                        <h2>Total Money in Accounts: ${totalBalance}</h2>
                        <h3>Account Breakdown:</h3>
                        <ul>
                            {userData.length > 0 ? (
                                userData.map(account => (
                                    <li key={account._id}>
                                        {account.account_name}: ${account.balance} ({account.account_type})
                                    </li>
                                ))
                            ) : (
                                <p>No accounts found.</p>
                            )}
                        </ul>
                        <Link to="/edit-account" state={{ accounts: userData }}>
                            <button style={{ marginTop: '10px', backgroundColor: '#28a745', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Edit Accounts</button>
                        </Link>
                        <Link to="/report-accounts" state={{ reportData: userData }}>
                            <button style={{ marginTop: '10px', marginLeft: '10px', backgroundColor: '#28a745', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Generate Accounts Report</button>
                        </Link>
                    </div>

                    <div style={{ marginBottom: '20px', padding: '20px', border: '1px solid white', borderRadius: '10px' }}>
                        <h2>Total Transactions: ${totalTransactions}</h2>
                        <h3>Transaction Breakdown:</h3>
                        <ul>
                            {Object.entries(transactionBreakdown).length > 0 ? (
                                Object.entries(transactionBreakdown).map(([category, amount]) => (
                                    <li key={category}>
                                        {category}: ${amount}
                                    </li>
                                ))
                            ) : (
                                <p>No transactions found.</p>
                            )}
                        </ul>
                        <Link to="/edit-transaction" state={{ transactions: transactionsData }}>
                            <button style={{ marginTop: '10px', backgroundColor: '#28a745', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Edit Transactions</button>
                        </Link>
                        <Link to="/report-transactions" state={{ reportData: transactionsData }}>
                            <button style={{ marginTop: '10px', marginLeft: '10px', backgroundColor: '#28a745', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Generate Transactions Report</button>
                        </Link>
                    </div>

                    <div style={{ marginBottom: '20px', padding: '20px', border: '1px solid white', borderRadius: '10px' }}>
                        <h2>Total Budget: ${totalBudget}</h2>
                        <h3>Budget Breakdown:</h3>
                        <ul>
                            {Object.entries(budgetBreakdown).length > 0 ? (
                                Object.entries(budgetBreakdown).map(([category, amount]) => (
                                    <li key={category}>
                                        {category}: ${amount}
                                    </li>
                                ))
                            ) : (
                                <p>No budgets found.</p>
                            )}
                        </ul>
                        <Link to="/edit-budget" state={{ budgets: budgetsData }}>
                            <button style={{ marginTop: '10px', backgroundColor: '#28a745', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Edit Budgets</button>
                        </Link>
                        <Link to="/report-budget" state={{ reportData: budgetsData }}>
                            <button style={{ marginTop: '10px', marginLeft: '10px', backgroundColor: '#28a745', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Generate Budgets Report</button>
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
};

export default Dashboard;
