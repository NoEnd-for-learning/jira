import { useAsync } from 'hooks/useAsync';
import {renderHook} from "@testing-library/react";
import {act} from "react-dom/test-utils";

const defaultState: ReturnType<typeof useAsync> = {
    stat: 'idle',
    data: null,
    error: null,

    isIdle: true,
    isLoading: false,
    isError: false,
    isSuccess: false,
    // 次要
    run: expect.any(Function),
    retry: expect.any(Function),
    setData: expect.any(Function),
    setError: expect.any(Function),
};

const loadingState: ReturnType<typeof useAsync> = {
    ...defaultState,
    stat: 'loading',
    isIdle: false,
    isLoading: true,
};

const successState: ReturnType<typeof useAsync> = {
    ...defaultState,
    stat: 'success',
    isIdle: false,
    isSuccess: true,
};

test('useAsync 可以异步处理', async () => {
   let resolve: any, reject: any;
   const promise = new Promise((res, rej) => {
       resolve = res;
       reject = rej;
   });
   const { result } = renderHook(() => useAsync());
   expect(result.current).toEqual(defaultState);

   let p: Promise<any>;
   act(() => {
       p = result.current.run(() => promise);
   });
   expect(result.current).toEqual(loadingState);

   const resolvedValue = { mockValue: 'resolved' };
   await act(async () => {
      resolve(resolvedValue);
      await p;
   });
   expect(result.current).toEqual({
      ...successState,
      data: resolvedValue,
   });
});
