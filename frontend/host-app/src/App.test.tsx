import { render, screen } from '@testing-library/react';
import App from './App';
import { MockedProvider } from '@apollo/client/testing';
import {GET_TASKS, LOGIN_CHECK} from "./utils/gql.ts";

const mocks = [
    {
        request: { query: LOGIN_CHECK, variables: { token: 'test-token' } },
        result: { data: { loginCheck: true } },
        delay: 100, // Имитируем задержку
    },
    {
        request: { query: GET_TASKS },
        result: { data: { tasks: [] } },
        delay: 100,
    },
];

test('shows loading state initially', async () => {
    render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <App />
        </MockedProvider>
    );
    expect(screen.getByTestId('loader')).toBeInTheDocument();
});