import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';

jest.mock('../Auth/Auth', () => () => <div data-testid="auth-component">Auth</div>);
jest.mock('./logo_1.png', () => 'mock-logo-path.png');

describe('Header component', () => {
    beforeEach(() => {
        render(<Header />);
    });

    it('renders without crashing', () => {
        expect(screen.getByRole('banner')).toBeInTheDocument();
    });

    it('has correct header class', () => {
        expect(screen.getByRole('banner')).toHaveClass('header');
    });

    it('renders logo with correct text and image', () => {
        const logoContainer = screen.getByText('Система управления проектом').closest('.logo');
        expect(logoContainer).toHaveClass('logo');
        const logoDiv = screen.getByRole('banner').querySelector('.logo');
        expect(logoDiv).toHaveClass('logo');
        expect(logoDiv).toContainElement(screen.getByRole('presentation'));

        const imgElement = screen.getByRole('presentation');
        expect(imgElement).toHaveAttribute('src', 'mock-logo-path.png');
        expect(imgElement).toHaveAttribute('alt', '');
    });

    it('renders Auth component', () => {
        expect(screen.getByTestId('auth-component')).toBeInTheDocument();
    });

    it('matches snapshot', () => {
        const { asFragment } = render(<Header />);
        expect(asFragment()).toMatchSnapshot();
    });
});