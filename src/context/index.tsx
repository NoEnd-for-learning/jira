import { AuthProvider } from './auth-context';
import { ProviderProps } from 'interface';
import { Provider } from 'react-redux';
import { store } from 'store';

export const AppProviders = ({ children }: ProviderProps) => {
    return (
        <Provider store={store}>
            <AuthProvider>
                {children}
            </AuthProvider>
        </Provider>
    );
};
