import {useEffect, useState} from 'react';

export function useDebounce<V>(value: V, delay: number) {
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        // 每次在value 变化以后，设置一个定时器
        const timeout = window.setTimeout(() => setDebounceValue(value), delay);
        // 每次在上一个useEffect处理完成后（销毁时）再运行
        return () => window.clearTimeout(timeout);
    }, [value, delay]);

    return debounceValue;
}
