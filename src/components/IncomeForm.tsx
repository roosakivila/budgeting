import { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, Container, Alert, Snackbar, Paper } from "@mui/material";
import { useFinance } from "../context/FinanceContext";

const IncomeForm = () => {
    const [income, setIncome] = useState<string>("");
    const { state, setIncome: setGlobalIncome, resetIncome } = useFinance();
    const [error, setError] = useState<string>("");
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>("");

    const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setIncome(value);
        
        // Clear error when user starts typing
        if (error) setError("");
    };

    const validateIncome = (value: string): boolean => {
        const incomeValue = parseFloat(value);
        
        if (value.trim() === "") {
            setError("Income amount is required");
            return false;
        }
        
        if (isNaN(incomeValue)) {
            setError("Please enter a valid number");
            return false;
        }
        
        if (incomeValue <= 0) {
            setError("Income must be greater than zero");
            return false;
        }
        
        return true;
    };

    const handleSubmit = () => {
        if (validateIncome(income)) {
            const incomeValue = parseFloat(income);
            setGlobalIncome(incomeValue);
            setIncome("");
            setSnackbarMessage(`Income of ${incomeValue.toFixed(2)} added successfully!`);
            setSnackbarOpen(true);
        }
    };

    const handleResetIncome = () => {
        resetIncome();
        setSnackbarMessage("Income has been reset");
        setSnackbarOpen(true);
    };

    const handleFocus = () => {
        if (income === "0") {
            setIncome("");
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const isButtonDisabled = income === "" || isNaN(parseFloat(income)) || parseFloat(income) <= 0;

    return (
        <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ textTransform: 'uppercase', mb: 2 }}>Fuel your wallet</Typography>
            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'stretch', sm: 'center' },
                gap: 2
            }}>
                <TextField
                    label="Add income"
                    type="number"
                    value={income}
                    onChange={handleIncomeChange}
                    onFocus={handleFocus}
                    variant="outlined"
                    size="medium"
                    fullWidth
                    error={!!error}
                    helperText={error}
                />
                <Box sx={{ display: 'flex', gap: 1, mt: { xs: 1, sm: 0 } }}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="medium"
                        onClick={handleSubmit}
                        disabled={isButtonDisabled}
                        sx={{ height: '56px', flex: 1 }}
                    >
                        Add
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="medium"
                        onClick={handleResetIncome}
                        sx={{ height: '56px', flex: 1 }}
                    >
                        Reset
                    </Button>
                </Box>
            </Box>
            
            {state.income > 0 && (
                <Box sx={{ 
                    textAlign: 'center',
                    mt: 3, 
                    p: 2, 
                    bgcolor: 'success.light', 
                    borderRadius: 1 
                }}>
                    <Typography variant="body1" sx={{ textTransform: 'uppercase', color: 'success.contrastText' }}>
                        Total income:
                    </Typography>
                    <Typography variant="h4" sx={{ color: 'success.contrastText' }}>
                        +{state.income.toFixed(2)}
                    </Typography>
                </Box>
            )}
            
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Paper>
    );
};

export default IncomeForm; 