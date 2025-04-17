import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import NewTransactionForm from "@/pages/new-transaction";

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('NewTransactionForm', () => {
    beforeEach(() => {
        mockedAxios.post.mockResolvedValue({ data: {} });
    });

    it('validates form fields', async () => {
        render(<NewTransactionForm />);

        fireEvent.click(screen.getByText('Create Transaction'));

        expect(await screen.findByText('Amount must be a positive number.')).toBeInTheDocument();
        expect(screen.getByText('Date must not be in the future.')).toBeInTheDocument();
    });

    it('submits valid form', async () => {
        render(<NewTransactionForm />);

        fireEvent.change(screen.getByLabelText('Amount'), { target: { value: '100' } });
        fireEvent.change(screen.getByLabelText('Date'), { target: { value: '2023-01-01' } });
        fireEvent.click(screen.getByText('Create Transaction'));

        await waitFor(() => {
            expect(mockedAxios.post).toHaveBeenCalled();
        });
    });
});