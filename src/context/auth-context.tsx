import {useState, createContext, useContext, useEffect} from 'react';
import * as auth from 'auth-provider';
import { User, AuthForm, AuthCtxProps, ProviderProps } from 'interface';
import { http } from 'utils/http';

const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if(token) {
      const res = await http('me', {token});
      user = res?.user;
  }
  return user;
};

const AuthContext = createContext<AuthCtxProps>(undefined);
AuthContext.displayName = 'AuthContext';

export const AuthProvider = ({ children }: ProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const login = (form: AuthForm) =>
        auth.login(form).then(r => setUser(r as User));
    const register = (form: AuthForm) =>
        auth.register(form).then(r => setUser(r as User));
    const logout = () => auth.logout().then(setUser);

    useEffect(() => {
        bootstrapUser().then(setUser); // 设置默认值
    }, []);

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
