import { ComponentProps } from 'react';
import { IdSelect } from 'components/id-select';
import { useTaskTypes } from 'hooks/useTask';

export const TaskTypeSelect = (props: ComponentProps<typeof IdSelect>) => {
    const { data: taskTypes } = useTaskTypes();
    return <IdSelect options={taskTypes || []} {...props} />;
};
