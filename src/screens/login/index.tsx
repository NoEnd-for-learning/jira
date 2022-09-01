import { FormEvent, useCallback } from "react";
import { login, register } from 'utils/auth-provider';

let isLogin = false;

export const Login = () => {

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
