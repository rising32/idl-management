import React from 'react';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import IconInput from '../common/IconInput';

export type RegisterFormType = {
  email: string;
  phone: string;
  password: string;
  username: string;
};

type Props = {
  onSubmit: SubmitHandler<RegisterFormType>;
  error: string | null;
};

function RegisterForm({ onSubmit, error }: Props) {
  const { handleSubmit, control } = useForm<RegisterFormType>({
    defaultValues: {
      email: '',
      phone: '',
      password: '',
      username: '',
    },
  });
  const navigate = useNavigate();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='text-white grid gap-4 mt-4'>
      <div className='font-bold text-center'>Create a New Account</div>
      <Controller
        control={control}
        name='username'
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, name, value, ref } }) => (
          <IconInput fieldRef={ref} onBlur={onBlur} name={name} onChange={onChange} placeholder='Enter Name' value={value} />
        )}
      />
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
        name='phone'
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, name, value, ref } }) => (
          <IconInput fieldRef={ref} onBlur={onBlur} name={name} onChange={onChange} placeholder='Enter Phone' value={value} />
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
      <button type='submit' className='flex items-center justify-center bg-rouge rounded-full py-2'>
        Sign Up
      </button>
      <div className='text-center underline' onClick={() => navigate('/login')}>
        Already account yet?
      </div>
    </form>
  );
}

export default RegisterForm;
