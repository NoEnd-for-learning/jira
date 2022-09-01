import { useState } from 'react';

// 学习泛型约束 T
export const useArray = <T>(initialValue: T[]) => {
    const [value, setValue] = useState(initialValue);
    return {
        value,
        setValue,
        add: (item: T) => setValue([...value, item]),
        clear: () => setValue([]),
        removeIndex: (index: number) => {
            const copy = [...value];
            copy.splice(index, 1);
            setValue(copy);
        }
    };
};
