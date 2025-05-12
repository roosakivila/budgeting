import { Typography } from "@mui/material";
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Expense } from "../../context/FinanceContext";

interface ExpensePieChartProps {
    expenses: Expense[];
}

const ExpensePieChart: React.FC<ExpensePieChartProps> = ({ expenses }) => {
    const categories = [...new Set(expenses.map(expense => expense.category))];

    const totals = categories.reduce((acc, category) => {
        acc[category] = expenses
            .filter(expense => expense.category === category)
            .reduce((sum, expense) => sum + expense.amount, 0);
        return acc;
    }, {} as { [key: string]: number });

    const categoryTotals = Object.entries(totals).map(([category, total]) => ({
        name: category,
        value: total,
    }));

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"];

    if (categoryTotals.length === 0) {
        return <Typography variant="body1" padding={2}>No expenses to display yet.</Typography>;
    }

    return (
        <ResponsiveContainer width="60%" height={250}>
            <PieChart>
                <Pie
                    data={categoryTotals}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    fontSize={12}
                    label={({ name, value }) => `${name}: ${value}`}
                >
                    {categoryTotals.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
};

export default ExpensePieChart;