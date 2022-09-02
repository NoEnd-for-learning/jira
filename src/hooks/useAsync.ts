import { useCallback, useState } from 'react';

type AsyncFn = () => Promise<any>;
export type AsyncResponse = [
    () => Promise<any>, // execute
    any, // data
    boolean, // loading
    any, // error
]

export function useAsync(asyncFn: AsyncFn, initialValue: any): AsyncResponse {
    const [data, setData] = useState(initialValue);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // 定义一个callback 用于执行异步逻辑
    const execute = useCallback(() => {
        setData(initialValue);
        setLoading(true);
        setError(null);
        return asyncFn()
            .then((response) => {
                setData(response)
            })
            .catch((e: any) => {
                setError(e);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [asyncFn, initialValue]);

    // 这里使用 tuple
    // tuple 是 "数量固定，类型可以各异" 版的数组
    return [execute, data, loading, error];
}
