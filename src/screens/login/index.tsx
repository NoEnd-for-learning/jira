import { FormEvent, useCallback } from "react";

export const Login = () => {

    const login = (param: {username: string, password: string}) => {
        window.fetch(`${process.env.REACT_APP_API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(param),
        }).then(r => r.json()).then(() => {

        });
    };

    const onSubmit = useCallback((evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        const username = (evt.currentTarget.elements[0] as HTMLInputElement).value;
        const password = (evt.currentTarget.elements[1] as HTMLInputElement).value;
        login({username, password});
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
            <button type="submit">登录</button>
        </form>
    );
};
