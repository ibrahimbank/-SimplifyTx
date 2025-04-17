import React from 'react';
import { TableRow, TableCell, Chip } from '@mui/material';
import { green, orange, red } from '@mui/material/colors';

interface Transaction {
    id: string;
    amount: string | number;
    date: string;
    status: string;
}

interface TransactionCardProps {
    transaction: Transaction;
}

const statusColors: Record<string, { color: string; bgColor: string }> = {
    Completed: { color: green[500], bgColor: green[50] },
    Pending: { color: orange[500], bgColor: orange[50] },
    Failed: { color: red[500], bgColor: red[50] },
};

const TransactionCard: React.FC<TransactionCardProps> = ({ transaction }) => {
    const statusStyle = statusColors[transaction.status] || { color: '', bgColor: '' };

    return (
        <TableRow hover>
            <TableCell>{transaction.id}</TableCell>
            <TableCell>${(+transaction.amount).toFixed(2)}</TableCell>
            <TableCell>
                <Chip
                    label={transaction.status}
                    style={{
                        color: statusStyle.color,
                        backgroundColor: statusStyle.bgColor,
                        fontWeight: 'bold',
                    }}
                />
            </TableCell>
            <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
        </TableRow>
    );
};

export default TransactionCard;