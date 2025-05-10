import { AppBar, Toolbar, Typography, Button, Box, Container, useTheme, useMediaQuery } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ReceiptIcon from '@mui/icons-material/Receipt';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();
  
  const pages = [
    { title: "Dashboard", path: "/", icon: <DashboardIcon fontSize="small" /> },
    { title: "Budget", path: "/budget", icon: <MonetizationOnIcon fontSize="small" /> },
    { title: "Expenses", path: "/expenses", icon: <ReceiptIcon fontSize="small" /> }
  ];
  
  return (
    <AppBar position="sticky" color="default" elevation={2} sx={{ bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              mr: 4,
              fontWeight: 700,
              color: 'primary.main',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <MonetizationOnIcon sx={{ mr: 1 }} />
            Budgeting
          </Typography>
          
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
            {pages.map((page) => (
              <Button
                key={page.path}
                component={Link}
                to={page.path}
                sx={{
                  mx: 1,
                  color: location.pathname === page.path ? 'primary.main' : 'text.primary',
                  backgroundColor: location.pathname === page.path ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
                  '&:hover': {
                    backgroundColor: location.pathname === page.path ? 'rgba(25, 118, 210, 0.12)' : 'rgba(25, 118, 210, 0.04)',
                  },
                  fontWeight: location.pathname === page.path ? 600 : 400,
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  transition: 'all 0.2s ease-in-out',
                }}
                startIcon={isMobile ? null : page.icon}
              >
                {isMobile ? page.icon : page.title}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;