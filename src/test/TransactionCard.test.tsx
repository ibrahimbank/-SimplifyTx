import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TransactionCard from "@/components/TransactionCard";

describe('TransactionCard', () => {
    const mockTransaction = {
        id: 'TRX123',
        amount: '100.00',
        status: 'Completed',
        date: '2023-01-01'
    };

    it('renders transaction details correctly', () => {
        render(<TransactionCard transaction={mockTransaction} />);

        expect(screen.getByText('TRX123')).toBeInTheDocument();
        expect(screen.getByText('$100.00')).toBeInTheDocument();
        expect(screen.getByText('Completed')).toBeInTheDocument();
        expect(screen.getByText('1/1/2023')).toBeInTheDocument();
    });

    it('displays correct status color', () => {
        render(<TransactionCard transaction={mockTransaction} />);
        const statusChip = screen.getByText('Completed');
        expect(statusChip).toHaveStyle('color: #4caf50');
    });
});