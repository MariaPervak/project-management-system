export const Button = ({ children, ...props }: any) => (
    <button data-testid="mock-button" {...props}>
        {children || 'Mock Button'}
    </button>
);

export const Input = ({ ...props }: any) => (
    <input data-testid="mock-input" {...props} />
);

export default {
    Button,
    Input
};