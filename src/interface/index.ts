import { PropsWithChildren } from 'react';
import { User } from 'interface/user';

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

export interface ProviderProps extends PropsWithChildren {
    // todo
}

export interface FetchConfig extends RequestInit {
    token?: string,
    data?: object,
}

export interface LoginOrRegisterInfo {
    username: string,
    password: string,
    cpassword: string,
}

export type Raw = string | number;