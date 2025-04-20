import { AppBar, Toolbar, Typography, Container, Box, Button } from "@mui/material";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";

const Navbar = () => {

    return (
        <>
            <AppBar color="inherit">
                <Toolbar>
                    <Container maxWidth="lg">
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <SavingsOutlinedIcon sx={{ mr: 2 }} />
                                <Typography variant="h6">Budgeting</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Button color="inherit">Dashboard</Button> {/* Placeholder button */}
                                <Button color="inherit">Savings</Button>   {/* Another placeholder button */}
                            </Box>
                        </Box>
                    </Container>
                </Toolbar>
            </AppBar>
        </>
    );
}

export default Navbar;