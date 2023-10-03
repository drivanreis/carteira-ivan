import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { RootState, Dispatch } from '../types';
import { deleteExpense, startEditExpense } from '../redux/actions';

export function Table() {
  const dispatch: Dispatch = useDispatch();
  const expenses = useSelector((state: RootState) => state.wallet.expenses);
  const expensesWithValues = expenses.map((expense) => {
    const currentExchange = Number(expense.exchangeRates[expense.currency].ask);
    const currentExchangeToFixed = currentExchange.toFixed(2);
    const convertedValue = (Number(expense.value) * Number(currentExchange)).toFixed(2);
    return {
      ...expense,
      value: Number(expense.value).toFixed(2),
      exchange: currentExchangeToFixed,
      convertedValue,
      name: expense.exchangeRates[expense.currency].name,
    };
  });
  const handleDelete = useCallback((expenseId: number) => {
    dispatch(deleteExpense(expenseId));
  }, [dispatch]);

  const handleEdit = useCallback((expenseId: number) => {
    dispatch(startEditExpense(expenseId));
  }, [dispatch]);

  return (
    <table>
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
      </thead>
      <tbody>
        {
          expensesWithValues.map((expense) => (
            <tr key={ expense.id }>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{expense.value}</td>
              <td>{expense.currency}</td>
              <td>{expense.exchange}</td>
              <td>{expense.convertedValue}</td>
              <td>{expense.name}</td>
              <td>
                <button
                  data-testid="edit-btn"
                  onClick={ () => handleEdit(expense.id) }
                >
                  Editar
                </button>
                <button
                  data-testid="delete-btn"
                  onClick={ () => handleDelete(expense.id) }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}
