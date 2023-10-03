import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Login from '../pages/Login';

describe('Testa a página de login', () => {
  it('testa se o usuário está sendo cadastrado', async () => {
    const screen = renderWithRouterAndRedux(<Login />);
    const { user, store } = screen;

    const currentUser = {
      email: 'test@example.com',
      password: '123456',
    };

    const storeDefault = {
      user: { email: currentUser.email },
      wallet: {
        currencies: [],
        expenses: [],
        editor: false,
        idToEdit: 0,
      },
    };

    const emailInputEl = screen.getByPlaceholderText(/email/i);
    const passwordInputEl = screen.getByPlaceholderText(/password/i);
    const buttonSubmitEl = screen.getByRole('button', { name: /entrar/i });

    await act(async () => {
      await user.type(emailInputEl, currentUser.email);
      await user.type(passwordInputEl, currentUser.password);
    });

    expect(buttonSubmitEl).toBeInTheDocument();
    expect(buttonSubmitEl).toHaveProperty('disabled', false);

    await act(async () => {
      await user.click(buttonSubmitEl);
    });

    expect(store.getState()).toEqual(storeDefault);
  });
});
