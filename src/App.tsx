
import IncomeForm from "./components/IncomeForm";
import { Container, CssBaseline, Stack } from "@mui/material";
import ExpenseForm from "./components/ExpenseForm";
import Navbar from "./components/Navbar";




const App = () => {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4, mt: 4 }}>
        <Stack spacing={4}>
          <Navbar />
          <IncomeForm />
          <ExpenseForm />

        </Stack>
      </Container>
    </>
  );
}

export default App;


