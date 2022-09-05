import { useAPI } from 'hooks/useAPI';
import { User } from 'interface';
import { useEffect } from 'react';
import { cleanObject } from 'utils';
import { useHttp } from 'utils/http';

export const useUser = (param?: Partial<User>) => {
    const { run, ...result } = useAPI<User[]>();
    const client = useHttp();

    useEffect(() => {
        run(
            client(
                'users',
                {data: cleanObject(param || {})}
            )
        );
        // eslint-disable-next-line
    }, [param]);

    return result;
};
