import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, Input } from '@headlessui/react';
import { loginCall } from '../api';
import { useNavigate } from 'react-router-dom';

interface LoginFormInputs {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormInputs>();
    const [error, setError] = useState<string | null>(null);

    const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
        setError(null);

        //fetch login
        const response = await loginCall(data, setError);

        if (response) {
            navigate('/dashboard');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">CSV User Migration</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {error && <p className="text-red-500 dark:text-red-400">{error}</p>}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                        <Input
                            id="email"
                            type="email"
                            {...register('email', { required: 'Email is required' })}
                            className={`w-full p-2 mt-1 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'} dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100`}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                        <Input
                            id="password"
                            type="password"
                            {...register('password', { required: 'Password is required' })}
                            className={`w-full p-2 mt-1 border rounded ${errors.password ? 'border-red-500' : 'border-gray-300'} dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100`}
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>
                    <Button
                        type="submit"
                        className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Initializing...' : 'Login'}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Login;
