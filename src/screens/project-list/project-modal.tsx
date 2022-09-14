import { ComponentProps } from 'react';
import { Drawer, Button } from 'antd';
import { useProjectModal } from 'hooks/useProjectModal';

export const ProjectModal = (props: ComponentProps<typeof Drawer>) => {
    const { visible, close } = useProjectModal();
    return (
        <Drawer {...props}
                width={'100%'}
                visible={visible}
                onClose={close}
        >
            <h1>Project Modal</h1>
            <Button onClick={close}>关闭</Button>
        </Drawer>
    );
}