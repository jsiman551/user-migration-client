import React, { useState } from 'react';
import { useAuth } from '../contexts/authContext';
import { uploadCSVFile } from '../api';
import { AxiosError } from 'axios';

const UploadCSV: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const { token } = useAuth();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) {
            setMessage("Please select a file first.");
            return;
        }

        try {
            setLoading(true);
            setMessage(null);

            const response = await uploadCSVFile(file, token);

            if (response.ok) {
                setMessage('Users uploaded successfully.');
            } else {
                setMessage('There was an issue with the upload.');
            }
        } catch (err) {
            if (err instanceof AxiosError) {
                setMessage(err.response?.data?.errors?.[0]?.detail || err.response?.data.title);
            } else {
                setMessage('An error occurred while uploading the file.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-700 dark:text-gray-200">
                    Sistema de Carga de Datos
                </h2>
                <form className="space-y-4" onSubmit={handleUpload}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Selecciona un archivo de carga
                        </label>
                        <input
                            type="file"
                            accept=".csv"
                            onChange={handleFileChange}
                            className="mt-1 block w-full text-gray-700 dark:text-gray-300"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? 'Uploading...' : 'Upload File'}
                    </button>
                    {message && (
                        <p className="text-center text-sm text-gray-600 dark:text-gray-300 mt-2">{message}</p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default UploadCSV;
