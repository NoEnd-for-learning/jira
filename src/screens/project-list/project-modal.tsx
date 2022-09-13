import { ComponentProps } from 'react';
import { Drawer, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { projectListActions, selectProjectModalOpen } from 'store/project-list.slice';


export const ProjectModal = (props: ComponentProps<typeof Drawer>) => {
    const dispatch = useDispatch();
    // 利用 useSelector() 读取根状态树中的状态
    const projectModalOpen = useSelector(selectProjectModalOpen);
    return (
        <Drawer {...props}
                width={'100%'}
                onClose={() => {
                    dispatch(projectListActions.close({}));
                }}
                visible={projectModalOpen}
        >
            <h1>Project Modal</h1>
            <Button onClick={() => dispatch(projectListActions.close({}))}>关闭</Button>
        </Drawer>
    );
}