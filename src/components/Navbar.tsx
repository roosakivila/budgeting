import { AppBar, Toolbar, Typography, Container, Box, Button } from "@mui/material";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    const location = useLocation();
    
    // Check which path is active
    const isActive = (path: string) => {
        return location.pathname === path;
    };

    return (
        <AppBar position="sticky" color="inherit" elevation={1}>
            <Toolbar>
                <Container maxWidth="lg">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <SavingsOutlinedIcon sx={{ mr: 2 }} />
                            <Typography 
                                variant="h6" 
                                component={Link} 
                                to="/"
                                sx={{ 
                                    textDecoration: 'none', 
                                    color: 'inherit',
                                    display: 'flex',
                                    alignItems: 'center' 
                                }}
                            >
                                Budgeting
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button 
                                color="primary" 
                                variant={isActive('/') ? "contained" : "text"}
                                component={Link} 
                                to="/" 
                                startIcon={<DashboardIcon />}
                            >
                                Dashboard
                            </Button>
                            <Button 
                                color="primary" 
                                variant={isActive('/budget') ? "contained" : "text"}
                                component={Link} 
                                to="/budget" 
                                startIcon={<AccountBalanceWalletIcon />}
                            >
                                Budget
                            </Button>
                            <Button 
                                color="primary" 
                                variant={isActive('/expenses') ? "contained" : "text"}
                                component={Link} 
                                to="/expenses" 
                                startIcon={<ReceiptLongIcon />}
                            >
                                Expenses
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;