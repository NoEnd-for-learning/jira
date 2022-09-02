import { ReactNode } from 'react';

export interface User {
    id: number,
    name: string,
    title: string,
    email: string,
    organization: string,
    passwordHash: string,
    token: string,
}

export interface AuthForm {
    username: string,
    password: string,
}

export type AuthCtxProps = {
    user: User | null,
    register: (form: AuthForm) => Promise<void>,
    login: (form: AuthForm) => Promise<void>,
    logout: () => Promise<void>,
} | undefined;

export interface ProviderProps {
    children: ReactNode,
}

export interface FetchConfig extends RequestInit {
    token?: string,
    data?: object,
}
