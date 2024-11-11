import React, { useState } from 'react';
import UploadCSV from '../components/uploadCSV';
import UploadResult from '../components/uploadResult';
import ErrorList from '../components/errorList';
import { ErrorListProps } from '../types';

const Dashboard: React.FC = () => {
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [successCount, setSuccessCount] = useState(0);
    const [errors, setErrors] = useState<ErrorListProps[]>([]);

    const handleUploadSuccess = (count: number, errors: ErrorListProps[]) => {
        setSuccessCount(count);
        setErrors(errors);
        setUploadSuccess(true);
    };

    return (
        <div className="p-8 space-y-6 bg-white text-black dark:bg-gray-900 dark:text-white">
            <h1 className="text-3xl font-bold">Upload Data App</h1>

            {uploadSuccess && (
                <UploadResult successCount={successCount} onClose={() => setUploadSuccess(false)} />
            )}

            <UploadCSV onUploadSuccess={handleUploadSuccess} />

            {errors.length > 0 && (
                <ErrorList errors={errors} />
            )}
        </div>
    );
};

export default Dashboard;
