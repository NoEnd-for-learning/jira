import { useAPI } from 'hooks/useAPI';
import { Project } from 'interface';
import { useEffect } from 'react';
import { cleanObject } from 'utils';
import { useHttp } from 'utils/http';

export const useProject = (param?: Partial<Project>) => {
    const { run, ...result } = useAPI<Project[]>();
    const client = useHttp();

    useEffect(() => {
        run(
            client(
                'projects',
                {data: cleanObject(param || {})}
            )
        );
        // eslint-disable-next-line
    }, [param]);

    return result;
};
