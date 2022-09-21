import { useState } from 'react';
import { Input } from 'antd';
import { useProjectIdInUrl, useAddDashboard, useDashboardsQueryKey } from 'hooks/useDashboards';
import { Container } from 'screens/dashboard/dashboard-column';

export const CreateDashBoard = () => {
    const [name, setName] = useState('');
    const projectId = useProjectIdInUrl();
    const { mutateAsync } = useAddDashboard(useDashboardsQueryKey());

    const submit = async () => {
        await mutateAsync({name, projectId});
        setName('');
    };

    return (
        <Container>
            <Input
                size="large"
                placeholder="新建看板名称"
                onPressEnter={submit}
                value={name}
                onChange={evt => setName(evt.target.value)}
            />
        </Container>
    );
};
