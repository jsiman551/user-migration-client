import axios, { AxiosError } from "axios";
import { BASE_API_URL } from "../consts";
import { LoginFormInputs, UploadResponse } from "../types";

//login call function
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
export const uploadCSVFile = async (file: File, token: string | null): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(`${BASE_API_URL}/upload`, formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
};

export const retryUploadCSVFile = async (
    data: { name: string; email: string; age: string },
    token: string | null
) => {
    const { name, email, age } = data;

    if (!token) {
        throw new Error('No token provided');
    }

    try {
        const response = await axios.post(
            `${BASE_API_URL}/upload/retry`,
            {
                name,
                email,
                age: Number(age)
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        return response.data;
    } catch (err) {
        if (err instanceof AxiosError) {
            console.error((err.response?.data?.errors?.[0]?.detail || err.response?.data?.errors?.[0]) || err.response?.data.title)
        } else {
            console.error('An unexpected error occurred');
        }
    }
};
