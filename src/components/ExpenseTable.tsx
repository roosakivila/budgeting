import { Typography, Box, Container } from "@mui/material";

interface Expense {
    amount: number;
    category: string;
}

interface ExpenseTableProps {
    expenses: Expense[];
}

const ExpenseTable: React.FC<ExpenseTableProps> = ({ expenses }) => {


    return (
        <Container>
            <Box sx={{ marginTop: 2 }}>
                {expenses.map((expense, index) => (
                    <Typography key={index}>
                        {expense.category}: {expense.amount.toFixed(2)}
                    </Typography>
                ))}
            </Box>
        </Container>

    );
}

export default ExpenseTable;