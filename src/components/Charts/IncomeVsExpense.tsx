import React from 'react';
import { Typography, Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useFinance } from '../../context/FinanceContext';

const IncomeVsExpense: React.FC = () => {
    const { state, totalExpenses, categoryTotals, savings } = useFinance();

    // Prepare data for the bar chart
    const chartData = [
        {
            name: 'Overview',
            Income: state.income,
            Expenses: totalExpenses,
            Savings: savings > 0 ? savings : 0,
            Deficit: savings < 0 ? Math.abs(savings) : 0
        }
    ];

    // Prepare category breakdown data
    const categoryData = Object.keys(categoryTotals).map(category => ({
        name: category,
        [category]: categoryTotals[category]
    }));

    // Generate colors for categories
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"];
    
    const getCategoryColor = (index: number) => COLORS[index % COLORS.length];

    if (state.income === 0 && totalExpenses === 0) {
        return <Typography variant="body1" padding={2}>Add income and expenses to see comparison.</Typography>;
    }

    return (
        <Box sx={{ width: '100%', height: 400 }}>
            <Typography variant="h5" sx={{ textTransform: 'uppercase', mb: 2 }}>
                Income vs Expenses
            </Typography>
            <ResponsiveContainer width="100%" height="80%">
                <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${parseFloat(value as string).toFixed(2)}`} />
                    <Legend />
                    <Bar dataKey="Income" fill="#4caf50" />
                    <Bar dataKey="Expenses" fill="#f44336" />
                    <Bar dataKey="Savings" fill="#2196f3" />
                    <Bar dataKey="Deficit" fill="#ff9800" />
                </BarChart>
            </ResponsiveContainer>

            {/* Category breakdown chart */}
            {totalExpenses > 0 && (
                <>
                    <Typography variant="h5" sx={{ textTransform: 'uppercase', mt: 4, mb: 2 }}>
                        Expense Breakdown
                    </Typography>
                    <ResponsiveContainer width="100%" height="80%">
                        <BarChart data={categoryData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip formatter={(value) => `${parseFloat(value as string).toFixed(2)}`} />
                            <Legend />
                            {Object.keys(categoryTotals).map((category, index) => (
                                <Bar key={category} dataKey={category} fill={getCategoryColor(index)} />
                            ))}
                        </BarChart>
                    </ResponsiveContainer>
                </>
            )}
        </Box>
    );
};

export default IncomeVsExpense;