import { Table } from 'antd';
import { useCallback } from 'react';
import dayjs from 'dayjs';

interface Project {
    id: number,
    name: string,
    personId: number,
    pin: boolean,
    organization: string,
    created: number,
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

    const sorter = useCallback((a: Project, b: Project, key: 'name' | 'organization') => {
        return a[key].localeCompare(b[key]);
    }, []);

    return (
        <Table pagination={false}
               rowKey="id"
               columns={[
                   {
                       title: '名称',
                       dataIndex: 'name',
                       sorter: (a, b) => sorter(a, b,'name'),
                   },
                   {
                       title: '部门',
                       dataIndex: 'organization',
                       sorter: (a, b) => sorter(a, b,'organization'),
                   },
                   {
                       title: '负责人',
                       dataIndex: 'personName',
                   },
                   {
                       title: '创建时间',
                       dataIndex: 'created',
                       render: (text, record, index) => text ? dayjs(text).format('YYYY-MM-DD') : '无'
                   }
               ]}
               dataSource={dataSource}
        />
    );
};