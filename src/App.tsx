import React from "react";
import IncomeForm from "./components/IncomeForm";
import { Container, CssBaseline, Typography, Stack } from "@mui/material";
import ExpenseForm from "./components/ExpenseForm";
import ExpensePieChart from "./components/Charts/ExpensePieChart";



const App = () => {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stack spacing={4}>
          <Typography variant="h3" component="h1">Budgeting App</Typography>
          <IncomeForm />
          <ExpenseForm />

        </Stack>
      </Container>
    </>
  );
}

export default App;


