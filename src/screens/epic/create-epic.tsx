import {Button, Drawer, Form, Input, Spin} from 'antd';
import { DrawerProps } from 'antd/es/drawer';
import styled from "@emotion/styled";
import {ErrorBox} from "components/lib";
import {useAddEpic, useEpicsQueryKey} from "hooks/useEpic";
import {useCallback, useEffect, useRef} from "react";

export const CreateEpic = (props: Pick<DrawerProps, 'visible'> & {onClose: () => void}) => {
    const [form] = Form.useForm();
    const formRef = useRef(null);
    const { mutateAsync: addEpic, isLoading, error } = useAddEpic(useEpicsQueryKey());

    const closeModal = useCallback(() => {
        form.resetFields();
        props?.onClose();
    }, [form, props]);
    const onFinish = (values: any) => {
        addEpic(values).then(closeModal);
    };

    useEffect(() => {
        form.resetFields();
    }, [form, props.visible]);

    return (
        <Drawer visible={props.visible}
                onClose={props.onClose}
                forceRender={true}
                destroyOnClose={true}
                width="100%"
        >
            <Container>
                {
                    isLoading ? (
                        <Spin size="large" />
                    ) : (
                        <>
                            <h1>创建任务组</h1>
                            <ErrorBox error={error}/>
                            <Form layout="vertical"
                                  style={{width: '40rem'}}
                                  onFinish={onFinish}
                                  form={form}
                                  ref={formRef}
                            >
                                <Form.Item label="名称"
                                           name="name"
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请输入任务组名称',
                                               }
                                           ]}
                                >
                                    <Input placeholder="请输入任务组名称" />
                                </Form.Item>
                                <Form.Item style={{textAlign: 'right'}}>
                                    <Button loading={isLoading}
                                            type="primary"
                                            htmlType="submit"
                                    >提交</Button>
                                </Form.Item>
                            </Form>
                        </>
                    )
                }
            </Container>
        </Drawer>
    );
};

const Container = styled.div`
height: 80vh;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;
