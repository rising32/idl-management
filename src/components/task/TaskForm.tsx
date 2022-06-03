import React, { useState } from 'react';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { PlusSvg } from '../../assets/svg';
import { getLocalDataString } from '../../lib/utils';
import WeekDayCalendar from '../calendar/WeekDayCalendar';
import RoundedView from '../common/RoundedView';

export type TaskFormType = {
  email: string;
  password: string;
};

function TaskForm() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const onSelectDate = (date: Date) => {
    setSelectedDate(date);
  };
  const { handleSubmit, control } = useForm<TaskFormType>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<TaskFormType> = data => {
    console.log(data);
  };
  return (
    <>
      <WeekDayCalendar selectedDate={selectedDate} onSelectDate={onSelectDate} />

      <div className='flex items-center p-4'>
        <span className='flex-1 font-bold truncate'>{getLocalDataString(selectedDate)}</span>
        <span>On time: 90%</span>
      </div>

      <RoundedView className='border-2 border-rouge bg-gray'>
        <form onSubmit={handleSubmit(onSubmit)} className='text-white grid gap-4 mt-4 pb-12 relative'>
          <div className='font-bold text-center'>Task with your account</div>
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
    </>
  );
}

export default TaskForm;
