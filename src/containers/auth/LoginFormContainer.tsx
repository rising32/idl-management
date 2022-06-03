import React, { useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import LoginForm, { LoginFormType } from '../../components/auth/LoginForm';
import { sendCompanyInfo, sendLogin, sendSetting } from '../../lib/api';
import useRequest from '../../lib/hooks/useRequest';
import { validateEmail } from '../../lib/utils';
import { ErrorResponse } from '../../lib/utils/errorTypes';
import { useAppDispatch } from '../../store';
import { setCompanyInfo } from '../../store/features/companySlice';
import { setSetting, setUser } from '../../store/features/coreSlice';

function LoginFormContainer() {
  const [error, setError] = useState<null | string>(null);

  const navigate = useNavigate();
  const dipatch = useAppDispatch();

  const [_sendLogin, , sendLoginRes, sendLoginError] = useRequest(sendLogin);
  const [_sendSetting, , sendSettingRes] = useRequest(sendSetting);
  const [_sendCompanyInfo, , sendCompanyInfoRes] = useRequest(sendCompanyInfo);

  const onSubmit: SubmitHandler<LoginFormType> = data => {
    setError(null);

    const error = validateEmail(data.email) || null;

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
      dipatch(setUser(sendLoginRes));
      _sendSetting({ user_id: sendLoginRes.user.user_id });
      _sendCompanyInfo({ user_id: sendLoginRes.user.user_id });
    }
  }, [sendLoginRes, dipatch, navigate]);
  useEffect(() => {
    if (sendLoginError) {
      const data = sendLoginError?.response?.data as ErrorResponse;
      setError(data.errors ? data.errors[0] : data.errorMessage);
    }
  }, [sendLoginError]);
  useEffect(() => {
    if (sendSettingRes) {
      dipatch(setSetting(sendSettingRes));
    }
  }, [sendSettingRes]);
  useEffect(() => {
    if (sendCompanyInfoRes) {
      dipatch(setCompanyInfo(sendCompanyInfoRes));
    }
  }, [sendCompanyInfoRes]);
  useEffect(() => {
    if (sendSettingRes && sendCompanyInfoRes) {
      navigate('/tasks');
    }
  }, [sendSettingRes, sendCompanyInfoRes]);
  return <LoginForm onSubmit={onSubmit} error={error} />;
}

export default LoginFormContainer;
