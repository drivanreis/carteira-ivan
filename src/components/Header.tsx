import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { RootState } from '../types';

function Header() {
  const email = useSelector((state: RootState) => state.user.email);
  const expenses = useSelector((state: RootState) => state.wallet.expenses);
  const [expensesSum, setExpenseSum] = useState(0);

  useEffect(() => {
    setExpenseSum(Number(expenses.reduce((acc, curr) => {
      const currCurr = Number(curr.exchangeRates[curr.currency].ask);
      return Number((acc + currCurr * Number(curr.value)).toFixed(2));
    }, 0)));
  }, [expenses]);

  return (
    <header>
      <p data-testid="email-field">{ email }</p>
      <p data-testid="total-field">{ expensesSum.toFixed(2) }</p>
      <p data-testid="header-currency-field">BRL</p>
    </header>
  );
}

export default Header;
