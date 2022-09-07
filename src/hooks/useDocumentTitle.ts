import { useEffect, useRef } from 'react';

/**
 * useRef
 * 1.返回一个可变的 ref 对象，其.current 属性被初始化为传入的参数（initialValue）;
 * 2.返回的ref 对象在组件的整个声明周期内保持不变。
 */

export const useDocumentTitle = (title: string, keepOnUnmount = false) => {
    // const oldTitle = document.title; // 这里不适合直接赋值，因为引用有可能变化
    const oldTitle = useRef(document.title).current; // 语义明确，并且值跟组件生命周期绑定了

    useEffect(() => {
        document.title = title;
    }, [title]);

    useEffect(() => {
        return () => {
          if(!keepOnUnmount) {
              document.title = oldTitle;
          }
        };
    }, [keepOnUnmount, oldTitle]);
};
