import React from 'react';
import { render, screen } from '@testing-library/react';
import Loader from './Loader';
import '@testing-library/jest-dom';

describe('Loader', () => {
    it('renders loading spinner and text', () => {
        render(<Loader />);

        expect(screen.getByRole('progressbar')).toBeInTheDocument();
        expect(screen.getByText('Loading transactions...')).toBeInTheDocument();
    });

    it('has proper styling', () => {
        render(<Loader />);
        const loaderContainer = screen.getByTestId('loader-container');

        expect(loaderContainer).toHaveStyle({
            display: 'flex',
            height: '100vh',
            justifyContent: 'center'
        });
    });
});