import {
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  REGISTER_CURRENCIES,
  REGISTER_EXPENSE,
  REGISTER_USER,
  START_EDIT_EXPENSE,
} from '../../constants';
import { Currency, Dispatch, Expense, FormData } from '../../types';

type ApiResponse = {
  [key: string]: Currency;
};

export const registerUser = (email: string) => ({
  type: REGISTER_USER,
  payload: email,
});

export const registerCurrencies = (currencies: string[]) => ({
  type: REGISTER_CURRENCIES,
  payload: currencies,
});

export const registerExpense = (expense: Expense) => ({
  type: REGISTER_EXPENSE,
  payload: expense,
});

export const deleteExpense = (expenseId: number) => ({
  type: DELETE_EXPENSE,
  payload: expenseId,
});

export const startEditExpense = (expenseId: number) => ({
  type: START_EDIT_EXPENSE,
  payload: expenseId,
});

export const editExpense = (expense: Omit<Expense, 'exchangeRates'>) => ({
  type: EDIT_EXPENSE,
  payload: expense,
});

export const registerExpenseThunk = (formData: FormData) => (
  async (dispatch: Dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const currencies: ApiResponse = await response.json();
    dispatch(registerExpense({
      ...formData,
      exchangeRates: currencies,
    }));
  }
);

export const fetchCurrenciesThunk = () => (
  async (dispatch: Dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const currencies: ApiResponse = await response.json();
    const currenciesCode = Object.keys(currencies)
      .filter((currency) => currency !== 'USDT');
    dispatch(registerCurrencies(currenciesCode));
  }
);
