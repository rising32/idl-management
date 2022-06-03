import React, { LegacyRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getFormatDate } from '../../lib/utils';
import { itemGrayStyle } from '../../lib/utils/commonStyle';
import { RootState } from '../../store';
import FullCalendar from '../calendar/FullCalendar';
import ModalView from './ModalView';

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export interface SelectDateProps {
  label: string;
  fieldRef: LegacyRef<HTMLInputElement>;
  value: Date;
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
        <div onClick={() => setShow(!show)}>{getFormatDate(value, local)}</div>
      </div>
      <ModalView isOpen={show}>
        <FullCalendar selectedDate={value || new Date()} onSelectDate={onClickWhen} />
      </ModalView>
    </>
  );
};

export default SelectDate;
