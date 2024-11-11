import { ReactNode } from "react";

export type ErrorListProps = {
    row: number;
    name: string;
    email: string;
    age: string;
    title: string;
    source: {
        pointer: string;
    };
}

export type ErrorListComponentProps = {
    errors: ErrorListProps[];
}

export type LoginFormInputs = {
    email: string;
    password: string;
}

export type UploadResponse = {
    ok: boolean;
    message: string;
    data: {
        success: Array<{ row: number; id: number; name: string; email: string; age: number }>;
        errors: Array<unknown>;
    };
}

export type ErrorRowProps = {
    rowNumber: number;
    name: string;
    email: string;
    age: string;
    errorMessages: string;
    errorPointer: string;
}

export type UploadCSVProps = {
    onUploadSuccess: (successCount: number, errors: ErrorListProps[]) => void;
}

export type UploadResultProps = {
    successCount: number;
    onClose: () => void;
}

export type AuthContextProps = {
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
    token: string | null;
}

export type AuthProviderProps = {
    children: ReactNode;
}

export type JWTPayload = {
    exp: number;
}
