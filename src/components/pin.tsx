import { ComponentProps } from 'react';
import { Rate } from 'antd';

interface PinProps extends ComponentProps<typeof Rate>{
    checked: boolean,
    onCheckedChange?: (checked: boolean) => void,
}

export const Pin = (props: PinProps) => {
    const { checked, onCheckedChange, ...restProps } = props;

    return (
        <Rate
            {...restProps}
            count={1}
            value={checked ? 1 : 0}
            onChange={(num) => onCheckedChange?.(!!num)}
        />
    );
};
