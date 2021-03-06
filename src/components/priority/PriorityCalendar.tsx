import React, { useState, useEffect, useContext } from 'react';
import { addWeeks, subWeeks } from 'date-fns';
import { getWeekNumber } from '../../lib/utils';
import { ArrowLeftSvg, ArrowRightSvg, CalendarSvg } from '../../assets/svg';
import PageHeader from '../base/PageHeader';
import { PriorityContext } from '../../containers/priority/MainPriorityContainer';

const PriorityCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(getWeekNumber(currentMonth));

  const { state, update } = useContext(PriorityContext);

  useEffect(() => {
    update({ ...state, selectedWeek: currentWeek });
  }, [currentWeek]);
  const changeWeekHandle = (btnType: string) => {
    if (btnType === 'prev') {
      setCurrentMonth(subWeeks(currentMonth, 1));
      setCurrentWeek(getWeekNumber(subWeeks(currentMonth, 1)));
    }
    if (btnType === 'next') {
      setCurrentMonth(addWeeks(currentMonth, 1));
      setCurrentWeek(getWeekNumber(addWeeks(currentMonth, 1)));
    }
  };
  return (
    <PageHeader className='py-3 px-4 text-button'>
      <div className='flex items-center justify-center' onClick={() => changeWeekHandle('prev')}>
        <ArrowLeftSvg className='w-4 h-4 ' />
        <div className='text-rouge pl-2'>{currentWeek - 1}</div>
      </div>
      <div className='flex flex-1 flex-row items-center justify-between pr-2'>
        <div />
        <div className='text-black'>{'Week priorities ' + currentWeek}</div>
        <CalendarSvg className='w-4 h-4' />
      </div>
      <div className='flex items-center justify-center' onClick={() => changeWeekHandle('next')}>
        <div className='text-rouge pr-2'>{currentWeek + 1}</div>
        <ArrowRightSvg className='w-4 h-4' />
      </div>
    </PageHeader>
  );
};

export default PriorityCalendar;
