// src/components/ReportBudget.js
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const ReportBudget = () => {
    const location = useLocation();
    const { reportData } = location.state || { reportData: [] };

    // Extract unique categories from the report data for the dropdown
    const uniqueCategories = [...new Set(reportData.map(item => item.category))];

    // State to manage selected categories for the chart
    const [selectedCategories, setSelectedCategories] = useState([]);

    // Handle category selection change
    const handleCategoryChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelectedCategories([...selectedCategories, value]);
        } else {
            setSelectedCategories(selectedCategories.filter(category => category !== value));
        }
    };

    // Filter the data based on selected categories
    const filteredData = reportData.filter(item => selectedCategories.includes(item.category));

    // Prepare data for the pie chart
    const pieData = filteredData.map(item => ({
        name: item.category,
        value: item.amount,
    }));

    return (
        <div style={{ padding: '20px', color: 'white' }}>
            <h2>Budget Report</h2>

            {/* Multi-select dropdown for categories */}
            <div style={{ marginBottom: '20px' }}>
                <label>Select Categories:</label>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {uniqueCategories.map(category => (
                        <label key={category} style={{ margin: '5px 0' }}>
                            <input
                                type="checkbox"
                                value={category}
                                onChange={handleCategoryChange}
                                checked={selectedCategories.includes(category)}
                            />
                            {category}
                        </label>
                    ))}
                </div>
            </div>

            {/* Pie Chart */}
            {selectedCategories.length > 0 ? (
                <PieChart width={400} height={400}>
                    <Pie
                        data={pieData}
                        cx={200}
                        cy={200}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label
                    >
                        {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={`#${(Math.random() * 0xFFFFFF << 0).toString(16)}`} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            ) : (
                <p>Please select at least one category to display the pie chart.</p>
            )}
        </div>
    );
};

export default ReportBudget;
