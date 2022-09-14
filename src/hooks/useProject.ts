import { useAsync } from 'hooks/useAsync';
import { Project } from 'interface';
import { useCallback } from 'react';
import { cleanObject } from 'utils';
import { useHttp } from 'utils/http';
import { useQuery } from 'react-query';

export const useProject = (param?: Partial<Project>) => {
    // const { run, ...result } = useAsync<Project[]>();
    // const client = useHttp();
    // const fetchProject = useCallback(() => client(
    //     'projects',
    //     {data: cleanObject(param || {})}
    // ), [client, param]);
    //
    // useEffect(() => {
    //     run(fetchProject);
    // }, [run, fetchProject]);
    //
    // return result;

    const client = useHttp();
    return useQuery<Project[], Error>(
        ['projects', cleanObject(param || {})],
        () => client('projects', {
            data: param,
        }));
};

export const useEditProject = () => {
    const { run, ...result } = useAsync();
    const client = useHttp();
    const mutate = useCallback((params: Partial<Project>) => {
        return run(() => client(`projects/${params.id}`, {
            data: params,
            method: 'PATCH',
        }));
    }, [run, client]);
    return {
        ...result,
        mutate,
    };
};

export const useAddProject = () => {
    const { run, ...result } = useAsync();
    const client = useHttp();
    const mutate = useCallback((params: Partial<Project>) => {
        return run(() => client(`projects/${params.id}`, {
            data: params,
            method: 'POST',
        }));
    }, [run, client]);
    return {
        ...result,
        mutate,
    };
};
