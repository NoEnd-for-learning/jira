import { createContext, useCallback, useContext, useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { AuthForm, AuthCtxProps, ProviderProps } from 'interface';
import { http } from 'utils/http';
import {useAsync} from 'hooks/useAsync';
import * as auth from 'auth-provider';
import { FullPageLoading, FullPageErrorFallback } from 'components/lib';
import {User} from 'interface/user';

const bootstrapUser = () => {
  let user = null;
  const token = auth.getToken();
  if(token) {
      return new Promise<any>((resolve, reject) => {
          http('me', { token })
              .then(res => {
                  resolve(res?.user);
              })
              .catch(reject);
      });
  }
  return Promise.resolve(user);
};

const AuthContext = createContext<AuthCtxProps>(undefined);
AuthContext.displayName = 'AuthContext';

export const AuthProvider = ({ children }: ProviderProps) => {
    const {
        data: user,
        setData: setUser,
        error,
        isLoading,
        isIdle,
        isError,
        run,
    } = useAsync<User | null>();
    const queryClient = useQueryClient();

    const login = useCallback((form: AuthForm) =>
        auth.login(form).then(r => setUser(r as User)), [setUser]);
    const register = useCallback((form: AuthForm) =>
        auth.register(form).then(r => setUser(r as User)), [setUser]);
    const logout = useCallback(() => auth.logout().then(() => {
        setUser(null);
        queryClient.clear();
    }), [setUser, queryClient]);

    useEffect(() => {
        run(() => bootstrapUser()); // 设置默认值
    }, [run]);

    if(isIdle || isLoading) {
        return <FullPageLoading />;
    }

    if(isError) {
        return <FullPageErrorFallback error={error} />;
    }

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
