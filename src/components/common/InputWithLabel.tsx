import React, { LegacyRef } from 'react';
import { itemGrayStyle } from '../../lib/utils/commonStyle';

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export interface LabelInputProps extends InputProps {
  label: string;
  placeholder?: string;
  fieldRef: LegacyRef<HTMLInputElement>;
  name?: string;
  value?: string;
  onChange?: React.ChangeEventHandler;
  disabled?: boolean;
}

const InputWithLabel = ({ label, name, value, placeholder, onChange, fieldRef, disabled, ...rest }: LabelInputProps) => {
  return (
    <div className={itemGrayStyle}>
      <div className='uppercase mr-4'>{label + ':'}</div>
      <input
        ref={fieldRef}
        name={name}
        onChange={onChange}
        value={value}
        disabled={disabled}
        {...rest}
        className='flex flex-1 bg-transparent border-none focus:outline-none'
      />
    </div>
  );
};

export default InputWithLabel;
