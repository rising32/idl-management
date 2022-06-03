import React from 'react';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import IconInput from '../common/IconInput';

export type LoginFormType = {
  email: string;
  password: string;
};

type Props = {
  onSubmit: SubmitHandler<LoginFormType>;
  error: string | null;
};

function LoginForm({ onSubmit, error }: Props) {
  const { handleSubmit, control } = useForm<LoginFormType>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const navigate = useNavigate();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='text-white grid gap-4 mt-4'>
      <div className='font-bold text-center'>Login with your account</div>
      <Controller
        control={control}
        name='email'
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, name, value, ref } }) => (
          <IconInput fieldRef={ref} onBlur={onBlur} name={name} onChange={onChange} placeholder='Enter Email' value={value} />
        )}
      />
      <Controller
        control={control}
        name='password'
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, name, value, ref } }) => (
          <IconInput
            fieldRef={ref}
            onBlur={onBlur}
            name={name}
            onChange={onChange}
            placeholder='Enter Password'
            type='password'
            value={value}
          />
        )}
      />
      {error && <div className='text-center text-rouge text-xs'>{error}</div>}
      <div className='text-center text-black underline'>Forgot password ?</div>
      <button type='submit' className='flex items-center justify-center bg-rouge rounded-full py-2'>
        Login
      </button>
      <div className='text-center underline' onClick={() => navigate('/register')}>
        Or Sign Up With
      </div>
    </form>
  );
}

export default LoginForm;
