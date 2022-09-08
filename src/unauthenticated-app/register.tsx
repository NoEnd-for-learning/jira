import { useCallback } from 'react';
import { Form, Input } from 'antd';
import { LongButton } from 'unauthenticated-app';
import { LoginOrRegisterInfo } from 'interface';
import { useAsync } from 'hooks/useAsync';
import { useAuth } from 'context/auth-context';

export const Register = ({onError}: {onError: (error: Error) => void}) => {
    const { register } = useAuth(); // 使用context 获取用户数据(全局)
    const { run, isLoading } = useAsync(undefined, { throwOnError: true });

    const onSubmit = useCallback(({ username, password, cpassword }: LoginOrRegisterInfo) => {
        if(cpassword !== password) {
            onError(new Error('请确认两次输入的密码相同'));
            return;
        }
        run(register({username, password}).catch(onError));
    }, [register, onError, run]);

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
            <Form.Item name={'cpassword'}
                       rules={[{required: true, message: '请确认密码'}]}
            >
                <Input placeholder="确认密码" type="password" id="cpassword"/>
            </Form.Item>
            <LongButton type="primary" htmlType="submit" loading={isLoading}>注册</LongButton>
        </Form>
    );
};
