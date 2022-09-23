import { Popover, Typography, List } from 'antd';
import { useUser } from 'hooks/useUser';
import styled from "@emotion/styled";

export const UserPopover = () => {
    const { data: users, refetch } = useUser();
    const content = <ContentContainer>
        <Typography.Text type="secondary">组员列表</Typography.Text>
        <List>
            {
                users?.map(user => (
                    <List.Item key={user.id}>
                        <List.Item.Meta title={user.name} />
                    </List.Item>
                ))
            }
        </List>
    </ContentContainer>;
    return (
        <Popover placement="bottom"
                 content={content}
                 onVisibleChange={() => refetch()}
        >
            组员
        </Popover>
    );
};

const ContentContainer = styled.div`
min-width: 20rem;
`