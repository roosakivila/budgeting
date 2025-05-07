import { Button, Box, FormControl, InputLabel, MenuItem, Select, TextField, SelectChangeEvent, Typography, Container, Paper, Snackbar, Alert, Divider } from "@mui/material";
import { useState, useEffect } from "react"
import ExpensePieChart from "./Charts/ExpensePieChart";
import { useFinance } from "../context/FinanceContext";

const ExpenseForm = () => {
    const [expenseAmount, setExpenseAmount] = useState<string>('');
    const [expenseCategory, setExpenseCategory] = useState<string>('');
    const [amountError, setAmountError] = useState<string>('');
    const [categoryError, setCategoryError] = useState<string>('');
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success');
    
    const { state, addExpense, totalExpenses, categoryTotals, remainingBudget } = useFinance();

    // Log expenses for debugging
    useEffect(() => {
        console.log(`Current expenses: ${state.expenses.length}`, state.expenses);
    }, [state.expenses]);

    const handleExpenseAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setExpenseAmount(value);
        
        // Clear error when user starts typing
        if (amountError) setAmountError('');
    };

    const handleCategoryChange = (e: SelectChangeEvent) => {
        const value = e.target.value;
        setExpenseCategory(value);
        
        // Clear error when user selects a category
        if (categoryError) setCategoryError('');
        
        // Check budget warning
        if (value) {
            const budget = state.budgets.find(b => b.category === value);
            const remaining = remainingBudget[value] || 0;
            
            if (budget && budget.limit > 0 && remaining < 0) {
                setSnackbarMessage(`Warning: You have already exceeded your budget for ${value}`);
                setSnackbarSeverity('warning');
                setSnackbarOpen(true);
            }
        }
    };

    const validateForm = (): boolean => {
        let isValid = true;
        
        // Validate amount
        if (expenseAmount.trim() === '') {
            setAmountError('Expense amount is required');
            isValid = false;
        } else {
            const amount = parseFloat(expenseAmount);
            if (isNaN(amount)) {
                setAmountError('Please enter a valid number');
                isValid = false;
            } else if (amount <= 0) {
                setAmountError('Amount must be greater than zero');
                isValid = false;
            }
        }
        
        // Validate category
        if (!expenseCategory) {
            setCategoryError('Please select a category');
            isValid = false;
        }
        
        return isValid;
    };

    const handleAddExpense = () => {
        if (validateForm()) {
            const expenseValue = parseFloat(expenseAmount);
            
            addExpense({
                amount: expenseValue,
                category: expenseCategory
            });
            
            // Check if over budget after adding expense
            const budget = state.budgets.find(b => b.category === expenseCategory);
            const spent = categoryTotals[expenseCategory] || 0;
            const newTotal = spent + expenseValue;
            
            if (budget && budget.limit > 0 && newTotal > budget.limit) {
                setSnackbarMessage(`Expense added, but you've exceeded your budget for ${expenseCategory}`);
                setSnackbarSeverity('warning');
            } else {
                setSnackbarMessage(`Expense of ${expenseValue.toFixed(2)} added to ${expenseCategory}`);
                setSnackbarSeverity('success');
            }
            
            setSnackbarOpen(true);
            setExpenseAmount('');
            setExpenseCategory('');
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const isButtonDisabled = !expenseAmount || isNaN(parseFloat(expenseAmount)) || parseFloat(expenseAmount) <= 0 || !expenseCategory;

    return (
        <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ textTransform: 'uppercase', mb: 3 }}>Expenses</Typography>
            
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        label="Expense amount"
                        type="number"
                        value={expenseAmount}
                        onChange={handleExpenseAmount}
                        variant="outlined"
                        size="medium"
                        error={!!amountError}
                        helperText={amountError}
                        fullWidth
                    />
                    <FormControl fullWidth error={!!categoryError}>
                        <InputLabel>Category</InputLabel>
                        <Select
                            value={expenseCategory}
                            onChange={handleCategoryChange}
                            label="Select category"
                        >
                            {state.categories.map((category) => {
                                const budget = state.budgets.find(b => b.category === category);
                                const remaining = remainingBudget[category] || 0;
                                const status = budget && budget.limit > 0 
                                    ? remaining < 0 
                                        ? ' (Over budget)' 
                                        : remaining < budget.limit * 0.2 
                                            ? ' (Almost at limit)' 
                                            : ''
                                    : '';
                                
                                return (
                                    <MenuItem key={category} value={category}>
                                        {category}{status && <span style={{ color: remaining < 0 ? 'red' : 'orange', marginLeft: '5px' }}>{status}</span>}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                        {categoryError && <Typography color="error" variant="caption" sx={{ mt: 0.5, ml: 1.5 }}>{categoryError}</Typography>}
                    </FormControl>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={handleAddExpense}
                        disabled={isButtonDisabled}
                    >
                        Add Expense
                    </Button>
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Typography variant="h6">
                        Total Expenses: {totalExpenses.toFixed(2)}
                    </Typography>
                    
                    <Typography variant="h6" sx={{ mt: 1 }}>Category Totals:</Typography>
                    <Box sx={{ ml: 2 }}>
                        {state.categories.map((category) => {
                            const amount = categoryTotals[category] || 0;
                            const budget = state.budgets.find(b => b.category === category);
                            const remaining = remainingBudget[category] || 0;
                            const color = budget && budget.limit > 0 
                                ? remaining < 0 
                                    ? 'error.main' 
                                    : remaining < budget.limit * 0.2 
                                        ? 'warning.main' 
                                        : 'text.primary'
                                : 'text.primary';
                            
                            return (
                                <Typography key={category} color={color}>
                                    {category}: {amount.toFixed(2)} 
                                    {budget && budget.limit > 0 && ` / ${budget.limit.toFixed(2)} (${remaining.toFixed(2)} remaining)`}
                                </Typography>
                            );
                        })}
                    </Box>
                </Box>
                
                <Box sx={{ flex: 1 }}>
                    <ExpensePieChart expenses={state.expenses} />
                </Box>
            </Box>
            
            <Divider sx={{ my: 3 }} />
            
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Paper>
    );
};

export default ExpenseForm;