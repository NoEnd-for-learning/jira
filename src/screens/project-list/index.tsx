import { useState } from 'react';
import { useProject } from 'hooks/useProject';
import { useUser } from 'hooks/useUser';
import { useDebounce } from 'hooks/useDebounce';
import { List } from './list';
import { Param, SearchPanel } from './search-panel';
import styled from '@emotion/styled';
import { Typography } from 'antd';

export const ProjectListScreen = () => {
    const [param, setParam] = useState<Param>({
        name: '',
        personId: '',
    });
    const debounceParam = useDebounce(param, 200);
    const { isLoading, error, data: list } = useProject(debounceParam);
    const { data: users } = useUser();

    return (
        <Container>
            <h1>项目列表</h1>
            <SearchPanel param={param}
                         setParam={setParam}
                         users={users || []}
            />
            {error ? <Typography.Text type="danger">{error.message}</Typography.Text> : null}
            <List dataSource={list || []} users={users || []} loading={isLoading} />
        </Container>
    );
};

const Container = styled.div`
padding: 3.2rem;
`;