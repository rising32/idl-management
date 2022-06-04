import React, { useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import LoginForm, { LoginFormType } from '../../components/auth/LoginForm';
import WeekDayCalendar from '../../components/calendar/WeekDayCalendar';
import TaskForm, { TaskFormType } from '../../components/task/TaskForm';
import { getLocalDataString, validateEmail } from '../../lib/utils';
import { ErrorResponse } from '../../lib/utils/errorTypes';
import { useAppDispatch } from '../../store';
import { setCompanyInfo } from '../../store/features/companySlice';
import { setLayer, setSetting, setUser } from '../../store/features/coreSlice';

function MainTaskContainer() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [error, setError] = useState<null | string>(null);

  const onSelectDate = (date: Date) => {
    setSelectedDate(date);
  };
  const navigate = useNavigate();
  const dipatch = useAppDispatch();

  const onSubmit: SubmitHandler<TaskFormType> = data => {
    console.log(data);
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
