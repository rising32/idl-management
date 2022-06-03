import React from 'react';
import { logoThumbnail } from '../../assets/images';
import ErrorScreenTemplate from './ErrorScreenTemplate';

function NetworkErrorScreen() {
  return (
    <ErrorScreenTemplate
      image={logoThumbnail}
      message={'connection is not suitable. please use after few minutes'}
      buttonText='Refresh'
      onButtonClick={() => window.location.reload()}
    />
  );
}

export default NetworkErrorScreen;
