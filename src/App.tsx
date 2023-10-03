import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <Routes>
      <Route path="/" Component={ Login } />
      <Route path="/carteira" Component={ Wallet } />
    </Routes>
  );
}

export default App;
