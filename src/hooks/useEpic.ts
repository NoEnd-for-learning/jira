import { useHttp } from 'utils/http';
import { QueryKey, useMutation, useQuery } from 'react-query';
import { Epic } from 'interface/epic';
import {
    useAddConfig,
    useDeleteConfig,
} from 'hooks/use-optimistic-options';
import { useProjectIdInUrl } from 'hooks/useDashboards';

const URL_PREFIX = 'epics';

export const useEpics = (param?: Partial<Epic>) => {
    const client = useHttp();

    return useQuery<Epic[]>([URL_PREFIX, param], () => client(URL_PREFIX, {data: param}));
};

export const useAddEpic = (queryKey: QueryKey) => {
    const client = useHttp();

    return useMutation(
        (param: Partial<Epic>) => client(URL_PREFIX, {
            data: param,
            method: 'POST',
        }),
        useAddConfig(queryKey)
    );
};

export const useDeleteEpic = (queryKey: QueryKey) => {
    const client = useHttp();

    return useMutation(
        ({id}: {id: number}) => client(`${URL_PREFIX}/${id}`, {
            method: 'DELETE',
        }),
        useDeleteConfig(queryKey)
    );
};

export const useEpicSearchParams = () => ({projectId: useProjectIdInUrl()});

export const useEpicsQueryKey = () => [URL_PREFIX, useEpicSearchParams()];
