import { Popover, Typography, List, Divider } from 'antd';
import styled from '@emotion/styled';
import { useProjects } from 'hooks/useProjects';
import { useProjectModal } from 'hooks/useProjectModal';
import { ButtonNoPadding } from 'components/lib';

export const ProjectPopover = () => {
    const { open } = useProjectModal();
    const { data: projects, refetch } = useProjects();
    const pinnedProjects = projects?.filter(project => project.pin);
    const content = <ContentContainer>
        <Typography.Text type="secondary">收藏项目</Typography.Text>
        <List>
            {
                pinnedProjects?.map(project => (
                    <List.Item key={project.id}>
                        <List.Item.Meta title={project.name} />
                    </List.Item>
                ))
            }
        </List>
        <Divider />
        <ButtonNoPadding type="link"
                         onClick={open}
        >创建项目</ButtonNoPadding>
    </ContentContainer>;
    return (
        <Popover placement="bottom"
                 content={content}
                 onVisibleChange={() => refetch()}
        >
            项目
        </Popover>
    );
};

const ContentContainer = styled.div`
min-width: 20rem;
`
