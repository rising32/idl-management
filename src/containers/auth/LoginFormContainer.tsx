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
import { setLayer, setSetting, setUser } from '../../store/features/coreSlice';

function LoginFormContainer() {
  const [error, setError] = useState<null | string>(null);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
    dispatch(setLayer(true));
    const params = {
      email: data.email,
      password: data.password,
    };
    _sendLogin(params);
  };

  useEffect(() => {
    if (sendLoginRes) {
      dispatch(setUser(sendLoginRes));
      _sendSetting({ user_id: sendLoginRes.user.user_id });
      _sendCompanyInfo({ user_id: sendLoginRes.user.user_id });
    }
  }, [sendLoginRes, dispatch, navigate, _sendSetting, _sendCompanyInfo]);
  useEffect(() => {
    if (sendLoginError) {
      const data = sendLoginError?.response?.data as ErrorResponse;
      setError(data.errors ? data.errors[0] : data.errorMessage);
    }
  }, [sendLoginError]);
  useEffect(() => {
    if (sendSettingRes) {
      dispatch(setSetting(sendSettingRes));
    }
  }, [sendSettingRes, dispatch]);
  useEffect(() => {
    if (sendCompanyInfoRes) {
      dispatch(setCompanyInfo(sendCompanyInfoRes));
    }
  }, [sendCompanyInfoRes, dispatch]);
  useEffect(() => {
    if (sendSettingRes && sendCompanyInfoRes) {
      navigate('/tasks');
      dispatch(setLayer(false));
    }
  }, [sendSettingRes, sendCompanyInfoRes, dispatch, navigate]);
  return <LoginForm onSubmit={onSubmit} error={error} />;
}

export default LoginFormContainer;
