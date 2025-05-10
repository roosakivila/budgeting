import { useState } from "react";
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Card, 
  InputAdornment,
  IconButton,
  Tooltip,
  Fade,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useFinance } from "../context/FinanceContext";

const IncomeForm = () => {
  const [income, setIncome] = useState<string>('');
  const [incomeSource, setIncomeSource] = useState<string>('Salary');
  const { state, setIncome: setGlobalIncome, resetIncome } = useFinance();

  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIncome(e.target.value);
  };

  const handleIncomeSubmit = () => {
    if (income && !isNaN(parseFloat(income))) {
      setGlobalIncome(parseFloat(income));
      setIncome('');
    }
  };

  const handleReset = () => {
    resetIncome();
    setIncome('');
  };

  return (
    <Card 
      elevation={3} 
      sx={{ 
        p: 3, 
        borderRadius: 2,
        position: 'relative',
        height: '100%'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          ADD INCOME
        </Typography>
        <Tooltip 
          title="Add your regular income sources here. This helps calculate your savings and budget." 
          placement="top"
          TransitionComponent={Fade}
          arrow
        >
          <IconButton size="small">
            <InfoOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <FormControl fullWidth>
          <InputLabel id="income-source-label">Source</InputLabel>
          <Select
            labelId="income-source-label"
            value={incomeSource}
            label="Source"
            onChange={(e) => setIncomeSource(e.target.value as string)}
          >
            <MenuItem value="Salary">Salary</MenuItem>
            <MenuItem value="Freelance">Freelance</MenuItem>
            <MenuItem value="Investments">Investments</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Income Amount"
          variant="outlined"
          fullWidth
          value={income}
          onChange={handleIncomeChange}
          type="number"
          placeholder="Enter amount"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          sx={{ mb: 2 }}
        />

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleIncomeSubmit}
            disabled={!income || isNaN(parseFloat(income)) || parseFloat(income) <= 0}
            startIcon={<AddIcon />}
            sx={{ py: 1.5 }}
          >
            Add Income
          </Button>
          
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleReset}
            startIcon={<RestartAltIcon />}
            sx={{ py: 1.5 }}
          >
            Reset
          </Button>
        </Box>
      </Box>

      <Box 
        sx={{ 
          mt: 4, 
          p: 2, 
          bgcolor: 'success.light', 
          borderRadius: 2, 
          textAlign: 'center',
          color: 'success.contrastText'
        }}
      >
        <Typography variant="subtitle2" gutterBottom>
          TOTAL INCOME
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          +${state.income.toFixed(2)}
        </Typography>
      </Box>
    </Card>
  );
};

export default IncomeForm; 