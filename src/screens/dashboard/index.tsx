import { useDocumentTitle } from 'hooks/useDocumentTitle';
import {useDashboards, useDashboardSearchParams, useProjectInUrl} from 'hooks/useDashboards';
import {useTasks, useTasksSearchParams} from 'hooks/useTask';
import { DashboardColumn } from 'screens/dashboard/dashboard-column';
import { SearchPanel } from 'screens/dashboard/search-panel';
import { CreateDashBoard } from 'screens/dashboard/create-dashboard';
import styled from '@emotion/styled';
import { Spin } from 'antd';
import { ScreenContainer } from 'components/lib';

export const Dashboard = () => {
    useDocumentTitle('看板列表');

    const { data: currentProject } = useProjectInUrl();
    const { data: dashboards, isLoading: isDashboardLoading } = useDashboards(useDashboardSearchParams());
    const { isLoading: isTaskLoading } = useTasks(useTasksSearchParams());
    const isLoading = isDashboardLoading || isTaskLoading;
    return (
        <ScreenContainer>
            <h1>{currentProject?.name}</h1>
            <SearchPanel />
            {
                isLoading ? <Spin size="large" /> : (
                    <ColumnsContainer>
                        {
                            dashboards?.map((d) => <DashboardColumn key={d.id} dashboard={d}/>)
                        }
                        <CreateDashBoard />
                    </ColumnsContainer>
                )
            }
        </ScreenContainer>
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
