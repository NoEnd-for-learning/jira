import { useEffect, useState } from 'react';
import { useAddTask, useTasksQueryKey } from 'hooks/useTask';
import { useProjectIdInUrl } from 'hooks/useDashboards';
import { Card, Input } from 'antd';
import styled from '@emotion/styled';

export const CreateTask = ({kanbanId}: {kanbanId: number}) => {
    const [name, setName] = useState('');
    const { mutateAsync } = useAddTask(useTasksQueryKey());
    const projectId = useProjectIdInUrl();
    const [inputMode, setInputMode] = useState(false);

    const submit = async () => {
        await mutateAsync({projectId, name, kanbanId});
        setInputMode(false);
        setName('');
    };

    const toggle = () => setInputMode(mode => !mode);

    useEffect(() => {
        if(!inputMode) {
            setName('');
        }
    }, [inputMode]);

    if(!inputMode) {
        return <CreateBtn onClick={toggle}>+创建事务</CreateBtn>;
    }

    return (
        <Card>
            <Input
                size="large"
                placeholder="需要做些什么"
                onBlur={toggle}
                autoFocus={true}
                value={name}
                onChange={evt => setName(evt.target.value)}
                onPressEnter={submit}
            />
        </Card>
    );
};

const CreateBtn = styled.div`
font-size: 14px;
`;
