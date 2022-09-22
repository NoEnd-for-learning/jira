import { useDocumentTitle } from 'hooks/useDocumentTitle';
import {
    useDashboards,
    useDashboardSearchParams,
    useDashboardsQueryKey,
    useProjectInUrl,
    useReorderDashboard,
} from 'hooks/useDashboards';
import {
    useTasks,
    useTasksQueryKey,
    useTasksSearchParams,
    useReorderTask,
} from 'hooks/useTask';
import { DashboardColumn } from 'screens/dashboard/dashboard-column';
import { SearchPanel } from 'screens/dashboard/search-panel';
import { CreateDashBoard } from 'screens/dashboard/create-dashboard';
import { TaskModal } from 'screens/dashboard/task-modal';
import styled from '@emotion/styled';
import { Spin } from 'antd';
import { ScreenContainer } from 'components/lib';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Drag, Drop, DropChild } from 'components/drag-and-drop';
import { useCallback } from 'react';

export const Dashboard = () => {
    useDocumentTitle('看板列表');

    const { data: currentProject } = useProjectInUrl();
    const { data: dashboards, isLoading: isDashboardLoading } = useDashboards(useDashboardSearchParams());
    const { isLoading: isTaskLoading } = useTasks(useTasksSearchParams());
    const isLoading = isDashboardLoading || isTaskLoading;
    return (
        <DragDropContext onDragEnd={useDragEnd()}>
            <ScreenContainer>
                <h1>{currentProject?.name}</h1>
                <SearchPanel />
                {
                    isLoading ? <Spin size="large" /> : (
                        <ColumnsContainer>
                            <Drop type="COLUMN" direction="horizontal" droppableId="dashboard">
                                <DropChild style={{display: 'flex'}}>
                                    {
                                        dashboards?.map((d, i) => <Drag key={d.id}
                                                                        draggableId={'dashboard' + d.id}
                                                                        index={i}
                                        >
                                            <DashboardColumn key={d.id} dashboard={d}/>
                                        </Drag>)
                                    }
                                </DropChild>
                            </Drop>
                            <CreateDashBoard />
                        </ColumnsContainer>
                    )
                }
                <TaskModal />
            </ScreenContainer>
        </DragDropContext>
    );
};

export const ColumnsContainer = styled.div`
display: flex;
overflow-x: scroll;
flex: 1;

&::-webkit-scrollbar {
  height: 10px;
  width: 10px;
}
&::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: rgba(157, 157, 157, 1);
}
&::-webkit-scrollbar-track {
  border-radius: 0;
  background: white;
}
`;

export const useDragEnd = () => {
    const { data: kanbans } = useDashboards(useDashboardSearchParams());
    const { mutate: reorderKanban } = useReorderDashboard(useDashboardsQueryKey());
    const { mutate: reorderTask } = useReorderTask(useTasksQueryKey());
    const { data: allTasks = [] } = useTasks(useTasksSearchParams());
    return useCallback(
        ({ source, destination, type }: DropResult) => {
            if (!destination) {
                return;
            }
            // 看板排序
            if (type === "COLUMN") {
                const fromId = kanbans?.[source.index].id;
                const toId = kanbans?.[destination.index].id;
                if (!fromId || !toId || fromId === toId) {
                    return;
                }
                const type = destination.index > source.index ? "after" : "before";
                reorderKanban({ fromId, referenceId: toId, type });
            }
            if (type === "ROW") {
                const fromKanbanId = +source.droppableId;
                const toKanbanId = +destination.droppableId;
                const fromTask = allTasks.filter(
                    (task) => task.kanbanId === fromKanbanId
                )[source.index];
                const toTask = allTasks.filter((task) => task.kanbanId === toKanbanId)[
                    destination.index
                    ];
                if (fromTask?.id === toTask?.id) {
                    return;
                }
                reorderTask({
                    fromId: fromTask?.id,
                    referenceId: toTask?.id,
                    fromKanbanId,
                    toKanbanId,
                    type:
                        fromKanbanId === toKanbanId && destination.index > source.index
                            ? "after"
                            : "before",
                });
            }
        },
        [kanbans, reorderKanban, allTasks, reorderTask]
    );
};
