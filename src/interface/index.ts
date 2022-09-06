import { PropsWithChildren } from 'react';
import {Param} from "../screens/project-list/search-panel";

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

export interface ProviderProps extends PropsWithChildren {
    // todo
}

export interface FetchConfig extends RequestInit {
    token?: string,
    data?: object,
}

export interface Project extends Param {
    // name: string,
    // personId: number | string,
    id: number,
    pin: boolean,
    organization: string,
    created: number,
}

export interface LoginOrRegisterInfo {
    username: string,
    password: string,
    cpassword: string,
}
