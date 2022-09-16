import {useQuery} from "react-query";
import {Dashboard} from "interface/dashboard";
import {useHttp} from "utils/http";
import {cleanObject} from "utils";

const URL_PREFIX = 'kanbans';

export const useDashboard = (param?: Partial<Dashboard>) => {
    const client = useHttp();
    return useQuery<Dashboard[], Error>(
        [URL_PREFIX, cleanObject(param || {})],
        () => {
            return client(URL_PREFIX, {
                data: param,
            });
        });
};
