import React from 'react';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { PlusSvg } from '../../assets/svg';
import { ClientState } from '../../modules/client';
import RoundedView from '../common/RoundedView';
import SelectClient from '../client/SelectClient';

export type TaskFormType = {
  client: ClientState | null;
  password: string;
};

type Props = {
  onSubmit: SubmitHandler<TaskFormType>;
  error: string | null;
};
function TaskForm({ onSubmit, error }: Props) {
  const { handleSubmit, control } = useForm<TaskFormType>({
    defaultValues: {
      client: null,
      password: '',
    },
  });

  return (
    <RoundedView className='border-2 border-rouge bg-gray'>
      <form onSubmit={handleSubmit(onSubmit)} className='text-white grid gap-4 mt-4 pb-12 relative'>
        <Controller
          control={control}
          name='client'
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, name, value, ref } }) => (
            <SelectClient fieldRef={ref} name={name} onBlur={onBlur} placeholder='' onChange={onChange} value={value} />
          )}
        />
        {/* <Controller
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
          /> */}
        <button
          type='submit'
          className='bg-white w-8 h-8 rounded-full shadow-xl items-center justify-center flex absolute bottom-4 right-4'
        >
          <PlusSvg className='w-6 h-6 text-rouge' />
        </button>
      </form>
    </RoundedView>
  );
}

export default TaskForm;
