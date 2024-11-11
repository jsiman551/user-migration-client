import React from 'react';
import ErrorRow from './errorRow';
import { ErrorListComponentProps } from '../types';

const ErrorList: React.FC<ErrorListComponentProps> = ({ errors }) => {
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
