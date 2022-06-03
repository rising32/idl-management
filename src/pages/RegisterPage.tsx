import React from 'react';
import AuthTemplate from '../components/auth/AuthTemplate';
import { Helmet } from 'react-helmet-async';
import RegisterFormContainer from '../containers/auth/RegisterFormContainer';

function RegisterPage() {
  return (
    <AuthTemplate>
      <Helmet>
        <title>Register - IDL Managment Toolkit</title>
        <meta name='robots' content='noindex' />
      </Helmet>
      <RegisterFormContainer />
    </AuthTemplate>
  );
}

export default RegisterPage;
