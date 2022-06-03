import React, { useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import LoginForm, { LoginFormType } from '../../components/auth/LoginForm';
import { sendLogin } from '../../lib/api';
import useRequest from '../../lib/hooks/useRequest';
import { validateEmail } from '../../lib/utils';
import { ErrorResponse } from '../../lib/utils/errorTypes';
import { useAppDispatch } from '../../store';
import { setUser } from '../../store/features/coreSlice';

function LoginFormContainer() {
  const [error, setError] = useState<null | string>(null);

  const navigate = useNavigate();
  const dipatch = useAppDispatch();

  const [_sendLogin, , sendLoginRes, sendLoginError] = useRequest(sendLogin);

  const onSubmit: SubmitHandler<LoginFormType> = data => {
    setError(null);
    const validation = {
      password: (text: string) => {
        if (text === '') {
          return 'Password is empty!.';
        }
        if (text.length < 6) {
          return 'Password length is min 6 letters';
        }
      },
    };

    const error = validation.password(data.password) || validateEmail(data.email) || null;

    if (error) {
      setError(error);
      return;
    }
    const params = {
      email: data.email,
      password: data.password,
    };
    _sendLogin(params);
  };

  useEffect(() => {
    if (sendLoginRes) {
      console.log(sendLoginRes);
      dipatch(setUser(sendLoginRes));
      navigate('/tasks');
    }
  }, [sendLoginRes, dipatch, navigate]);
  useEffect(() => {
    if (sendLoginError) {
      const data = sendLoginError?.response?.data as ErrorResponse;
      setError(data.errors ? data.errors[0] : data.errorMessage);
    }
  }, [sendLoginError]);
  return <LoginForm onSubmit={onSubmit} error={error} />;
}

export default LoginFormContainer;
