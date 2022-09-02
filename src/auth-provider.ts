import { User, AuthForm } from 'interface';
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
        window.fetch(`${process.env.REACT_APP_API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(async (response) => {
            if(response.ok) {
                let res = await response.json();
                resolve(handleUserResponse(res) as User);
            } else {
                reject(data);
            }
        }).catch((err) => {
            reject(err);
        });
    });
};

export const register = (data: AuthForm) => {
    return new Promise((resolve, reject) => {
        window.fetch(`${process.env.REACT_APP_API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(async (response) => {
            if(response.ok) {
                let res = await response.json();
                resolve(handleUserResponse(res) as User);
            } else {
                reject(null);
            }
        }).catch(() => {
            reject(null);
        });
    });
};

export const logout = async () => {
    window.localStorage.removeItem(localStorageKey);
    return Promise.resolve(null);
}
