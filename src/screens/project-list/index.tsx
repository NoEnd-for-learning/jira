import { useEffect, useState, useCallback } from 'react';
import { cleanObject } from 'utils';
import { useHttp } from 'utils/http';
import { useAsync } from 'hooks/useAsync';
import { useDebounce } from 'hooks/useDebounce';
import { List } from './list';
import { SearchPanel } from './search-panel';


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
    <div>
      <SearchPanel param={param}
                   setParam={setParam}
                   users={users}
      />
      <List list={list} users={users} />
    </div>
  );
};
