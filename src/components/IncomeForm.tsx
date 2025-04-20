import { useState } from "react";
import { Box, Button, TextField, Typography, Container } from "@mui/material";

const IncomeForm = () => {
    const [income, setIncome] = useState<string>("");
    const [submittedIncome, setSubmittedIncome] = useState<number | null>(null);

    const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIncome(e.target.value);
    };

    const handleSubmit = () => {
        const incomeValue = parseFloat(income);

        if (incomeValue > 0) {
            setSubmittedIncome(incomeValue);
            console.log('Income added: ', incomeValue);
            setIncome("");
        }
    };

    const handleFocus = () => {
        if (income === "0") {
            setIncome("");
        }
    }

    const isButtonDisabled = income === "" || isNaN(parseFloat(income)) || parseFloat(income) <= 0;

    const resetSubmit = () => {
        setSubmittedIncome(0);
    }

    // lisää toiminto, että tuloja voi lisätä sekä tulojen resetointi painike

    return (
        <>
            <Container>
                <Typography variant="h5" sx={{ textTransform: 'uppercase' }}>Fuel your wallet</Typography>
                <Box padding={2}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
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
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            size="medium"
                            onClick={handleSubmit}
                            disabled={isButtonDisabled}
                            sx={{ height: '56px' }}
                        >
                            Add
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            size="medium"
                            onClick={resetSubmit}
                            sx={{ height: '56px' }}
                        >
                            Reset
                        </Button>
                        {submittedIncome !== null && (
                            <Box sx={{ textAlign: 'center', ml: 10 }}>
                                <Typography variant="body1" sx={{ textTransform: 'uppercase' }}>Total income:</Typography> {/* The label */}
                                <Typography variant="h4" sx={{ color: 'green' }}>
                                    +{submittedIncome.toFixed(2)} {/* Display the submitted income */}
                                </Typography>
                            </Box>
                        )}
                    </Box>

                </Box>
            </Container>
        </>
    )
};

export default IncomeForm; 