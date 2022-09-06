import {Component, PropsWithChildren, ReactElement, ReactNode} from 'react';

type FallbackRender = (props: {error: Error | null}) => ReactElement;

// https://github.com/bvaughn/react-error-boundary
export class ErrorBoundary extends Component<PropsWithChildren<{
    fallbackRender: FallbackRender,
}>, { error: Error | null }>{
    state = {
        error: null,
    };
    // 当子组件抛出异常，这里会接收到并调用
    static getDerivedStateFromError(error: Error) {
        return { error };
    }

    render() {
        const { error } = this.state;
        const { fallbackRender, children } = this.props;
        if(error) {
            return fallbackRender({error});
        }
        return children;
    }
}
