import { useState } from 'react';
import { Login } from 'unauthenticated-app/login';
import { Register } from 'unauthenticated-app/register';

export const UnauthenticatedApp = () => {
    const [isRegister, setRegister] = useState<boolean>(false);
    return (
        <div className="unauthenticated-app">
            {
                isRegister ? <Register /> : <Login />
            }
            <button onClick={() => setRegister(!isRegister)}>
                切换到{isRegister ? '登录' : '注册'}
            </button>
        </div>
    );
};
