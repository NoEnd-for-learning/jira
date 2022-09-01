import { useCallback, useState } from 'react';

type AsyncFn = () => Promise<any>;
export interface AsyncResponse {
    execute: () => Promise<any>,
    data: any,
    loading: boolean,
    error: any,
}

export function useAsync(asyncFn: AsyncFn, initialValue: any, isFetch = true): AsyncResponse {
    const [data, setData] = useState(initialValue);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // 定义一个callback 用于执行异步逻辑
    const execute = useCallback(() => {
        setData(initialValue);
        setLoading(true);
        setError(null);
        let promise = isFetch ? asyncFn().then(r => r.json()) : asyncFn();
        return promise
            .then((response) => {
                setData(response)
            })
            .catch((e: any) => {
                setError(e);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [asyncFn, initialValue, isFetch]);

    return { execute, data, loading, error };
}
