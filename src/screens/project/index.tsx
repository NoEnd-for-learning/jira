import { Routes, Route, Navigate, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import styled from "@emotion/styled";
import { Dashboard } from 'screens/dashboard';
import { EpicScreen } from 'screens/epic';
import { Menu } from 'antd';

const useRouteType = () => {
    const units = useLocation().pathname.split("/");
    return units[units.length - 1];
};

export const ProjectScreen = () => {
    const routeType = useRouteType();
    return (
        <Container>
            <Aside>
                <Menu
                    mode={"inline"}
                    selectedKeys={[routeType]}
                    items={[
                        {
                            label: <Link to="dashboard">看板</Link>,
                            key: 'dashboard',
                        },
                        {
                            label: <Link to="epic">任务组</Link>,
                            key: 'epic',
                        },
                    ]}
                />
            </Aside>
            <Main>
                <Routes>
                    {/* /projects/:projectId/dashboard */}
                    <Route path="/dashboard" element={<Dashboard/>} />
                    {/* /projects/:projectId/epic */}
                    <Route path="/epic" element={<EpicScreen/>} />

                    {/* 默认路由 */}
                    <Route path="/*" element={<Navigate to="dashboard" replace={true} />} />
                </Routes>
            </Main>
        </Container>
    );
};

const Aside = styled.aside`
background-color: rgb(244, 245, 247);
display: flex;
`;

const Main = styled.div`
box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
display: flex;
overflow: hidden;
`;

const Container = styled.div`
display: grid;
grid-template-columns: 16rem 1fr;
width: 100%;
`;
