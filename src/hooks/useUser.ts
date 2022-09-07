import { useAPI } from 'hooks/useAPI';
import { User } from 'interface';
import {useEffect, useRef} from 'react';
import { cleanObject } from 'utils';
import { useHttp } from 'utils/http';

export const useUser = (param?: Partial<User>) => {
    const result = useAPI<User[]>();
    const run = useRef(result.run).current; // 持久化 run
    const client = useRef(useHttp()).current; // 持久化 client

    useEffect(() => {
        run(
            client(
                'users',
                {data: cleanObject(param || {})}
            )
        );
    }, [param, run, client]);

    return result;
};
