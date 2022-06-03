import React from 'react';
import ErrorScreenTemplate from './ErrorScreenTemplate';
import { useNavigate } from 'react-router-dom';
import { logoThumbnail } from '../../assets/images';

export type CrashErrorScreenProps = {
  onResolve: () => void;
};

function CrashErrorScreen({ onResolve }: CrashErrorScreenProps) {
  const history = useNavigate();
  return (
    <ErrorScreenTemplate
      image={logoThumbnail}
      message='Oops, error is occured'
      buttonText='Go to Home'
      onButtonClick={() => {
        history('/');
        onResolve();
      }}
    />
  );
}

export default CrashErrorScreen;
