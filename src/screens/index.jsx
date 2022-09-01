import { useEffect, useState } from "react";
import qs from 'qs';
import { cleanObject } from '../utils'
import { List } from './list';
import { SearchPanel } from './search-panel';

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: '',
  });
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    window.fetch(`${process.env.REACT_APP_API_URL}/projects?${qs.stringify(cleanObject(param))}`)
      .then(r => r.json()).then((ls) => {
        setList(ls);
      });
  }, [param]);

  useEffect(() => {
    window.fetch(`${process.env.REACT_APP_API_URL}/users`)
      .then(r => r.json()).then((us) => {
        setUsers(us);
      });
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
