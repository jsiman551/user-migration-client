import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Input } from '@headlessui/react';

interface ErrorRowProps {
    rowNumber: number;
    name: string;
    email: string;
    age: string;
    errorMessages: string;
    errorPointer: string;
}

const ErrorRow: React.FC<ErrorRowProps> = ({ rowNumber, name, email, age, errorMessages, errorPointer }) => {
    const { handleSubmit, control } = useForm({
        defaultValues: { name, email, age }
    });

    const onSubmit = (data: { name: string; email: string; age: string }) => {
        console.log(data);
    };

    return (
        <form className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mb-5" onSubmit={handleSubmit(onSubmit)}>
            <span className="font-semibold sm:w-1/12 text-center sm:text-left">Row {rowNumber}</span>

            <div className="flex flex-col sm:w-1/4 mb-2">
                <Controller
                    name="name"
                    control={control}
                    rules={{ required: "name is required." }}
                    render={({ field }) => (
                        <Input
                            {...field}
                            className={`text-black border ${errorPointer === 'name' ? 'border-red-500' : ''}`}
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
                            message: "El formato del campo 'email' es inválido"
                        }
                    }}
                    render={({ field }) => (
                        <Input
                            {...field}
                            className={`text-black border ${errorPointer === 'email' ? 'border-red-500' : ''}`}
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
                        required: "age is required.",
                        pattern: {
                            value: /^[0-9]+$/,
                            message: "age must be a positive number"
                        }
                    }}
                    render={({ field }) => (
                        <Input
                            {...field}
                            className={`text-black border ${errorPointer === 'age' ? 'border-red-500' : ''}`}
                        />
                    )}
                />
                {errorPointer === 'age' && <p className="text-red-500 text-xs mt-1">{errorMessages}</p>}
            </div>

            <div className="sm:w-1/12 flex sm:block justify-center mt-4 sm:mt-0">
                <Button type="submit" className="bg-blue-500 text-white px-4 rounded">Retry</Button>
            </div>
        </form>
    );
};

export default ErrorRow;
