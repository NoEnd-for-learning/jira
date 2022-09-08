import { ComponentProps } from 'react';
import { IdSelect } from 'components/id-select';

export const UserSelect = (props: ComponentProps<typeof IdSelect>) => {
    return <IdSelect{...props} />;
};
