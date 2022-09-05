import { ProjectListScreen } from 'screens/project-list';
import { useAuth } from 'context/auth-context';
import styled from '@emotion/styled';
import { StyledRow } from 'components/lib';
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg';
import { Dropdown, Menu, Button } from 'antd';

export const AuthenticatedApp = () => {
    const { logout, user } = useAuth();
    return (
        <Container>
            <Header between={true}>
                <HeaderLeft gap={true}>
                    <SoftwareLogo width={'18rem'} color={'rgb(38, 132, 255)'} />
                    <StyledRow>项目</StyledRow>
                    <StyledRow>用户</StyledRow>
                </HeaderLeft>
                <HeaderRight>
                    <Dropdown overlay={
                        <Menu items={[
                            {
                                label: (
                                    <Button type="link" onClick={logout}>
                                        登出
                                    </Button>
                                ),
                                key: 'logout'
                            }
                        ]} />
                    }>
                        <Button type="link">
                            Hi, {user?.name}
                        </Button>
                    </Dropdown>
                </HeaderRight>
            </Header>
            <Main>
                <ProjectListScreen />
            </Main>
        </Container>
    );
};

/**
 * grid 和 flex 各自的应用场景
 * 1. 要考虑，是一维布局 还是 二维布局
 * 一般来说，一维布局用flex，二维布局用grid
 * 2. 是从内容出发还是从布局出发？
 * 从内容出发：你先有一组内容(数量一般不固定),然后希望他们均匀的分布在容器中，由内容自己的大小决定占据的空间
 * 从布局出发：先规划网格(数量一般比较固定)，然后再把元素往里填充
 * 从内容出发，用flex
 * 从布局出发，用grid
 *
 */

const Container = styled.div`
display: grid;
grid-template-rows: 6rem 1fr;
height: 100vh;
`;

const Header = styled(StyledRow)`
padding: 3.2rem;
box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
z-index: 1;
`;

const HeaderLeft = styled(StyledRow)``;

const HeaderRight = styled.div``;

const Main = styled.main`
height: calc(100vh - 6rem);
`;
