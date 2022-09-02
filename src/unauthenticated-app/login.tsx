import { FormEvent, useCallback } from 'react';
import {useAuth} from 'context/auth-context';

export const Login = () => {
    const {login, user} = useAuth(); // 使用context 获取用户数据(全局)

    const onSubmit = useCallback((evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        const username = (evt.currentTarget.elements[0] as HTMLInputElement).value;
        const password = (evt.currentTarget.elements[1] as HTMLInputElement).value;
        login({username, password});
    }, []);

    return (
        <form action="" onSubmit={onSubmit}>
            {
                user ? (
                    <div style={{backgroundColor: '#eee'}}>
                        <h3>登录成功 😊</h3>
                        <h4>用户名：{user?.name}</h4>
                        <h4>Token：{user?.token}</h4>
                    </div>
                ) : null
            }
            <div>
                <label htmlFor="username">用户名</label>
                <input type="text" id="username"/>
            </div>
            <div>
                <label htmlFor="password">密码</label>
                <input type="password" id="password"/>
            </div>
            <button type="submit">登录</button>
        </form>
    );
};
