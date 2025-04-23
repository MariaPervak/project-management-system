import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Title from './Title';

describe('Title component', () => {
    it('renders children correctly', () => {
        const testText = 'Hello World';
        render(<Title>{testText}</Title>);

        expect(screen.getByText(testText)).toBeInTheDocument();
    });

    it('has the correct class name', () => {
        const testText = 'Test Title';
        render(<Title>{testText}</Title>);

        const titleElement = screen.getByRole('heading', { level: 1 });
        expect(titleElement).toHaveClass('title');
    });

    it('renders as an h1 element', () => {
        const testText = 'Heading Test';
        render(<Title>{testText}</Title>);

        expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });

    it('matches snapshot', () => {
        const testText = 'Snapshot Test';
        const { asFragment } = render(<Title>{testText}</Title>);

        expect(asFragment()).toMatchSnapshot();
    });
});