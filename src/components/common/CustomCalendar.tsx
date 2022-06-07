import React, { useState } from 'react';
import { format, subMonths, addMonths, startOfWeek, addDays, isSameDay, startOfMonth, endOfMonth, endOfWeek, isSameMonth } from 'date-fns';
import { ArrowLeftSvg, ArrowRightSvg } from '../../assets/svg';

interface Props {
  selectedDate: Date;
  onSelectDate: (selectedDate: Date) => void;
}
const CustomCalendar = ({ selectedDate, onSelectDate }: Props) => {
  const [activeDate, setActiveDate] = useState(new Date());
  const getHeader = () => {
    return (
      <div className='flex flex-row p-3 w-full items-center justify-between bg-rouge'>
        <ArrowLeftSvg className='w-4 h-4 text-button' onClick={() => setActiveDate(subMonths(activeDate, 1))} />
        <div
          className='font-normal text-white'
          onClick={() => {
            onSelectDate(new Date());
            setActiveDate(new Date());
          }}
        >
          Today
        </div>
        <div className='font-bold text-white'>{format(activeDate, 'MMMM yyyy')}</div>
        <ArrowRightSvg className='w-4 h-4 text-button' onClick={() => setActiveDate(addMonths(activeDate, 1))} />
      </div>
    );
  };
  const getWeekDaysNames = () => {
    const weekStartDate = startOfWeek(activeDate);
    const weekDays = [];
    for (let day = 0; day < 7; day++) {
      weekDays.push(
        <div
          key={day + format(addDays(weekStartDate, day), 'E')}
          className='flex flex-1 items-center justify-center text-white font-normal'
        >
          {format(addDays(weekStartDate, day), 'E')}
        </div>,
      );
    }
    return <div className='flex flex-row w-full p-2 bg-background'>{weekDays}</div>;
  };
  const generateDatesForCurrentWeek = (date: Date, selectedDate: Date, activeDate: Date) => {
    let currentDate = date;
    const week = [];
    for (let day = 0; day < 7; day++) {
      const cloneDate = currentDate;
      week.push(
        <div
          key={currentDate.getDate()}
          className={`flex flex-1 items-center justify-center ${isSameMonth(currentDate, activeDate) ? '' : 'bg-dark-gray'} ${
            isSameDay(currentDate, new Date()) ? 'font-bold text-[#2563eb]' : ''
          }`}
          onClick={() => {
            onSelectDate(cloneDate);
          }}
        >
          <div
            className={`flex w-8 h-8 items-center justify-center ${
              isSameDay(currentDate, selectedDate) ? ' border-2 border-blue rounded-full' : ''
            } ${isSameDay(currentDate, new Date()) ? 'font-bold text-[#2563eb]' : ''}`}
          >
            {format(currentDate, 'd')}
          </div>
        </div>,
      );
      currentDate = addDays(currentDate, 1);
    }
    return (
      <div key={format(date, 'T')} className='flex flex-row w-full'>
        {week}
      </div>
    );
  };
  const getDates = () => {
    const startOfTheSelectedMonth = startOfMonth(activeDate);
    const endOfTheSelectedMonth = endOfMonth(activeDate);
    const startDate = startOfWeek(startOfTheSelectedMonth);
    const endDate = endOfWeek(endOfTheSelectedMonth);

    let currentDate = startDate;

    const allWeeks = [];

    while (currentDate <= endDate) {
      allWeeks.push(generateDatesForCurrentWeek(currentDate, selectedDate, activeDate));
      currentDate = addDays(currentDate, 7);
    }

    return <div className='flex flex-col w-full'>{allWeeks}</div>;
  };

  return (
    <section className='w-full text-black outline outline-1'>
      {getHeader()}
      {getWeekDaysNames()}
      {getDates()}
    </section>
  );
};

export default CustomCalendar;
