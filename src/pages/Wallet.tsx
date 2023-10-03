import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import { fetchCurrenciesThunk } from '../redux/actions';
import { Dispatch } from '../types';
import { Table } from '../components/Table';

function Wallet() {
  const dispatch: Dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrenciesThunk());
  }, [dispatch]);
  return (
    <section>
      <Header />
      <WalletForm />
      <Table />
    </section>
  );
}
export default Wallet;
