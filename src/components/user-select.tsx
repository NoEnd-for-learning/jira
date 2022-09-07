import { ComponentProps } from 'react';
import { useUser } from 'hooks/useUser';
import { IdSelect } from 'components/id-select';

export const UserSelect = (props: ComponentProps<typeof IdSelect>) => {
    const { data: users } = useUser();
    return (
        <IdSelect
            options={users || []}
            {...props}
        />
    )
};
