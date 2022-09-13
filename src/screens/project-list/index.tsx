import { useMemo } from 'react';
import styled from '@emotion/styled';
import { Typography } from 'antd';
import { useProject } from 'hooks/useProject';
import { useUser } from 'hooks/useUser';
import { useDebounce } from 'hooks/useDebounce';
import { useDocumentTitle } from 'hooks/useDocumentTitle';
import { useUrlQueryParam } from 'hooks/useUrlQueryParam';
import { List } from './list';
import { SearchPanel } from './search-panel';
import { toNumber } from 'utils';
import { ButtonNoPadding, StyledRow } from 'components/lib';
import {useDispatch} from "react-redux";
import {projectListActions} from "../../store/project-list.slice";

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
    const { isLoading, error, data: list, retry } = useProject(debounceParam);
    const { data: users } = useUser();
    const dispatch = useDispatch();

    return (
        <Container>
            <StyledRow marginBottom={2} between={true}>
                <h1>项目列表</h1>
                <ButtonNoPadding onClick={() => dispatch(projectListActions.open({}))} type="link">
                    创建项目
                </ButtonNoPadding>
            </StyledRow>
            <SearchPanel param={param}
                         setParam={setParam}
                         users={users || []}
            />
            {error ? <Typography.Text type="danger">{error.message}</Typography.Text> : null}
            <List dataSource={list || []}
                  users={users || []}
                  loading={isLoading}
                  refresh={retry}
            />
        </Container>
    );
};

const Container = styled.div`
padding: 3.2rem;
`;