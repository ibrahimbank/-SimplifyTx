import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Loader from "@/components/Loader";

describe('Loader', () => {
    it('renders loading spinner and text', () => {
        render(<Loader />);

        expect(screen.getByRole('progressbar')).toBeInTheDocument();
        expect(screen.getByText('Loading transactions...')).toBeInTheDocument();
    });

});