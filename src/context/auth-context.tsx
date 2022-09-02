import { useState, createContext, useContext } from 'react';
import * as auth from 'utils/auth-provider';
import { User, AuthForm, AuthCtxProps, ProviderProps } from 'interface';

const AuthContext = createContext<AuthCtxProps>(undefined);
AuthContext.displayName = 'AuthContext';

export const AuthProvider = ({ children }: ProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const login = (form: AuthForm) =>
        auth.login(form).then(r => setUser(r as User));
    const register = (form: AuthForm) =>
        auth.register(form).then(r => setUser(r as User));
    const logout = () => auth.logout().then(setUser);

    return (
        <AuthContext.Provider
            value={{user, register, login, logout}}
            children={children}
        />
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error('useAuth 必须在 AuthProvider 中使用');
    }
    return context;
};
