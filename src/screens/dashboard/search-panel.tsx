import {useTasksSearchParams} from 'hooks/useDashboards';
import {useSetUrlSearchParam} from 'hooks/useUrlQueryParam';
import {useUser} from 'hooks/useUser';
import {useCallback} from 'react';
import { StyledRow } from 'components/lib';
import { UserSelect } from 'components/user-select';
import { TaskTypeSelect } from 'components/task-type-select';
import { Input, Button } from 'antd';

export const SearchPanel = () => {
    const searchParams = useTasksSearchParams();
    const [, setSearchParams] = useSetUrlSearchParam();
    const { data: users } = useUser();

    const reset = useCallback(() => {
        setSearchParams({
            typeId: undefined,
            processorId: undefined,
            tagId: undefined,
            name: undefined,
        });
    }, []);

    return <StyledRow marginBottom={4} gap={true}>
        <Input style={{width: '20rem'}}
               placeholder="任务名"
               value={searchParams.name}
               onChange={(evt) => {
                   setSearchParams({name: evt.target.value});
               }}
        />
        <UserSelect defaultOptionName="经办人"
                    value={searchParams.processorId}
                    onChange={value => setSearchParams({processorId: value})}
                    options={users || []}
        />
        <TaskTypeSelect defaultOptionName="类型"
                        value={searchParams.typeId}
                        onChange={value => setSearchParams({typeId: value})}
        />
        <Button onClick={reset}>清除筛选器</Button>
    </StyledRow>;
};
