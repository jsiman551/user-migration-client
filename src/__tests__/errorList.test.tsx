import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import ErrorList from '../components/errorList';
import { AuthProvider } from '../contexts/authContext';

describe('ErrorList Component', () => {
    const mockErrors = [
        {
            row: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
            age: '30',
            title: 'Missing data',
            source: { pointer: '/data/name' },
        },
        {
            row: 2,
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            age: '25',
            title: 'Invalid format',
            source: { pointer: '/data/email' },
        },
    ];

    it('renders the component correctly', () => {
        render(
            <Router>
                <AuthProvider>
                    <ErrorList errors={mockErrors} />
                </AuthProvider>
            </Router>
        );
        expect(screen.getByText('The following records encountered errors:')).toBeInTheDocument();
    });

    describe('ErrorList', () => {
        it('renders the correct number of errors', () => {
            render(
                <Router>
                    <AuthProvider>
                        <ErrorList errors={mockErrors} />
                    </AuthProvider>
                </Router>
            );

            const errorRows = screen.getAllByTestId(/^error-row-/);
            expect(errorRows).toHaveLength(mockErrors.length);
        });
    });
});
