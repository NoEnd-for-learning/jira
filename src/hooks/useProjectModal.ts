import { useUrlQueryParam } from 'hooks/useUrlQueryParam';

export const useProjectModal = () => {
    const [{ projectCreate }, setProjectModal] = useUrlQueryParam([
        'projectCreate',
    ]);

    const open = () => setProjectModal({projectCreate: true});
    const close = () => setProjectModal({projectCreate: undefined});

    return {
        visible: projectCreate === 'true',
        open,
        close,
    } as const;
};
