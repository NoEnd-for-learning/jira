import { createContext, useContext, useEffect } from 'react';
import * as auth from 'auth-provider';
import { User, AuthForm, AuthCtxProps, ProviderProps } from 'interface';
import { http } from 'utils/http';
import {useAPI} from 'hooks/useAPI';
import { FullPageLoading, FullPageErrorFallback } from 'components/lib';

const bootstrapUser = () => {
  let user = null;
  const token = auth.getToken();
  if(token) {
      return  new Promise<any>((resolve, reject) => {
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
    } = useAPI<User | null>()
    const login = (form: AuthForm) =>
        auth.login(form).then(r => setUser(r as User));
    const register = (form: AuthForm) =>
        auth.register(form).then(r => setUser(r as User));
    const logout = () => auth.logout().then(setUser);

    useEffect(() => {
        run(bootstrapUser()); // 设置默认值
        // eslint-disable-next-line
    }, []);

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
