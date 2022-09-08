import {useState, useCallback, useRef} from 'react';

interface State<D> {
    error: Error | null,
    data: D | null,
    stat: 'idle' | 'loading' | 'error' | 'success',
}

const defaultInitialState: State<null> = {
    stat: 'idle',
    data: null,
    error: null,
};

const defaultConfig = {
  throwOnError: false,
};

export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
    const config = {...defaultConfig, ...initialConfig};
    const [state, setState] = useState<State<D>>({
        ...defaultInitialState,
        ...initialState,
    });
    const [fn ,setFn] = useState<() => Promise<D>>();

    const setData = (data: D) => setState({
        data,
        stat: 'success',
        error: null,
    });

    const setError = (error: Error) => setState({
        data: null,
        stat: 'error',
        error,
    });

    const run = (request: () => Promise<D>) => {
        if(typeof request !== 'function' || !request().then) {
            throw new Error(`请传入 () => Promise<D> 类型函数`);
        }

        setState({...state, stat: 'loading'});

        return request().then((data) => {
            // 这里的入参为【返回函数】的函数，因为当setState 的入参为一个函数时，react 会懒初始化，
            // 即执行该入参函数，返回结果（函数）才是真正保存的数据.
            // 编辑后刷新-useState的懒初始化与保存函数状态
            setFn(() => () => request());
            setData(data);
            return data;
        }).catch(err => {
            setError(err);
            if (config.throwOnError) {
                return Promise.reject(err)
            } else {
                return err;
            }
        });
    };

    const runRef = useRef(run).current;
    const retry = useCallback(() => {
        typeof fn === 'function' && runRef(fn);
    }, [runRef, fn]);

    return {
        isIdle: state.stat === 'idle',
        isLoading: state.stat === 'loading',
        isError: state.stat === 'error',
        isSuccess: state.stat === 'success',
        run,
        setData,
        setError,
        // retry 被调用时，重新调用一遍run 方法，更新state
        retry,
        ...state,
    };
};