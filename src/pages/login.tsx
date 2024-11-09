import React, { useState } from 'react';
import { Button, Input } from '@headlessui/react';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        console.log(e);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">CSV User Migration</h2>
                <form className="space-y-4" onSubmit={handleLogin}>
                    {error && <p className="text-red-500 dark:text-red-400">{error}</p>}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                        <Input
                            id="email"
                            type="email"
                            className="w-full p-2 mt-1 border rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                        <Input
                            id="password"
                            type="password"
                            className="w-full p-2 mt-1 border rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                    >
                        Login
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Login;
