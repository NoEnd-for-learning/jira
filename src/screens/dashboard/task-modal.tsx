import {Form, Input, Modal, Spin} from 'antd';
import {useTasksModal, useEditTask, useTasksQueryKey} from "hooks/useTask";
import {ComponentProps, useCallback, useEffect, useRef} from "react";
import {ErrorBox} from "../../components/lib";
import {UserSelect} from "../../components/user-select";
import styled from "@emotion/styled";
import {useUser} from "../../hooks/useUser";
import {TaskTypeSelect} from "../../components/task-type-select";

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};

export const TaskModal = (props: ComponentProps<typeof Modal>) => {
    const [form] = Form.useForm();
    const formRef = useRef(null);
    const { editingTaskId, editingTask, isLoading, close } = useTasksModal();
    const { mutateAsync, isLoading: editLoading, error } = useEditTask(useTasksQueryKey());
    const { data: users } = useUser();
    const onCancel = useCallback(() => {
        form.resetFields();
        close();
    }, [form, close]);

    const onOk = useCallback(async () => {
        await mutateAsync({...editingTask, ...form.getFieldsValue()});
        close();
    }, [mutateAsync, editingTask, form, close]);

    const onFinish = useCallback(() => {}, []);

    useEffect(() => {
        // https://blog.csdn.net/li1522532686/article/details/124152771
        if(formRef.current) {
            form.setFieldsValue(editingTask);
        }
    }, [form, editingTask]);

    return (
        <Modal {...props}
               okText="确认"
               cancelText="取消"
               confirmLoading={editLoading}
               title="编辑任务"
               visible={!!editingTaskId}
               onCancel={onCancel}
               onOk={onOk}
        >
            <Container>
                {
                    isLoading ? (
                        <Spin size="large" />
                    ) : (
                        <>
                            <ErrorBox error={error}/>
                            <Form {...layout}
                                  initialValues={editingTask}
                                  onFinish={onFinish}
                                  form={form}
                                  ref={formRef}
                            >
                                <Form.Item label="任务名"
                                           name="name"
                                           rules={[
                                               {
                                                   required: true,
                                                   message: '请输入任务名称',
                                               }
                                           ]}
                                >
                                    <Input placeholder="请输入任务名称" />
                                </Form.Item>
                                <Form.Item label="经办人"
                                           name="processorId"
                                >
                                    <UserSelect
                                        defaultOptionName={'负责人'}
                                        options={users || []}
                                    />
                                </Form.Item>
                                <Form.Item label="类型"
                                           name="typeId"
                                >
                                    <TaskTypeSelect defaultOptionName="类型"/>
                                </Form.Item>
                            </Form>
                        </>
                    )
                }
            </Container>
        </Modal>
    );
};

const Container = styled.div`
min-height: 220px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;
