import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FilterSection from "@/components/FilterSection";

const mockTransactions = [
    { id: 'TRX1', amount: '100.00', status: 'Completed', date: '2023-01-01' },
    { id: 'TRX2', amount: '200.00', status: 'Pending', date: '2023-01-02' },
    { id: 'TRX3', amount: '300.00', status: 'Failed', date: '2023-01-03' }
];

describe('FilterSection', () => {
    const mockOnFilter = jest.fn();

    beforeEach(() => {
        render(<FilterSection transactions={mockTransactions} onFilter={mockOnFilter} />);
        mockOnFilter.mockClear();
    });

    it('renders all filter controls', () => {
        expect(screen.getByPlaceholderText('Search by ID or Amount')).toBeInTheDocument();
        expect(screen.getByLabelText('Status')).toBeInTheDocument();
        expect(screen.getByLabelText('From Date')).toBeInTheDocument();
        expect(screen.getByLabelText('To Date')).toBeInTheDocument();
    });

    it('filters by search term', async () => {
        const searchInput = screen.getByPlaceholderText('Search by ID or Amount');
        fireEvent.change(searchInput, { target: { value: 'TRX1' } });
        await new Promise(resolve => setTimeout(resolve, 350));

        expect(mockOnFilter).toHaveBeenCalledWith([mockTransactions[0]]);
    });

    it('filters by status', () => {
        const statusSelect = screen.getByLabelText('Status');
        fireEvent.mouseDown(statusSelect);
        const pendingOption = screen.getByText('Pending');
        fireEvent.click(pendingOption);

        expect(mockOnFilter).toHaveBeenCalledWith([mockTransactions[1]]);
    });

    it('filters by date range', () => {
        const fromDateInput = screen.getByLabelText('From Date');
        fireEvent.change(fromDateInput, { target: { value: '2023-01-02' } });

        expect(mockOnFilter).toHaveBeenCalledWith([mockTransactions[1], mockTransactions[2]]);
    });


});