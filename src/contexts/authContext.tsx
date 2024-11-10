import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

interface AuthContextProps {
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

interface JWTPayload {
    exp: number;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const navigate = useNavigate();

    const isTokenValid = (token: string) => {
        try {
            const decodedToken = jwtDecode<JWTPayload>(token);
            const currentTime = Math.floor(Date.now() / 1000);
            return decodedToken.exp > currentTime;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && isTokenValid(token)) {
            setIsAuthenticated(true);
        } else {
            logout();
        }
    }, []);

    const login = (token: string) => {
        if (isTokenValid(token)) {
            localStorage.setItem('token', token);
            setIsAuthenticated(true);
            navigate('/dashboard');
        } else {
            logout();
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be inside an AuthProvider');
    }
    return context;
};
