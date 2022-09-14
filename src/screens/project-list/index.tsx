import { useMemo } from 'react';
import styled from '@emotion/styled';
import { useProject } from 'hooks/useProject';
import { useUser } from 'hooks/useUser';
import { useDebounce } from 'hooks/useDebounce';
import { useDocumentTitle } from 'hooks/useDocumentTitle';
import { useUrlQueryParam } from 'hooks/useUrlQueryParam';
import { useProjectModal } from 'hooks/useProjectModal';
import { List } from 'screens/project-list/list';
import { SearchPanel } from 'screens/project-list/search-panel';
import { toNumber } from 'utils';
import { ButtonNoPadding, StyledRow, ErrorBox } from 'components/lib';

const useProjectSearchParams = () => {
    const [param, setParam] = useUrlQueryParam(['name', 'personId']);
    return [
        // 关键，否则会因为重新定义对象，导致组件无限重渲染
        useMemo(() => ({...param, personId: toNumber(param.personId) || undefined}), [param]),
        setParam,
    ] as const;
};

export const ProjectListScreen = () => {
    useDocumentTitle('项目列表');

    const [param, setParam] = useProjectSearchParams();
    const debounceParam = useDebounce(param, 200);
    const { isLoading, error, data: list } = useProject(debounceParam);
    const { data: users } = useUser();
    const { open } = useProjectModal();

    return (
        <Container>
            <StyledRow marginBottom={2} between={true}>
                <h1>项目列表</h1>
                <ButtonNoPadding onClick={open} type="link">
                    创建项目
                </ButtonNoPadding>
            </StyledRow>
            <SearchPanel param={param}
                         setParam={setParam}
                         users={users || []}
            />
            <ErrorBox error={error} />
            <List dataSource={list || []}
                  users={users || []}
                  loading={isLoading}
            />
        </Container>
    );
};

const Container = styled.div`
padding: 3.2rem;
`;