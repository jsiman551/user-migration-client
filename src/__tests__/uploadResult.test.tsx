import { render, screen, fireEvent } from '@testing-library/react';
import UploadResult from '../components/uploadResult';
import { vi } from 'vitest';

describe('UploadResult Component', () => {
    const mockOnClose = vi.fn();

    beforeEach(() => {
        mockOnClose.mockClear();
    });

    it('should display the success message with the correct count', () => {
        const successCount = 5;

        render(<UploadResult successCount={successCount} onClose={mockOnClose} />);

        expect(screen.getByText(`${successCount} records uploaded successfully`)).toBeInTheDocument();
    });

    it('should call onClose when the close button is clicked', () => {
        render(<UploadResult successCount={5} onClose={mockOnClose} />);

        fireEvent.click(screen.getByText('X'));

        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
});
