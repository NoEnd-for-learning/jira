import { useAuth } from 'context/auth-context';
import { FullPageLoading } from 'components/lib';
import 'App.css';
import { Suspense, lazy } from 'react';

// React 代码分割：Suspense
const AuthenticatedApp = lazy(() => import('authenticated-app')); // 默认 export default 导出组件
const UnauthenticatedApp = lazy(() => import('unauthenticated-app'));

function App() {
    const { user } = useAuth();
    return (
        <div className="App">
                <Suspense fallback={<FullPageLoading />}>
                {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
            </Suspense>
        </div>
    );
}

export default App;
