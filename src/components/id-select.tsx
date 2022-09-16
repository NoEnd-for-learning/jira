import { ComponentProps } from 'react';
import { toNumber } from 'utils';
import { Select } from 'antd';
import { Raw } from 'interface';

type SelectProps = ComponentProps<typeof Select>;

// Omit 处理，避免类型冲突
interface IdSelectProps extends Omit<SelectProps, 'value' | 'onChange' | 'options'> {
    value?: Raw | null | undefined,
    onChange?: (value?: number) => void,
    defaultOptionName?: string,
    options?: {name: string, id: number}[],
}

const DEFAULT_VALUE = 0;
/**
 * value 可以传入多种类型的值
 * onChange 只会回调 number | undefined 类型
 * 当 isNaN(Number(value)) 为true 时，代表选择默认类型
 * 当选择默认类型时，onChange 会回调undefined
 */
export const IdSelect = (props: IdSelectProps) => {
    const { value, onChange, defaultOptionName, options, ...otherProps } = props;
    return (
        <Select
            {...otherProps}
            value={options?.length ? toNumber(value) : DEFAULT_VALUE}
            onChange={(v) => onChange?.(toNumber(v) || undefined)}
        >
            {
                defaultOptionName ? (
                    <Select.Option value={DEFAULT_VALUE} key={-1}>{defaultOptionName}</Select.Option>
                ) : null
            }
            {
                options?.map(option => (
                        <Select.Option value={option.id} key={option.id}>{option.name}</Select.Option>
                    ))
            }
        </Select>
    )
};
