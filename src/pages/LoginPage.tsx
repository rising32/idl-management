import React from 'react';
import AuthTemplate from '../components/auth/AuthTemplate';
import { Helmet } from 'react-helmet-async';
import LoginFormContainer from '../containers/auth/LoginFormContainer';

function LoginPage() {
  return (
    <AuthTemplate>
      <Helmet>
        <title>Login - IDL Managment Toolkit</title>
        <meta name='robots' content='noindex' />
      </Helmet>
      <LoginFormContainer />
    </AuthTemplate>
  );
}

export default LoginPage;
