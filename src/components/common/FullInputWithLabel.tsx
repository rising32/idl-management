import React, { LegacyRef } from 'react';

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export interface LabelInputProps extends InputProps {
  label: string;
  fieldRef: LegacyRef<HTMLInputElement>;
}

const FullInputWithLabel = ({ label, fieldRef, ...rest }: LabelInputProps) => {
  return (
    <div className='block w-full mt-4'>
      <span className='block uppercase'>{label}</span>

      <input
        ref={fieldRef}
        {...rest}
        className='mt-1 px-3 py-2 bg-white border shadow-sm border-dark-gray placeholder-card-gray focus:outline-none focus:border-rouge-blue block w-full rounded-md sm:text-sm focus:ring-1'
      />
    </div>
  );
};

export default FullInputWithLabel;
