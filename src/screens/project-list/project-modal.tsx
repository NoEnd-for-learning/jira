import { ComponentProps } from 'react';
import { Drawer, Button } from 'antd';

export const ProjectModal = (props: ComponentProps<typeof Drawer>) => {
    return (
        <Drawer {...props}
                width={'100%'}
        >
            <h1>Project Modal</h1>
            <Button onClick={props?.onClose}>关闭</Button>
        </Drawer>
    );
}