import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './Sidebar';
import { AuthContext } from '../../../context/AuthContext/AuthContext';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    Link: ({ to, children }: { to: string; children: React.ReactNode }) => (
        <a href={to}>{children}</a>
    ),
}));

describe('Sidebar component', () => {
    const renderWithRouterAndContext = (role: string = 'user') => {
        const authValue = { role };
        return render(
            <Router>
                <AuthContext.Provider value={authValue}>
                    <Sidebar />
                </AuthContext.Provider>
            </Router>
        );
    };

    it('renders basic links for all users', () => {
        renderWithRouterAndContext();

        expect(screen.getByText('Список задач')).toBeInTheDocument();
        expect(screen.getByText('Список задач')).toHaveAttribute('href', '/');
    });

    it('renders admin link when user is admin', () => {
        renderWithRouterAndContext('admin');

        expect(screen.getByText('Создать')).toBeInTheDocument();
        expect(screen.getByText('Создать')).toHaveAttribute('href', '/create');
    });

    it('does not render admin link for regular users', () => {
        renderWithRouterAndContext('user');

        expect(screen.queryByText('Создать')).not.toBeInTheDocument();
    });

    it('has correct sidebar class', () => {
        renderWithRouterAndContext();

        expect(screen.getByRole('navigation')).toHaveClass('sidebar');
    });

    it('matches snapshot for regular user', () => {
        const { asFragment } = renderWithRouterAndContext('user');
        expect(asFragment()).toMatchSnapshot();
    });

    it('matches snapshot for admin', () => {
        const { asFragment } = renderWithRouterAndContext('admin');
        expect(asFragment()).toMatchSnapshot();
    });
});