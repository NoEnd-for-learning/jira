import { Routes, Route, Navigate } from 'react-router';
import { Link } from 'react-router-dom';
import { Dashboard } from 'screens/dashboard';
import { Epic } from 'screens/epic';

export const ProjectScreen = () => {
    return (
        <div>
            <h1>Project Screen</h1>
            <Link to="dashboard">看板</Link>
            <Link to="epic">任务组</Link>
            <Routes>
                {/* /projects/:projectId/dashboard */}
                <Route path="/dashboard" element={<Dashboard/>} />
                {/* /projects/:projectId/epic */}
                <Route path="/epic" element={<Epic/>} />

                {/* 默认路由 */}
                <Route path="/*" element={<Navigate to="dashboard" />} />
            </Routes>
        </div>
    );
}