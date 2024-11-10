import axios, { AxiosError } from "axios";
import { BASE_API_URL } from "../consts";

//login call function
interface LoginFormInputs {
    email: string;
    password: string;
}

export const loginCall = async (data: LoginFormInputs, setError: (arg0: string) => void) => {

    const { email, password } = data;

    try {
        const response = await axios.post(`${BASE_API_URL}/login`, { email, password });

        if (response.data.ok) {
            const token = response.data.data.token;
            localStorage.setItem('token', token);
            return true;
        }

    } catch (err) {
        if (err instanceof AxiosError) {
            setError(err.response?.data?.errors?.[0]?.detail || err.response?.data.title)
        } else {
            setError('An unexpected error occurred');
        }
    }
}

//CSV upload function
export interface UploadResponse {
    ok: boolean;
    message: string;
    data: {
        success: Array<{ row: number; id: number; name: string; email: string; age: number }>;
        errors: Array<unknown>;
    };
}

export const uploadCSVFile = async (file: File, token: string | null): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post('/upload', formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
};
