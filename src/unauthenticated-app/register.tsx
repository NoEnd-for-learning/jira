import { useCallback } from 'react';
import { useAuth } from 'context/auth-context';
import { Form, Button, Input } from 'antd';
import { LongButton } from 'unauthenticated-app';

export const Register = () => {
    const { register } = useAuth(); // 使用context 获取用户数据(全局)

    const onSubmit = useCallback(({ username, password }: {username: string, password: string}) => {
        register({username, password});
    }, [register]);

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
            <LongButton type="primary" htmlType="submit">注册</LongButton>
        </Form>
    );
};
