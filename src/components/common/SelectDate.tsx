import React, { LegacyRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { ClockSvg, HouseSvg } from '../../assets/svg';
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

const SelectDate = ({ label, value, onChange, fieldRef }: SelectDateProps) => {
  const [show, setShow] = useState(false);
  const { user, local } = useSelector((state: RootState) => state.core);
  const onClickWhen = (date: Date) => {
    onChange(date);
    setShow(false);
  };
  return (
    <>
      <div className={itemGrayStyle}>
        <div className='uppercase mr-4'>{label + ':'}</div>
        <div onClick={() => setShow(!show)} className='flex flex-1 justify-between text-rouge'>
          <div>{getFormatDate(value || new Date(), local)}</div>
          <ClockSvg className='mr-2' />
        </div>
      </div>
      <ModalView isOpen={show}>
        <FullCalendar selectedDate={value || new Date()} onSelectDate={onClickWhen} />
      </ModalView>
    </>
  );
};

export default SelectDate;
