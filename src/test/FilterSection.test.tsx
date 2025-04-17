import React from 'react';
import { render} from '@testing-library/react';
import  '@testing-library/jest-dom';
import {screen, fireEvent} from '@testing-library/dom'
import FilterSection from "@/components/FilterSection";

const mockTransactions = [
    { id: 'TRX1', amount: '100.00', status: 'Completed', date: '2023-01-01' },
    { id: 'TRX2', amount: '200.00', status: 'Pending', date: '2023-01-02' }
];

describe('FilterSection', () => {
    const mockOnFilter = jest.fn();

    beforeEach(() => {
        render(<FilterSection transactions={mockTransactions} onFilter={mockOnFilter} />);
    });

    it('renders all filter controls', () => {
        expect(screen.getByPlaceholderText('Search by ID or Amount')).toBeInTheDocument();
        expect(screen.getByLabelText('Status')).toBeInTheDocument();
        expect(screen.getByLabelText('From Date')).toBeInTheDocument();
        expect(screen.getByLabelText('To Date')).toBeInTheDocument();
    });

    it('filters by search term', () => {
        const searchInput = screen.getByPlaceholderText('Search by ID or Amount');
        fireEvent.change(searchInput, { target: { value: 'TRX1' } });
        expect(mockOnFilter).toHaveBeenCalledWith([mockTransactions[0]]);
    });

    it('filters by status', () => {
        const statusSelect = screen.getByLabelText('Status');
        fireEvent.change(statusSelect, { target: { value: 'Pending' } });
        expect(mockOnFilter).toHaveBeenCalledWith([mockTransactions[1]]);
    });
});