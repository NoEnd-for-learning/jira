import { useUrlQueryParam, useSetUrlSearchParam } from 'hooks/useUrlQueryParam';
import { useProject } from 'hooks/useProjects';

export const useProjectModal = () => {
    const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
        'projectCreate',
    ]);
    const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
        'editingProjectId',
    ]);
    const { data: editingProject, isLoading } = useProject(Number(editingProjectId));
    const [, setSearchParams] = useSetUrlSearchParam();

    const open = () => setProjectCreate({projectCreate: true});
    const close = () => setSearchParams({
        projectCreate: undefined,
        editingProjectId: undefined,
    });
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
