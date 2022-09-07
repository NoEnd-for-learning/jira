import { useCallback } from 'react';
import { Form, Input } from 'antd';
import { LongButton } from 'unauthenticated-app';
import { LoginOrRegisterInfo } from 'interface';
import { useAPI } from 'hooks/useAPI';
import { useAuth } from 'context/auth-context';

export const Login = ({ onError }: {onError: (error: Error) => void}) => {
    const { login } = useAuth(); // 使用context 获取用户数据(全局)
    const { run, isLoading } = useAPI(undefined, { throwOnError: true });

    const onSubmit = useCallback(({ username, password }: LoginOrRegisterInfo) => {
        run(login({username, password}).catch(onError));
    }, [login, onError, run]);

    return (
        <Form onFinish={onSubmit}>
            <Form.Item name={'username'}
                       rules={[{required: true, message: '请输入用户名'}]}
            >
                <Input placeholder="用户名" type="text" id="username"/>
            </Form.Item>
            <Form.Item name={'password'}
                       rules={[{required: true, message: '请输入密码'}]}
            >
                <Input placeholder="密码" type="password" id="password"/>
            </Form.Item>
            <LongButton type="primary" htmlType="submit" loading={isLoading}>登录</LongButton>
        </Form>
    );
};
