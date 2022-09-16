import { ComponentProps, useEffect, useRef } from 'react';
import { Drawer, Button, Spin, Form, Input } from 'antd';
import { useProjectModal } from 'hooks/useProjectModal';
import { useAddProject, useEditProject, useProjectsQueryKey } from 'hooks/useProjects';
import { useUser } from 'hooks/useUser';
import { UserSelect } from 'components/user-select';
import { ErrorBox } from 'components/lib';
import styled from '@emotion/styled';

export const ProjectModal = (props: ComponentProps<typeof Drawer>) => {
    const [form] = Form.useForm();
    const formRef = useRef(null);
    const { data: users } = useUser();
    const { visible, close, editingProject, isLoading } = useProjectModal();

    const useMutateProject = editingProject ? useEditProject : useAddProject;
    const { mutateAsync, error, isLoading: mutateLoading } = useMutateProject(useProjectsQueryKey());
    const onFinish = (values: any) => {
        mutateAsync({
            ...editingProject,
            ...values
        }).then(() => {
            form.resetFields();
            close();
        });
    };

    const title = editingProject ? '编辑项目' : '创建项目';

    useEffect(() => {
        // https://blog.csdn.net/li1522532686/article/details/124152771
        if(formRef.current) {
            form.setFieldsValue(editingProject);
        }
    }, [editingProject, form]);

    return (
        <Drawer {...props}
                width={'100%'}
                visible={visible}
                onClose={close}
        >
            <Container>
                {
                    isLoading ? (
                        <Spin size="large" />
                    ) : (
                        <>
                            <h1>{title}</h1>
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
                                                   message: '请输入项目名称',
                                               }
                                           ]}
                                >
                                    <Input placeholder="请输入项目名称" />
                                </Form.Item>
                                <Form.Item label="部门"
                                           name="organization"
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请输入部门名称',
                                               }
                                           ]}
                                >
                                    <Input placeholder="请输入部门名称" />
                                </Form.Item>
                                <Form.Item label="负责人"
                                           name="personId"
                                >
                                    <UserSelect
                                        defaultOptionName={'负责人'}
                                        options={users || []}
                                    />
                                </Form.Item>
                                <Form.Item style={{textAlign: 'right'}}>
                                    <Button loading={mutateLoading}
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
