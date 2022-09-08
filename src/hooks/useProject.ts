import { useAsync } from 'hooks/useAsync';
import { Project } from 'interface';
import {useEffect, useRef} from 'react';
import { cleanObject } from 'utils';
import { useHttp } from 'utils/http';

export const useProject = (param?: Partial<Project>) => {
    const result = useAsync<Project[]>();
    const run = useRef(result.run).current; // 持久化 run
    const client = useRef(useHttp()).current; // 持久化 client

    useEffect(() => {
        run(() => client(
            'projects',
            {data: cleanObject(param || {})}
        ));
    }, [param, run, client]);

    return result;
};

export const useEditProject = () => {
    const { run, ...asyncResult } = useAsync();
    const runRef = useRef(run).current;
    const client = useRef(useHttp()).current;
    const mutate = (params: Partial<Project>) => {
        return runRef(() => client(`projects/${params.id}`, {
            data: params,
            method: 'PATCH',
        }));
    };
    return {
        ...asyncResult,
        mutate,
    };
};

export const useAddProject = () => {
    const { run, ...asyncResult } = useAsync();
    const runRef = useRef(run).current;
    const client = useRef(useHttp()).current;
    const mutate = (params: Partial<Project>) => {
        return runRef(() => client(`projects/${params.id}`, {
            data: params,
            method: 'POST',
        }));
    };
    return {
        ...asyncResult,
        mutate,
    };
};
