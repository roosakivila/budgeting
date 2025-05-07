import React, { useState } from 'react';
import { 
    Box, 
    Button, 
    Container, 
    Typography, 
    TextField, 
    FormControl, 
    InputLabel, 
    Select, 
    MenuItem, 
    SelectChangeEvent,
    Paper
} from '@mui/material';
import { useFinance } from '../context/FinanceContext';

const BudgetForm: React.FC = () => {
    const { state, setBudget } = useFinance();
    const [category, setCategory] = useState<string>('');
    const [limit, setLimit] = useState<string>('');

    const handleCategoryChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value);
        // Pre-fill with current budget limit if exists
        const existingBudget = state.budgets.find(b => b.category === event.target.value);
        if (existingBudget && existingBudget.limit > 0) {
            setLimit(existingBudget.limit.toString());
        } else {
            setLimit('');
        }
    };

    const handleLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLimit(event.target.value);
    };

    const handleSetBudget = () => {
        const budgetLimit = parseFloat(limit);
        if (category && budgetLimit >= 0) {
            setBudget({ category, limit: budgetLimit });
            setCategory('');
            setLimit('');
        }
    };

    const isButtonDisabled = !category || limit === '' || isNaN(parseFloat(limit)) || parseFloat(limit) < 0;

    return (
        <Container>
            <Typography variant="h5" sx={{ textTransform: 'uppercase', mb: 2 }}>
                Set Budget Limits
            </Typography>
            <Paper sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, alignItems: 'center' }}>
                    <FormControl sx={{ minWidth: 200 }}>
                        <InputLabel>Category</InputLabel>
                        <Select
                            value={category}
                            onChange={handleCategoryChange}
                            label="Category"
                        >
                            {state.categories.map((cat) => (
                                <MenuItem key={cat} value={cat}>
                                    {cat}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        label="Budget Limit"
                        type="number"
                        value={limit}
                        onChange={handleLimitChange}
                        sx={{ width: { xs: '100%', sm: 200 } }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSetBudget}
                        disabled={isButtonDisabled}
                        sx={{ height: '56px' }}
                    >
                        Set Budget
                    </Button>
                </Box>
                <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
                    Set monthly spending limits for each category. You'll receive warnings when approaching or exceeding these limits.
                </Typography>
            </Paper>
        </Container>
    );
};

export default BudgetForm; 