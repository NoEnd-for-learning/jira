import { useCallback, useEffect } from 'react';
import * as auth from 'auth-provider';
import { User, AuthForm, ProviderProps } from 'interface';
import { http } from 'utils/http';
import {useAsync} from 'hooks/useAsync';
import { FullPageLoading, FullPageErrorFallback } from 'components/lib';
import { useDispatch, useSelector } from 'react-redux';
import * as authStore from 'store/auth.slice';

export const bootstrapUser = () => {
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

export const AuthProvider = ({ children }: ProviderProps) => {
    const {
        error,
        isLoading,
        isIdle,
        isError,
        run,
    } = useAsync<User | null>();
    const dispatch: (...args: any[]) => Promise<User> = useDispatch();

    useEffect(() => {
        run(() => dispatch(authStore.bootstrap())); // 设置默认值
    }, [run, dispatch]);

    if(isIdle || isLoading) {
        return <FullPageLoading />;
    }

    if(isError) {
        return <FullPageErrorFallback error={error} />;
    }

    return <>{children}</>;
};

export const useAuth = () => {
    // 这里需要显式声明
    const dispatch: (...args: any[]) => Promise<User> = useDispatch();
    const user = useSelector(authStore.pickUserState);
    const login = useCallback((form: AuthForm) => dispatch(authStore.login(form)), [dispatch]);
    const logout = useCallback(() => dispatch(authStore.logout()), [dispatch]);
    const register = useCallback((form: AuthForm) => dispatch(authStore.register(form)), [dispatch]);

    return {
        user,
        login,
        logout,
        register,
    };
};
