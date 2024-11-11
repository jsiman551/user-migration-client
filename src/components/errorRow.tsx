import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Input } from '@headlessui/react';
import { useAuth } from '../contexts/authContext';
import { retryUploadCSVFile } from '../api';
import { ErrorRowProps } from '../types';

const ErrorRow: React.FC<ErrorRowProps> = ({
    rowNumber,
    name,
    email,
    age,
    errorMessages,
    errorPointer,
}) => {
    const { token } = useAuth();
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const { handleSubmit, control } = useForm({
        defaultValues: { name, email, age }
    });

    const handleRetry = async (data: { name: string; email: string; age: string }) => {
        if (token) {
            const response = await retryUploadCSVFile(data, token);

            if (response.ok) {
                setIsSuccess(true);
            }
            return false;
        }
    };

    const onSubmit = (data: { name: string; email: string; age: string }) => {
        handleRetry(data);  // Llamamos a la función de reintento con los datos del formulario
    };

    return (
        !isSuccess ? <form
            className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mb-5"
            onSubmit={handleSubmit(onSubmit)}
            data-testid={`error-row-${rowNumber}`}
        >
            <span className="font-semibold sm:w-1/12 text-center sm:text-left">Row {rowNumber}</span>

            <div className="flex flex-col sm:w-1/4 mb-2">
                <Controller
                    name="name"
                    control={control}
                    rules={{ required: "Name is required." }}
                    render={({ field }) => (
                        <Input
                            {...field}
                            className={`text-black border ${errorPointer === 'name' ? 'border-red-500' : ''}`}
                            data-testid="Name"
                        />
                    )}
                />
                {errorPointer === 'name' && <p className="text-red-500 text-xs mt-1">{errorMessages}</p>}
            </div>

            <div className="flex flex-col sm:w-1/4">
                <Controller
                    name="email"
                    control={control}
                    rules={{
                        required: "Email is required.",
                        pattern: {
                            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                            message: "Invalid email format"
                        }
                    }}
                    render={({ field }) => (
                        <Input
                            {...field}
                            className={`text-black border ${errorPointer === 'email' ? 'border-red-500' : ''}`}
                            data-testid="Email"
                        />
                    )}
                />
                {errorPointer === 'email' && <p className="text-red-500 text-xs mt-1">{errorMessages}</p>}
            </div>

            <div className="flex flex-col sm:w-1/4">
                <Controller
                    name="age"
                    control={control}
                    rules={{
                        required: "Age is required.",
                        pattern: {
                            value: /^[0-9]+$/,
                            message: "Age must be a positive number"
                        }
                    }}
                    render={({ field }) => (
                        <Input
                            {...field}
                            type="number"
                            className={`text-black border ${errorPointer === 'age' ? 'border-red-500' : ''}`}
                            data-testid="Age"
                        />
                    )}
                />
                {errorPointer === 'age' && <p className="text-red-500 text-xs mt-1">{errorMessages}</p>}
            </div>

            <div className="sm:w-1/12 flex sm:block justify-center mt-4 sm:mt-0">
                <Button type="submit" className="bg-blue-500 text-white px-4 rounded">Retry</Button>
            </div>
        </form> : <p className="text-green-500 text-md mb-4 text-center">{`Row: ${rowNumber} has been registered.`}</p>
    );
};

export default ErrorRow;
