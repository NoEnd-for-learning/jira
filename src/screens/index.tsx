import { useEffect, useState, useCallback } from "react";
import qs from 'qs';
import { cleanObject } from '../utils'
import { useAsync } from '../hooks/useAsync';
import { useDebounce } from '../hooks/useDebounce';
import { List } from './list';
import { SearchPanel } from './search-panel';

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: '',
  });
  const [list, setList] = useState([]);
  const debounceParam = useDebounce(param, 500);

  // 普通方式请求获取 list
  useEffect(() => {
    const queryStr = qs.stringify(cleanObject(debounceParam));
    window.fetch(`${process.env.REACT_APP_API_URL}/projects?${queryStr}`)
      .then(r => r.json()).then((ls) => {
        setList(ls);
      });
  }, [debounceParam]);

  // 自定义hooks 获取users
  const [
    fetchUsers,
    users,
    // loading,
    // error,
  ] = useAsync(
    useCallback(() => window.fetch(`${process.env.REACT_APP_API_URL}/users`), []),
    [],
    true,
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
