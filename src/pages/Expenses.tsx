import React, { useState } from 'react';
import { Container, Typography, Button, Box, Snackbar, Alert } from '@mui/material';
import ExpenseForm from '../components/ExpenseForm';
import { useSampleData } from '../utils/sampleData';
import { useFinance } from '../context/FinanceContext';

const Expenses: React.FC = () => {
  const { state } = useFinance();
  const { initializeWithSampleData } = useSampleData();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleInitialize = () => {
    initializeWithSampleData();
    setSnackbarMessage('Sample data loaded successfully');
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Expense Tracking
      </Typography>
      
      {state.expenses.length === 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleInitialize}
            sx={{ mb: 2 }}
          >
            Initialize with Sample Data
          </Button>
        </Box>
      )}
      
      <ExpenseForm />

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
    </Container>
  );
};

export default Expenses; 