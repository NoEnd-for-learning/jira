import { Card } from 'antd';
import { Dashboard } from 'interface/dashboard';
import {useTasks, useTaskTypes} from 'hooks/useTask';
import { useTasksSearchParams } from 'hooks/useDashboards';
import taskIcon from 'assets/task.svg';
import bugIcon from 'assets/bug.svg';
import styled from "@emotion/styled";

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
            <h3>{dashboard.name}</h3>
            <TaskContainer>
                {
                    tasks?.map(t => <TaskCard key={t.id}>
                        <div>
                            {t.name}
                        </div>
                        <TaskTypeIcon id={t.typeId} />
                    </TaskCard>)
                }
            </TaskContainer>
        </Container>
    );
};

const Container = styled.div`
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

const TaskCard = styled(Card)`
margin-bottom: 0.5rem;
`;
