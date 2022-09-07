import { Table, TableProps } from 'antd';
import { useCallback } from 'react';
import dayjs from 'dayjs';
import { Project } from 'interface';
// react-router 跟 react-router-dom 的关系类似react（生产方） 跟react-dom（消费方） 的关系
import { Link } from 'react-router-dom';

interface User {
    id: number,
    name: string,
}
interface Props extends TableProps<Project>{
    users: User[],
}

export const List = ({users = [], ...props}: Props) => {
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
                       render: (text, record, index) => {
                           return <Link to={String(record.id)}>{text}</Link>;
                       },
                   },
                   {
                       title: '部门',
                       dataIndex: 'organization',
                       sorter: (a, b) => sorter(a, b,'organization'),
                   },
                   {
                       title: '负责人',
                       dataIndex: 'personName',
                       render: (text, record, index) =>
                           users.find((u => u.id === record.personId))?.name || '未知'
                   },
                   {
                       title: '创建时间',
                       dataIndex: 'created',
                       render: (text, record, index) => text ? dayjs(text).format('YYYY-MM-DD') : '无'
                   }
               ]}
               {...props}
        />
    );
};