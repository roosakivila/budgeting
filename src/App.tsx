import { CssBaseline } from "@mui/material";
import Navbar from "./components/Navbar";
import { FinanceProvider } from "./context/FinanceContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Budget from "./pages/Budget";
import Expenses from "./pages/Expenses";

const App = () => {
  return (
    <FinanceProvider>
      <BrowserRouter>
        <CssBaseline />
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </FinanceProvider>
  );
}

export default App;


