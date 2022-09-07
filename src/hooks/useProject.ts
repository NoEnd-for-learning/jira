import { useAPI } from 'hooks/useAPI';
import { Project } from 'interface';
import {useEffect, useRef} from 'react';
import { cleanObject } from 'utils';
import { useHttp } from 'utils/http';

export const useProject = (param?: Partial<Project>) => {
    const result = useAPI<Project[]>();
    const run = useRef(result.run).current; // 持久化 run
    const client = useRef(useHttp()).current; // 持久化 client

    useEffect(() => {
        run(
            client(
                'projects',
                {data: cleanObject(param || {})}
            )
        );
    }, [param, run, client]);

    return result;
};
