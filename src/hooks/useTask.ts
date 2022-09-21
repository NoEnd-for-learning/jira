import {QueryKey, useMutation, useQuery} from "react-query";
import {Task, TaskType} from "interface/task";
import {useHttp} from "utils/http";
import { useDebounce } from 'hooks/useDebounce';
import {useAddConfig} from "hooks/use-optimistic-options";
import {useProjectIdInUrl} from "hooks/useDashboards";
import {useUrlQueryParam} from "hooks/useUrlQueryParam";
import {useMemo} from "react";

const URL_PREFIX = 'tasks';

export const useTasks = (param?: Partial<Task>) => {
    const client = useHttp();
    const debouncedParam = { ...param, name: useDebounce(param?.name, 200) };
    return useQuery<Task[], Error>(
        [URL_PREFIX, debouncedParam],
        () => {
            return client(URL_PREFIX, {
                data: debouncedParam,
            });
        });
};

export const useTaskTypes = () => {
    const client = useHttp();

    return useQuery<TaskType[]>(['taskTypes'], () =>
        client('taskTypes')
    );
};

export const useAddTask = (queryKey: QueryKey) => {
    const client = useHttp();
    return useMutation(
        (params: Partial<Task>) =>
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

export const useTasksQueryKey = () => [URL_PREFIX, useTasksSearchParams()];

export const useTasksSearchParams = () => {
    const [param] = useUrlQueryParam([
        'typeId',
        'processorId',
        'tagId',
        'name',
    ]);
    const projectId = useProjectIdInUrl();
    return useMemo(() => ({
        projectId,
        typeId: Number(param.typeId) || undefined,
        processorId: Number(param.processorId) || undefined,
        tagId: Number(param.tagId) || undefined,
        name: param.name,
    }), [projectId, param]);
};
