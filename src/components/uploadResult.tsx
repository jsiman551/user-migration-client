import { Button } from '@headlessui/react';
import React from 'react';

interface UploadResultProps {
    successCount: number;
    onClose: () => void;
}

const UploadResult: React.FC<UploadResultProps> = ({ successCount, onClose }) => {
    return (
        <div className="p-4 text-green-800 rounded flex items-center justify-between bg-white dark:bg-gray-800 dark:text-green-400">
            <span>{successCount} records uploaded successfully</span>
            <Button onClick={onClose} className="text-green-800 font-bold dark:text-green-400">
                X
            </Button>
        </div>
    );
};

export default UploadResult;
