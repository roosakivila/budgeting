
import { Button, Box, FormControl, InputLabel, MenuItem, Select, TextField, SelectChangeEvent, Typography, Container } from "@mui/material";
import { useState } from "react"
import ExpensePieChart from "./Charts/ExpensePieChart";
import ExpenseTable from "./ExpenseTable";


const ExpenseForm = () => {
    const [expenseAmout, setExpenseAmount] = useState<string>('');
    const [expenseCategory, setExpenseCategory] = useState<string>('')
    const [expenses, setExpences] = useState<{ amount: number, category: string }[]>([]);

    const categories: string[] = [
        "Rent",
        "Bills",
        "Hobbies",
        "Groceries",
        "Public transportation",
        "Entertainment"
    ];

    const handleExpenceAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        setExpenseAmount(e.target.value);
    };

    const handleCategoryChange = (e: SelectChangeEvent) => {
        setExpenseCategory(e.target.value);
    };

    const handleAddExpense = () => {
        const expenseValue = parseFloat(expenseAmout);

        if (expenseValue > 0 && expenseCategory) {
            setExpences([...expenses, { amount: expenseValue, category: expenseCategory }]);
            setExpenseAmount('');
            setExpenseCategory('');
        }
    };

    const categoryTotals = categories.reduce((totals: { [key: string]: number }, category) => {
        totals[category] = expenses
            .filter(expense => expense.category === category)
            .reduce((sum, expense) => sum + expense.amount, 0);
        return totals;
    }, {});

    const expenseTotals: number = expenses.reduce((sum, expense) => sum + expense.amount, 0);


    const isButtonDisabled = expenseAmout === "" || isNaN(parseFloat(expenseAmout)) || parseFloat(expenseAmout) <= 0 || expenseCategory === "";


    return (
        <>
            <Container>
                <Typography variant="h5" sx={{ textTransform: 'uppercase' }}>Expenses</Typography>
                <ExpensePieChart expenses={expenses} />
                <Box paddingLeft={2}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2
                    }}>
                        <TextField
                            label="Expense amount"
                            type="number"
                            value={expenseAmout}
                            onChange={handleExpenceAmount}
                            variant="outlined"
                            size="medium"
                        />
                        <FormControl variant="outlined" sx={{ minWidth: 220 }}>
                            <InputLabel>Category</InputLabel>
                            <Select
                                value={expenseCategory}
                                onChange={handleCategoryChange}
                                label="Select category"
                            >
                                {categories.map((category) => (
                                    <MenuItem key={category} value={category}>
                                        {category}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Button
                            variant="contained"
                            color="primary"
                            size="medium"
                            onClick={handleAddExpense}
                            disabled={isButtonDisabled}
                            sx={{ height: '56px' }}
                        >
                            Add
                        </Button>
                    </Box>

                    <Typography variant="h6" sx={{ marginTop: 2 }}>
                        Total Expenses: {expenseTotals.toFixed(2)}
                    </Typography>


                    <Typography variant="h6" sx={{ marginTop: 2 }}>Category Totals:</Typography>
                    {expenses.length > 0 && (categories.map((category) => (
                        <Typography key={category}>
                            {category}: {categoryTotals[category].toFixed(2)}
                        </Typography>
                    )))}

                </Box>
            </Container>
            <ExpenseTable expenses={expenses} />

        </>

    )
};

export default ExpenseForm;