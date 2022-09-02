import { ProjectListScreen } from 'screens/project-list';
import { useAuth } from 'context/auth-context';

export const AuthenticatedApp = () => {
    const { logout } = useAuth();
    return (
        <div className="authenticated-app">
            <button onClick={() => logout()} style={{float: "right"}}>登出</button>
            <ProjectListScreen />
        </div>
    );
};
