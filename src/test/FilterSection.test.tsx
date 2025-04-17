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



    it('filters by search term', async () => {
        const searchInput = screen.getByPlaceholderText('Search by ID or Amount');
        fireEvent.change(searchInput, { target: { value: 'TRX1' } });
        await new Promise(resolve => setTimeout(resolve, 350));

        expect(mockOnFilter).toHaveBeenCalledWith([mockTransactions[0]]);
    });




});