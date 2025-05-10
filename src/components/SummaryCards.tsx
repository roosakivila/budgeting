import { Box, Card, Typography, Grid } from '@mui/material';
import { useFinance } from "../context/FinanceContext";

const SummaryCards = () => {
  const { state, totalExpenses, savings } = useFinance();

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>SUMMARY</Typography>
      
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column',
            position: 'relative',
            overflow: 'visible',
            bgcolor: 'success.light', 
            color: 'success.contrastText'
          }}>
            <Box sx={{ 
              position: 'absolute', 
              top: -15, 
              left: 16, 
              bgcolor: 'success.main',
              color: 'white',
              px: 2,
              py: 1,
              borderRadius: 2,
              fontWeight: 'bold'
            }}>
              TOTAL INCOME
            </Box>
            
            <Box sx={{ p: 3, pt: 4, textAlign: 'center', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant="h3" component="div" sx={{ fontWeight: 700 }}>
                ${state.income.toFixed(2)}
              </Typography>
            </Box>
          </Card>
        </Grid>
        
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column',
            position: 'relative',
            overflow: 'visible',
            bgcolor: 'error.light', 
            color: 'error.contrastText'
          }}>
            <Box sx={{ 
              position: 'absolute', 
              top: -15, 
              left: 16, 
              bgcolor: 'error.main',
              color: 'white',
              px: 2,
              py: 1,
              borderRadius: 2,
              fontWeight: 'bold'
            }}>
              TOTAL EXPENSES
            </Box>
            
            <Box sx={{ p: 3, pt: 4, textAlign: 'center', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant="h3" component="div" sx={{ fontWeight: 700 }}>
                ${totalExpenses.toFixed(2)}
              </Typography>
            </Box>
          </Card>
        </Grid>
        
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column',
            position: 'relative',
            overflow: 'visible',
            bgcolor: savings >= 0 ? 'primary.light' : 'warning.light',
            color: savings >= 0 ? 'primary.contrastText' : 'warning.contrastText'
          }}>
            <Box sx={{ 
              position: 'absolute', 
              top: -15, 
              left: 16, 
              bgcolor: savings >= 0 ? 'primary.main' : 'warning.main',
              color: 'white',
              px: 2,
              py: 1,
              borderRadius: 2,
              fontWeight: 'bold'
            }}>
              {savings >= 0 ? 'SAVINGS' : 'DEFICIT'}
            </Box>
            
            <Box sx={{ p: 3, pt: 4, textAlign: 'center', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant="h3" component="div" sx={{ fontWeight: 700 }}>
                ${Math.abs(savings).toFixed(2)}
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SummaryCards; 