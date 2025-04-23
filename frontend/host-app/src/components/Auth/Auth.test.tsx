import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MockedProvider } from '@apollo/client/testing';
import Auth from './Auth';
import { AuthContext } from '../../../context/AuthContext/AuthContext';
import {SIGN_IN, SIGN_UP} from "../../utils/gql";

// Моки для GraphQL мутаций
const mockSignUpSuccess = {
    request: {
        query: SIGN_UP,
        variables: {
            username: 'testuser',
            email: 'test@example.com',
            password: 'password123',
            role: undefined
        }
    },
    result: {
        data: {
            signUp: 'token123'
        }
    }
};

const mockSignInSuccess = {
    request: {
        query: SIGN_IN,
        variables: {
            username: 'testuser',
            password: 'password123'
        }
    },
    result: {
        data: {
            signIn: 'token123'
        }
    }
};

const mockSignUpError = {
    request: {
        query: SIGN_UP,
        variables: {
            username: 'testuser',
            email: 'test@example.com',
            password: 'password123',
            role: undefined
        }
    },
    error: new Error('Registration failed')
};

// Моки для внешних компонентов
jest.mock('../common/Modal/Modal', () => ({
                                              isOpen, title, children, onAction, onClose, buttonText }: any) => {
    return isOpen ? (
        <div data-testid="modal">
            <h2>{title}</h2>
            {children}
            <button onClick={onAction}>{buttonText}</button>
            <button onClick={onClose}>Close</button>
        </div>
    ) : null;
});

jest.mock('../common/Toast/Toast', () => ({ message, onClose }: any) => (
    <div data-testid="toast">
        {message}
        <button onClick={onClose}>Close toast</button>
    </div>
));

jest.mock('ui_components/components', () => ({
    Button: ({ onClick, children }: any) => (
        <button onClick={onClick}>{children}</button>
    ),
    Input: ({ type, name, placeholder, onChange }: any) => (
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            data-testid={`input-${name}`}
        />
    )
}));

describe('Auth Component', () => {
    const originalLocation = window.location;
    beforeAll(() => {
        // @ts-ignore - временно переопределяем location для тестов
        delete window.location;
        window.location = {
            ...originalLocation,
            reload: jest.fn(),
        };
    });

    afterAll(() => {
        // Восстанавливаем оригинальный location после тестов
        window.location = originalLocation;
    });
    const renderAuth = (role = 'guest', mocks = []) => {
        return render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <AuthContext.Provider value={{ role }}>
                    <Auth />
                </AuthContext.Provider>
            </MockedProvider>
        );
    };

    beforeEach(() => {
        jest.spyOn(Storage.prototype, 'setItem');
        jest.spyOn(Storage.prototype, 'removeItem');
        jest.spyOn(window.location, 'reload').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('renders auth buttons for guest', () => {
        renderAuth('guest');
        expect(screen.getByText('Зарегистрироваться')).toBeInTheDocument();
        expect(screen.getByText('Авторизоваться')).toBeInTheDocument();
    });

    it('renders logout button for authenticated user', () => {
        renderAuth('user');
        expect(screen.getByText('Выйти')).toBeInTheDocument();
    });

    it('opens register modal and submits form', async () => {
        renderAuth('guest', [mockSignUpSuccess]);

        fireEvent.click(screen.getByText('Зарегистрироваться'));
        expect(screen.getByTestId('modal')).toBeInTheDocument();

        fireEvent.change(screen.getByTestId('input-userName'), {
            target: { value: 'testuser', name: 'userName' }
        });
        fireEvent.change(screen.getByTestId('input-email'), {
            target: { value: 'test@example.com', name: 'email' }
        });
        fireEvent.change(screen.getByTestId('input-password'), {
            target: { value: 'password123', name: 'password' }
        });

        fireEvent.click(screen.getByText('Зарегистрироваться'));

        await waitFor(() => {
            expect(localStorage.setItem).not.toHaveBeenCalled(); // Регистрация не сохраняет токен
        });
    });

    it('opens auth modal and submits form', async () => {
        renderAuth('guest', [mockSignInSuccess]);

        fireEvent.click(screen.getByText('Авторизоваться'));
        expect(screen.getByTestId('modal')).toBeInTheDocument();

        fireEvent.change(screen.getByTestId('input-userName'), {
            target: { value: 'testuser', name: 'userName' }
        });
        fireEvent.change(screen.getByTestId('input-password'), {
            target: { value: 'password123', name: 'password' }
        });

        fireEvent.click(screen.getByText('Авторизоваться'));

        await waitFor(() => {
            expect(localStorage.setItem).toHaveBeenCalledWith('token', 'token123');
            expect(window.location.reload).toHaveBeenCalled();
        });
    });

    // it('shows error toast when registration fails', async () => {
    //     // 1. Создаем мок с ошибкой
    //     const mockError = {
    //         request: {
    //             query: SIGN_UP,
    //             variables: {
    //                 username: 'testuser',
    //                 email: 'test@example.com',
    //                 password: 'password123',
    //                 role: undefined
    //             }
    //         },
    //         error: new Error('Registration failed')
    //     };
    //
    //     // 2. Рендерим компонент
    //     render(
    //         <MockedProvider mocks={[mockError]} addTypename={false}>
    //             <AuthContext.Provider value={{ role: 'guest' }}>
    //                 <Auth />
    //             </AuthContext.Provider>
    //         </MockedProvider>
    //     );
    //
    //     // 3. Открываем форму регистрации
    //     const registerButtons = await screen.findAllByText('Зарегистрироваться');
    //     fireEvent.click(registerButtons[0]);
    //
    //     // 4. Заполняем форму
    //     await waitFor(() => {
    //         fireEvent.change(screen.getByTestId('input-userName'), {
    //             target: { value: 'testuser', name: 'userName' }
    //         });
    //         fireEvent.change(screen.getByTestId('input-email'), {
    //             target: { value: 'test@example.com', name: 'email' }
    //         });
    //         fireEvent.change(screen.getByTestId('input-password'), {
    //             target: { value: 'password123', name: 'password' }
    //         });
    //     });
    //
    //     // 5. Отправляем форму
    //     const submitButton = (await screen.findAllByText('Зарегистрироваться'))[1];
    //     fireEvent.click(submitButton);
    //
    //     // 6. Проверяем появление Toast с ошибкой
    //     const toast = await screen.findByTestId('toast');
    //     expect(toast).toBeInTheDocument();
    //     expect(toast).toHaveTextContent('Registration failed');
    // });

    it('handles logout correctly', () => {
        renderAuth('user');

        fireEvent.click(screen.getByText('Выйти'));
        expect(localStorage.removeItem).toHaveBeenCalled();
        expect(window.location.reload).toHaveBeenCalled();
    });

    it('calls onRegister and onAuth callbacks when provided', async () => {
        const onRegisterMock = jest.fn();
        const onAuthMock = jest.fn();

        render(
            <MockedProvider mocks={[mockSignUpSuccess, mockSignInSuccess]} addTypename={false}>
                <AuthContext.Provider value={{ role: 'guest' }}>
                    <Auth onRegister={onRegisterMock} onAuth={onAuthMock} />
                </AuthContext.Provider>
            </MockedProvider>
        );

        const registerButtons = screen.getAllByText('Зарегистрироваться');
        fireEvent.click(registerButtons[0]);

        await waitFor(() => {
            const modalRegisterButton = screen.getAllByText('Зарегистрироваться')[1];

            fireEvent.change(screen.getByTestId('input-userName'), {
                target: { value: 'testuser', name: 'userName' }
            });
            fireEvent.change(screen.getByTestId('input-email'), {
                target: { value: 'test@example.com', name: 'email' }
            });
            fireEvent.change(screen.getByTestId('input-password'), {
                target: { value: 'password123', name: 'password' }
            });

            fireEvent.click(modalRegisterButton);
        });

        const authButtons = screen.getAllByText('Авторизоваться');
        fireEvent.click(authButtons[0]);

        await waitFor(() => {
            const modalAuthButton = screen.getAllByText('Авторизоваться')[1];

            fireEvent.change(screen.getByTestId('input-userName'), {
                target: { value: 'testuser', name: 'userName' }
            });
            fireEvent.change(screen.getByTestId('input-password'), {
                target: { value: 'password123', name: 'password' }
            });

            fireEvent.click(modalAuthButton);
        });

        await waitFor(() => {
            expect(onRegisterMock).toHaveBeenCalledWith({
                userName: 'testuser',
                email: 'test@example.com',
                password: 'password123'
            });
            expect(onAuthMock).toHaveBeenCalledWith({
                userName: 'testuser',
                password: 'password123'
            });
        });
    });
});