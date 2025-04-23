jest.mock('task_module/TaskList', () => ({
    __esModule: true,
    default: () => <div data-testid="task-list">Mock TaskList</div>
}));

jest.mock('ui_components/components', () => ({
    Loader: () => <div data-testid="loader">Loading...</div>
}));

jest.mock('./components/Auth/Auth', () => ({
    __esModule: true,
    default: () => <div>Mock Auth</div>
}));
jest.mock('./pages/Create/CreatePage', () => ({
    __esModule: true,
    default: () => <div data-testid="create-page">Create Page Mock</div>
}));
import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { GET_TASKS, LOGIN_CHECK } from './utils/gql';


const mockTasks = [
    { id: 1, name: 'Task 1', title: 'Title 1', status: 'inProgress' }
];

const mocks = [
    {
        request: { query: LOGIN_CHECK, variables: { token: 'test-token' } },
        result: { data: { loginCheck: true } }
    },
    {
        request: { query: GET_TASKS },
        result: { data: { tasks: mockTasks } }
    }
];

describe('App Component', () => {
    beforeEach(() => {
        jest.mock('./components/Auth/helpers', () => ({
            getToken: jest.fn().mockReturnValue('test-token'),
            clearToken: jest.fn()
        }));
    });

    it('should show loader while loading', async () => {
        render(
            <MemoryRouter>
                <MockedProvider mocks={mocks} addTypename={false}>
                    <App />
                </MockedProvider>
            </MemoryRouter>
        );

        expect(screen.getByTestId('loader')).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.queryByTestId('loader')).toBeNull();
        });
    });

    it('should render TaskList with data', async () => {
        render(
            <MemoryRouter>
                <MockedProvider mocks={mocks} addTypename={false}>
                    <App />
                </MockedProvider>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByTestId('task-list')).toBeInTheDocument();
        });
    });
});

describe('App Auth Flow', () => {
    it('should handle failed login check', async () => {
        const errorMocks = [
            {
                request: { query: LOGIN_CHECK, variables: { token: 'test-token' } },
                error: new Error('Auth error')
            }
        ];

        render(
            <MemoryRouter>
                <MockedProvider mocks={errorMocks} addTypename={false}>
                    <App />
                </MockedProvider>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/Error :/i)).toBeInTheDocument();
        });
    });

    it('should set auth context on successful login', async () => {
        render(
            <MemoryRouter>
                <MockedProvider mocks={mocks} addTypename={false}>
                    <App />
                </MockedProvider>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByTestId('task-list')).toBeInTheDocument();
        });
    });
});

describe('App Routing', () => {
    beforeEach(() => {
        jest.mock('./pages/Create/CreatePage', () => ({
            __esModule: true,
            default: () => <div data-testid="create-page">Create Page Mock</div>
        }));
    });

    it('should render create page on /create route', async () => {
        const { default: App } = await import('./App');

        render(
            <MemoryRouter initialEntries={['/create']}>
                <MockedProvider mocks={mocks} addTypename={false}>
                    <App />
                </MockedProvider>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByTestId('create-page')).toBeInTheDocument();
        });
    });

    it('should render task list on root route', async () => {
        const { default: App } = await import('./App');

        render(
            <MemoryRouter initialEntries={['/']}>
                <MockedProvider mocks={mocks} addTypename={false}>
                    <App />
                </MockedProvider>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByTestId('task-list')).toBeInTheDocument();
        });
    });
});