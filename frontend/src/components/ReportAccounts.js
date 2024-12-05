// src/components/ReportAccounts.js
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const ReportAccounts = () => {
    const location = useLocation();
    const { reportData } = location.state || { reportData: [] };

    // Extract unique account types from the report data for the dropdown
    const uniqueAccountTypes = [...new Set(reportData.map(item => item.account_type))];

    // State to manage selected account types for the chart
    const [selectedAccountTypes, setSelectedAccountTypes] = useState([]);

    // Handle account type selection change
    const handleAccountTypeChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelectedAccountTypes([...selectedAccountTypes, value]);
        } else {
            setSelectedAccountTypes(selectedAccountTypes.filter(accountType => accountType !== value));
        }
    };

    // Filter the data based on selected account types
    const filteredData = reportData.filter(item => selectedAccountTypes.includes(item.account_type));

    // Prepare data for the pie chart
    const pieData = selectedAccountTypes.length > 0 ? filteredData.map(item => ({
        name: item.account_type,
        value: item.balance,
    })) : [];

    return (
        <div style={{ padding: '20px', color: 'white' }}>
            <h2>Accounts Report</h2>

            {/* Multi-select dropdown for account types */}
            <div style={{ marginBottom: '20px' }}>
                <label>Select Account Types:</label>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {uniqueAccountTypes.map(accountType => (
                        <label key={accountType} style={{ margin: '5px 0' }}>
                            <input
                                type="checkbox"
                                value={accountType}
                                onChange={handleAccountTypeChange}
                                checked={selectedAccountTypes.includes(accountType)}
                            />
                            {accountType}
                        </label>
                    ))}
                </div>
            </div>

            {/* Pie Chart */}
            {selectedAccountTypes.length > 0 ? (
                <PieChart width={400} height={400}>
                    <Pie
                        data={pieData}
                        cx={200}
                        cy={200}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={['#FF6384', '#36A2EB', '#FFCE56'][index % 3]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            ) : (
                <p>Please select at least one account type to display the pie chart.</p>
            )}
        </div>
    );
};

export default ReportAccounts;
