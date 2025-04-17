import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import {
    Box,
    Typography,
    Container,
    Paper,
    TextField,
    Button,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Alert,
    Avatar,
    CssBaseline
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    Payment as PaymentIcon
} from '@mui/icons-material';
import Link from 'next/link';

interface ErrType {
    amount?: string;
    date?: string;
    api?: string;
}

const NewTransactionForm = () => {
    const [amount, setAmount] = useState<string>('');
    const [status, setStatus] = useState('Completed');
    const [date, setDate] = useState('');
    const [errors, setErrors] = useState<ErrType | null>(null);
    const router = useRouter();

    const validate = (): ErrType => {
        const errs: ErrType = {};
        const amountNum = parseFloat(amount);
        if (!amount || isNaN(amountNum) || amountNum <= 0) {
            errs.amount = 'Amount must be a positive number.';
        }
        const selectedDate = new Date(date);
        const now = new Date();
        if (!date || selectedDate > now) {
            errs.date = 'Date must not be in the future.';
        }
        return errs;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
        }

        const newTransaction = {
            id: `TRX${Date.now()}`,
            amount: parseFloat(amount),
            status,
            date,
        };

        try {
            await axios.post('https://680019beb72e9cfaf726c8c5.mockapi.io/transactions', newTransaction);
            router.push('/');
        } catch (error) {
            setErrors({ ...errors, api: 'Failed to create transaction.' });
        }
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <CssBaseline />
            <Container maxWidth="sm" sx={{ mt: 8, mb: 4 }}>
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                            <PaymentIcon />
                        </Avatar>
                        <Typography variant="h4" component="h1">
                            New Transaction
                        </Typography>
                    </Box>

                    <Button
                        startIcon={<ArrowBackIcon />}
                        component={Link}
                        href="/"
                        sx={{ mb: 3 }}
                    >
                        Back to Transactions
                    </Button>

                    {errors?.api && (
                        <Alert severity="error" sx={{ mb: 3 }}>
                            {errors.api}
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid  size={12}>
                                <TextField
                                    fullWidth
                                    label="Amount"
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    error={!!errors?.amount}
                                    helperText={errors?.amount}
                                />
                            </Grid>
                            <Grid  size={{xs:12, md:12}}>
                                <FormControl fullWidth>
                                    <InputLabel>Status</InputLabel>
                                    <Select
                                        value={status}
                                        label="Status"
                                        onChange={(e) => setStatus(e.target.value)}
                                        variant={'outlined'}
                                    >
                                        <MenuItem value="Completed">Completed</MenuItem>
                                        <MenuItem value="Pending">Pending</MenuItem>
                                        <MenuItem value="Failed">Failed</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid size={12}>
                                <TextField
                                    fullWidth
                                    label="Date"
                                    type="date"
                                    InputLabelProps={{ shrink: true }}
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    error={!!errors?.date}
                                    helperText={errors?.date}
                                />
                            </Grid>
                            <Grid  size={12}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    type="submit"
                                >
                                    Create Transaction
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        </Box>
    );
};

export default NewTransactionForm;