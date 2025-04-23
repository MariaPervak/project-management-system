import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Layout from './Layout';

jest.mock('../Header/Header', () => () => <header data-testid="header">Header</header>);
jest.mock('../Sidebar/Sidebar', () => () => <nav data-testid="sidebar">Sidebar</nav>);

describe('Layout component', () => {
    const renderLayout = (children: React.ReactNode = 'Test Content') => {
        return render(<Layout>{children}</Layout>);
    };

    it('renders without crashing', () => {
        renderLayout();
        expect(screen.getByTestId('header')).toBeInTheDocument();
    });

    it('renders all main sections', () => {
        renderLayout();

        expect(screen.getByTestId('header')).toBeInTheDocument();
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
        expect(screen.getByRole('main')).toBeInTheDocument();
    });

    it('renders children content correctly', () => {
        const testContent = 'Test Child Content';
        renderLayout(testContent);

        expect(screen.getByText(testContent)).toBeInTheDocument();
        expect(screen.getByRole('main')).toHaveTextContent(testContent);
    });

    it('has correct CSS classes', () => {
        renderLayout();

        expect(screen.getByTestId('header')).toBeInTheDocument(); // Проверяем что header есть
        const layoutElement = screen.getByTestId('header').parentElement;
        expect(layoutElement).toHaveClass('layout');

        const contentElement = screen.getByRole('main').parentElement;
        expect(contentElement).toHaveClass('layout__content');

        expect(screen.getByRole('main')).toHaveClass('layout__body');
    });

    it('matches snapshot with children', () => {
        const { asFragment } = renderLayout('Snapshot Content');
        expect(asFragment()).toMatchSnapshot();
    });

    it('matches snapshot without children', () => {
        const { asFragment } = renderLayout();
        expect(asFragment()).toMatchSnapshot();
    });
});