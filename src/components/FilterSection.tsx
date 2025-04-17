import React, { useState } from 'react';
import debounce from 'lodash.debounce';
import {
    Box,
    TextField,
    InputAdornment,
    MenuItem,
    Grid,
    FormControl,
    InputLabel,
    Select,
    Typography,
    SelectChangeEvent
} from '@mui/material';
import {
    Search as SearchIcon,
    FilterList as FilterListIcon,
    DateRange as DateRangeIcon
} from '@mui/icons-material';

interface Transaction {
    id: string;
    amount: string | number;
    date: string;
    status: string;
}

interface FilterSectionProps {
    transactions: Transaction[];
    onFilter: (filteredData: Transaction[]) => void;
}

interface DateRange {
    from: string;
    to: string;
}

const FilterSection: React.FC<FilterSectionProps> = ({ transactions, onFilter }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [dateRange, setDateRange] = useState<DateRange>({ from: '', to: '' });

    const applyFilters = (term: string, status: string, range: DateRange) => {
        const filtered = transactions.filter((tx) => {
            const matchesTerm = term ?
                (tx.id.includes(term) || tx.amount.toString().includes(term)) :
                true;
            const matchesStatus = status ? tx.status === status : true;
            const txDate = new Date(tx.date);
            const fromDate = range.from ? new Date(range.from) : null;
            const toDate = range.to ? new Date(range.to) : null;
            const matchesDate =
                (!fromDate || txDate >= fromDate) &&
                (!toDate || txDate <= toDate);
            return matchesTerm && matchesStatus && matchesDate;
        });
        onFilter(filtered);
    };

    const debouncedFilter = debounce(applyFilters, 300);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        setSearchTerm(term);
        debouncedFilter(term, statusFilter, dateRange);
    };

    const handleStatusChange = (e: SelectChangeEvent<string>) => {
        const status = e.target.value;
        setStatusFilter(status);
        applyFilters(searchTerm, status, dateRange);
    };

    const handleDateChange = (field: keyof DateRange, value: string) => {
        const newRange = { ...dateRange, [field]: value };
        setDateRange(newRange);
        applyFilters(searchTerm, statusFilter, newRange);
    };

    return (
        <Box>
            <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <FilterListIcon sx={{ mr: 1 }} /> Filters
            </Typography>
            <Grid container spacing={2}>
                <Grid size={{xs:12,  md: 3}}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Search by ID or Amount"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid size={{xs:12, sm:6, md: 3}}>
                    <FormControl fullWidth>
                        <InputLabel>Status</InputLabel>
                        <Select
                            value={statusFilter}
                            onChange={handleStatusChange}
                            label="Status"
                         variant={'outlined'}>
                            <MenuItem value="">All Statuses</MenuItem>
                            <MenuItem value="Completed">Completed</MenuItem>
                            <MenuItem value="Pending">Pending</MenuItem>
                            <MenuItem value="Failed">Failed</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid size={{xs:12, sm:6, md: 3}}>
                    <TextField
                        fullWidth
                        type="date"
                        label="From Date"
                        InputLabelProps={{ shrink: true }}
                        value={dateRange.from}
                        onChange={(e) => handleDateChange('from', e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <DateRangeIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid size={{xs:12, sm:6, md: 3}}>
                    <TextField
                        fullWidth
                        type="date"
                        label="To Date"
                        InputLabelProps={{ shrink: true }}
                        value={dateRange.to}
                        onChange={(e) => handleDateChange('to', e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <DateRangeIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default FilterSection;