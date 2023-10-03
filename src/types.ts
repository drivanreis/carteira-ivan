import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export type UserType = {
  email: string;
};

export type FormData = {
  id: number;
  value: string;
  description: string;
  currency: string;
  method: string;
  tag: string;
};

type ApiResponse = {
  [key: string]: Currency;
};

export type Expense = FormData & { exchangeRates: ApiResponse };

export type WalletType = {
  currencies: string[];
  expenses: Expense[];
  editor: boolean;
  idToEdit: number;
};

export type RootState = {
  user: UserType;
  wallet: WalletType;
};

export type Currency = {
  code: string;
  codein: string;
  name: string;
  high: string;
  low: string;
  varBid: string;
  pctChange: string;
  bid: string;
  ask: string;
  timestamp: string;
  create_date: string;
};

export type Dispatch = ThunkDispatch<RootState, unknown, AnyAction>;
