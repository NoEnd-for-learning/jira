import { Select, Input, Form } from 'antd';

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
        <Form layout="inline" style={{marginBottom: '2rem'}}>
            <Form.Item>
                <Input
                    type="text"
                    placeholder="项目名"
                    value={param.name}
                    onChange={(evt) => {
                        setParam({
                            ...param,
                            name: evt.target.value,
                        });
                    }}
                />
            </Form.Item>
            <Form.Item>
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
            </Form.Item>
        </Form>
    );
};
