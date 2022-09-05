import { useEffect, useState, useCallback } from 'react';
import { cleanObject } from 'utils';
import { useHttp } from 'utils/http';
import { useAsync } from 'hooks/useAsync';
import { useDebounce } from 'hooks/useDebounce';
import { List } from './list';
import { SearchPanel } from './search-panel';
import styled from '@emotion/styled';


export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: '',
  });
  const [list, setList] = useState([]);
  const debounceParam = useDebounce(param, 500);
  const client = useHttp();

  // 普通方式请求获取 list
  useEffect(() => {
    client(
        'projects',
        {data: cleanObject(debounceParam)}
        ).then((ls) => {
          setList(ls);
        });
    // eslint-disable-next-line
  }, [debounceParam]);

  // 自定义hooks 获取users
  const [
    fetchUsers,
    users,
    // loading,
    // error,
  ] = useAsync(
      // eslint-disable-next-line
    useCallback(() => client('users', {}), []),
    []
  );

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param}
                   setParam={setParam}
                   users={users}
      />
      <List list={list} users={users} />
    </Container>
  );
};

const Container = styled.div`
padding: 3.2rem;
`;