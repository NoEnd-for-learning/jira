import { Input, Form } from 'antd';
import { UserSelect } from 'components/user-select';
import { Project } from 'interface/project';
import { User } from 'interface/user';

export interface Param {
    name: string,
    personId: number,
}
interface Props {
    users: User[],
    param: Partial<Pick<Project, 'name' | 'personId'>>,
    setParam: (param: Props['param']) => void,
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
                <UserSelect
                    defaultOptionName={'负责人'}
                    value={param.personId}
                    options={users || []}
                    onChange={(personId) => {
                        setParam({
                            ...param,
                            personId,
                        });
                    }}
                />
            </Form.Item>
        </Form>
    );
};
