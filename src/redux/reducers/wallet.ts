import { AnyAction } from 'redux';
import {
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  REGISTER_CURRENCIES,
  REGISTER_EXPENSE,
  START_EDIT_EXPENSE,
} from '../../constants';
import { Expense } from '../../types';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

export const walletReducer = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case REGISTER_CURRENCIES: {
      return {
        ...state,
        currencies: action.payload,
      };
    }
    case REGISTER_EXPENSE: {
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    }
    case DELETE_EXPENSE: {
      return {
        ...state,
        expenses: state.expenses.filter((expense: Expense) => (
          expense.id !== action.payload
        )),
      };
    }
    case START_EDIT_EXPENSE: {
      return {
        ...state,
        editor: true,
        idToEdit: action.payload,
      };
    }
    case EDIT_EXPENSE: {
      return {
        ...state,
        editor: false,
        idToEdit: action.payload.id,
        expenses: state.expenses.map((expense: Expense) => {
          if (expense.id === action.payload.id) {
            return {
              ...action.payload,
              exchangeRates: expense.exchangeRates,
            };
          }
          return expense;
        }),
      };
    }
    default: {
      return state;
    }
  }
};
