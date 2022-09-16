import {useQuery} from "react-query";
import {Task} from "interface/task";
import {useHttp} from "utils/http";
import {cleanObject} from "utils";

const URL_PREFIX = 'tasks';

export const useTasks = (param?: Partial<Task>) => {
    const client = useHttp();
    return useQuery<Task[], Error>(
        [URL_PREFIX, cleanObject(param || {})],
        () => {
            return client(URL_PREFIX, {
                data: param,
            });
        });
};
