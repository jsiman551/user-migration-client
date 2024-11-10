import React from 'react';
import ErrorRow from './errorRow';

interface ErrorListProps {
    errors: Array<{
        row: number;
        name: string;
        email: string;
        age: string;
        title: string;
        source: { pointer: string };
    }>;
}

const ErrorList: React.FC<ErrorListProps> = ({ errors }) => {
    return (
        <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-4">The following records encountered errors:</h3>
            {errors.map((error) => {
                return (error.source ? <ErrorRow
                    key={error.row}
                    rowNumber={error.row}
                    name={error.name}
                    email={error.email}
                    age={error.age}
                    errorMessages={error.title}
                    errorPointer={error.source.pointer}
                /> : null)
            })}
        </div>
    );
};

export default ErrorList;
