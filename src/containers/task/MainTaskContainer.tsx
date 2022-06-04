import React, { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import WeekDayCalendar from '../../components/calendar/WeekDayCalendar';
import TaskForm, { TaskFormType } from '../../components/task/TaskForm';
import { getLocalDataString, validateEmail } from '../../lib/utils';
import { RootState, useAppDispatch } from '../../store';

function MainTaskContainer() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [error, setError] = useState<null | string>(null);

  const { user } = useSelector((state: RootState) => state.core);

  const onSelectDate = (date: Date) => {
    setSelectedDate(date);
  };
  const dipatch = useAppDispatch();

  const onSubmit: SubmitHandler<TaskFormType> = data => {
    if (user?.role_id === 3) {
      toast.error('permission denied');
      return;
    }
  };
  return (
    <div className='grid gap-4'>
      <WeekDayCalendar selectedDate={selectedDate} onSelectDate={onSelectDate} />

      <div className='flex items-center'>
        <span className='flex-1 font-bold truncate'>{getLocalDataString(selectedDate)}</span>
        <span>On time: 90%</span>
      </div>

      <TaskForm onSubmit={onSubmit} error={error} />
    </div>
  );
}

export default MainTaskContainer;
