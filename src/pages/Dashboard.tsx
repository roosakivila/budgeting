import React from 'react';
import { Container, Paper, Typography, Divider, Box, Grid as MuiGrid } from '@mui/material';
import IncomeForm from '../components/IncomeForm';
import IncomeVsExpense from '../components/Charts/IncomeVsExpense';
import { useFinance } from '../context/FinanceContext';

const Dashboard: React.FC = () => {
  const { state, totalExpenses, savings } = useFinance();

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Dashboard
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mb: 3 }}>
        <Box sx={{ flex: 1 }}>
          <IncomeForm />
        </Box>
        
        <Box sx={{ flex: 1 }}>
          <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h5" sx={{ textTransform: 'uppercase', mb: 2 }}>
              Summary
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
              <Box sx={{ 
                flex: 1,
                p: 2, 
                bgcolor: 'success.light', 
                borderRadius: 1, 
                textAlign: 'center',
              }}>
                <Typography variant="body2" sx={{ textTransform: 'uppercase', color: 'success.contrastText' }}>
                  Total Income
                </Typography>
                <Typography variant="h4" sx={{ color: 'success.contrastText' }}>
                  {state.income.toFixed(2)}
                </Typography>
              </Box>
              
              <Box sx={{ 
                flex: 1,
                p: 2, 
                bgcolor: 'error.light', 
                borderRadius: 1, 
                textAlign: 'center',
              }}>
                <Typography variant="body2" sx={{ textTransform: 'uppercase', color: 'error.contrastText' }}>
                  Total Expenses
                </Typography>
                <Typography variant="h4" sx={{ color: 'error.contrastText' }}>
                  {totalExpenses.toFixed(2)}
                </Typography>
              </Box>
              
              <Box sx={{ 
                flex: 1,
                p: 2, 
                bgcolor: savings >= 0 ? 'info.light' : 'warning.light', 
                borderRadius: 1, 
                textAlign: 'center',
              }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    textTransform: 'uppercase', 
                    color: savings >= 0 ? 'info.contrastText' : 'warning.contrastText' 
                  }}
                >
                  {savings >= 0 ? 'Savings' : 'Deficit'}
                </Typography>
                <Typography 
                  variant="h4" 
                  sx={{ 
                    color: savings >= 0 ? 'info.contrastText' : 'warning.contrastText' 
                  }}
                >
                  {Math.abs(savings).toFixed(2)}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
      
      <Divider sx={{ my: 2 }} />
      <IncomeVsExpense />
    </Container>
  );
};

export default Dashboard; 