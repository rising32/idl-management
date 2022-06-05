import React, { LegacyRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { CalendarSvg } from '../../assets/svg';
import { getFormatDate } from '../../lib/utils';
import { itemGrayStyle } from '../../lib/utils/commonStyle';
import { RootState } from '../../store';
import FullCalendar from '../calendar/FullCalendar';
import ModalView from './ModalView';

export interface SelectDateProps {
  label: string;
  fieldRef: LegacyRef<HTMLInputElement>;
  value: Date | null;
  onChange: (date: Date) => void;
}

const SelectDate = ({ label, value, onChange }: SelectDateProps) => {
  const [show, setShow] = useState(false);
  const { local } = useSelector((state: RootState) => state.core);
  const onClickWhen = (date: Date) => {
    onChange(date);
    setShow(false);
  };
  return (
    <>
      <div className={itemGrayStyle}>
        <div className='uppercase mr-4'>{label + ':'}</div>
        <div onClick={() => setShow(!show)} className='flex flex-1 justify-between text-rouge'>
          {value ? <div>{getFormatDate(value, local)}</div> : <div />}
          <CalendarSvg className='w-4 h-4 mr-2' />
        </div>
      </div>
      <ModalView isOpen={show}>
        <FullCalendar selectedDate={value || new Date()} onSelectDate={onClickWhen} />
      </ModalView>
    </>
  );
};

export default SelectDate;
