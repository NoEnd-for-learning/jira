import { AuthProvider } from './auth-context';
import { ProviderProps } from 'interface';

export const AppProviders = ({ children }: ProviderProps) => {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    );
};
