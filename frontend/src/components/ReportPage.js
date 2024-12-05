// src/components/ReportPage.js
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const ReportPage = () => {
    const location = useLocation(); // Get the location object
    const { userId } = location.state || {}; // Extract userId from location state
    const [reportType, setReportType] = useState(''); // State for the selected report type
    const [generatedReport, setGeneratedReport] = useState(null);

    const handleGenerateReport = async () => {
        if (!userId) {
            alert('User ID not found. Please sign in.');
            return;
        }

        let url;
        switch (reportType) {
            case 'accounts':
                url = `http://localhost:3030/api/accounts/user/${userId}`;
                break;
            case 'budget':
                url = `http://localhost:3030/api/budgets/user/${userId}`;
                break;
            case 'transactions':
                url = `http://localhost:3030/api/transactions/user/${userId}`;
                break;
            default:
                alert('Please select a report type.');
                return;
        }

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to generate report');
            const data = await response.json();
            setGeneratedReport(data); // Save the report data to state
        } catch (error) {
            console.error('Error generating report:', error);
        }
    };

    return (
        <div style={{ padding: '20px', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2>Generate Report</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '300px' }}>
                <label htmlFor="reportType">Select Report Type:</label>
                <select
                    id="reportType"
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                    style={{ padding: '8px', borderRadius: '5px', width: '100%' }}
                >
                    <option value="">-- Choose an option --</option>
                    <option value="accounts">Accounts</option>
                    <option value="budget">Budget</option>
                    <option value="transactions">Transactions</option>
                </select>
                <button
                    onClick={handleGenerateReport}
                    style={{
                        padding: '10px',
                        fontSize: '16px',
                        borderRadius: '5px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        width: '100%'
                    }}
                >
                    Generate Report
                </button>
            </div>
            {generatedReport && (
                <div style={{ marginTop: '20px', width: '300px' }}>
                    <h3>Report Results</h3>
                    <pre style={{ backgroundColor: '#333', padding: '10px', borderRadius: '5px', overflowX: 'auto' }}>
                        {JSON.stringify(generatedReport, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
};

export default ReportPage;
