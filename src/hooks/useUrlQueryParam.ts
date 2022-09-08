import { useSearchParams, URLSearchParamsInit } from 'react-router-dom';
import {useCallback, useMemo, useState} from 'react';
import { cleanObject } from 'utils';

/**
 * 返回页面url中，指定键的参数值
 */
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
    const [stateKeys] = useState(keys); // 或者 const stateKeys = useRef(keys).current;
    const [searchParams, setSearchParams] = useSetUrlSearchParam();
    const params = useMemo(() => stateKeys.reduce((prev, key) => {
        return {...prev, [key]: searchParams.get(key) || ''};
    }, {} as {[key in K]: string}), [searchParams, stateKeys]);

    return [
        params,
        useCallback((params: Partial<{ [key in K]: unknown }>) => {
            return setSearchParams(params);
        }, [setSearchParams]),
    ] as const; // 注意 as const 的妙用
};

export const useSetUrlSearchParam = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    return [
        searchParams,
        useCallback((params: { [key in string]: unknown }) => {
            const o = cleanObject({
                ...Object.fromEntries(searchParams),
                ...params,
            }) as URLSearchParamsInit;
            return setSearchParams(o);
        }, [searchParams, setSearchParams]),
    ] as const;
};
