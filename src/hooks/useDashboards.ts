import {QueryKey, useMutation, useQuery} from "react-query";
import {useLocation} from "react-router";
import {Dashboard} from "interface/dashboard";
import {useHttp} from "utils/http";
import {cleanObject} from "utils";
import {useProject} from "hooks/useProjects";
import {useAddConfig} from "hooks/use-optimistic-options";

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
    return Number(id);
    // return undefined;
};

export const useProjectInUrl = () => useProject(useProjectIdInUrl());

export const useDashboardSearchParams = () => ({projectId: useProjectIdInUrl()});

export const useDashboardsQueryKey = () => [URL_PREFIX, useDashboardSearchParams()];

export const useAddDashboard = (queryKey: QueryKey) => {
    const client = useHttp();
    return useMutation(
        (params: Partial<Dashboard>) =>
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
