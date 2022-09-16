import { useMemo } from 'react';
import { Project } from 'interface';
import { cleanObject } from 'utils';
import { useHttp } from 'utils/http';
import { useMutation, useQuery, useQueryClient, QueryKey } from 'react-query';
import { useUrlQueryParam } from 'hooks/useUrlQueryParam';
import { useEditConfig, useAddConfig, useDeleteConfig } from 'hooks/use-optimistic-options';

const URL_PREFIX = 'projects'

export const useProjects = (param?: Partial<Project>) => {
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
        [URL_PREFIX, cleanObject(param || {})],
        () => {
            return client(URL_PREFIX, {
                data: param,
            });
        });
};

export const useEditProject = (queryKey: QueryKey) => {
    // const { run, ...result } = useAsync();
    // const client = useHttp();
    // const mutate = useCallback((params: Partial<Project>) => {
    //     return run(() => client(`projects/${params.id}`, {
    //         data: params,
    //         method: 'PATCH',
    //     }));
    // }, [run, client]);
    // return {
    //     ...result,
    //     mutate,
    // };

    const client = useHttp();
    return useMutation(
        (params: Partial<Project>) =>
            client(`${URL_PREFIX}/${params.id}`, {
                data: params,
                method: 'PATCH',
            }),
        useEditConfig(queryKey)
    );
};

export const useAddProject = (queryKey: QueryKey) => {
    // const { run, ...result } = useAsync();
    // const client = useHttp();
    // const mutate = useCallback((params: Partial<Project>) => {
    //     return run(() => client(`projects/${params.id}`, {
    //         data: params,
    //         method: 'POST',
    //     }));
    // }, [run, client]);
    // return {
    //     ...result,
    //     mutate,
    // };

    const client = useHttp();
    return useMutation(
        (params: Partial<Project>) =>
            client(`${URL_PREFIX}`, {
                data: {
                    created: new Date().getTime(),
                    ...params,
                },
                method: 'POST',
            }),
        useAddConfig(queryKey)
    );
};

export const useDeleteProject = (queryKey: QueryKey) => {
    const client = useHttp();
    return useMutation(
        (params: Partial<Project>) =>
            client(`${URL_PREFIX}/${params.id}`, {
                method: 'DELETE',
            }),
        useDeleteConfig(queryKey)
    );
};

export const useProject = (id?: number) => {
    const client = useHttp();
    return useQuery<Project>(
        [URL_PREFIX, {id}],
        () => client(`${URL_PREFIX}/${id}`),
        {
            enabled: Boolean(id), // !!id
        },
    );
};

// 项目列表搜索的参数
export const useProjectsSearchParams = () => {
    const [param, setParam] = useUrlQueryParam(["name", "personId"]);
    return [
        useMemo(
            () => ({ ...param, personId: Number(param.personId) || undefined }),
            [param]
        ),
        setParam,
    ] as const;
};

export const useProjectsQueryKey = () => {
    const [params] = useProjectsSearchParams();
    return [URL_PREFIX, params];
};
