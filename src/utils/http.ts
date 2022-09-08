import qs from 'qs';
import { FetchConfig } from 'interface';
import * as auth from 'auth-provider';
import {useAuth} from 'context/auth-context';
import {useCallback} from "react";

const apiUrl = process.env['REACT_APP_API_URL'];

export const http = async (endpoint: string, { token, data, headers, ...customConfig }: FetchConfig = {}) => {
    const config = {
        method: 'GET',
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': data ? 'application/json' : '',
            ...headers,
        },
        ...customConfig,
    };
    if(config.method.toUpperCase() === 'GET') {
        data && (endpoint += `?${qs.stringify(data)}`);
    } else {
        config.body = JSON.stringify(data || {});
    }
    // axios 和 fetch 的表现不一样，axios 可以直接在返回状态不为 2xx 的时候抛出异常
    return window.fetch(`${apiUrl}/${endpoint}`, config)
        .then(async(response) => {
            if(response.status === 401) {
                await auth.logout();
                window.location.reload();
                return Promise.reject({message: '请重新登录'});
            }
            const res = await response.json();
            if(response.ok) {
                return res;
            } else {
                return Promise.reject(res);
            }
        });
};

export const useHttp = () => {
  const { user } = useAuth();
  // 这里的 Parameters<typeof http> 等价于 [string, FetchConfig]
  return useCallback((...[endpoint, config]: Parameters<typeof http>) =>
      http(endpoint, {...config, token: user?.token}), [user?.token]);
};
