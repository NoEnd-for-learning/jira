import { useDocumentTitle } from 'hooks/useDocumentTitle';
import {useDashboards, useDashboardSearchParams, useProjectInUrl} from 'hooks/useDashboards';
import { DashboardColumn } from 'screens/dashboard/dashboard-column';
import { SearchPanel } from 'screens/dashboard/search-panel';
import styled from '@emotion/styled';

export const Dashboard = () => {
    useDocumentTitle('看板列表');

    const { data: currentProject } = useProjectInUrl();
    const { data: dashboards } = useDashboards(useDashboardSearchParams());
    return (
        <div>
            <h1>{currentProject?.name}</h1>
            <SearchPanel />
            <ColumnsContainer>
                {
                    dashboards?.map((d) => <DashboardColumn key={d.id} dashboard={d}/>)
                }
            </ColumnsContainer>
        </div>
    );
};

const ColumnsContainer = styled.div`
display: flex;
overflow: hidden;
margin-right: 2rem;
`;
