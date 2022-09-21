import {Card, Dropdown, Button, Menu, Modal} from 'antd';
import { Dashboard } from 'interface/dashboard';
import {useTasks, useTaskTypes, useTasksSearchParams, useTasksModal} from 'hooks/useTask';
import taskIcon from 'assets/task.svg';
import bugIcon from 'assets/bug.svg';
import styled from '@emotion/styled';
import { CreateTask } from 'screens/dashboard/create-task';
import { Task } from 'interface/task';
import { Mark } from 'components/mark';
import { StyledRow } from 'components/lib';
import {useDashboardsQueryKey, useDeleteDashboard} from 'hooks/useDashboards';
import {useCallback} from "react";

const TaskTypeIcon = ({id}: {id: number}) => {
    const {data: taskTypes} = useTaskTypes();
    const name = taskTypes?.find((t) => t.id === id)?.name;
    if(!name) {
        return null;
    }
    return <img alt={"task-icon"} src={name === "task" ? taskIcon : bugIcon} width="18rem" />;
};

export const DashboardColumn = ({dashboard}: {dashboard: Dashboard}) => {
    const { data: allTasks } = useTasks(useTasksSearchParams());
    const tasks = allTasks?.filter(t => t.kanbanId === dashboard.id);
    return (
        <Container>
            <StyledRow between={true}>
                <h3>{dashboard.name}</h3>
                <More dashboard={dashboard} />
            </StyledRow>

            <TaskContainer>
                {tasks?.map((task) => <TaskCard task={task} key={'dashboard' + task.id} />)}
                <CreateTask kanbanId={dashboard.id} />
            </TaskContainer>
        </Container>
    );
};

export const Container = styled.div`
min-width: 27rem;
border-radius: 6px;
background-color: rgb(244, 245, 247);
display: flex;
flex-direction: column;
padding: 0.7rem 0.7rem 1rem;
margin-right: 1.5rem;
`;

const TaskContainer = styled.div`
overflow: scroll;
flex: 1;
::-webkit-scrollbar {
display: none;
}
`;

const TaskCardContainer = styled(Card)`
margin-bottom: 0.5rem;
cursor: pointer;
`;

const TaskCard = ({task}: {task: Task}) => {
    const { startEdit } = useTasksModal();
    const { name: keyword } = useTasksSearchParams();
    return (
        <TaskCardContainer
            key={'dashboard' + task.id}
            onClick={() => startEdit(task.id)}
        >
            <div>
                <Mark keyword={keyword} name={task.name} />
            </div>
            <TaskTypeIcon id={task.typeId} />
        </TaskCardContainer>
    );
};

const More = ({dashboard}: {dashboard: Dashboard}) => {
    const { mutateAsync } = useDeleteDashboard(useDashboardsQueryKey());
    const startDelete = useCallback(() => {
        Modal.confirm({
            okText: '确定',
            cancelText: '取消',
            title: '确定删除看板吗？',
            onOk: () => mutateAsync({id: dashboard.id}),
        });
    }, [mutateAsync, dashboard]);
    return (
        <Dropdown overlay={<Menu items={[
            {
                label: <Button onClick={startDelete} type="link">删除</Button>,
                key: 'delete'
            }
        ]} />} >
            <Button type="link">...</Button>
        </Dropdown>
    )
};
