import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useRef } from 'react';
import { Dispatch, RootState } from '../types';
import { editExpense, registerExpenseThunk } from '../redux/actions';

type FormRefs = (
  React.RefObject<HTMLInputElement | HTMLSelectElement>
);

function WalletForm() {
  const dispatch: Dispatch = useDispatch();
  const {
    currencies,
    expenses,
    editor,
    idToEdit,
  } = useSelector((state: RootState) => state.wallet);

  const valueInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLInputElement>(null);
  const currencySelectRef = useRef<HTMLSelectElement>(null);
  const methodSelectRef = useRef<HTMLSelectElement>(null);
  const tagSelectRef = useRef<HTMLSelectElement>(null);
  const getValueFromRef = (ref: FormRefs) => {
    return ref.current?.value ?? '';
  };
  const resetValueOfRefList = (refs: FormRefs[]) => {
    refs.forEach((ref) => {
      if (ref.current) ref.current.value = '';
    });
  };
  const handleSubmit = useCallback((event: React.FormEvent) => {
    event.preventDefault();

    const formData = {
      id: expenses.length,
      value: getValueFromRef(valueInputRef),
      description: getValueFromRef(descriptionInputRef),
      currency: getValueFromRef(currencySelectRef),
      method: getValueFromRef(methodSelectRef),
      tag: getValueFromRef(tagSelectRef),
    };

    resetValueOfRefList([valueInputRef, descriptionInputRef]);

    if (editor) {
      dispatch(editExpense({ ...formData, id: idToEdit }));
      return;
    }

    dispatch(registerExpenseThunk(formData));
  }, [expenses, dispatch, idToEdit, editor]);

  const handleChangeInputValue = useCallback((
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { target } = event;
    if (!Number(target.value)) target.value = '0';
  }, []);
  return (
    <form onSubmit={ handleSubmit }>
      <label htmlFor="value-input">
        valor:
        {' '}
        <input
          type="text"
          id="value-input"
          data-testid="value-input"
          ref={ valueInputRef }
          onChange={ handleChangeInputValue }
        />
      </label>
      <label htmlFor="description-input">
        descrição:
        {' '}
        <input
          id="description-input"
          data-testid="description-input"
          ref={ descriptionInputRef }
        />
      </label>
      <label htmlFor="currency-input">
        Moeda:
        {' '}
        <select
          data-testid="currency-input"
          id="currency-input"
          ref={ currencySelectRef }
        >
          {
          currencies.map((currency) => (
            <option key={ currency } value={ currency }>
              { currency }
            </option>
          ))
        }
        </select>
      </label>
      <label htmlFor="method-input">
        Método de pagamento:
        {' '}
        <select data-testid="method-input" id="method-input" ref={ methodSelectRef }>
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
      </label>
      <label htmlFor="tag-input">
        Tag:
        {' '}
        <select data-testid="tag-input" id="tag-input" ref={ tagSelectRef }>
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
      </label>

      <button>{ editor ? 'Editar despesa' : 'Adicionar despesa' }</button>
    </form>
  );
}
export default WalletForm;
