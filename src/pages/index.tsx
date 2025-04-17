import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import {
    Box,
    Typography,
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Grid,
    CssBaseline,
    AppBar,
    Toolbar,
    IconButton,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Avatar,
    Divider,
    useTheme,
    useMediaQuery, Pagination, TablePagination
} from '@mui/material';
import {
    Menu as MenuIcon,
    Add as AddIcon,
    Dashboard as DashboardIcon,
    Payment as PaymentIcon,
    Settings as SettingsIcon,
    AccountCircle as AccountCircleIcon,
    Logout as LogoutIcon
} from '@mui/icons-material';
import Loader from "@/components/Loader";
import ErrorMessage from "@/components/ErrorMessage";
import FilterSection from "@/components/FilterSection";
import TransactionCard from "@/components/TransactionCard";
import {ProtectedRoute} from "@/components/ProtectedRoute";
import {useAuth} from "@/context/AuthContext";

interface TransactionType {
    id: string;
    amount: string | number;
    date: string;
    status: string;
}

const drawerWidth = 240;

const TransactionList = () => {
    const [transactions, setTransactions] = useState<TransactionType[]>([]);
    const [filteredTransactions, setFilteredTransactions] = useState<TransactionType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const { logout } = useAuth();
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        axios.get('https://680019beb72e9cfaf726c8c5.mockapi.io/transactions')
            .then(response => {
                setTransactions(response?.data);
                setFilteredTransactions(response?.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Failed to fetch transactions');
                setLoading(false);
            });
    }, []);

    const handleFilterChange = (filteredData: TransactionType[]) => {
        setFilteredTransactions(filteredData);
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const paginatedTransactions = filteredTransactions.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    if (loading) return <Loader />;
    if (error) return <ErrorMessage message={error} />;

    const drawer = (
        <div>
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                    <AccountCircleIcon />
                </Avatar>
                <Typography variant="h6">Admin</Typography>
            </Box>
            <Divider />
            <List>
                <ListItemButton
                    selected
                    component={Link}
                    href="/"
                >
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Settings" />
                </ListItemButton>
            </List>
            <Divider />
            <List>
                <ListItemButton
                    onClick={()=>{
                        logout()
                    }}
                >
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItemButton>
            </List>
        </div>
    );


    return (
       <ProtectedRoute>
           <Box sx={{ display: 'flex' }}>
               <CssBaseline />
               <AppBar
                   position="fixed"
                   sx={{
                       width: { sm: `calc(100% - ${drawerWidth}px)` },
                       ml: { sm: `${drawerWidth}px` },
                   }}
               >
                   <Toolbar>
                       <IconButton
                           color="inherit"
                           aria-label="open drawer"
                           edge="start"
                           onClick={handleDrawerToggle}
                           sx={{ mr: 2, display: { sm: 'none' } }}
                       >
                           <MenuIcon />
                       </IconButton>
                       <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                           Transaction Dashboard
                       </Typography>
                       <Button
                           variant="contained"
                           color="secondary"
                           startIcon={<AddIcon />}
                           component={Link}
                           href="/new-transaction"
                       >
                           New Transaction
                       </Button>
                   </Toolbar>
               </AppBar>
               <Box
                   component="nav"
                   sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
               >
                   <Drawer
                       variant="temporary"
                       open={mobileOpen}
                       onClose={handleDrawerToggle}
                       ModalProps={{
                           keepMounted: true,
                       }}
                       sx={{
                           display: { xs: 'block', sm: 'none' },
                           '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                       }}
                   >
                       {drawer}
                   </Drawer>
                   <Drawer
                       variant="permanent"
                       sx={{
                           display: { xs: 'none', sm: 'block' },
                           '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                       }}
                       open
                   >
                       {drawer}
                   </Drawer>
               </Box>
               <Box
                   component="main"
                   sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
               >
                   <Toolbar />
                   <Container maxWidth="lg">
                       <Grid container spacing={3}>
                           <Grid size={12}>
                               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                   <Typography variant="h4" component="h1" gutterBottom>
                                       Transactions
                                   </Typography>
                                   {isMobile && (
                                       <Button
                                           variant="contained"
                                           color="primary"
                                           startIcon={<AddIcon />}
                                           component={Link}
                                           href="/new-transaction"
                                           size="small"
                                       >
                                           New
                                       </Button>
                                   )}
                               </Box>
                               <Paper elevation={4} sx={{ p: 3, mb: 3 }}>
                                   <FilterSection transactions={transactions} onFilter={handleFilterChange} />
                               </Paper>
                           </Grid>
                           <Grid size={12}>
                               <Paper elevation={3}>
                                   <TableContainer>
                                       <Table>
                                           <TableHead>
                                               <TableRow sx={{ backgroundColor: theme.palette.primary.main }}>
                                                   <TableCell sx={{ color: 'common.white' }}>Transaction ID</TableCell>
                                                   <TableCell sx={{ color: 'common.white' }}>Amount</TableCell>
                                                   <TableCell sx={{ color: 'common.white' }}>Status</TableCell>
                                                   <TableCell sx={{ color: 'common.white' }}>Date</TableCell>
                                               </TableRow>
                                           </TableHead>
                                           <TableBody>
                                               {paginatedTransactions?.sort((a, b) => (+(new Date(b.date).toLocaleDateString())) - (+(new Date(a.date).toLocaleDateString())))?.map((tx) => (
                                                   <TransactionCard key={tx.id} transaction={tx} />
                                               ))}
                                           </TableBody>
                                       </Table>
                                   </TableContainer>
                               </Paper>
                           </Grid>
                       </Grid>
                       <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                           <TablePagination
                               rowsPerPageOptions={[5, 10, 25]}
                               component="div"
                               count={filteredTransactions.length}
                               rowsPerPage={rowsPerPage}
                               page={page}
                               onPageChange={handleChangePage}
                               onRowsPerPageChange={handleChangeRowsPerPage}
                           />

                       </Box>
                   </Container>
               </Box>
           </Box>
       </ProtectedRoute>
    );
};

export default TransactionList;