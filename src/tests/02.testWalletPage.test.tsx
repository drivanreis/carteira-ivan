import { vi } from 'vitest';
import { waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import mockData from './helpers/mockData';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';

const API_ENDPOINT = 'https://economia.awesomeapi.com.br/json/all';

global.fetch = vi.fn().mockResolvedValue({
  json: async () => (mockData),
});

describe('Testa a página wallet', () => {
  const currentExpense = {
    id: 0,
    value: '100',
    description: 'a test description',
    currency: 'BTC',
    method: 'Cartão de crédito',
    tag: 'Lazer',
    exchangeRates: mockData,
  };
  it('testa se todos os dados foram preenchidos corretamente', async () => {
    const screen = renderWithRouterAndRedux(<Wallet />);
    const { user } = screen;
    const valueInputEl = screen.getByLabelText(/valor:/i) as HTMLInputElement;
    const descriptionInputEl = screen.getByLabelText(/descrição:/i);
    const currencySelectEl = screen.getByLabelText(/Moeda:/i);
    const paymentMethodSelectEl = screen.getByLabelText(/Método de pagamento:/i);
    const tagSelectEl = screen.getByLabelText(/tag:/i);
    const addExpenseButtonEl = screen.getByRole('button', { name: /adicionar despesa/i });
    await waitFor(() => {
      expect(currencySelectEl).toHaveValue('USD');
    }, { timeout: 5000 });
    await act(async () => {
      await user.type(valueInputEl, currentExpense.value);
      await user.type(descriptionInputEl, currentExpense.description);
      await user.selectOptions(currencySelectEl, currentExpense.currency);
      await user.selectOptions(paymentMethodSelectEl, currentExpense.method);
      await user.selectOptions(tagSelectEl, currentExpense.tag);
    });
    expect(valueInputEl.value).toBe(currentExpense.value);
    expect(descriptionInputEl).toHaveValue(currentExpense.description);
    expect(currencySelectEl).toHaveValue(currentExpense.currency);
    expect(paymentMethodSelectEl).toHaveValue(currentExpense.method);
    expect(tagSelectEl).toHaveValue(currentExpense.tag);
    await act(async () => {
      await user.click(addExpenseButtonEl);
    });
    expect(valueInputEl.value).toBe('');
    expect(descriptionInputEl).toHaveValue('');
  });

  it('testa se é feita a requisição para a api quando clica em adicionar despesa', async () => {
    const screen = renderWithRouterAndRedux(<Wallet />);
    const { user, store } = screen;
    const currentWallet = {
      currencies: Object.keys(mockData).filter((currency) => currency !== 'USDT'),
      expenses: [currentExpense],
      editor: false,
      idToEdit: 0,
    };
    const valueInputEl = screen.getByLabelText(/valor:/i);
    const descriptionInputEl = screen.getByLabelText(/descrição:/i);
    const currencySelectEl = screen.getByLabelText(/Moeda/i);
    const paymentMethodSelectEl = screen.getByLabelText(/Método de pagamento:/i);
    const tagSelectEl = screen.getByLabelText(/Tag:/i);
    const addExpenseButtonEl = screen.getByRole('button', { name: /adicionar despesa/i });
    await waitFor(() => {
      expect(currencySelectEl).toHaveValue('USD');
    }, { timeout: 5000 });
    await act(async () => {
      await user.type(valueInputEl, currentExpense.value);
      await user.type(descriptionInputEl, currentExpense.description);
      await user.selectOptions(currencySelectEl, currentExpense.currency);
      await user.selectOptions(paymentMethodSelectEl, currentExpense.method);
      await user.selectOptions(tagSelectEl, currentExpense.tag);
      await user.click(addExpenseButtonEl);
    });

    expect(global.fetch).toHaveBeenCalledWith(API_ENDPOINT);

    await waitFor(() => {
      expect(store.getState().wallet.expenses).toHaveLength(1);
    }, { timeout: 5000 });
    const currentState = store.getState();
    expect(currentState).toEqual({
      ...currentState,
      wallet: currentWallet,
    });
  });

  it('Testa se o botão de deletar despesa está funcionando corretamento', async () => {
    const screen = renderWithRouterAndRedux(<Wallet />);
    const { user } = screen;
    const valueInputEl = screen.getByLabelText(/valor:/i);
    const descriptionInputEl = screen.getByLabelText(/descrição:/i);
    const currencySelectEl = screen.getByLabelText(/Moeda/i);
    const paymentMethodSelectEl = screen.getByLabelText(/Método de pagamento:/i);
    const tagSelectEl = screen.getByLabelText(/Tag:/i);
    const addExpenseButtonEl = screen.getByRole('button', { name: /adicionar despesa/i });
    await waitFor(() => {
      expect(currencySelectEl).toHaveValue('USD');
    }, { timeout: 5000 });
    await act(async () => {
      await user.type(valueInputEl, currentExpense.value);
      await user.type(descriptionInputEl, currentExpense.description);
      await user.selectOptions(currencySelectEl, currentExpense.currency);
      await user.selectOptions(paymentMethodSelectEl, currentExpense.method);
      await user.selectOptions(tagSelectEl, currentExpense.tag);
      await user.click(addExpenseButtonEl);
    });
    const descriptionRegex = new RegExp(currentExpense.description, 'i');
    await waitFor(() => {
      const descriptionTdTag = screen.getByRole('cell', {
        name: descriptionRegex,
      });
      expect(descriptionTdTag).toBeInTheDocument();
    });
    const deleteExpenseButton = screen.getByRole('button', {
      name: /excluir/i,
    });
    const descriptionTdTag = screen.getByRole('cell', {
      name: descriptionRegex,
    });
    await act(async () => {
      await user.click(deleteExpenseButton);
    });
    expect(descriptionTdTag).not.toBeInTheDocument();
  });

  it('Testa se o botão de editar despesa está funcionando corretamente', async () => {
    const screen = renderWithRouterAndRedux(<Wallet />);
    const { user } = screen;
    const valueInputEl = screen.getByLabelText(/valor:/i);
    const descriptionInputEl = screen.getByLabelText(/descrição:/i);
    const currencySelectEl = screen.getByLabelText(/Moeda/i);
    const paymentMethodSelectEl = screen.getByLabelText(/Método de pagamento:/i);
    const tagSelectEl = screen.getByLabelText(/Tag:/i);
    const addExpenseButtonEl = screen.getByRole('button', { name: /adicionar despesa/i });
    await waitFor(() => {
      expect(currencySelectEl).toHaveValue('USD');
    }, { timeout: 5000 });
    await act(async () => {
      await user.type(valueInputEl, currentExpense.value);
      await user.type(descriptionInputEl, currentExpense.description);
      await user.selectOptions(currencySelectEl, currentExpense.currency);
      await user.selectOptions(paymentMethodSelectEl, currentExpense.method);
      await user.selectOptions(tagSelectEl, currentExpense.tag);
      await user.click(addExpenseButtonEl);
    });
    const descriptionRegex = new RegExp(currentExpense.description, 'i');
    await waitFor(() => {
      const descriptionTdTag = screen.getByRole('cell', {
        name: descriptionRegex,
      });
      expect(descriptionTdTag).toBeInTheDocument();
    });
    const editExpenseButton = screen.getByRole('button', {
      name: /editar/i,
    });
    await act(async () => {
      await user.click(editExpenseButton);
    });
    const saveEditButton = screen.getByRole('button', { name: /editar despesa/i });
    expect(saveEditButton).toBeInTheDocument();
    await act(async () => {
      await user.type(descriptionInputEl, 'this is a edit test');
      await user.click(saveEditButton);
    });
    expect(screen.getByRole('cell', { name: /this is a edit test/i })).toBeInTheDocument();
  });
});
