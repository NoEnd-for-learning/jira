import { FormEvent, useCallback } from "react";

import {useAuth} from "context/auth-context";

let isLogin = false;

export const Login = () => {
    const {login, user, register} = useAuth(); // 使用context 获取用户数据(全局)

    const onSubmit = useCallback((evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        const username = (evt.currentTarget.elements[0] as HTMLInputElement).value;
        const password = (evt.currentTarget.elements[1] as HTMLInputElement).value;
        if(isLogin) {
            login({username, password});
        } else {
            register({username, password});
        }
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
                ) : <p>请登录 / 注册 🙂</p>
            }
            <div>
                <label htmlFor="username">用户名</label>
                <input type="text" id="username"/>
            </div>
            <div>
                <label htmlFor="password">密码</label>
                <input type="password" id="password"/>
            </div>
            <button type="submit"
                    onClick={() => isLogin = true}>登录</button>
            <button type="submit"
                    onClick={() => isLogin = false}
                    style={{marginLeft: 10}}>注册</button>
        </form>
    );
};
