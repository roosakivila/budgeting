import React from 'react';
import { Container, Typography, Divider, Box } from '@mui/material';
import IncomeForm from '../components/IncomeForm';
import IncomeVsExpense from '../components/Charts/IncomeVsExpense';
import SummaryCards from '../components/SummaryCards';
import { FadeIn, SlideUp } from '../components/AnimatedTransition';
import { useFinance } from '../context/FinanceContext';

const Dashboard: React.FC = () => {
  const { state } = useFinance();

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <FadeIn>
        <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ mb: 4, fontWeight: 600 }}>
          Dashboard
        </Typography>
      </FadeIn>

      <SlideUp delay={0.1}>
        <SummaryCards />
      </SlideUp>

      <SlideUp delay={0.2}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mb: 3 }}>
          <Box sx={{ flex: 1 }}>
            <IncomeForm />
          </Box>
        </Box>
      </SlideUp>
      
      <Divider sx={{ my: 4 }} />
      
      <SlideUp delay={0.3}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>INCOME VS EXPENSES</Typography>
          <IncomeVsExpense />
        </Box>
      </SlideUp>
    </Container>
  );
};

export default Dashboard; 