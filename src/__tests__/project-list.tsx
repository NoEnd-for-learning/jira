import { setupServer } from 'msw/node';
import { rest } from 'msw';
import fakeData from './db.json';
import { render, screen, waitFor } from '@testing-library/react';
import { AppProviders } from 'context';
import { ProjectListScreen } from 'screens/project-list';
import { ReactNode } from 'react';

const apiUrl = process.env.REACT_APP_API_URL;
const fakeAuth = {
    id: 1,
    name: 'jira',
    token: '123'
};

const server = setupServer(
    rest.get(`${apiUrl}/me`, (req, res, context) => {
        return res(context.json(fakeAuth));
    }),
    rest.get(`${apiUrl}/users`, ((req, res, context) => {
        return res(context.json(fakeData.users));
    })),
    rest.get(`${apiUrl}/projects`, ((req, res, context) => {
        const { name = '', personId = undefined } = Object.fromEntries(req.url.searchParams);
        const result = fakeData?.projects?.filter(project => {
            return project.name.includes(name) && (personId ? project.personId === Number(personId) : true);
        });
        return res(context.json(result));
    }))
);

beforeAll(() => server.listen());

afterAll(() => server.resetHandlers());

afterAll(() => server.close());

const waitTable = () => waitFor(() => expect(screen.getByText('骑手管理')).toBeInTheDocument(), {
    timeout: 2000,
});

test('搜索项目', async () => {
    renderScreen(<ProjectListScreen />, { route: '/projects?name=骑手' });
    await waitTable();
    expect(screen.getAllByRole('row').length).toBe(2);
    expect(screen.getByText('骑手管理')).toBeInTheDocument();
});

test('项目列表显示正常', async () => {
    renderScreen(<ProjectListScreen />);
    await waitTable();
    expect(screen.getAllByRole('row').length).toBe(fakeData.projects.length + 1);
});

export const renderScreen = (ui: ReactNode, {route ='/projects'} = {}) => {
    if(route) {
        window.history.pushState({}, 'Test Page', route);
    }
    return render(<AppProviders>{ui}</AppProviders>)
};
