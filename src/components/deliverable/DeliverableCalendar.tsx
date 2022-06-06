import React, { useState } from 'react';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { subDays } from 'date-fns/esm';
import PageHeader from '../base/PageHeader';
import { ArrowLeftSvg, ArrowRightSvg } from '../../assets/svg';
import { DeliverableContext } from '../../containers/deliverable/MainDeliverableContainer';

const DeliverableCalendar = () => {
  const { state, update } = React.useContext(DeliverableContext);
  const [activeDate, setActiveDate] = useState(state.selectedDate);

  const changeWeekHandle = (btnType: string) => {
    if (btnType === 'prev') {
      setActiveDate(subDays(activeDate, 7));
    }
    if (btnType === 'next') {
      setActiveDate(addDays(activeDate, 7));
    }
  };
  const getDates = () => {
    const weekStartDate = startOfWeek(activeDate, { weekStartsOn: 1 });
    const weekDays = [];
    for (let day = 0; day < 7; day++) {
      weekDays.push(
        <div
          key={format(addDays(weekStartDate, day), 'T')}
          className={`flex flex-1 flex-col w-full items-center justify-center ${
            isSameDay(addDays(weekStartDate, day), state.selectedDate) ? 'text-rouge font-bold' : 'text-black'
          }`}
          onClick={() => {
            update({ ...state, selectedDate: addDays(weekStartDate, day) });
          }}
        >
          <div>{format(addDays(weekStartDate, day), 'EEEEE')}</div>
          <div>{format(addDays(weekStartDate, day), 'd')}</div>
        </div>,
      );
    }
    return <div className='flex flex-row flex-1'>{weekDays}</div>;
  };

  return (
    <PageHeader>
      <div className='flex items-center justify-center' onClick={() => changeWeekHandle('prev')}>
        <ArrowLeftSvg className='w-4 h-4 text-button' />
      </div>
      {getDates()}
      <div className='flex items-center justify-center' onClick={() => changeWeekHandle('next')}>
        <ArrowRightSvg className='w-4 h-4 text-button' />
      </div>
    </PageHeader>
  );
};

export default DeliverableCalendar;
