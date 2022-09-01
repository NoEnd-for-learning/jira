// 模拟登录认证
// 在真实环境中，如果使用了 firebase 这种第三方auth 服务的话，本文件不需要开发者手动创建
interface User {
    id: number,
    name: string,
    title: string,
    email: string,
    organization: string,
    passwordHash: string,
    token: string,
}
const localStorageKey = '__auth_provider_token__';

export const getToken = () => window.localStorage.getItem(localStorageKey);

export const handleUserResponse = async ({user}: {user: User}) => {
    window.localStorage.setItem(localStorageKey, user.token || '');
    return user;
};

export const login = (data: {username: string, password: string}) => {
    window.fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(async (response) => {
        if(response.ok) {
            let res = await response.json();
            console.log(res);
            return handleUserResponse(res);
        }
    });
};

export const register = (data: {username: string, password: string}) => {
    window.fetch(`${process.env.REACT_APP_API_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(async (response) => {
        if(response.ok) {
            let res = await response.json();
            console.log(res);
            return handleUserResponse(res);
        }
    });
};

export const logout = async () => {
    window.localStorage.removeItem(localStorageKey);
}
