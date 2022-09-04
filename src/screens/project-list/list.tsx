import { Table } from 'antd';

interface Project {
    id: number,
    name: string,
    personId: number,
}
interface User {
    id: number,
    name: string,
}
interface Props {
    list: Project[],
    users: User[],
}

export const List = ({list = [], users = []}: Props) => {
    const dataSource = list.map(l => ({
        ...l,
        personName: users.find((u => u.id === l.personId))?.name || '未知',
    }));
    return (
        <Table pagination={false}
               rowKey="id"
               columns={[
                   {
                       title: '名称',
                       dataIndex: 'name',
                       width: 200,
                       sorter: (a, b) =>
                           a.name.localeCompare(b.name),
                   },
                   {
                       title: '负责人',
                       dataIndex: 'personName',
                       width: 200,
                   },
               ]}
               dataSource={dataSource}
        />
    );
};