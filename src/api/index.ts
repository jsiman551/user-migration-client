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