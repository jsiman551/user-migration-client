import { render, screen } from '@testing-library/react';
import ErrorRow from '../components/errorRow';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../contexts/authContext';

const mockProps = {
    rowNumber: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    age: "30",
    errorMessages: 'Missing data',
    errorPointer: 'name',
};

describe('ErrorRow Component', () => {
    describe('when displaying error details', () => {
        it('should display the row number', () => {
            render(
                <Router>
                    <AuthProvider>
                        <ErrorRow {...mockProps} />
                    </AuthProvider>
                </Router>
            );

            expect(screen.getByText('Row 1')).toBeInTheDocument();
        });

        it('should display the name, email, and age values correctly', () => {
            render(
                <Router>
                    <AuthProvider>
                        <ErrorRow {...mockProps} />
                    </AuthProvider>
                </Router>
            );

            expect(screen.getByTestId('Name')).toHaveValue(mockProps.name);
            expect(screen.getByTestId('Email')).toHaveValue(mockProps.email);
            expect(screen.getByTestId('Age')).toHaveValue(Number(mockProps.age));
        });
    });

    describe('when error pointer matches field', () => {
        it('should display the corresponding error message', () => {
            render(
                <Router>
                    <AuthProvider>
                        <ErrorRow {...mockProps} />
                    </AuthProvider>
                </Router>
            );

            expect(screen.getByText(mockProps.errorMessages)).toBeInTheDocument();
        });
    });
});
