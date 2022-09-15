import { Project } from 'interface';
import { cleanObject } from 'utils';
import { useHttp } from 'utils/http';
import { useMutation, useQuery, useQueryClient } from 'react-query';

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

export const useEditProject = () => {
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
    const queryClient = useQueryClient();
    return useMutation((params: Partial<Project>) => {
        return client(`${URL_PREFIX}/${params.id}`, {
            data: params,
            method: 'PATCH',
        });
    }, {
        onSuccess: () => queryClient.invalidateQueries(URL_PREFIX),
    });
};

export const useAddProject = () => {
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
    const queryClient = useQueryClient();
    return useMutation((params: Partial<Project>) => {
        return client(`${URL_PREFIX}`, {
            data: {
                created: new Date().getTime(),
                ...params,
            },
            method: 'POST',
        });
    }, {
        onSuccess: () => queryClient.invalidateQueries(URL_PREFIX),
    });
};

export const useDeleteProject = () => {
    const client = useHttp();
    const queryClient = useQueryClient();
    return useMutation(
        ({ id }: { id: number }) =>
            client(`${URL_PREFIX}/${id}`, {
                method: 'DELETE',
            }), {
            onSuccess: () => queryClient.invalidateQueries(URL_PREFIX),
        }
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
