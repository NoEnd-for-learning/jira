import {QueryKey, useMutation, useQuery} from "react-query";
import {Task, TaskType} from "interface/task";
import {useHttp} from "utils/http";
import { useDebounce } from 'hooks/useDebounce';
import {useAddConfig, useDeleteConfig, useEditConfig} from "hooks/use-optimistic-options";
import {useProjectIdInUrl} from "hooks/useDashboards";
import {useUrlQueryParam} from "hooks/useUrlQueryParam";
import {useCallback, useMemo} from "react";

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

export const useTask = (id?: number) => {
  const client = useHttp();
  return useQuery<Task>(
      [URL_PREFIX, {id}],
      () => client(`${URL_PREFIX}/${id}`),
      {
          enabled: Boolean(id),
      }
  );
};

export const useTasksModal = () => {
  const [{editingTaskId}, setEditingTaskId] = useUrlQueryParam(['editingTaskId']);
  const { data: editingTask, isLoading } = useTask(Number(editingTaskId));
  const startEdit = useCallback((id: number) => {
      setEditingTaskId({editingTaskId: id});
  }, [setEditingTaskId]);
  const close = useCallback(() => {
      setEditingTaskId({editingTaskId: undefined});
  }, [setEditingTaskId]);

  return {
      editingTaskId,
      editingTask,
      isLoading,
      startEdit,
      close,
  };
};

export const useEditTask = (queryKey: QueryKey) => {
    const client = useHttp();
    return useMutation(
        (params: Partial<Task>) =>
            client(`${URL_PREFIX}/${params.id}`, {
                method: 'PATCH',
                data: params,
            }),
        useEditConfig(queryKey),
    );
};

export const useDeleteTask = (queryKey: QueryKey) => {
    const client = useHttp();
    return useMutation(
        ({id}: {id: number}) => client(`${URL_PREFIX}/${id}`, {
            method: 'DELETE'
        }),
        useDeleteConfig(queryKey),
    );
};

