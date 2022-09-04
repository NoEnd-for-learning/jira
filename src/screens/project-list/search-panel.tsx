import { Select, Input } from 'antd';

interface Param {
    name: string,
    personId: number | string,
}
interface User {
    id: number | string,
    name: string,
}
interface Props {
    param: Param,
    setParam: any,
    users: User[],
}

export const SearchPanel = ({ param, setParam, users = [] }: Props) => {
  return (
    <form action="">
      <Input
        type="text"
        value={param.name}
        onChange={(evt) => {
          setParam({
            ...param,
            name: evt.target.value,
          });
        }}
      />
      <Select value={param.personId}
              onChange={(personId) => {
                setParam({
                  ...param,
                  personId,
                });
              }}
      >
        <Select.Option value="">负责人</Select.Option>
        {
          users.map(user => (
            <Select.Option value={user.id} key={user.id}>{user.name}</Select.Option>
          ))
        }
      </Select>
    </form>
  );
};
