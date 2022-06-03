import React, { useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import RegisterForm, { RegisterFormType } from '../../components/auth/RegisterForm';
import { sendRegister } from '../../lib/api';
import useRequest from '../../lib/hooks/useRequest';
import { validateEmail } from '../../lib/utils';
import { ErrorResponse } from '../../lib/utils/errorTypes';
import { useAppDispatch } from '../../store';
import { setUser } from '../../store/features/coreSlice';

function RegisterFormContainer() {
  const [error, setError] = useState<null | string>(null);
  const navigate = useNavigate();
  const dipatch = useAppDispatch();

  const [_sendRegister, , sendRegisterRes, sendRegisterError] = useRequest(sendRegister);

  const onSubmit: SubmitHandler<RegisterFormType> = data => {
    setError(null);
    const validation = {
      username: (text: string) => {
        if (text === '') {
          return 'Name is empty!.';
        }
        if (text.length > 45) {
          return 'Name length is max 45';
        }
      },
      password: (text: string) => {
        if (text === '') {
          return 'Password is empty!.';
        }
        if (text.length < 6) {
          return 'Password length is min 6 letters';
        }
      },
    };

    const valiedError = validation.username(data.username) || validation.password(data.password) || validateEmail(data.email) || null;

    if (valiedError) {
      setError(valiedError);
      return;
    }
    const params = {
      email: data.email,
      phone: data.phone,
      username: data.username,
      password: data.password,
    };
    _sendRegister(params);
  };
  useEffect(() => {
    if (sendRegisterRes) {
      console.log(sendRegisterRes);
      dipatch(setUser(sendRegisterRes));
      navigate('/tasks');
    }
  }, [sendRegisterRes, dipatch, navigate]);
  useEffect(() => {
    if (sendRegisterError) {
      const data = sendRegisterError?.response?.data as ErrorResponse;
      setError(data.errorMessage);
    }
  }, [sendRegisterError]);
  return <RegisterForm onSubmit={onSubmit} error={error} />;
}

export default RegisterFormContainer;
