import React from 'react';

interface Props {
  image: string;
  message: string;
  buttonText?: string;
  onButtonClick?: () => void;
}
function ErrorScreenTemplate({ image, message, buttonText, onButtonClick }: Props) {
  return (
    <div className='flex flex-col m-auto h-screen items-center justify-center text-white'>
      <img src={image} alt='error' />
      <div className='message'>{message}</div>
      {buttonText && (
        <div className='flex items-center justify-center bg-rouge rounded-full py-2 px-6 mt-4'>
          <button onClick={onButtonClick}>{buttonText}</button>
        </div>
      )}
    </div>
  );
}

export default ErrorScreenTemplate;
