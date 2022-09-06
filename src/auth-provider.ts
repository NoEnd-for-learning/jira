import { User, AuthForm } from 'interface';
import { http } from 'utils/http';
// 模拟登录认证
// 在真实环境中，如果使用了 firebase 这种第三方auth 服务的话，本文件不需要开发者手动创建
const localStorageKey = '__auth_provider_token__';

export const getToken = () => window.localStorage.getItem(localStorageKey);

export const handleUserResponse = ({ user }: { user: User }) => {
    window.localStorage.setItem(localStorageKey, user.token || '');
    return user;
};

export const login = (data: AuthForm) => {
    return new Promise((resolve, reject) => {
        http('login', {
            method: 'POST',
            data,
        }).then((res) => {
            resolve(handleUserResponse(res) as User);
        }).catch((err) => {
            reject(err);
        });
    });
};

export const register = (data: AuthForm) => {
    return new Promise((resolve, reject) => {
        http('register', {
            method: 'POST',
            data,
        }).then((res) => {
            resolve(handleUserResponse(res) as User);
        }).catch((err) => {
            reject(err);
        });
    });
};

export const logout = async () => {
    window.localStorage.removeItem(localStorageKey);
    return Promise.resolve(null);
}
