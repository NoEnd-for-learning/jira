import { useAsync } from 'hooks/useAsync';
import { User } from 'interface';
import {useEffect, useRef} from 'react';
import { cleanObject } from 'utils';
import { useHttp } from 'utils/http';

export const useUser = (param?: Partial<User>) => {
    const result = useAsync<User[]>();
    const run = useRef(result.run).current; // 持久化 run
    const client = useRef(useHttp()).current; // 持久化 client

    useEffect(() => {
        run(() => client(
            'users',
            {data: cleanObject(param || {})}
        ));
    }, [param, run, client]);

    return result;
};
