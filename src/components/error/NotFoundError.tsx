import React, { useEffect } from 'react';
import ErrorScreenTemplate from './ErrorScreenTemplate';
import useNotFound from '../../lib/hooks/useNotFound';
import { Helmet } from 'react-helmet-async';
import { usePrevious } from 'react-use';
import { useLocation, useNavigate } from 'react-router-dom';
import { logoThumbnail } from '../../assets/images';
import StatusCode from '../common/StatusCode';

function NotFoundError() {
  const history = useNavigate();
  const { reset } = useNotFound();
  const location = useLocation();

  const prevPathname = usePrevious(location.pathname);

  useEffect(() => {
    if (prevPathname && prevPathname !== location.pathname) {
      reset();
    }
  }, [location.pathname, prevPathname, reset]);

  return (
    <>
      <Helmet>
        <title>404 - IDL Management Toolkit</title>
        <meta name='robots' content='noindex' />
      </Helmet>
      <ErrorScreenTemplate
        image={logoThumbnail}
        message='nothing!'
        buttonText='Go to Home'
        onButtonClick={() => {
          history('/');
          reset();
        }}
      />
      <StatusCode statusCode={404} />
    </>
  );
}

export default NotFoundError;
