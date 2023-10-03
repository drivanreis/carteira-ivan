import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Dispatch } from '../types';
import { registerUser } from '../redux/actions';

const INIT_USER = {
  email: '',
  password: '',
};

function Login() {
  const [userLogin, setUserLogin] = useState(INIT_USER);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const navigate = useNavigate();
  const dispatch: Dispatch = useDispatch();

  useEffect(() => {
    const isValidEmail = (email: string) => {
      const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return regexEmail.test(email);
    };

    const isValidPassword = (password: string) => {
      return password.length >= 6;
    };

    const validUser = (
      isValidEmail(userLogin.email) && isValidPassword(userLogin.password)
    );

    setButtonDisabled(!validUser);
  }, [userLogin.email, userLogin.password]);

  const handleChangeInput = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;

    setUserLogin((prevUser) => ({
      ...prevUser,
      [target.name]: target.value,
    }));
  }, []);

  const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(registerUser(userLogin.email));
    navigate('/carteira');
  }, [navigate, dispatch, userLogin]);

  return (
    <form onSubmit={ handleSubmit }>
      <input
        type="email"
        data-testid="email-input"
        placeholder="email"
        value={ userLogin.email }
        name="email"
        onChange={ handleChangeInput }
      />
      <input
        type="password"
        data-testid="password-input"
        placeholder="password"
        name="password"
        value={ userLogin.password }
        onChange={ handleChangeInput }
      />
      <button disabled={ buttonDisabled }>Entrar</button>
    </form>
  );
}

export default Login;
