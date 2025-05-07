import React from 'react';
import { Container, Typography, Divider } from '@mui/material';
import BudgetForm from '../components/BudgetForm';
import BudgetOverview from '../components/BudgetOverview';

const Budget: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Budget Management
      </Typography>
      
      <BudgetForm />
      
      <Divider sx={{ my: 3 }} />
      
      <BudgetOverview />
    </Container>
  );
};

export default Budget; 