import { useAsync } from 'hooks/useAsync';
import { useCallback, useEffect } from 'react';
import { cleanObject } from 'utils';
import { useHttp } from 'utils/http';
import { User } from 'interface/user';

export const useUser = (param?: Partial<User>) => {
    const { run, ...result } = useAsync<User[]>();
    const client = useHttp();
    const fetchUser = useCallback(() => client(
        'users',
        {data: cleanObject(param || {})}
    ), [client, param]);

    useEffect(() => {
        run(fetchUser);
    }, [run, fetchUser]);

    return result;
};
