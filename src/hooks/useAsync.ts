import {useState, useCallback, useRef} from 'react';
import { useMountedRef } from 'hooks/useMountedRef';

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
    const mountedRef = useMountedRef();

    const setData = useCallback((data: D) => setState({
        data,
        stat: 'success',
        error: null,
    }), []);

    const setError = useCallback((error: Error) => setState({
        data: null,
        stat: 'error',
        error,
    }), []);

    const run = useCallback((request: () => Promise<D>) => {
        if(typeof request !== 'function') {
            throw new Error(`请传入 () => Promise<D> 类型函数`);
        }
        const promise = request();
        if(!promise.then) {
            throw new Error(`请传入 () => Promise<D> 类型函数`);
        }

        setState(prevState => ({...prevState, stat: 'loading'})); // 重要用法，避免函数依赖state

        return promise.then((data) => {
            // 这里的入参为【返回函数】的函数，因为当setState 的入参为一个函数时，react 会懒初始化，
            // 即执行该入参函数，返回结果（函数）才是真正保存的数据.
            // 编辑后刷新-useState的懒初始化与保存函数状态
            setFn(() => () => request());
            if(mountedRef.current) {
                setData(data); // 阻止在已卸载的组件上赋值
            }
            return data;
        }).catch(err => {
            setError(err);
            if (config.throwOnError) {
                return Promise.reject(err)
            } else {
                return err;
            }
        });
        // 这里的state，在run 内部又setState, 会陷入无限循环，处理：函数体内部，不使用state 依赖
        // 使用回调函数获取state，即：setState(prevState => ({...}));
    }, [config.throwOnError, mountedRef, setData, setError]);

    const retry = useCallback(() => {
        typeof fn === 'function' && run(fn);
    }, [run, fn]);

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