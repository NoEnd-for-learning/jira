import {useQuery} from "react-query";
import {useLocation} from "react-router";
import {Dashboard} from "interface/dashboard";
import {useHttp} from "utils/http";
import {cleanObject} from "utils";
import {useProject} from "hooks/useProjects";
import {useUrlQueryParam} from "./useUrlQueryParam";
import {useMemo} from "react";

const URL_PREFIX = 'kanbans';

export const useDashboards = (param?: Partial<Dashboard>) => {
    const client = useHttp();
    return useQuery<Dashboard[], Error>(
        [URL_PREFIX, cleanObject(param || {})],
        () => {
            return client(URL_PREFIX, {
                data: param,
            });
        });
};

export const useProjectIdInUrl = () => {
    const { pathname } = useLocation();
    const id = pathname.match(/projects\/(\d+)/)?.[1];
    // return Number(id);
    return undefined;
};

export const useProjectInUrl = () => useProject(useProjectIdInUrl());

export const useDashboardSearchParams = () => ({projectId: useProjectIdInUrl()});

export const useDashboardsQueryKey = () => [URL_PREFIX, useDashboardSearchParams()];

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
    }), [param]);
};

export const useTasksQueryKey = () => [URL_PREFIX, useTasksSearchParams()];
