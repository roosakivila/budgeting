import React from 'react';
import { Box, Container, LinearProgress, Typography, Paper, Grid } from '@mui/material';
import { useFinance } from '../context/FinanceContext';

const BudgetOverview: React.FC = () => {
    const { state, categoryTotals, remainingBudget } = useFinance();

    const getBudgetStatus = (category: string) => {
        const budget = state.budgets.find(b => b.category === category);
        if (!budget || budget.limit === 0) return { color: 'info', progress: 0, text: 'No budget set' };

        const spent = categoryTotals[category] || 0;
        const percent = (spent / budget.limit) * 100;

        if (percent >= 100) {
            return { color: 'error', progress: 100, text: 'Over budget' };
        } else if (percent >= 80) {
            return { color: 'warning', progress: percent, text: 'Close to limit' };
        } else {
            return { color: 'success', progress: percent, text: 'On track' };
        }
    };

    return (
        <Container>
            <Typography variant="h5" sx={{ textTransform: 'uppercase', mb: 2 }}>
                Budget Overview
            </Typography>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    {state.categories.map(category => {
                        const budget = state.budgets.find(b => b.category === category) || { limit: 0 };
                        const spent = categoryTotals[category] || 0;
                        const remaining = remainingBudget[category] || 0;
                        const status = getBudgetStatus(category);

                        return (
                            <Grid item xs={12} sm={6} md={4} key={category}>
                                <Paper sx={{ p: 2 }}>
                                    <Typography variant="h6">{category}</Typography>
                                    <Box sx={{ mt: 1 }}>
                                        <Typography variant="body2">
                                            Budget: {budget.limit > 0 ? budget.limit.toFixed(2) : 'Not set'}
                                        </Typography>
                                        <Typography variant="body2">
                                            Spent: {spent.toFixed(2)}
                                        </Typography>
                                        <Typography variant="body2" color={remaining < 0 ? 'error' : 'inherit'}>
                                            Remaining: {remaining.toFixed(2)}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ width: '100%', mt: 2 }}>
                                        <LinearProgress 
                                            variant="determinate" 
                                            value={status.progress} 
                                            color={status.color as 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'} 
                                        />
                                        <Typography variant="caption" color={status.color === 'error' ? 'error' : 'inherit'}>
                                            {status.text}
                                        </Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                        );
                    })}
                </Grid>
            </Box>
        </Container>
    );
};

export default BudgetOverview;
