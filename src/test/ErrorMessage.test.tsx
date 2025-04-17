import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorMessage from "@/components/ErrorMessage";

describe('ErrorMessage', () => {
    const mockRetry = jest.fn();

    it('displays error message', () => {
        render(<ErrorMessage message="Test error" />);
        expect(screen.getByText('Test error')).toBeInTheDocument();
    });

    it('shows retry button when retryFn provided', () => {
        render(<ErrorMessage message="Test error" retryFn={mockRetry} />);
        const retryButton = screen.getByText('Retry');
        fireEvent.click(retryButton);
        expect(mockRetry).toHaveBeenCalled();
    });

    it('closes when close button clicked', () => {
        render(<ErrorMessage message="Test error" />);
        const closeButton = screen.getByRole('button', { name: /close/i });
        fireEvent.click(closeButton);
        expect(screen.queryByText('Test error')).not.toBeInTheDocument();
    });
});