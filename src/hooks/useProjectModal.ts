import { useUrlQueryParam } from 'hooks/useUrlQueryParam';
import { useProject } from 'hooks/useProjects';

export const useProjectModal = () => {
    const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
        'projectCreate',
    ]);
    const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
        'editingProjectId',
    ]);
    const { data: editingProject, isLoading } = useProject(Number(editingProjectId));

    const open = () => setProjectCreate({projectCreate: true});
    const close = () => {
        if(editingProjectId) {
            setProjectCreate({projectCreate: undefined});
            setEditingProjectId({editingProjectId: undefined});
        } else {
            setEditingProjectId({editingProjectId: undefined});
            setProjectCreate({projectCreate: undefined});
        }
    }
    const startEdit = (id: number) => setEditingProjectId({editingProjectId: id});

    return {
        visible: projectCreate === 'true' || Boolean(editingProjectId),
        open,
        close,
        editingProject,
        isLoading,
        startEdit,
    } as const;
};
